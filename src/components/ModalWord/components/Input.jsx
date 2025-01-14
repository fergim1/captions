import React, { useState } from 'react';

import { getYouTubeVideoId } from "../../../utils/utils";

export const Input = ({ setVideoId }) => {
  const [link, setLink] = useState("");

  const handleInputChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const videoIdFromLink = getYouTubeVideoId(link)
    setVideoId(videoIdFromLink)
    // fetchSubtitles(videoIdFromLink, 'en', setTranscript, setTranslatedText);
  };


  return (
    <div className="wrapper-input" >
      <p className='title-input'> Pegar un link de un video de Youtube</p>
      <input
        className='input'
        type="text"
        placeholder=""
        value={link}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className='button-submit'
        onClick={handleSubmit}
      >
        Cargar Video
      </button>
    </div>
  )
}