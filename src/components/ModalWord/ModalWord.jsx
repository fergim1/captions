
// import GoogleTranslateLibrary from "./components/GoogleTranslateLibrary";
import { GoogleTranslation } from "./components/GoogleTranslation";
// import { OxfordDefinitions } from "./components/OxfordDefinitions";
// import data from "./../../fakeRespOxford.json"

export const ModalWord = ({ modalVisible, setModalVisible, word, videoId }) => {


  return (
    // <div onClick={() => setModalVisible(false)}  >


    <GoogleTranslation
      // <GoogleTranslateLibrary
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      word={word}
      videoId={videoId}

    />
    // {/* <OxfordDefinitions word="ace"  /> */}



    // </div>


  );
};