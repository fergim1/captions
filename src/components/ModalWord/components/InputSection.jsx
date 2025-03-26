import React, { useState } from 'react';

import { getYouTubeVideoId } from "../../../utils/utils";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

export const InputSection = ({ setVideoId }) => {
  const [link, setLink] = useState("");

  const handleInputChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    if (!link) return
    event.preventDefault();
    const videoIdFromLink = getYouTubeVideoId(link)
    localStorage.setItem("videoId", videoIdFromLink);
    console.log(`videoId guardado en localStorage : ${videoIdFromLink}`)
    setVideoId(videoIdFromLink)
  };


  return (
    // <div className="wrapper-input" >
    <div className="flex w-screen h-screen flex-col justify-center items-center" >

      <div className="flex w-full max-w-xs flex-col space-y-6">
        {/* <FontAwesomeIcon icon={faYoutube} size="3x" color="red" /> */}
        {/* <p className='text-xl text-center text-white'>Pegar link</p> */}
        <Input
          className="text-base"
          type="text"
          placeholder="Pegar link" value={link}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          onClick={handleSubmit}
        >
          Cargar Video
        </Button>
      </div>

    </div>
  )
}