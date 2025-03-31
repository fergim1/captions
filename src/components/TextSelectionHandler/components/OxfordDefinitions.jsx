import { useEffect } from "react";
import { useState } from "react";
import { useFetch } from "../../../hooks/useFetch";
import { processOxfordData } from "./utils/utils";
import WordCard from "./WordCard";

export const OxfordDefinitions = ({ word }) => {
  const [oxfordData, setOxfordData] = useState(null)

  const url = `${import.meta.env.VITE_URL_SERVER}/api/oxford?word=${word}`;

  const { data, loading, error } = useFetch({ word, url });

  useEffect(() => {
    if (data === null) return
    const oxfordDataProcessed = processOxfordData(data)
    setOxfordData(oxfordDataProcessed)
  }, [data])


  return (
    <>
      {loading ? <p>"Cargando..."</p> : <WordCard apiData={data} />}
    </>


    // <div className="word-section">
    //   <div className="modal-pronunciations">
    //     <h3 >{data?.word}</h3>
    //     {/* <em>{`/ ${Adjective.pronunciations[0].phoneticSpelling} /`}</em> */}

    //     <button
    //     // onClick={() => playAudio(Adjective.pronunciations[0].audioFile)}
    //     >
    //       Escuchar
    //     </button>
    //   </div>

    //   {/* <div className="definition">


    //   <p> Adjectives: {Adjective.definitions[0]} </p>
    //   <span> Example: {Adjective.examples[0]} </span>

    //   <p> Noun: {Noun.definitions[0]} </p>
    //   <span> Example: {Noun.examples[0]} </span>

    //   <p> Verb: {Noun.definitions[0]} </p>
    //   <span> Example: {Verb.examples[0]} </span>

    // </div> */}

    // </div>
  )

}

