import { useState, useEffect, useCallback } from "react"
import { getWords } from '../../components/TextSelectionHandler/components/utils/word-crud-firefox'
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faTrash, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import ButtonClose from "@/components/ButtonClose/ButtonClose";
import ModalDetailsDefinition from "./components/ModalDetailsDefinition";


const DefinitionsPage = () => {
  const [definitions, setDefinitions] = useState(null)
  const [showTranslation, setShowTranslation] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [wordDetails, setWordDetails] = useState({})

  function sortByMostRecent (data) {
    return data.sort((a, b) => {
      // Comparamos los segundos primero
      if (a.createdAt.seconds !== b.createdAt.seconds) {
        return b.createdAt.seconds - a.createdAt.seconds;
      }
      // Si los segundos son iguales, comparamos los nanosegundos
      return b.createdAt.nanoseconds - a.createdAt.nanoseconds;
    });
  }


  useEffect(() => {
    const getList = async () => {
      const definitionsFromDB = await getWords()
      const definitionsSorted = await sortByMostRecent(definitionsFromDB)
      setDefinitions(definitionsSorted)
    }
    getList()
  }, [])

  const playAudio = useCallback((url) => {
    console.log(url)
    new Audio(url).play();
  }, []);

  const handleShowMoreDetails = (definition) => {
    setWordDetails(definition)
    setModalVisible(true)
  }

  const handleShowTranslation = (id) => {
    setShowTranslation((prev) => {
      if (prev.includes(id)) {
        // Si ya está, lo quitamos
        return prev.filter((itemId) => itemId !== id);
      } else {
        // Si no está, lo agregamos
        return [...showTranslation, id];
      }
    });

  }


  console.log(definitions)
  return (
    <div className="definitions-page">
      <ButtonClose />
      {!definitions
        ? <p>There are no saved words</p>
        : <div className="wrapper-cards grid grid-cols-2 w-full flex flex-row gap-2 p-2">
          {definitions?.map((definition, index) => (
            <div
              key={index}
              className="card rounded-xl border bg-card text-card-foreground shadow pt-6 pb-6 pr-2 pl-2 w-full flex flex-col justify-center items-center gap-4"
            >
              <p className="word font-semibold leading-none tracking-tight text-lg uppercase">
                {definition.word}
              </p>

              <div className="flex flex-row justify-start items-center gap-4 w-full pl-[8%]">
                {definition.dataDictionaryApi.audio &&
                  <button
                    onClick={() => playAudio(definition.dataDictionaryApi?.audio)}
                    className="text-gray-500 hover:text-gray-400 text-lg"
                    title="Play pronunciation"
                  >
                    <FontAwesomeIcon icon={faVolumeHigh} />
                  </button>
                }
                {definition.dataDictionaryApi?.phonetic &&
                  <p className="text-gray-500 text-base">
                    {definition.dataDictionaryApi?.phonetic}
                  </p>
                }
              </div>

              <div className="flex flex-row justify-start items-center gap-4 w-full pl-[8%]">
                {definition.translated &&
                  <>
                    <button
                      onClick={() => handleShowTranslation(definition.idDocument)}
                    >
                      {showTranslation.includes(definition.idDocument)
                        ? <FontAwesomeIcon icon={faEye} className="text-white text-sm" />
                        : <FontAwesomeIcon icon={faEyeSlash} className="text-gray-500 text-sm" />
                      }

                    </button>
                    {
                      showTranslation.includes(definition.idDocument)
                        ? <p className='blur-none text-gray-300 text-lg px-2 '>{definition.translated}</p>
                        : <p className='blur-sm text-transparent text-lg bg-gray-600 rounded px-2 opacity-30'>{definition.translated}</p>
                    }
                  </>
                }
              </div>

              <div className="buttons-footer w-full flex flex-row justify-center">
                {/* <button > <FontAwesomeIcon className="text-gray-600 text-lg" icon={faTrash} /></button> */}
                {/* <Button > <FontAwesomeIcon icon={faCirclePlus} /></Button> */}
                <Button
                  variant="outline"
                  className="w-[85%]"
                  onClick={() => handleShowMoreDetails(definition)}
                >
                  Show More
                </Button>
              </div>

            </div>
          ))}
        </div>
      }
      {modalVisible &&
        <ModalDetailsDefinition
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          wordDetails={wordDetails}
          definitions={definitions}
          setDefinitions={setDefinitions}
        />}
    </div>
  )
}

export default DefinitionsPage