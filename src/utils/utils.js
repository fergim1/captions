const url_server = import.meta.env.VITE_URL_SERVER;
import { db } from "../../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";


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

const fetchSubtitles = async (videoId, language = "en") => {
  if (!videoId) return null;

  try {
    const response = await fetch(`${url_server}/api/transcript?videoId=${videoId}`);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data = await response.json();
    const { subtitles, totalText, textTranslated, deepseekResponse } = data;

    // Normaliza los valores de start y dur en el transcript
    const normalizedSubtitles = subtitles.map((segment) => ({
      ...segment,
      start: parseFloat(segment.start),
      dur: parseFloat(segment.dur),
    }));

    // Guarda en localStorage
    localStorage.setItem("dataSubtitles", JSON.stringify(normalizedSubtitles));

    return { subtitles: normalizedSubtitles, totalText, deepseekResponse };


  } catch (error) {
    console.error("Error fetching transcript:", error);
    throw error; // Relanzamos el error para que `useEffect` pueda capturarlo en `catch`
  }
};

// Función para convertir segundos a formato mm:ss
const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" + secs : secs}`; // Asegurarse de tener dos dígitos para los segundos
};

const saveDataVideoToFirestore = async (payload) => {
  try {
    const docRef = await addDoc(collection(db, "videos"), payload);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getVideoByVideoIdFromFirestore = async (videoId) => {
  try {
    const videosRef = collection(db, "videos");
    const q = query(videosRef, where("videoId", "==", videoId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        found: false,
        message: `No se encontró ningún documento con videoId "${videoId}"`,
      };
    }

    const doc = querySnapshot.docs[0];
    return {
      found: true,
      id: doc.id,
      data: doc.data(),
    };
  } catch (error) {
    console.error("Error al obtener el documento:", error);
    return {
      found: false,
      message: "Ocurrió un error al buscar el documento",
      error,
    };
  }
};

const getDeepseekResponseFromFirestore = async (videoId) => {
  if (!videoId) return null;

  try {
    const q = query(collection(db, "videos"), where("videoId", "==", videoId));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    let documentos = await getDocs(collection(db, "videos"));

    console.log(documentos)

    if (!querySnapshot.empty) {
      const data = querySnapshot.docs[0].data();
      console.log("data del video cargado desde firestore")
      console.log(data)
      return data?.deepseekResponse || null;
    } else {
      console.warn(`No se encontró documento con videoId: ${videoId}`);
      return null;
    }
  } catch (err) {
    console.error("Error consultando Firestore:", err);
    return null;
  }
};


export {
  getYouTubeVideoId,
  fetchSubtitles,
  formatTime,
  saveDataVideoToFirestore,
  getVideoByVideoIdFromFirestore,
  getDeepseekResponseFromFirestore
}