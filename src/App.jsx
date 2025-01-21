import React, { useState, useRef } from 'react';
import { ModalWord } from './components/ModalWord/ModalWord';
// import { spanishText, textInEnglish, subtitulesFromBack } from './fakeTranslation';
import 'animate.css';
import { Input } from './components/ModalWord/components/Input';
import { YouTubeVideo } from './components/ModalWord/components/YoutubeVideo';
import { Subtitles } from './components/ModalWord/components/Subtitles';
import { useEffect } from 'react';


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

  useEffect(() => {
    const videoIdFromLocalStorage = localStorage.getItem('videoId');
    const durationOfVideoFromLocalStorage = localStorage.getItem('durationOfVideo');
    if (videoIdFromLocalStorage) {
      setVideoId(JSON.parse(videoIdFromLocalStorage));
      console.log('videoId cargado desde localStorage');
    }
    if (durationOfVideoFromLocalStorage) {
      setDurationOfVideo(JSON.parse(durationOfVideoFromLocalStorage));
      console.log('durationOfVideoFromLocalStorage cargado desde localStorage');
    }

  }, [])


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
          durationOfVideo={durationOfVideo}
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