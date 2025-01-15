import YoutubePlayer from 'react-player/youtube';


export const YouTubeVideo = ({
  videoId,
  transcript,
  playerRef,
  playing,
  setPlaying,
  currentSegmentIndex,
  setCurrentSegmentIndex
}) => {

  const handlePlayPause = () => {
    setPlaying(prev => !prev)
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
        // Desplaza el subtítulo actual al centro de la caja de subtítulos originales
        const subtitleElement = document.getElementById(`subtitle-${currentSegment}`);
        if (subtitleElement) {
          subtitleElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

      }
    }
  };


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
    </div>
  )
}