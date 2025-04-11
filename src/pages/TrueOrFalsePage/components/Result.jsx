import { HitRateChart } from "@/components/HitRateChart/HitRateChart"

const Result = ({
  totalQuestions,
  correctAnswers,
  setQuizCompleted,
  setCurrentQuestion,
  setOptionSelected
}) => {

  return (
    <HitRateChart
      correctAnswers={correctAnswers}
      totalQuestions={totalQuestions}
      setQuizCompleted={setQuizCompleted}
      setCurrentQuestion={setCurrentQuestion}
      setOptionSelected={setOptionSelected}
    />
  )
}

export default Result