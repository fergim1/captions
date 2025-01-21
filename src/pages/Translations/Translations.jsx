import React, { useState, useEffect } from "react"
import { deleteTranslation, getTranslations } from "../../components/ModalWord/utils/crud-firefox"
import { Link } from "react-router";

export const Translations = () => {
  const [translations, setTranslations] = useState(null)
  const [translationOpened, setTranslationOpened] = useState(null)

  useEffect(() => {

    const getList = async () => {

      const translationsFromDB = await getTranslations()
      console.dir(translationsFromDB, { depth: null, colors: true });

      setTranslations(translationsFromDB)
    }
    getList()

  }, [])

  const handleOpenTranslation = (idDocument) => {
    setTranslationOpened(idDocument)
  }

  const handleDelete = (idDocument) => {
    deleteTranslation(idDocument)
  }
  return (
    <div className="page-wrapper-translations">
      <h3>TRANSLATIONS</h3>
      <Link
        to="/"
        className='link-back-to-home'
      >
        volver
      </Link>
      {translations &&
        translations.map((item) => (
          <div className="wrapper-accordion" key={item.idDocument}>
            <div className="wrapper-text-original">
              <p
                onClick={() => handleOpenTranslation(item.idDocument)}
                className="accordion-text-original"
              >
                {item.original}
              </p>
              <button
                className="button-delete-item"
                onClick={() => handleDelete(item.idDocument)}
              >
                -
              </button>
            </div>
            <p
              style={{ display: item.idDocument === translationOpened ? "block" : "none" }}
              className="accordion-text-translated"
            >
              {item.translated}
            </p>
          </div>
        ))



      }
    </div>
  )
}