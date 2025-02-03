import React, { useEffect, useState } from 'react';
import { saveTranslation, deleteTranslation } from '../utils/crud-firefox';
import { extractSpanishText } from '../utils/extractSpanishText';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";


import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { ToastAction } from "@/components/ui/toast"
import { Separator } from "@/components/ui/separator"



const GoogleTranslateLibrary = ({ word, setModalVisible }) => {
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { toast } = useToast()


  useEffect(() => {
    // Carga dinámica del script de Google Translate
    const script = document.createElement('script');
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      console.log('Google Translate script loaded');
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Traducción automática cuando se pasa un nuevo "word"
  const translateText = async (text, targetLanguage) => {

    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLanguage}&dt=t&q=${encodeURIComponent(
        text
      )}`;
      const response = await fetch(url);
      const data = await response.json();
      const textTranslated = extractSpanishText(data[0])
      setTranslatedText(textTranslated); // Establece el texto traducido en el estado

    } catch (error) {
      console.error('Error al traducir:', error);
      setTranslatedText('Error al traducir');
    }
  };


  useEffect(() => {
    if (word) {
      try {
        setLoading(true)
        setError(null)
        translateText(word, 'es'); // cambiar idioma "es" por el que se quiera traducir

      } catch (error) {
        setError(true)
      }
      finally {
        setLoading(false)
      }
    }
  }, [word]); // Ejecuta esta lógica cada vez que cambia "word"


  const handleSaveItem = () => {
    if (!translatedText) return

    const payload = {
      videoId: "Agregar id del Video",
      titleVideo: "Agregar titulo",
      original: word,
      translated: translatedText,
      language: "es",
      createdAt: new Date()
    }

    saveTranslation(payload)
    toast({
      title: "Traducción guardada",
      // description: "Para deshacerlo haz click en el boton",
      action:
        <ToastAction
          altText="Cerrar"
        // onClick={()=>handleDeletItem()}
        >
          Cerrar
        </ToastAction>,
    })
  }


  return (
    <div className="container-google-translation animate__animated animate__slideInUp">
      <div className="modal-button-close-wrapper mb-3">
        <FontAwesomeIcon style={{ color: "#3d3d3d", }} icon={faMinus} size={"2xl"} onClick={() => setModalVisible(false)} />
      </div>
      <div className='flex flex-col item-center justify-start p-3 gap-4'>
        <p className="text-lg leading-8 font-medium leading-none">{word}</p>
        <Separator />
        {loading && <p style={{ color: "red" }}>Cargando...</p>}
        {error && <p style={{ color: "red" }}>Ocurrio un error al intentar cargar los subtitulos</p>}
        {translatedText &&
          <p className='text-lg text-muted-foreground'>{translatedText}</p>
        }
        <Button
          className="mt-4 mb-4"
          variant="outline"
          onClick={handleSaveItem}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
};


export default GoogleTranslateLibrary