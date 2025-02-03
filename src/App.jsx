import React, { useState, useRef } from 'react';
import { ModalWord } from './components/ModalWord/ModalWord';
// import { spanishText, textInEnglish, subtitulesFromBack } from './fakeTranslation';
import 'animate.css';
import { InputSection } from './components/ModalWord/components/InputSection';
import { YouTubeVideo } from './components/ModalWord/components/YoutubeVideo';
import { Subtitles } from './components/ModalWord/components/Subtitles';
import { useEffect } from 'react';
import { formatTime } from './utils/utils';


function App () {
  const [videoId, setVideoId] = useState("");
  const [transcript, setTranscript] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(null);
  const [durationOfVideo, setDurationOfVideo] = useState(null)

  const playerRef = useRef(null);

  const [modalVisible, setModalVisible] = useState(false)
  const [wordToTranslate, setWordToTranslate] = useState(null)


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


  const [currentTime, setCurrentTime] = useState(0); // Tiempo reproducido
  const [duration, setDuration] = useState(0); // Duración total


  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        let currentTime = playerRef.current.getCurrentTime()
        let currentTimeFormated = formatTime(currentTime)
        setCurrentTime(currentTimeFormated);
        let duration = playerRef.current.getDuration()
        let durationFormated = formatTime(duration)
        setDuration(durationFormated);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const videoIdFromLocalStorage = localStorage.getItem('videoId');
    // const durationOfVideoFromLocalStorage = localStorage.getItem('durationOfVideo');
    if (videoIdFromLocalStorage) {
      try {
        const parsedData = JSON.parse(videoIdFromLocalStorage)
        setVideoId(parsedData);
        console.log('videoId cargado desde localStorage');
      } catch (error) {
        console.error("No se puede parsear el valor, ya que no es un string válido");
      }
    }

  }, [])


  ///// TODO: agregar y controlar barra de progreso del video ////////////

  return (
    <div className="App">

      {!videoId && <InputSection setVideoId={setVideoId} />}

      {videoId &&
        < YouTubeVideo
          videoId={videoId}
          transcript={transcript}
          playerRef={playerRef}
          playing={playing}
          setPlaying={setPlaying}
          currentSegmentIndex={currentSegmentIndex}
          setCurrentSegmentIndex={setCurrentSegmentIndex}
          durationOfVideo={durationOfVideo}
          currentTime={currentTime}
          duration={duration}
          setCurrentTime={setCurrentTime}

        />
      }

      {videoId &&
        <Subtitles
          videoId={videoId}
          transcript={transcript}
          setTranscript={setTranscript}
          handleSeek={handleSeek}
          currentSegmentIndex={currentSegmentIndex}
          setDurationOfVideo={setDurationOfVideo}
        />

      }

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