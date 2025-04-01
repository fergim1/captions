import React, { useCallback, useEffect, useState } from 'react';
import { useTextSelection } from '@/hooks/use-text-selecion';
// import { OxfordDefinitions } from './components/OxfordDefinitions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faFloppyDisk, faMagnifyingGlassPlus, faSquareCaretUp, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/hooks/use-toast"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useFetch } from '@/hooks/useFetch';
import { Skeleton } from '../ui/skeleton';
import { Separator } from '@radix-ui/react-separator';
import { Button } from '../ui/button';
import {
  // processOxfordData,
  processDictionaryData, hasMoreSixWords
} from './components/utils/utils';
import { getWordFromFirestore, saveWord } from './components/utils/word-crud-firefox';


const TextSelectionHandler = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [dictionaryApiData, setDictionaryApiData] = useState(null)
  const { selectedText, selectionType, setSelectedText, setSelectionType } = useTextSelection();
  const [selectedTextTranslated, setSelectedTextTranslated] = useState(null)
  // Descomentar linea de abajo cuanod termine la prueba, ya que envie siempre la palabra "ace" a la API de oxford
  // const url = `${import.meta.env.VITE_URL_SERVER}/api/oxford?word=${selectedText}`;
  // const url = `${import.meta.env.VITE_URL_SERVER}/api/oxford?word=ace`;

  // API dictionaryapi FREE
  const URL_DICTIONARY_API = `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedText}`
  const URL_GOOGLE_TRANSLATE = `${import.meta.env.VITE_URL_SERVER}/api/google?word=${selectedText}&language=es`;

  const { toast } = useToast()

  const { data: dataDictionaryApi, loading: loadingDictionaryApi, error: errorDictionaryApi } = useFetch(selectedText, URL_DICTIONARY_API);
  const { data: dataTranslate, loading: loadingTranslate, error: errorTranslate } = useFetch(selectedText, URL_GOOGLE_TRANSLATE);

  useEffect(() => {
    if (dataDictionaryApi === null || dataTranslate === null) return
    if (hasMoreSixWords(selectedText)) return
    setOpen(true)
    // const dictionaryApiDataProcessed = processOxfordData(dataDictionaryApi)
    const dictionaryDataProcessed = processDictionaryData(dataDictionaryApi)
    setDictionaryApiData(dictionaryDataProcessed)
    setSelectedTextTranslated(dataTranslate)
    const payloadWord = {
      word: selectedText,
      translated: dataTranslate,
      definitions: dictionaryDataProcessed,
      saved: false,
      createdAt: new Date()
    }
    saveWord(selectedText, payloadWord)
  }, [dataDictionaryApi, dataTranslate])


  useEffect(() => {
    if (!selectedText || !selectionType) return;
    const fetchData = async () => {
      const wordfromFirestore = await getWordFromFirestore(selectedText)
      const { data, found } = wordfromFirestore
      if (found && selectionType === 'word') {
        setSelectedTextTranslated(data.translated)
        setDictionaryApiData(data.definitions)
        setOpen(true);
        console.log("word obtenida de FireStore")
        return
      }
      try {
        if (selectionType === 'word') {
          if (open) return
        } else if (selectionType === 'phrase') {
          return
        }
        setOpen(true);
      } catch (error) {
        console.error('API error:', error);
        setOpen(true);
      }
    };

    fetchData();
  }, [selectedText, selectionType]);

  const playAudio = useCallback((url) => {
    new Audio(url).play();
  }, []);

  const CATEGORY = {
    Noun: "nouns",
    Adjective: "adjectives",
    Verb: "verbs",
    Synonyms: "synonyms",
    Antonyms: "antonyms"
  }


  const [categorySelected, setCategorySelected] = useState(null)

  // Efecto para establecer la primera categoría con datos
  useEffect(() => {
    if (!dictionaryApiData) return;

    // Buscar la primera categoría con datos
    const firstCategoryWithData = Object.values(CATEGORY).find(
      categoryKey => dictionaryApiData[categoryKey]?.length > 0
    );

    if (firstCategoryWithData) {
      setCategorySelected(firstCategoryWithData);
    }
  }, [dictionaryApiData]);

  // const handleMoreDetails = () => {
  //   console.log("handleMoreDetails")
  // }

  const handleSave = () => {
    const payloadWord = {
      word: selectedText,
      translated: dataTranslate,
      definitions: dictionaryApiData,
      saved: true,
      createdAt: new Date()
    }
    saveWord(selectedText, payloadWord)
    const toastContent = () => (
      < div id="toast-content" style={{ width: "100vw", display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
        <p> Word saved</p> <span>✔️ </span>
      </div>
    )
    toast({
      title: toastContent(),
    })
    setOpen(false)
    setSelectedText("")
    setSelectionType(null)
  }


  const renderCategoryButtons = (dictionaryApiData) => {
    return Object.values(CATEGORY).map((categoryKey, index) => {
      // Verificar si existe la categoría y tiene datos
      if (!dictionaryApiData?.[categoryKey]?.length) return null;

      // Obtener el nombre de la categoría para mostrar
      const categoryLabel = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);

      return (
        <Button
          key={index}
          variant={categorySelected === categoryKey ? "secondary" : "ghost"}
          className="h-[30px] w-auto"
          onClick={() => setCategorySelected(categoryKey)}
        >
          {categoryLabel.slice(0, 4)}
        </Button>
      );
    });
  };


  const renderSelectedCategoryContent = () => {
    if (!categorySelected || !dictionaryApiData[categorySelected]?.length) return null;

    // Para Synonyms y Antonyms
    if ([CATEGORY.Synonyms, CATEGORY.Antonyms].includes(categorySelected)) {
      return dictionaryApiData[categorySelected].join(' / ');
    }

    // Para Noun, Adjective y Verb
    const firstEntry = dictionaryApiData[categorySelected][0];
    return (
      <div className='w-full flex flex-col'>
        <p className='text-base text-white text-muted-foreground pb-4'>{firstEntry.definition}</p>
        {firstEntry.example && <p>{`Example: "${firstEntry.example}"`}</p>}
      </div>);
  };

  const handleCloseDrawer = () => {
    setOpen(false)
    setSelectedText("")
    setSelectionType(null)
  }

  return (
    <div style={{ userSelect: 'text', cursor: 'text' }}>
      {children}
      <Drawer open={open} onOpenChange={handleCloseDrawer}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className='drawer-title border-solid flex flex-col w-full justify-center items-center gap-4 text-lg leading-none'>
                {selectionType === "word" &&
                  <>
                    <div className='flex flex-row w-full justify-center items-center gap-4'>
                      {loadingDictionaryApi && <Skeleton className="h-3 w-[90%]" />}
                      <p className='uppercase text-lg'>{dictionaryApiData?.word}</p>
                      <button
                        onClick={() => playAudio(dictionaryApiData?.audio)}
                        className="text-gray-600 hover:text-gray-400 text-lg"
                        title="Play pronunciation"
                      >
                        <FontAwesomeIcon icon={faVolumeHigh} />
                      </button>
                      <p className="text-gray-600 text-lg">
                        {dictionaryApiData && dictionaryApiData?.phonetic}
                      </p>

                    </div>
                    <p className='mb-2'>{dataTranslate}</p>

                    <div className='flex flex-row w-auto justify-center items-center gap-2'>
                      {dictionaryApiData && renderCategoryButtons(dictionaryApiData)}
                    </div>
                  </>
                }
                {selectionType === "phrase" && selectedText}
              </DrawerTitle>
              <Separator />
              <DrawerDescription className="min-h-auto">
                {loadingDictionaryApi || loadingTranslate && <Skeleton className="h-3 w-[90%]" />}
                {selectionType === "word" && renderSelectedCategoryContent()}
                {selectionType === "word" && errorDictionaryApi && <p>{errorDictionaryApi}</p>}
                {selectionType === "phrase" && selectedTextTranslated}

              </DrawerDescription>
            </DrawerHeader>



            <DrawerFooter className="flex flex-row w-full justify-end items-center">
              {/* <Button
                variant="outline"
                className=""
                onClick={handleMoreDetails}
              >
                <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
              </Button> */}
              {selectionType === "word" && <Button
                variant="outline"
                className=""
                onClick={handleSave}
              >
                <FontAwesomeIcon icon={faFloppyDisk} />
              </Button>}
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

    </div >
  );
};

export default TextSelectionHandler;