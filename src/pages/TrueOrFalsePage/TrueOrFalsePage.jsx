import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { deepseekResponse as deepseekResponseStore } from "../../stores/deepseekStore";
import { getDeepseekResponseFromFirestore } from "@/utils/utils";
import ButtonClose from "@/components/ButtonClose/ButtonClose";
import Statements from "./components/Statements";
import Result from "./components/Result";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

const TrueOrFalsePage = () => {
  const storeValue = useStore(deepseekResponseStore);
  const [trueOrFalse, setTrueOrFalse] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showReference, setShowReference] = useState(false);
  const [optionSelected, setOptionSelected] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    const initialTrueOrFalse = async () => {
      // 1. Desde Nanostore
      const fromStore = storeValue?.exercises?.true_false;
      if (fromStore && fromStore.length > 0) {
        console.log("TrueOrFalsePage desde nanostore")
        setTrueOrFalse(fromStore);
        return;
      }

      // 2. Desde localStorage
      const cached = localStorage.getItem("deepseekResponse");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          const true_or_false = parsed?.exercises?.true_false;
          if (true_or_false && true_or_false.length > 0) {
            console.log("TrueOrFalsePage desde localstorage")
            deepseekResponseStore.set(parsed);
            setTrueOrFalse(true_or_false);
            return;
          }
        } catch (err) {
          console.warn("Error parseando localStorage:", err);
        }
      }

      // 3. Desde Firestore
      const videoId = localStorage.getItem("videoId");
      console.log(`TrueOrFalsePage: videoId obtenido desde localStorage : ${videoId}`)

      const deepseek = await getDeepseekResponseFromFirestore(videoId);
      const true_or_false = deepseek?.exercises?.true_false;
      if (true_or_false && true_or_false.length > 0) {
        console.log("questionPage desde firestore")
        deepseekResponseStore.set(deepseek);
        localStorage.setItem("deepseekResponse", JSON.stringify(deepseek));
        setTrueOrFalse(true_or_false);
      }
    };

    initialTrueOrFalse();
  }, []);

  const lastQuestion = trueOrFalse.length - 1;
  const totalQuestions = trueOrFalse.length;

  const handleNext = () => {
    if (currentQuestion === lastQuestion) {
      setQuizCompleted(true);
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
    setShowReference(false);
    setOptionSelected(null);
  };

  const handleSelectOption = (index) => {
    if (optionSelected !== null) return;
    if (index === trueOrFalse[currentQuestion].correct_answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
    setOptionSelected(index);
    setShowReference(true);
  };


  return (
    <div className="wrapper-content bg-black w-full h-screen flex flex-col justify-start items-center">
      <ButtonClose />
      {!quizCompleted && trueOrFalse.length > 0 ? (
        <Statements
          trueOrFalse={trueOrFalse}
          totalQuestions={totalQuestions}
          lastQuestion={lastQuestion}
          currentQuestion={currentQuestion}
          optionSelected={optionSelected}
          showReference={showReference}
          onNext={handleNext}
          onSelectOption={handleSelectOption}
        />
      ) : quizCompleted ? (
        <Result
          totalQuestions={totalQuestions}
          correctAnswers={correctAnswers}
          setQuizCompleted={setQuizCompleted}
          setCurrentQuestion={setCurrentQuestion}
          setOptionSelected={setOptionSelected}
        />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  )
}

export default TrueOrFalsePage