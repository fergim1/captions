import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faLanguage, faClipboardQuestion, faBookOpen, faSpellCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";


const SideBar = ({ openSideBar, setOpenSideBar }) => {
  let navigate = useNavigate();

  const handleGoTo = (path) => {
    navigate(path)
    setOpenSideBar(false)
  }
  return (
    <Sheet open={openSideBar} onOpenChange={setOpenSideBar}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>

            <div className="wrapper-icons text-white flex w-full h-auto flex-col justify-start items-center pl-2 mt-[60px] gap-8">

              <div
                className="flex w-full h-auto flex-row justify-start items-center"
                onClick={() => handleGoTo("/")}
              >
                <div className="w-[50px] flex justify-start">
                  <FontAwesomeIcon
                    icon={faYoutube}

                    className={`mr-[18px] text-[20px]`}
                  />
                </div>
                <p className="text-base">Video</p>
              </div>

              <div
                className="flex w-full h-auto flex-row justify-start items-center"
                onClick={() => handleGoTo("/reading")}
              >
                <div className="w-[50px] flex justify-start">
                  <FontAwesomeIcon
                    icon={faBookOpen}

                    className={`mr-[18px] text-[20px]`}
                  />
                </div>
                <p className="text-base">Summary</p>
              </div>

              <div
                className="flex w-full h-auto flex-row justify-start items-center"
                onClick={() => handleGoTo("/translations")}
              >
                <div className="w-[50px] flex justify-start">
                  <FontAwesomeIcon
                    icon={faLanguage}

                    className={`mr-[18px] text-[20px]`}
                  />
                </div>
                <p className="text-base">Translations</p>
              </div>

              <div
                className="flex w-full h-auto flex-row justify-start items-center"
                onClick={() => handleGoTo("/questions")}
              >
                <div className="w-[50px] flex justify-start">
                  <FontAwesomeIcon
                    icon={faClipboardQuestion}
                    className={`mr-[18px] text-[20px]`}
                  />
                </div>
                <p className="text-base">Questions</p>
              </div>

              <div
                className="flex w-full h-auto flex-row justify-start items-center"
                onClick={() => handleGoTo("/")}
              >
                <div className="w-[50px] flex justify-start">
                  <FontAwesomeIcon
                    icon={faSpellCheck}
                    className={`mr-[18px] text-[20px]`}
                  />
                </div>
                <p className="text-base">Words</p>
              </div>

            </div>

          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default SideBar