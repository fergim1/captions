import { db } from "../../../../../firebase";

import { collection, addDoc, getDocs, doc, deleteDoc, query, where, updateDoc } from "firebase/firestore";

const saveWord = async (word, payload) => {
  console.log({ word })
  console.log({ payload })
  const wordFromFirestoreInDefinitions = await getWordFromFirestore(word)
  const { data, found, id } = wordFromFirestoreInDefinitions
  console.log({ wordFromFirestoreInDefinitions })
  const wantToSave = payload.saved
  const wordFromFirestoreInWordsSaved = await getWordFromFirestoreInWordsSaved(word)
  console.log({ wordFromFirestoreInWordsSaved })

  if (wantToSave && found) {
    console.log("Entra acaa")
    try {
      if (wordFromFirestoreInWordsSaved.found) {
        console.log(`${word} ya esta guardada en la lista wordsSaved`)
        return
      }
      const docRef = await addDoc(collection(db, "wordsSaved"), payload);
      console.log("Document saved in wordsSaved with ID: ", docRef.id);
      return docRef.id
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // try {
    //   const docRef = doc(db, "definitions", id);
    //   await updateDoc(docRef, { saved: true });
    //   return console.log(`Word actualizada: saved = true para "${word}"`);
    // } catch (error) {
    //   console.error("Error al actualizar el documento:", error);
    // }
  }
  if (found) {
    console.log(`${word} con ${id} ya estaba guardada en lista definitions: ${found} y en wordsSaved: ${wordFromFirestoreInWordsSaved.found}`)
    return data.id
  }

  try {
    const docRef = await addDoc(collection(db, "definitions"), payload);
    console.log(`${word}. Documento guardado en definitions  with ID: ", ${docRef.id}`);
    return docRef.id
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Lista documentos de una colección específica
const getWords = async () => {
  try {
    let querySnapshot = await getDocs(collection(db, "wordsSaved")); // Cambia "translations" por tu colección

    let queryArray = []
    querySnapshot.forEach((doc) => {
      let item = {
        idDocument: doc.id,
        createdAt: doc.data().createdAt,
        word: doc.data().word,
        translated: doc.data().translated,
        dataDictionaryApi: doc.data().definitions,
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
    const docRef = doc(db, "wordsSaved", itemId);

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

export const getWordFromFirestoreInWordsSaved = async (word) => {
  try {
    const videosRef = collection(db, "wordsSaved");
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

// export const getWordByIdFromFirestore = async (id) => {
//   try {
//     const docRef = doc(db, "wordsSaved", id);
//     const docSnap = await getDoc(docRef);

//     if (docSnap.exists()) {
//       return {
//         found: true,
//         id: docSnap.id,
//         data: docSnap.data(),
//       };
//     } else {
//       return {
//         found: false,
//         message: `No se encontró ningún documento con id "${id}"`,
//       };
//     }
//   } catch (error) {
//     console.error("Error al obtener la palabra:", error);
//     return {
//       found: false,
//       message: "Ocurrió un error al buscar el documento",
//       error,
//     };
//   }
// };

export {
  saveWord,
  getWords,
  deleteWord,
}