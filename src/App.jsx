import React, { useState, useRef } from 'react';
import { ModalWord } from './components/ModalWord/ModalWord';
import { fetchSubtitles, getYouTubeVideoId } from './utils/utils';
// import { spanishText, textInEnglish, subtitulesFromBack } from './fakeTranslation';
import 'animate.css';
import { Input } from './components/ModalWord/components/Input';
import { useEffect } from 'react';
import { YouTubeVideo } from './components/ModalWord/components/YoutubeVideo';


function App () {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [transcript, setTranscript] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(null);

  const playerRef = useRef(null);
  const originalBoxRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false)
  const [wordToTranslate, setWordToTranslate] = useState(null)


  useEffect(() => {
    try {
      setLoading(true)
      setError(null)
      fetchSubtitles(videoId, 'en', setTranscript);

    } catch (error) {
      setError(true)
    }
    finally {
      setLoading(false)
    }
  }, [videoId])


  const handleSeek = (item) => {
    if (!playing) {
      setModalVisible(true)
      setWordToTranslate(item.text)
      return
    }
    if (playerRef.current) {
      playerRef.current.seekTo(item.start, 'seconds');
      setPlaying(true);
    }
  };


  ///// TODO: agregar y controlar barra de progreso del video ////////////

  return (
    <div className="App">

      {!videoId && <Input setVideoId={setVideoId} />}

      {videoId &&
        < YouTubeVideo
          videoId={videoId}
          transcript={transcript}
          playerRef={playerRef}
          playing={playing}
          setPlaying={setPlaying}
          currentSegmentIndex={currentSegmentIndex}
          setCurrentSegmentIndex={setCurrentSegmentIndex}
        />}

      {videoId && <div className="wrapper-subtitles">
        {error && <p style={{ color: "red" }}>Ocurrio un error al intentar cargar los subtitulos</p>}
        {loading && <p style={{ color: "red" }}>Cargando...</p>}
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

      </div>}

      {modalVisible &&
        <ModalWord
          word={wordToTranslate}
          setModalVisible={setModalVisible}
        />
      }
    </div>

  );
}

export default App;