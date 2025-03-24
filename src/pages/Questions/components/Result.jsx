const Result = ({ totalQuestions, correctAnswers }) => {

  const hitRate = (correctAnswers / totalQuestions) * 100

  return (
    <div className="flex flex-col justify-center">
      <p className="text-4xl mb-[40px] text-center">Result</p>
      <p className="text-5xl mb-[10px] text-center">{Math.round(hitRate) + "%"}</p>
      <p className="text-3xl mb-[10px] text-center"> {correctAnswers} of {totalQuestions}</p>
      <p className="text-xl text-center">answered correctly</p>
    </div>
  )
}

export default Result