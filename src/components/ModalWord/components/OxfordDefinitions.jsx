import { useFetch } from "../../../hooks/useFetch";


export const OxfordDefinitions = ({ word }) => {

  const url = `${import.meta.env.VITE_URL_SERVER}/api/oxford?word=${word}`;

  const { data, loading, error } = useFetch({ word, url });

  const playAudio = (audioUrl) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  return (

    <div className="word-section">
      <div className="modal-pronunciations">
        <h3 >{data?.word}</h3>
        <em>{`/ ${Adjective.pronunciations[0].phoneticSpelling} /`}</em>

        <button onClick={() => playAudio(Adjective.pronunciations[0].audioFile)}>
          Escuchar
        </button>
      </div>

      {/* <div className="definition">


      <p> Adjectives: {Adjective.definitions[0]} </p>
      <span> Example: {Adjective.examples[0]} </span>

      <p> Noun: {Noun.definitions[0]} </p>
      <span> Example: {Noun.examples[0]} </span>

      <p> Verb: {Noun.definitions[0]} </p>
      <span> Example: {Verb.examples[0]} </span>

    </div> */}

    </div>
  )

}

