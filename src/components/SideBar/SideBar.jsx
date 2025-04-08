import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faLanguage, faClipboardQuestion, faBookOpen, faSpellCheck, faStar, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";


const SideBar = ({ openSideBar, setOpenSideBar }) => {
  let navigate = useNavigate();

  const handleGoTo = (path) => {
    navigate(path)
    setOpenSideBar(false)
  }

  const menuValues = [
    {
      text: "Video",
      path: "/",
      icon: faYoutube
    },
    {
      text: "Summary",
      path: "/reading",
      icon: faBookOpen
    },
    {
      text: "Questions",
      path: "/questions",
      icon: faClipboardQuestion
    },
    {
      text: "Main Points",
      path: "/main-points",
      icon: faStar
    },
    {
      text: "True or False",
      path: "/true-or-false",
      icon: faSquareCheck
    },
    {
      text: "Translations",
      path: "/translations",
      icon: faLanguage
    },
    {
      text: "Definitions",
      path: "/definitions",
      icon: faSpellCheck
    }



  ]

  return (
    <Sheet open={openSideBar} onOpenChange={setOpenSideBar}>
      <SheetContent side="customSideBar">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>

            <div className="wrapper-icons text-white flex w-full h-auto flex-col justify-start items-center pl-2 mt-[60px] gap-8">
              {
                menuValues.map((value, index) => (
                  <div
                    key={index}
                    className="flex w-full h-auto flex-row justify-start items-center  border-b border-white pb-2 mb-1"
                    onClick={() => handleGoTo(value.path)}
                  >
                    <div className="w-[50px] flex justify-start">
                      <FontAwesomeIcon
                        icon={value.icon}

                        className={`mr-[18px] text-[20px]`}
                      />
                    </div>
                    <p className="text-base">{value.text}</p>
                  </div>
                ))
              }
            </div>

          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default SideBar