import { db } from "../../../../../firebase";

import { collection, addDoc, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";

const saveWord = async (word, payload) => {
  console.log({ word })
  console.log({ payload })
  const wordfromFirestore = await getWordFromFirestore(word)
  const { data, found } = wordfromFirestore
  if (payload.saved && found) {
    // actualizar la word guardada con el campo de saved a true
  }
  if (found) {
    console.log("word ya estaba guardada")
    return data.id
  }

  try {
    const docRef = await addDoc(collection(db, "definitions"), payload);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Lista documentos de una colección específica
const getWords = async () => {
  try {
    let querySnapshot = await getDocs(collection(db, "definitions")); // Cambia "translations" por tu colección

    let queryArray = []
    querySnapshot.forEach((doc) => {
      let item = {
        idDocument: doc.id,
        createdAt: doc.data().createdAt,
        word: doc.data().word,
        translated: doc.data().translated,
        dataDictionaryApi: doc.data().dataDictionaryApi,
      }
      queryArray.push(item)
    });

    return queryArray
  } catch (error) {
    console.error("Error fetching documents: ", error);
  }
};

const deleteWord = async (itemId) => {

  try {
    // Referencia al documento que quieres eliminar
    const docRef = doc(db, "definitions", itemId);

    // Elimina el documento
    await deleteDoc(docRef);
    console.log(`Documento con ID ${itemId} eliminado correctamente`);
  } catch (error) {
    console.error("Error al eliminar el documento:", error);
  }
};

export const getWordFromFirestore = async (word) => {
  try {
    const videosRef = collection(db, "definitions");
    const q = query(videosRef, where("word", "==", word));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        found: false,
        message: `No se encontró ningún documento con word "${word}"`,
      };
    }

    const doc = querySnapshot.docs[0];
    console.log(doc.data())
    return {
      found: true,
      id: doc.id,
      data: doc.data(),
    };
  } catch (error) {
    console.error("Error al obtener el documento:", error);
    return {
      found: false,
      message: "Ocurrió un error al buscar el documento",
      error,
    };
  }
};



export {
  saveWord,
  getWords,
  deleteWord,
}