// src/components/ExerciseGenerator.jsx
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
const url_server = import.meta.env.VITE_URL_SERVER;

// Debes configurar Firebase en tu proyecto
const db = getFirestore();

function ExerciseGenerator() {
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const englishLevel = localStorage.getItem("englishLevel");
console.log({englishLevel})

  const fetchExercises = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Obtener datos de Firebase
      const definitionsSnapshot = await getDocs(collection(db, 'definitions'));
      const translationsSnapshot = await getDocs(collection(db, 'translations'));
      
      const definitions = definitionsSnapshot.docs.map(doc => doc.data());
      const translations = translationsSnapshot.docs.map(doc => doc.data());

      // 2. Llamar a la API de tu servidor Node.js

      const response = await fetch(`${url_server}/api/generate-exercises`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ definitions, translations, englishLevel }),
      });

      if (!response.ok) {
        throw new Error('No se pudieron generar los ejercicios');
      }

      const data = await response.json();
      setExercises(data.exercises);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Puedes llamar a la función aquí o con un botón
    fetchExercises();
  }, [englishLevel]);

  // 3. Renderizar los ejercicios
  if (isLoading) {
    return <div>Generando ejercicios... ¡Esto podría tardar unos segundos! 🤖</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (exercises.length === 0) {
    return <div>¡No hay ejercicios disponibles! Guarda más palabras y oraciones para comenzar.</div>;
  }

  return (
    <div>
      <h2>Tus Ejercicios Personalizados</h2>
      {exercises.map((exercise, index) => (
        <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
          {/* Aquí deberás crear un componente para cada tipo de ejercicio */}
          <p><strong>Tipo de ejercicio:</strong> {exercise.type.replace(/_/g, ' ')}</p>
          <p>{exercise.question}</p>
          {/* Lógica para mostrar las opciones o campos de respuesta */}
          {exercise.options && (
            <ul>
              {exercise.options.map((option, optIndex) => (
                <li key={optIndex}>{option}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default ExerciseGenerator;