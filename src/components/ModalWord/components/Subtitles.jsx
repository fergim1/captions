import { useState, useEffect, useRef } from "react";
import { fetchSubtitles, formatTime } from "../../../utils/utils";


import { Skeleton } from "@/components/ui/skeleton";

export const Subtitles = ({ videoId, transcript, setTranscript, handleSeek, currentSegmentIndex, setDurationOfVideo }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const originalBoxRef = useRef(null);

  useEffect(() => {
    const subtitlesFromLocalStorage = localStorage.getItem('dataSubtitles');

    if (subtitlesFromLocalStorage) {
      setTranscript(JSON.parse(subtitlesFromLocalStorage));
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchSubtitles(videoId, 'en'); // Asegúrate de que fetchSubtitles retorna una promesa
        const { subtitles } = response
        setTranscript(subtitles);
      } catch (err) {
        setError(true);
        console.error("Error fetching subtitles:", err);
      } finally {
        setLoading(false);
      }
    };

    if (videoId) {
      fetchData();
    }
  }, [videoId]);

  return (
    <div className="wrapper-subtitles">
      {error && <p className="subtitles-error">Ocurrio un error al intentar cargar los subtitulos, recuerda que solo puedes cargar videos en ingles</p>}
      {loading &&
        // <div className="subtitles-loading">
        <div className="w-full h-[360px] gap-2 pt-8 flex flex-col justify-start items-center space-y-2">
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-6 w-[250px]" />
        </div>
        //   <p  >Cargando subtitulos...</p>
        //   <p>Demora aprox. de 1 o 2 minutos</p>
        // </div>
      }
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
              <code className='time-subtitle'> {formatTime(item.start)}</code>
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