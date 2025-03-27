import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { deepseekResponse as deepseekResponseStore } from "../../stores/deepseekStore";


import ButtonClose from "@/components/ButtonClose/ButtonClose"
import { getDeepseekResponseFromFirestore } from "@/utils/utils";

const MainPointsPage = () => {
  const storeValue = useStore(deepseekResponseStore);
  const [mainPoints, setMainPoints] = useState([]);

  useEffect(() => {
    const initMainPoints = async () => {
      // 1. Desde Nanostore
      const fromStore = storeValue?.main_points
      if (fromStore && fromStore.length > 0) {
        console.log("MainPointsPage desde nanostore")
        setMainPoints(fromStore);
        return;
      }

      // 2. Desde localStorage
      const cached = localStorage.getItem("deepseekResponse");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          const mp = parsed?.main_points
          if (mp && mp.length > 0) {
            console.log("MainPointsPage desde localstorage")
            deepseekResponseStore.set(parsed);
            setMainPoints(mp);
            return;
          }
        } catch (err) {
          console.warn("Error parseando localStorage:", err);
        }
      }

      // 3. Desde Firestore
      const videoId = localStorage.getItem("videoId");
      console.log(`MainPointsPage: videoId obtenido desde localStorage : ${videoId}`)

      const deepseek = await getDeepseekResponseFromFirestore(videoId);
      const mp = deepseek?.main_points;
      if (mp && mp.length > 0) {
        console.log("MainPointsPage desde firestore")
        deepseekResponseStore.set(deepseek);
        localStorage.setItem("deepseekResponse", JSON.stringify(deepseek));
        setMainPoints(mp);
      }
    };

    initMainPoints();
  }, []);

  return (
    <div className="wrapper-content bg-black w-full h-auto flex flex-col justify-start items-center">
      <ButtonClose />
      {
        mainPoints.map((point, index) => (
          <div key={index} className="flex flex-col justify-start items-center p-6">
            <p className="text-3xl font-bold">{index + 1}</p>
            <p className="text-xl text-start border-t-2 border-white mt-4">{point}</p>
          </div>
        ))
      }

    </div>
  )
}

export default MainPointsPage