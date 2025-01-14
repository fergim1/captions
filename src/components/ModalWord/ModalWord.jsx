
import GoogleTranslateLibrary from "./components/GoogleTranslateLibrary";
import { GoogleTranslation } from "./components/GoogleTranslation";
import { OxfordDefinitions } from "./components/OxfordDefinitions";
// import data from "./../../fakeRespOxford.json"

export const ModalWord = ({ word, setModalVisible }) => {


  return (
    <div className="modal-word animate__animated animate__slideInUp">
      <div className="modal-button-close-wrapper">
        <button className="modal-button-close" onClick={() => setModalVisible(false)}>X</button>
      </div>
      {/* <GoogleTranslation word={word} /> */}
      <GoogleTranslateLibrary word={word} />
      {/* <OxfordDefinitions word="ace"  /> */}



    </div>
  );
};