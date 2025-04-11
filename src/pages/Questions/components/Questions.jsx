import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronRight, faCircleCheck, faCircleXmark, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";


const Questions = ({ totalQuestions, currentQuestion, multiple_choice, onNext, showReference, optionSelected, onSelectOption, lastQuestion }) => {
  return (
    <>
      <div className="questions-and-answer w-full h-[35%] flex flex-col justify-center items-start gap-4 p-6">
        <p className="number-question text-base text-gray-400">
          {`${currentQuestion + 1} of ${totalQuestions}`}
        </p>
        <p className="question text-2xl leading-[1.3] font-semibold">
          {multiple_choice[currentQuestion].question}
        </p>
        {showReference &&
          <p
            className="reference text-base mt-[20px] text-gray-400"
          >
            "{multiple_choice[currentQuestion].text_reference}"
          </p>}

      </div>
      <Card className="multiple-choice bg-white w-[90%] h-auto mt-[10px]">
        <CardContent className="flex flex-col text-black mt-[34px]">
          {multiple_choice[currentQuestion].options.map((option, index) => (
            <div key={index} onClick={() => onSelectOption(index)}>
              <div className="option flex flex-row justify-between">
                <p className="text-sm mb-[10px]">{option}</p>

                {optionSelected === null ? (
                  <FontAwesomeIcon icon={faChevronRight} color="gray" />
                ) : (
                  <>
                    {index === multiple_choice[currentQuestion].correct_answer && (
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        color="#07a007"
                        size="xl"
                      />
                    )}
                    {index === optionSelected && index !== multiple_choice[currentQuestion].correct_answer && (
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        color="red"
                        size="xl"
                      />
                    )}
                  </>
                )}
              </div>
              <Separator className="mb-[14px] bg-gray-300" />
            </div>
          ))}
        </CardContent>
      </Card>
      {optionSelected !== null
        &&
        <div
          className="w-full flex justify-end items-center gap-2 pr-12 mt-6"
          onClick={onNext}
        >
          {currentQuestion !== lastQuestion
            ? <> <p>NEXT</p>
              <FontAwesomeIcon icon={faArrowRight} />
            </>
            : <Button variant="secondary">FINISH</Button>
          }
        </div>
      }
    </>
  )
}

export default Questions