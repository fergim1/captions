import YoutubePlayer from 'react-player/youtube';
import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop, faPlay, faHome, faLanguage } from "@fortawesome/free-solid-svg-icons";


export const YouTubeVideo = ({
  videoId,
  transcript,
  playerRef,
  playing,
  setPlaying,
  currentSegmentIndex,
  setCurrentSegmentIndex,
  durationOfVideo
}) => {


  let navigate = useNavigate();

  const handlePlayPause = () => {
    setPlaying(prev => !prev)
    let segment = transcript[currentSegmentIndex]
    localStorage.setItem('currentSegment', JSON.stringify(segment));
  }


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

        let segment = localStorage.getItem('currentSegment');
        console.log(segment)


        // Desplaza el subtítulo actual al centro de la caja de subtítulos originales
        const subtitleElement = document.getElementById(`subtitle-${currentSegment}`);
        if (subtitleElement) {
          subtitleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

      }
    }
  };
  const handleDeleteCache = () => {
    if (playing) return
    localStorage.clear()
    window.location.reload()
    console.log("cache borrado")
  }

  const handleGoToTranslations = () => {
    if (playing) return
    navigate("/translations")
  }

  return (
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
          onDuration={(e) => console.log("Duracion del video en segundos", e)}
        />
      </div>
      <div className='react-player-controls'>
        <button
          // className='button-home'
          onClick={handleDeleteCache}
          className={playing ? "text-[#8888]" : "text-white"}
        >
          <FontAwesomeIcon icon={faHome} />
        </button>

        <button
          onClick={handleGoToTranslations}
          // to="/translations"
          className={playing ? "text-[#8888]" : "text-white"}
        // className='link-go-to-translations'
        >
          <FontAwesomeIcon icon={faLanguage} />
        </button>

        <button
          className='control-stop-play'
          onClick={handlePlayPause}
        >
          {playing ? <FontAwesomeIcon icon={faStop} /> : <FontAwesomeIcon icon={faPlay} />}
        </button>

        {durationOfVideo && <p className='durationOfVideo'>{durationOfVideo}</p>}


      </div>
    </div>
  )
}