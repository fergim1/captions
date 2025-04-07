import { deleteWord } from "@/components/TextSelectionHandler/components/utils/word-crud-firefox"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCallback } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ScrollArea } from "@/components/ui/scroll-area";


const ModalDetailsDefinition = ({ modalVisible, setModalVisible, wordDetails, definitions, setDefinitions }) => {

  const { word, translated, idDocument, dataDictionaryApi } = wordDetails
  console.log(wordDetails)

  const handleDelete = () => {
    deleteWord(idDocument)
    const definitionsFiltered = definitions.filter((def) => def.idDocument !== idDocument)
    setDefinitions(definitionsFiltered)
    setModalVisible(false)
  }

  const playAudio = useCallback((url) => {
    console.log(url)
    new Audio(url).play();
  }, []);



  const Section = ({ title, items }) => (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h2>
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 shadow-sm rounded-xl p-4 mb-3 border border-gray-100 dark:border-gray-700"
        >
          <p className="text-gray-800 dark:text-gray-100 font-medium">• {item.definition}</p>
          {item.example && (
            <p className="text-gray-500 dark:text-gray-400 italic mt-1">"{item.example}"</p>
          )}
        </div>
      ))}
    </div>
  );

  const ListSection = ({ title, items }) => (
    items.length > 0 && (
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h2>
        <div className="flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={index}
              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm font-medium px-3 py-1 rounded-full"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    )
  );

  if (!dataDictionaryApi) return null;

  return (
    <Card
      className="flex flex-col w-full h-[100vh] absolute right-0 bottom-0 top-0 left-0"
    >
      <div
        className="button-close w-full flex justify-end items-center pr-[18px] pt-[18px]"
        onClick={() => setModalVisible(false)}
      >
        <FontAwesomeIcon icon={faXmark} size="xl" color="gray" />
      </div>
      <CardContent>
        <div className="mx-auto w-full max-w-sm">
          <CardHeader>
            <CardTitle>
              <p className="uppercase pb-4 text-center text-2xl">{word}</p>
              <div className='flex flex-row w-full justify-center items-center gap-4 pb-4'>
                <button
                  onClick={() => playAudio(dataDictionaryApi?.audio)}
                  className="text-gray-600 text-lg"
                  title="Play pronunciation"
                >
                  <FontAwesomeIcon icon={faVolumeHigh} />
                </button>

                <p className="text-gray-600 text-base">
                  {dataDictionaryApi?.phonetic}
                </p>
              </div>

              {/* <p className='blur-none text-gray-300 text-lg px-2 pb-2 text-center'>{translated}</p> */}
            </CardTitle>
            <Separator />
            <CardDescription>
              <ScrollArea className="h-auto px-4 pt-6 pb-10 overflow-y-auto">

                {/* Definitions */}
                {dataDictionaryApi.nouns?.length > 0 && (
                  <Section title="Nouns" items={dataDictionaryApi.nouns} />
                )}
                {dataDictionaryApi.verbs?.length > 0 && (
                  <Section title="Verbs" items={dataDictionaryApi.verbs} />
                )}

                {dataDictionaryApi.adjectives?.length > 0 && (
                  <Section title="Adjectives" items={dataDictionaryApi.adjectives} />
                )}

                {/* Synonyms & Antonyms */}
                <ListSection title="Synonyms" items={dataDictionaryApi.synonyms || []} />
                <ListSection title="Antonyms" items={dataDictionaryApi.antonyms || []} />
              </ScrollArea>

            </CardDescription>
          </CardHeader>



          <CardFooter>
            <Button
              variant="outline"
              className="h-[40px]"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  )
}

export default ModalDetailsDefinition