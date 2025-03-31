export const processOxfordData = (apiData) => {
  const result = {
    word: apiData.word,
    phonetic: null,
    audio: null,
    nouns: [],
    adjectives: [],
    verbs: []
  };

  // Función recursiva para extraer todos los sentidos y subsentidos
  const flattenSenses = (senses) => {
    return senses.reduce((acc, sense) => {
      if (sense.definitions) {
        sense.definitions.forEach(definition => {
          acc.push({
            definition,
            examples: sense.examples?.map(ex => ex.text) || [],
            subsenses: sense.subsenses ? flattenSenses(sense.subsenses) : []
          });
        });
      }
      return acc;
    }, []);
  };

  // Buscar en todos los resultados
  apiData.results.forEach(resultEntry => {
    resultEntry.lexicalEntries.forEach(lexEntry => {
      const category = lexEntry.lexicalCategory.text.toLowerCase();
      const targetKey = `${category}s`;

      if (!['nouns', 'adjectives', 'verbs'].includes(targetKey)) return;

      lexEntry.entries.forEach(entry => {
        // Obtener primera pronunciación disponible
        if (!result.phonetic && entry.pronunciations?.[0]) {
          result.phonetic = entry.pronunciations[0].phoneticSpelling;
          result.audio = entry.pronunciations[0].audioFile;
        }

        // Procesar sentidos
        if (entry.senses) {
          const processedSenses = flattenSenses(entry.senses);
          result[targetKey].push(...processedSenses);
        }
      });
    });
  });

  return result;
};

export const processDictionaryData = (apiResponse) => {
  const result = {
    word: apiResponse.word,
    phonetic: null,
    audio: null,
    nouns: [],
    adjectives: [],
    verbs: [],
    synonyms: [],
    antonyms: []
  };

  if (!apiResponse || !apiResponse.length) return result;

  const mainEntry = apiResponse[0];

  // Datos básicos
  result.word = mainEntry.word;
  result.phonetic = mainEntry.phonetic;

  // Obtener primer audio disponible
  const firstPhonetic = mainEntry.phonetics.find(p => p.audio);
  result.audio = firstPhonetic?.audio || '';

  // Procesar significados
  mainEntry.meanings.forEach(meaning => {
    const category = `${meaning.partOfSpeech.toLowerCase()}s`;

    // Agregar synonyms/antonyms globales
    result.synonyms.push(...(meaning.synonyms || []));
    result.antonyms.push(...(meaning.antonyms || []));

    if (!['nouns', 'adjectives', 'verbs'].includes(category)) return;

    // Procesar definiciones
    meaning.definitions.forEach(definition => {
      const entry = {
        definition: definition.definition,
        example: definition.example || null,
        synonyms: definition.synonyms || [],
        antonyms: definition.antonyms || []
      };

      result[category].push(entry);
    });
  });

  // Eliminar duplicados en synonyms/antonyms
  result.synonyms = [...new Set(result.synonyms)];
  result.antonyms = [...new Set(result.antonyms)];

  return result;
};