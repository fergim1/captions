
import { GoogleTranslation } from "./components/GoogleTranslation";
import { OxfordDefinitions } from "./components/OxfordDefinitions";
// import data from "./../../fakeRespOxford.json"

export const ModalWord = ({ word, setModalVisible }) => {

  console.log(word)


  return (
    <div className="modal-word">
      <div className="modal-button-close-wrapper">
        <button className="modal-button-close" onClick={() => setModalVisible(false)}>X</button>
      </div>
      <GoogleTranslation word={word} />
      {/* <OxfordDefinitions word="ace"  /> */}



    </div>
  );
};