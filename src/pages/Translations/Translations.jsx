import React, { useState, useEffect } from "react"
import { deleteTranslation, getTranslations } from "../../components/ModalWord/utils/crud-firefox"
import { Link } from "react-router";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const Translations = () => {
  const [translations, setTranslations] = useState(null)

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

      const translationsFromDB = await getTranslations()
      const translationOrdenado = await sortByMostRecent(translationsFromDB)

      console.dir(translationsFromDB, { depth: null, colors: true });

      setTranslations(translationOrdenado)
    }
    getList()

  }, [])




  const handleDelete = async (idDocument) => {
    try {
      // Eliminar del backend
      await deleteTranslation(idDocument);

      // Actualizar el estado local
      setTranslations((prevTranslations) =>
        prevTranslations.filter((item) => item.idDocument !== idDocument)
      );
    } catch (error) {
      console.error("Error deleting translation:", error);
    }
  };

  return (
    <div className="page-wrapper-translations ">
      <div className="w-full h-full flex flex-row items-center">
        <Link
          to="/"
          className='link-back-to-home w-24'
        >
          <FontAwesomeIcon icon={faChevronLeft} size="lg" />
        </Link>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight mt-4 mb-4">
          Translations
        </h2>

      </div>


      {translations &&
        translations.map((item) => (
          <AlertDialog key={item.idDocument} className="w-80">
            <Accordion type="single" collapsible className="w-full mb-4 bg-[#161616] rounded-md " >
              <AccordionItem value="item-1">
                <AccordionTrigger className="p-2 mb-4">
                  {item.original}
                </AccordionTrigger>

                <AccordionContent className="text-[#6B6B6B] flex items-center justify-between pl-[8px] pr-[8px] ">
                  {item.translated}
                  <AlertDialogTrigger asChild>
                    <FontAwesomeIcon size="xs" icon={faTrash} />
                  </AlertDialogTrigger>
                </AccordionContent>

              </AccordionItem>


            </Accordion>


            <AlertDialogContent >
              <AlertDialogHeader>
                <AlertDialogTitle>¿ Quieres borrar  la traducción?</AlertDialogTitle>
                <AlertDialogDescription>
                  Una vez borrado no se podrá recuperar
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(item.idDocument)}
                >
                  Si
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ))



      }
    </div>
  )
}