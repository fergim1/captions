import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { deepseekResponse as deepseekResponseStore } from "../../stores/deepseekStore";
import ButtonClose from "@/components/ButtonClose/ButtonClose";
import { getDeepseekResponseFromFirestore } from "@/utils/utils";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import TextSelectionHandler from "@/components/TextSelectionHandler/TextSelectionHandler";
// import ButtonOpenMenu from "@/components/ButtonOpenMenu/ButtonOpenMenu";

const ReadingPage = () => {
  const storeValue = useStore(deepseekResponseStore);
  const [summary, setSummary] = useState("");
  console.log({summary})

  useEffect(() => {
    const initSummary = async () => {
      // 1. Desde nanostore
      const fromStore = storeValue?.summary;
      if (fromStore && fromStore.length > 0) {
        console.log("ReadingPage desde nanostore")
        setSummary(fromStore);
        return;
      }

      // 2. Desde localStorage
      const cached = localStorage.getItem("deepseekResponse");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          console.log({parsed}) 
          const localSummary = parsed?.summary;
          if (localSummary && localSummary.length > 0) {
            console.log("ReadingPage desde localstorage")

            deepseekResponseStore.set(parsed);
            setSummary(localSummary);
            console.log(localSummary)
            return;
          }
        } catch (err) {
          console.warn("Error parseando localStorage:", err);
        }
      }

      // 3. Desde Firestore
      const videoId = localStorage.getItem("videoId");
      console.log(`ReadingPage: videoId obtenido desde localStorage : ${videoId}`)

      const deepseek = await getDeepseekResponseFromFirestore(videoId);
      const firestoreSummary = deepseek?.summary;
      if (firestoreSummary && firestoreSummary.length > 0) {
        console.log("readingPage desde firestore")

        deepseekResponseStore.set(deepseek);
        localStorage.setItem("deepseekResponse", JSON.stringify(deepseek));
        setSummary(firestoreSummary);
      }
    };

    initSummary();
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-2">
      <ButtonClose />
      {/* <ButtonOpenMenu /> */}
      <p className="text-3xl text-center text-white mb-4">Summary</p>
      <div className="w-full max-w-2xl p-4">
        <TextSelectionHandler>
          <div className="space-y-6">
            {summary
              ? summary.trim().split(/\n\s*\n/).map((paragraph, index) => (
                <p
                  key={index}
                  className="font-inter text-base leading-relaxed text-gray-300 text-justify"
                  style={{ lineHeight: "1.8" }}
                >
                  {paragraph}
                </p>
              ))
              : <LoadingSpinner />}
          </div>
        </TextSelectionHandler>
      </div>
    </div>
  );
};

export default ReadingPage;