import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { deepseekResponse as deepseekResponseStore } from "../../stores/deepseekStore";

import Questions from "./components/Questions";
import Result from "./components/Result";
import ButtonClose from "@/components/ButtonClose/ButtonClose";
import { getDeepseekResponseFromFirestore } from "@/utils/utils";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";

const QuestionsPage = () => {
  const storeValue = useStore(deepseekResponseStore);
  const [multipleChoice, setMultipleChoice] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showReference, setShowReference] = useState(false);
  const [optionSelected, setOptionSelected] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  useEffect(() => {
    const initMultipleChoice = async () => {
      // 1. Desde Nanostore
      const fromStore = storeValue?.exercises?.multiple_choice;
      if (fromStore && fromStore.length > 0) {
        console.log("questionPage desde nanostore")
        setMultipleChoice(fromStore);
        return;
      }

      // 2. Desde localStorage
      const cached = localStorage.getItem("deepseekResponse");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          const mc = parsed?.exercises?.multiple_choice;
          if (mc && mc.length > 0) {
            console.log("questionPage desde localstorage")

            deepseekResponseStore.set(parsed);
            setMultipleChoice(mc);
            return;
          }
        } catch (err) {
          console.warn("Error parseando localStorage:", err);
        }
      }

      // 3. Desde Firestore
      const videoId = localStorage.getItem("videoId");
      console.log(`QuestionPage: videoId obtenido desde localStorage : ${videoId}`)

      const deepseek = await getDeepseekResponseFromFirestore(videoId);
      const mc = deepseek?.exercises?.multiple_choice;
      if (mc && mc.length > 0) {
        console.log("questionPage desde firestore")
        deepseekResponseStore.set(deepseek);
        localStorage.setItem("deepseekResponse", JSON.stringify(deepseek));
        setMultipleChoice(mc);
      }
    };

    initMultipleChoice();
  }, []);

  const lastQuestion = multipleChoice.length - 1;
  const totalQuestions = multipleChoice.length;

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
    if (index === multipleChoice[currentQuestion].correct_answer) {
      setCorrectAnswers((prev) => prev + 1);
    }
    setOptionSelected(index);
    setShowReference(true);
  };

  return (
    <div className="wrapper-content bg-black w-full h-screen flex flex-col justify-start items-center">
      <ButtonClose />
      {!quizCompleted && multipleChoice.length > 0 ? (
        <Questions
          multiple_choice={multipleChoice}
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
        />
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default QuestionsPage;