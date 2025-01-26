import { useState, useEffect, useRef } from "react";
import { fetchSubtitles } from "../../../utils/utils";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area";

export const Subtitles = ({ setModalVisible, modalVisible, videoId, transcript, setTranscript, handleSeek, currentSegmentIndex, setDurationOfVideo }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const originalBoxRef = useRef(null);


  useEffect(() => {
    const subtitlesFromLocalStorage = localStorage.getItem('dataSubtitles');
    if (subtitlesFromLocalStorage) {
      // Si hay datos en localStorage, los cargamos al estado
      setTranscript(JSON.parse(subtitlesFromLocalStorage));
    }
    else {

      try {
        setLoading(true)
        setError(null)
        fetchSubtitles(videoId, 'en', setTranscript, setDurationOfVideo);
      }
      catch (error) {
        setError(true)
        console.log(error)

      }
      finally {
        setLoading(false)
      }
    }

  }, [videoId])


  return (
    <div className="wrapper-subtitles">
      {error && <p className="subtitles-error">Ocurrio un error al intentar cargar los subtitulos</p>}
      {loading && <div className="subtitles-loading">
        <p  >Cargando subtitulos...</p>
        <p>Demora aprox. de 1 o 2 minutos</p>
      </div>}
      {transcript && <div className='caja-subtitles'
        ref={originalBoxRef}
      >

        <ul className='ul-subtitles'>
          {transcript.map((item, index) => (
            <li
              className='li-subtitles'
              key={index}
              id={`subtitle-${index}`}
              onClick={() => handleSeek(item)}
              style={{
                backgroundColor: index === currentSegmentIndex ? "rgb(37 37 37)" : "transparent"
              }}
            >
              <code className='time-subtitle'> {(item.start / 100).toFixed(2)}</code>
              <div className='text-wrapper'>
                <span
                  className='text-subtitle'

                >
                  {item.text}
                </span>

              </div>
            </li>
          ))}
        </ul>

      </div>}

    </div >
  )
}