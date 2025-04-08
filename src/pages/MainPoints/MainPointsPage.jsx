import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { deepseekResponse as deepseekResponseStore } from "../../stores/deepseekStore";


import ButtonClose from "@/components/ButtonClose/ButtonClose"
import { getDeepseekResponseFromFirestore } from "@/utils/utils";
import TextSelectionHandler from "@/components/TextSelectionHandler/TextSelectionHandler";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const MainPointsPage = () => {
  const storeValue = useStore(deepseekResponseStore);
  const [mainPoints, setMainPoints] = useState([]);
  const [actualIndex, setActualIndex] = useState(1)
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

  const prevIndex = () => {
    setActualIndex(prev => prev - 1)
  }

  const nextIndex = () => {
    setActualIndex(prev => prev + 1)
  }

  return (
    <div className="h-[90vh]">
      <TextSelectionHandler>
        <ButtonClose />
        <div className="wrapper-carousel h-[90vh] px-10 flex items-center">
          <Carousel className="w-full max-w-xs">
            <CarouselContent>
              {mainPoints.map((point, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-xl font-semibold">{point}</span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious prevIndex={prevIndex} />
            <CarouselNext nextIndex={nextIndex} />
            <div className="py-4 text-center text-sm text-muted-foreground">
              Point {actualIndex} of {mainPoints.length}
            </div>
          </Carousel>

          {/* {
          mainPoints.map((point, index) => (
            <div key={index} className="flex flex-col justify-start items-center pr-6 pl-6 pt-6">
              <p className="text-2xl font-bold">{index + 1}</p>
              <p className="text-base text-start border-t-2 border-white mt-4">{point}</p>
            </div>
          ))
        } */}
        </div>
      </TextSelectionHandler>
    </div>
  )
}

export default MainPointsPage