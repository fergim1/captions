import { useState, useEffect } from "react";

export const useFetch = (selectedText, url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedText) return console.log(`En useFetch no llega parametro "word"`);
    if (!url) return console.log(`En useFetch no llega parametro "url"`);

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`No se pudo obtener la traducción.`);
        }
        const result = await response.json();
        setData(result);
      }
      catch (err) {
        setError(`❌ ${err.message}`);
      }
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedText]);

  return { data, loading, error };
};