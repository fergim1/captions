import React, { useEffect, useState } from 'react';
import { extractSpanishText } from '../utils/extractSpanishText';

const GoogleTranslateLibrary = ({ word }) => {
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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
        translateText(word, 'es'); // Cambia 'es' al idioma deseado

      } catch (error) {
        setError(true)
      }
      finally {
        setLoading(false)
      }
    }
  }, [word]); // Ejecuta esta lógica cada vez que cambia "word"

  return (
    <div>
      <div className="container-google-translation">
        <h3>{word}</h3>
        <hr />
        {loading && <p style={{ color: "red" }}>Cargando...</p>}
        {error && <p style={{ color: "red" }}>Ocurrio un error al intentar cargar los subtitulos</p>}
        {translatedText && <p>{translatedText}</p>}
      </div>
    </div>
  );
};


export default GoogleTranslateLibrary