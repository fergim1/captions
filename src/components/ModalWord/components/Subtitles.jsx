import { useState, useEffect, useRef } from "react";
import { fetchSubtitles } from "../../../utils/utils";

export const Subtitles = ({ videoId, transcript, setTranscript, handleSeek, currentSegmentIndex }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const originalBoxRef = useRef(null);


  useEffect(() => {
    try {
      setLoading(true)
      setError(null)
      fetchSubtitles(videoId, 'en', setTranscript);
    }
    catch (error) {
      setError(true)
      console.log(error)

    }
    finally {
      setLoading(false)
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
                backgroundColor: index === currentSegmentIndex ? "#3b3b3b" : "transparent"
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

    </div>
  )
}