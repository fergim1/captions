import { useCallback } from 'react';

const WordCard = ({ apiData }) => {
  const playAudio = useCallback((url) => {
    new Audio(url).play();
  }, []);

  // Agrupar entradas léxicas por categoría
  const groupLexicalCategories = (results) => {
    return results.reduce((acc, result) => {
      result.lexicalEntries.forEach((entry) => {
        const category = entry.lexicalCategory.text;
        if (!acc[category]) acc[category] = [];
        acc[category].push(entry);
      });
      return acc;
    }, {});
  };

  // Obtener todas las pronunciaciones disponibles
  const getPhoneticData = (entries) => {
    return entries?.flatMap(entry =>
      entry.pronunciations?.map(p => ({
        phonetic: p.phoneticSpelling,
        audio: p.audioFile
      }))) || []
  };

  // Renderizar sentidos recursivamente
  const renderSenses = (senses, level = 0) => {
    return senses.map((sense, idx) => (
      <div key={sense.id} className={`ml-${level * 4} mt-2`}>
        {sense.definitions?.map((def, defIdx) => (
          <div key={defIdx} className="mb-2">
            <p className="font-medium text-gray-800">{def}</p>
            {sense.examples?.map((ex, exIdx) => (
              <p key={exIdx} className="text-gray-500 italic text-sm ml-2">
                ex: "{ex.text}"
              </p>
            ))}
          </div>
        ))}
        {sense.subsenses && renderSenses(sense.subsenses, level + 1)}
      </div>
    ));
  };

  const groupedCategories = groupLexicalCategories(apiData.results);

  const phoneticEntries = apiData.results.flatMap(result =>
    result.lexicalEntries.flatMap(entry => entry.entries)
  );
  const phoneticData = getPhoneticData(phoneticEntries);


  return (
    <div className="max-w-3xl mx-auto my-6 bg-white rounded-xl shadow-lg h-[80vh] flex flex-col">
      {/* Header fijo */}
      <div className="p-6 border-b border-gray-200 bg-white rounded-t-xl">
        <div className="flex items-center gap-6 flex-row justify-center items-center">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {apiData.word}
          </h1>
          <button
            onClick={() => playAudio(phoneticData[0].audio)}
            className="text-blue-500 hover:text-blue-600 text-xl"
            title="Play pronunciation"
          >
            🔊
          </button>
          {phoneticData[0]?.phonetic && (
            <div className="mt-2 text-gray-600 text-sm">
              /{phoneticData[0].phonetic}/
            </div>
          )}
        </div>
      </div>

      {/* Contenido con scroll */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {Object.entries(groupedCategories).map(([category, entries]) => (
          <section key={category} className="space-y-4">
            <h2 className="text-xl font-semibold text-blue-700 border-b pb-1">
              {category}
            </h2>

            {entries.map((entry, entryIdx) => (
              <div key={entryIdx} className="space-y-4">
                {entry.entries.map((e, eIdx) => (
                  <div key={eIdx} className="ml-2">
                    {e.senses?.length > 0 && renderSenses(e.senses)}
                  </div>
                ))}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};

export default WordCard;