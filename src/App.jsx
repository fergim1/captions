import React, { useState, useEffect, useRef } from 'react';
import YoutubePlayer from 'react-player/youtube';


function App () {
  const [videoId, setVideoId] = useState('');
  const [transcript, setTranscript] = useState(null);
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(null);



  const fetchSubtitles = async (videoId, language = "en") => {
    if (!videoId) return;

    try {
      const response = await fetch(`http://localhost:3000/api/transcript?videoId=${videoId}`);
      if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
      const data = await response.json();
      // Normaliza los valores de start y dur en el transcript
      const normalizedData = data.map(segment => ({
        ...segment,
        start: parseFloat(segment.start), // Convertir a número
        dur: parseFloat(segment.dur) // Convertir a número
      }));

      setTranscript(normalizedData);
      console.log(normalizedData)
    } catch (error) {
      console.error("Error fetching transcript:", error);
    }
  };

  const handleInputChange = (event) => {
    const idVideo = event.target.value
    console.log(idVideo)
    setVideoId(idVideo);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSubtitles(videoId, "en");
  };


  const handleSeek = (timestamp) => {
    console.log(timestamp)
    if (playerRef.current) {
      playerRef.current.seekTo(timestamp, "seconds");
      setPlaying(true);
    }
  };
  const handleProgress = (state) => {
    if (transcript && playing) {
      // Usa playedSeconds sin redondear para mayor precisión
      const playedSeconds = state.playedSeconds;

      /*       // Normaliza los valores de start y dur en el transcript
            const normalizedTranscript = transcript.map(segment => ({
              ...segment,
              start: parseFloat(segment.start), // Convertir a número
              dur: parseFloat(segment.dur) // Convertir a número
            })); */

      // Busca el índice del segmento actual
      let currentSegment = normalizedTranscript.findIndex(segment =>
        playedSeconds >= segment.start &&
        playedSeconds < segment.start + segment.dur // Usar "<" en lugar de "<="
      );

      console.log("Played Seconds:", playedSeconds); // Depuración
      console.log("Current Segment Index:", currentSegment); // Depuración


      // Actualiza solo si hay un cambio de segmento válido
      if (currentSegment !== currentSegmentIndex && currentSegment !== -1) {
        console.log("Current Segment:", currentSegment); // Depuración

        setCurrentSegmentIndex(currentSegment);
      }
    }
  };

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Reproductor de YouTube con Transcripción</h3>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Introduce el ID del video de YouTube (ej: dQw4w9WgXcQ)"
          value={videoId}
          onChange={handleInputChange}
          style={{ padding: '8px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Cargar Video</button>
      </form>

      {/*  {transcriptError && <p style={{ color: 'red' }}>{transcriptError}</p>} */}

      {transcript && (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', maxWidth: '1200px' }}>
          <div style={{ flex: 1, marginRight: '20px' }}>
            <YoutubePlayer
              ref={playerRef}
              url={`https://www.youtube.com/watch?v=${videoId}`}
              playing={playing}
              controls
              onProgress={handleProgress}
              width="500px"
              height="400px"
            />
          </div>
          <div style={{ flex: 1, overflowY: 'auto', maxHeight: 'auto', border: '1px solid #ccc', padding: '10px' }}>
            {transcript.map((item, index) => (
              <span
                key={index}
                onClick={() => handleSeek(item.start)}
                style={{
                  cursor: 'pointer',
                  display: 'block',
                  padding: '5px',
                  backgroundColor: index === currentSegmentIndex ? 'yellow' : 'transparent',
                }}
              >
                {item.text}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;