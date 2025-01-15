const url_server = import.meta.env.VITE_URL_SERVER;


function getYouTubeVideoId (url) {
  if (url.length === 0) return
  try {
    // Verifica si es un enlace completo (www.youtube.com)
    const fullUrlMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    // Verifica si es un enlace corto (youtu.be)
    const shortUrlMatch = url.match(/(?:https?:\/\/)?(?:youtu\.be\/)([^?&]+)/);
    if (shortUrlMatch && shortUrlMatch[1]) {
      return shortUrlMatch[1];
    }

    // Si no coincide con ninguno, lanza un error
    throw new Error('URL no válida o no es un enlace de YouTube.');
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

const fetchSubtitles = async (videoId, language = "en", setTranscript) => {
  if (!videoId) return;


  try {
    const response = await fetch(`${url_server}/api/transcript?videoId=${videoId}`);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    const { subtitles, totalText, textTranslated } = data

    // Normaliza los valores de start y dur en el transcript
    const normalizedSubtitles = subtitles.map((segment) => ({
      ...segment,
      start: parseFloat(segment.start),
      dur: parseFloat(segment.dur),
    }));
    // Subtitulos normalizados
    setTranscript(normalizedSubtitles);


    // Texto original
    // console.log(totalTex)

  } catch (error) {
    console.error('Error fetching transcript:', error);
  }
};




export {
  getYouTubeVideoId,
  fetchSubtitles,
}