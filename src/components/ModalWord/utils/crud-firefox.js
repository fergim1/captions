import { db } from "../../../../firebase";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";

const saveTranslation = async (payload) => {
  console.log(payload)
  try {
    const docRef = await addDoc(collection(db, "translations"), payload);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.log("entra acaaaaaaaa")
    console.error("Error adding document: ", e);
  }
};


// Lista documentos de una colección específica
const getTranslations = async () => {
  try {
    let querySnapshot = await getDocs(collection(db, "translations")); // Cambia "translations" por tu colección

    let queryArray = []
    querySnapshot.forEach((doc) => {
      let item = {
        idDocument: doc.id,
        createdAt: doc.data().createdAt,
        language: doc.data().language,
        original: doc.data().original,
        translated: doc.data().translated,
        dataComplete: doc.data()
      }
      queryArray.push(item)
    });

    return queryArray
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
};

const deleteTranslation = async (itemId) => {

  try {
    // Referencia al documento que quieres eliminar
    const docRef = doc(db, "translations", itemId);

    // Elimina el documento
    await deleteDoc(docRef);
    console.log(`Documento con ID ${itemId} eliminado correctamente`);
  } catch (error) {
    console.error("Error al eliminar el documento:", error);
  }
};

export {
  saveTranslation,
  getTranslations,
  deleteTranslation
}