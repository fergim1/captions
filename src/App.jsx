import React, { useState, useRef } from 'react';
import YoutubePlayer from 'react-player/youtube';
import { ModalWord } from './components/ModalWord/ModalWord';
import { fetchSubtitles, getYouTubeVideoId, syncScroll } from './utils/utils';
// import { spanishText, textInEnglish, subtitulesFromBack } from './fakeTranslation';
import 'animate.css';
import { Input } from './components/ModalWord/components/Input';
import { useEffect } from 'react';


function App () {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [transcript, setTranscript] = useState(null);
  const [translatedText, setTranslatedText] = useState('');
  const [playing, setPlaying] = useState(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(null);

  const playerRef = useRef(null);
  const originalBoxRef = useRef(null);
  const translatedBoxRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false)
  const [wordToTranslate, setWordToTranslate] = useState(null)

  // const [played, setPlayed] = useState(0) 


  useEffect(() => {
    try {
      setLoading(true)
      setError(null)
      fetchSubtitles(videoId, 'en', setTranscript, setTranslatedText);

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

  const handleProgress = (state) => {
    if (!transcript) return
    if (transcript && playing) {
      const playedSeconds = state.playedSeconds;

      const currentSegment = transcript.findIndex(
        (segment) =>
          playedSeconds >= segment.start &&
          playedSeconds < segment.start + segment.dur
      );


      if (currentSegment !== currentSegmentIndex && currentSegment !== -1) {
        setCurrentSegmentIndex(currentSegment);
        // Desplaza el subtítulo actual al centro de la caja de subtítulos originales
        const subtitleElement = document.getElementById(`subtitle-${currentSegment}`);
        if (subtitleElement) {
          subtitleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Sincroniza los scrolls de las cajas
/*         syncScroll(originalBoxRef, translatedBoxRef);
 */      }
    }
  };



  // const longPressTimeout = useRef(null);


  // Manejadores de eventos
  // const handleLongPressStart = (word) => {
  //   if (playing) return
  //   longPressTimeout.current = setTimeout(() => {
  //     setModalVisible(true)
  //     setWordToTranslate(word)
  //   }, 1000); // 1 segundo
  // };

  // const handleLongPressEnd = () => {
  //   clearTimeout(longPressTimeout.current); // Cancela si el usuario suelta antes de tiempo
  // };

  // const handleDoubleClick = (word) => {
  //   if (playing) return
  //   setModalVisible(true)
  //   setWordToTranslate(word)
  // };


  const handlePlayPause = () => {
    setPlaying(prev => !prev)
  }
  // const handleTranslate = (subtitle) => {
  //   setModalVisible(true)
  //   setWordToTranslate(subtitle)
  //   console.log(subtitle)
  // }


  ///// TODO: agregar y controlar barra de progreso del video ////////////

  return (
    <div className="App">

      {!videoId && <Input setVideoId={setVideoId} />}

      {videoId &&
        <div className='wrapper-video-and-controls' >
          <div className='player-wrapper'>
            <YoutubePlayer
              className="react-player"
              ref={playerRef}
              url={`https://www.youtube.com/watch?v=${videoId}`}
              playing={playing}
              onStart={() => setPlaying(true)}
              controls={false}
              onProgress={handleProgress}
              progressInterval={200}
              onSeek={e => console.log('onSeek', e)}
              width='100%'
              height='100%'
            />
          </div>
          <div className='react-player-controls'>
            <button
              className='control-stop-play'
              onClick={handlePlayPause}
            >
              {playing ? "Stop" : "Play"}
            </button>

          </div>
        </div>}

      <div className="container-subtitulo-y-traduccion">
        {error && <p style={{ color: "red" }}>Ocurrio un error al intentar cargar los subtitulos</p>}
        {loading && <p style={{ color: "red" }}>Cargando...</p>}
        {transcript && <div className='caja-subtitles'
          ref={originalBoxRef}
          onScroll={() => syncScroll(originalBoxRef, translatedBoxRef)}
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
                {/* {item.text.split(" ").map((word, wordIndex) => ( */}
                <div className='text-wrapper'>
                  <span
                    className='text-subtitle'
                  // key={`${index}-${wordIndex}`}
                  // onMouseDown={() => handleLongPressStart(word)} // Para escritorio
                  // onMouseUp={handleLongPressEnd} // Para escritorio
                  // onDoubleClick={() => handleDoubleClick(word)} // Doble clic en escritorio
                  // onTouchStart={() => handleLongPressStart(word)} // Para móviles
                  // onTouchEnd={handleLongPressEnd} // Para móviles
                  >
                    {/* {word} */}
                    {item.text}
                  </span>

                </div>
                {/* <button
                          onClick={() => handleTranslate(item.text)}
                        >
                          t
                        </button> */}

                {/* ))} */}
              </li>

            ))}

          </ul>
        </div>}



        {/* <div className="caja-traduccion"
              ref={translatedBoxRef}
              >
              <span className="texto-entero-traducido" >
                {translatedText}
              </span>
            </div> */}
      </div>

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