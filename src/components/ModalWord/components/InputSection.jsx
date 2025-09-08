import React, { useState } from 'react';

import { getYouTubeVideoId } from "../../../utils/utils";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

export const InputSection = ({ setVideoId, englishLevel, setEnglishLevel }) => {
  const [link, setLink] = useState("");

  const handleInputChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    if (!link) return
    event.preventDefault();
    const videoIdFromLink = getYouTubeVideoId(link)
    localStorage.setItem("videoId", videoIdFromLink);
    localStorage.setItem("englishLevel", englishLevel);
    console.log(`Guardado en localStorage: videoId: ${videoIdFromLink} y englishLevel: ${englishLevel}`)
    setVideoId(videoIdFromLink)
  };

  const handleSelect = (value) => {
    setEnglishLevel(value)
  }

  return (
    // <div className="wrapper-input" >
    <div className="flex w-screen h-screen flex-col justify-center items-center" >

      <div className="flex w-full max-w-xs flex-col space-y-6">
        {/* <FontAwesomeIcon icon={faYoutube} size="3x" color="red" /> */}
        {/* <p className='text-xl text-center text-white'>Pegar link</p> */}

        <Select onValueChange={(value) => handleSelect(value)}>
          <SelectTrigger >
            <SelectValue placeholder="Your english level" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Level</SelectLabel>
              <SelectItem value="A1">A1</SelectItem>
              <SelectItem value="A2">A2</SelectItem>
              <SelectItem value="B1">B1</SelectItem>
              <SelectItem value="B2">B2</SelectItem>
              <SelectItem value="C1">C1</SelectItem>
              <SelectItem value="C2">C2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

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