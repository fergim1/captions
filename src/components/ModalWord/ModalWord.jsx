
import GoogleTranslateLibrary from "./components/GoogleTranslateLibrary";
// import { GoogleTranslation } from "./components/GoogleTranslation";
// import { OxfordDefinitions } from "./components/OxfordDefinitions";
// import data from "./../../fakeRespOxford.json"

export const ModalWord = ({ word, setModalVisible }) => {


  return (
    <div className="modal-word" onClick={() => setModalVisible(false)}  >


      {/* <GoogleTranslation word={word} /> */}
      <GoogleTranslateLibrary word={word} setModalVisible={setModalVisible} />
      {/* <OxfordDefinitions word="ace"  /> */}



    </div>


  );
};