import { useState } from "react"
import Questions from "./components/Questions";
import Result from "./components/Result";
import ButtonClose from "@/components/ButtonClose/ButtonClose";
import { useStore } from '@nanostores/react';
import { deepseekResponse } from "../../stores/deepseekStore"

const QuestionsPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showReference, setShowReference] = useState(false)
  const [optionSelected, setOptionSelected] = useState(null)
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0)

  const { exercises } = useStore(deepseekResponse)
  const { multiple_choice } = exercises

  const lastQuestion = multiple_choice.length - 1
  const totalQuestions = multiple_choice.length

  const handleNext = () => {
    if (currentQuestion === lastQuestion) {
      setQuizCompleted(true);
      return
    }
    setCurrentQuestion(prev => prev + 1)
    setShowReference(false)
    setOptionSelected(null)
  }

  const handleSelectOption = (index) => {
    if (optionSelected !== null) return;
    if (index === multiple_choice[currentQuestion].correct_answer) {
      setCorrectAnswers(prev => prev + 1)
    }
    setOptionSelected(index)
    setShowReference(true)
  }


  return (
    <div className="wrapper-content bg-black  w-full h-screen flex flex-col justify-start items-center">
      <ButtonClose />
      {!quizCompleted
        ? <Questions
          multiple_choice={multiple_choice}
          totalQuestions={totalQuestions}
          lastQuestion={lastQuestion}
          currentQuestion={currentQuestion}
          optionSelected={optionSelected}
          showReference={showReference}
          onNext={handleNext}
          onSelectOption={handleSelectOption}
        />
        : <Result
          totalQuestions={totalQuestions}
          correctAnswers={correctAnswers}
        />
      }



    </div>
  )
}

export default QuestionsPage