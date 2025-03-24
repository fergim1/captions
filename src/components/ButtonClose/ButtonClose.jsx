import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ButtonClose = () => {
  let navigate = useNavigate();

  const handleClose = () => {
    navigate("/")
  }

  return (
    <div className="button-close w-full flex justify-end items-center pr-[18px] pt-[18px]" onClick={handleClose}>
      <FontAwesomeIcon icon={faXmark} size="xl" color="gray" />
    </div>
  )
}

export default ButtonClose