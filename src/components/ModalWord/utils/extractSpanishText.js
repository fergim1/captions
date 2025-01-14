export const extractSpanishText = (data) => {
  return data
    .map(item => item[0]) // Extraer el texto en español (primer elemento)
    .filter(text => text) // Filtrar valores nulos o indefinidos
    .map(text => text.trim()) // Eliminar espacios y saltos de línea
    .join(' ') // Unir todos los textos con un espacio
    .replace(/\s,/, ','); // Arreglar espacios antes de comas
}
