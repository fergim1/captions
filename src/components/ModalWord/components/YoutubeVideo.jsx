
import { useState, useEffect } from 'react';
import YoutubePlayer from 'react-player/youtube';
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faHome, faLanguage, faRotateLeft, faArrowRotateRight, faPause, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { Slider } from "@/components/ui/slider"
import { formatTime } from '@/utils/utils';


export const YouTubeVideo = ({
  videoId,
  transcript,
  playerRef,
  playing,
  setPlaying,
  currentSegmentIndex,
  setCurrentSegmentIndex,
  durationOfVideo,
  currentTime,
  duration
}) => {


  let navigate = useNavigate();

  const handlePlayPause = () => {
    setPlaying(prev => !prev)
    let segment = transcript[currentSegmentIndex]
    localStorage.setItem('currentSegment', JSON.stringify(segment));
    localStorage.setItem('current', JSON.stringify(playerRef.current.getCurrentTime()));
  }

  useEffect(() => {
    const savedTime = parseFloat(localStorage.getItem("current"));
    if (savedTime && playerRef.current) {
      playerRef.current.seekTo(savedTime, "seconds");
    }
  }, []);

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
        // console.log(segment)


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

  const handle15SegLess = () => {
    if (!playerRef.current) return;
    if (!playing) return
    const time = playerRef.current.getCurrentTime() - 15;
    playerRef.current.seekTo(Math.max(0, time), "seconds");
  };

  const handle15SegMore = () => {
    if (!playerRef.current) return;
    if (!playing) return
    const time = playerRef.current.getCurrentTime() + 15;
    playerRef.current.seekTo(time, "seconds");
  };


  const handleSliderValueChange = (value) => {
    //TODO : // mostrar tiempo mientras te moves, como se ve en youtube
    console.log(formatTime(value[0]))
    if (!playerRef.current) return;
    playerRef.current?.seekTo(value[0], "seconds");

  }

  const [muted, seTmuted] = useState(false)

  const handleMuted = () => {
    seTmuted(prev => !prev)
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
          muted={muted}
        />
      </div>
      <div className='slider flex w-full h-auto flex-row justify-center items-center pl-2 pr-2'>
        <FontAwesomeIcon
          icon={faVolumeXmark}
          onClick={handleMuted}
          className={`mr-[40px] text-[20px] ${muted ? "opacity-[100 %]" : "opacity-[40%]"}`}
        />
        <Slider
          className="w-[70%]"
          defaultValue={[0]}
          max={playerRef.current ? playerRef.current.getDuration() : 100}
          step={1}
          onValueChange={handleSliderValueChange}
        />
      </div>

      <div className='react-player-controls'>

        <div className="flex flex-row justify-center items-center gap-6 w-1/4">
          <button
            // className='button-home'
            onClick={handleDeleteCache}
            className={playing ? "text-[#8888]" : "text-white"}
          >
            <FontAwesomeIcon icon={faHome} />
          </button>

          <button
            onClick={handleGoToTranslations}
            className={playing ? "text-[#8888]" : "text-white"}
          >
            <FontAwesomeIcon icon={faLanguage} />
          </button>
        </div>


        <div className='flex flex-row justify-center items-center gap-4 w-2/4'>
          <FontAwesomeIcon icon={faRotateLeft} onClick={handle15SegLess} className={playing ? "text-white" : "text-[#8888]"} />
          <button
            className='control-stop-play'
            onClick={handlePlayPause}
          >
            {playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
          </button>
          <FontAwesomeIcon icon={faArrowRotateRight} onClick={handle15SegMore} className={playing ? "text-white" : "text-[#8888]"} />
        </div>
        <div className='flex flex-row justify-center items-center w-1/4'>
          <p className='durationOfVideo'>{currentTime} / {duration}</p>
        </div>


      </div>
    </div>
  )
}