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
  const [modalVisible, setModalVisible] = useState(false)
  const [wordToTranslate, setWordToTranslate] = useState(null)
  const [indexLiTranslated, setIndexLiTranslated] = useState(null)
  const [currentTime, setCurrentTime] = useState(0); // Tiempo reproducido
  const [duration, setDuration] = useState(0); // Duración total

  const playerRef = useRef(null);

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
    const videoIdCached = localStorage.getItem("videoId")
    if (videoIdCached) {
      try {
        setVideoId(videoIdCached);
        console.log('videoId cargado desde localStorage');
      } catch (error) {
        console.error("No se puede parsear el valor, ya que no es un string válido");
      }
    }
  }, [])


  const handleSeek = (item, index) => {
    if (!playing) {
      setModalVisible(true)
      setWordToTranslate(item.text)
      setIndexLiTranslated(index)
      return
    }
    if (playerRef.current) {
      playerRef.current.seekTo(item.start, 'seconds');
      setPlaying(true);
    }
  };

  const [englishLevel, setEnglishLevel] = useState("")



  return (
    <div className="App">

      {!videoId && <InputSection setVideoId={setVideoId} englishLevel={englishLevel} setEnglishLevel={setEnglishLevel} />}

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
          setIndexLiTranslated={setIndexLiTranslated}

        />
      }

      {videoId &&
        <Subtitles
          videoId={videoId}
          transcript={transcript}
          setTranscript={setTranscript}
          handleSeek={handleSeek}
          currentSegmentIndex={currentSegmentIndex}
          indexLiTranslated={indexLiTranslated}
          englishLevel={englishLevel}
        />

      }

      {modalVisible && videoId &&
        <ModalWord
          word={wordToTranslate}
          setModalVisible={setModalVisible}
          videoId={videoId}
          modalVisible={modalVisible}
        />
      }
    </div>

  );
}

export default App;