import { useState, useEffect, useRef } from "react";
import { fetchSubtitles, formatTime } from "../../../utils/utils";
import Loading from "@/components/Loading/Loading";

export const Subtitles = ({ videoId, transcript, setTranscript, handleSeek, currentSegmentIndex, indexLiTranslated }) => {

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
        const response = await fetchSubtitles(videoId, 'en');
        console.log(response)
        const { subtitles, totalText } = response
        console.log(totalText)
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
      {loading && <Loading />}
      {transcript && <div className='caja-subtitles'
        ref={originalBoxRef}
      >

        <ul className='ul-subtitles'>
          {transcript.map((item, index) => (
            <li
              className='li-subtitles'
              key={index}
              id={`subtitle-${index}`}
              onClick={() => handleSeek(item, index)}
              style={{
                backgroundColor: index === currentSegmentIndex ? "rgb(37 37 37)" : "transparent",
                border: index === indexLiTranslated ? "1px solid #8b8b8b" : "transparent",

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