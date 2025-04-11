import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsDown, faThumbsUp, faArrowRight, faXmark, faCheck, faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { Button } from "@/components/ui/button";

const Statements = ({ totalQuestions, currentQuestion, trueOrFalse, onNext, showReference, optionSelected, onSelectOption, lastQuestion }) => {

  return (
    <>
      <div className="questions-and-answer w-full h-auto flex flex-col justify-center items-start gap-12 pr-6 pl-6 pt-12">
        <p className="number-question text-base text-gray-400">
          {`${currentQuestion + 1} of ${totalQuestions}`}
        </p>
        <p className="question text-2xl leading-[1.3] font-semibold">
          {trueOrFalse[currentQuestion]?.statement}
        </p>

        <div
          className="flex w-full h-auto flex-row justify-center items-center gap-12"

        >
          <FontAwesomeIcon
            icon={faThumbsUp}
            className={`mr-[18px] text-[32px] ${optionSelected === true ? "fa-beat" : ""
              } ${optionSelected === true
                ? trueOrFalse[currentQuestion]?.correct_answer === true
                  ? "text-green-600"
                  : "text-red-600"
                : ""
              }`}
            onClick={() => onSelectOption(true)}
          />

          <FontAwesomeIcon
            icon={faThumbsDown}
            className={`mr-[18px] text-[32px] ${optionSelected === false ? "fa-beat" : ""
              } ${optionSelected === false
                ? trueOrFalse[currentQuestion]?.correct_answer === false
                  ? "text-[#07a007]"
                  : "text-red-600"
                : ""
              }`}
            onClick={() => onSelectOption(false)}
          />
        </div>
        <div className="mt-[20px] flex flex-col justify-center">
          {optionSelected === trueOrFalse[currentQuestion]?.correct_answer
            ? <FontAwesomeIcon
              className="mr-[12px] text-[40px]"
              color="#07a007"
              icon={faCheck}
            />
            : (optionSelected !== null
              &&
              <FontAwesomeIcon
                color="red"
                className="mr-[12px] text-[40px]"
                icon={faXmark} />
            )
          }
          {optionSelected !== null && <p className="text-2xl text-center">
            {`The statement is
            ${trueOrFalse[currentQuestion]?.correct_answer
                ? "True"
                : "False"
              }`}
          </p>}


          {showReference &&
            <p className="reference text-base mt-[20px] text-gray-400">
              "{trueOrFalse[currentQuestion].text_reference}"
            </p>
          }
        </div>

        {
          optionSelected !== null
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



      </div>
    </>
  )
}

export default Statements