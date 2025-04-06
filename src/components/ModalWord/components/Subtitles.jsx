import { useState, useEffect, useRef } from "react";
import { fetchSubtitles, formatTime, getVideoByVideoIdFromFirestore, saveDataVideoToFirestore } from "../../../utils/utils";
import Loading from "@/components/Loading/Loading";
import { updateDeepseekResponse } from "../../../stores/deepseekStore"
import TextSelectionHandler from "@/components/TextSelectionHandler/TextSelectionHandler";

export const Subtitles = ({ videoId, transcript, setTranscript, handleSeek, currentSegmentIndex, indexLiTranslated, englishLevel }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const originalBoxRef = useRef(null);


  console.log(englishLevel)

  useEffect(() => {
    const subtitlesFromLocalStorage = localStorage.getItem('dataSubtitles');
    const englishLevel = localStorage.getItem('englishLevel');

    if (subtitlesFromLocalStorage) {
      setTranscript(JSON.parse(subtitlesFromLocalStorage));
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchSubtitles(videoId, 'en', englishLevel);
        const { subtitles, totalText, deepseekResponse } = response
        updateDeepseekResponse(deepseekResponse)
        localStorage.setItem('totalText', JSON.stringify(totalText));
        localStorage.setItem('deepseekResponse', JSON.stringify(deepseekResponse));
        const dataVideoToSave = {
          videoId,
          englishLevel,
          subtitles,
          totalText,
          deepseekResponse,
          createdAt: new Date()
        }
        saveDataVideoToFirestore(dataVideoToSave)
        setTranscript(subtitles);
      } catch (err) {
        setError(true);
        console.error("Error fetching subtitles:", err);
      } finally {
        setLoading(false);
      }
    };

    const getDataFromFirestore = async () => {
      const dataOfVideoFromFirestore = await getVideoByVideoIdFromFirestore(videoId, englishLevel)
      console.log(dataOfVideoFromFirestore)
      if (dataOfVideoFromFirestore.found) {
        console.log("dataOfVideoFromFirestore.found: true")
        try {
          const { data } = dataOfVideoFromFirestore
          updateDeepseekResponse(data.deepseekResponse)
          localStorage.setItem('totalText', JSON.stringify(data.totalText));
          localStorage.setItem("dataSubtitles", JSON.stringify(data.subtitles));
          localStorage.setItem('deepseekResponse', JSON.stringify(data.deepseekResponse));
          setTranscript(data.subtitles)
          return
        } catch (error) {
          console.error(`Error al intentar obtener de firestore la info del videoId ${videoId}`, error);
        }
      }
      else {
        fetchData();
      }
    }


    if (videoId) {
      getDataFromFirestore()
    }
  }, [videoId]);

  return (
    <div className="wrapper-subtitles">
      {error && <p className="subtitles-error">Ocurrio un error al intentar cargar los subtitulos, recuerda que solo puedes cargar videos en ingles</p>}
      {loading && <Loading />}
      <TextSelectionHandler>
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
      </TextSelectionHandler>

    </div >
  )
}