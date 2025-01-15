import { useState, useEffect } from "react";

const url_server = import.meta.env.VITE_URL_SERVER;

export const useFetchSubtitles = (videoId, language = "en",) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchDataSubtitles = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${url_server}/api/transcript?videoId=${videoId}`);
        const data = await response.json();
        const { subtitles, totalText, textTranslated } = data

        // Normaliza los valores de start y dur en el transcript
        const normalizedSubtitles = subtitles.map((segment) => ({
          ...segment,
          start: parseFloat(segment.start),
          dur: parseFloat(segment.dur),
        }));
        // Subtitulos normalizados
        setData(normalizedSubtitles);

      }
      catch (err) {
        console.log(error)
        setError(true);
      }
      finally {
        setLoading(false);
      }
    };

    fetchDataSubtitles();
  }, [videoId]);

  return { data, loading, error };
};