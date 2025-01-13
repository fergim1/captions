
import { GoogleTranslation } from "./components/GoogleTranslation";
import { OxfordDefinitions } from "./components/OxfordDefinitions";
// import data from "./../../fakeRespOxford.json"

export const ModalWord = ({ word, setModalVisible }) => {

  console.log(word)


  return (
    <div className="modal-word">
      <button className="modal-button-cerrar" onClick={() => setModalVisible(false)}>X</button>
      <GoogleTranslation word={word} />
      {/* <OxfordDefinitions word="ace"  /> */}



    </div>
  );
};