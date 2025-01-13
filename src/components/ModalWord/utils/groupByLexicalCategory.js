// para la respuesta de Oxford al endpoint :
// `${process.env.API_OXFORD}/entries/${language}/${word}?fields=definitions%2Cexamples%2Cpronunciations`
// No es el de translation

export const groupByLexicalCategory = (data) => {
  const dataArray = data.result
  const groupedData = {};

  dataArray.forEach((entry) => {
    entry.lexicalEntries.forEach((lexicalEntry) => {
      const category = lexicalEntry.lexicalCategory?.text || "Unknown";

      if (!groupedData[category]) {
        groupedData[category] = {
          definitions: [],
          examples: [],
          pronunciations: []
        };
      }

      lexicalEntry.entries.forEach((entry) => {
        // Procesar pronunciaciones
        if (entry.pronunciations) {
          entry.pronunciations.forEach((pronunciation) => {
            groupedData[category].pronunciations.push({
              audioFile: pronunciation.audioFile,
              phoneticSpelling: pronunciation.phoneticSpelling
            });
          });
        }

        // Procesar sentidos y subsentidos
        entry.senses.forEach((sense) => {
          // Definiciones
          if (sense.definitions) {
            groupedData[category].definitions.push(...sense.definitions);
          }
          // Ejemplos
          if (sense.examples) {
            groupedData[category].examples.push(
              ...sense.examples.map((example) => example.text)
            );
          }

          // Subsenses
          if (sense.subsenses) {
            sense.subsenses.forEach((subsense) => {
              if (subsense.definitions) {
                groupedData[category].definitions.push(...subsense.definitions);
              }
              if (subsense.examples) {
                groupedData[category].examples.push(
                  ...subsense.examples.map((example) => example.text)
                );
              }
            });
          }
        });
      });
    });
  });
  console.log(groupedData)
  return groupedData;
};
