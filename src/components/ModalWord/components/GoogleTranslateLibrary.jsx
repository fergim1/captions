// import React, { useEffect } from 'react';

// const GoogleTranslateLibraryper = ({ word }) => {

//   console.log({ word })
//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     script.async = true;
//     document.body.appendChild(script);

//     window.googleTranslateElementInit = () => {
//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: 'en', // Idioma original de los subtítulos
//           includedLanguages: 'es,fr,de', // Idiomas permitidos
//           layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//         },
//         'subtitle_translate_container' // ID del contenedor de los subtítulos
//       );
//     };

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Subtítulos</h1>
//       <div id="subtitle_google_translate_container">
//         {/* Aquí van los subtítulos dinámicos */}
//         <p>{word}</p>
//       </div>
//     </div>
//   );
// };

// export default GoogleTranslateLibraryper;

import React, { useEffect, useState } from 'react';
import { extractSpanishText } from '../utils/extractSpanishText';

const GoogleTranslateLibrary = ({ word }) => {
  const [translatedText, setTranslatedText] = useState('');

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

  useEffect(() => {
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

    if (word) {
      translateText(word, 'es'); // Cambia 'es' al idioma deseado
    }
  }, [word]); // Ejecuta esta lógica cada vez que cambia "word"

  return (
    <div>
      <div className="container-google-translation">
        <h3>{word}"</h3>
        <hr />
        <p>{translatedText}"</p>
      </div>
    </div>
  );
};


export default GoogleTranslateLibrary