import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { openSideBar } from "@/stores/sidebarStore";

const ButtonOpenMenu = () => {

  const handleOpenMenu = () => {
    openSideBar()
  }

  return (
    <div className="button-close w-full flex justify-end items-center pr-[18px] pt-[18px]" onClick={handleOpenMenu}>
      <FontAwesomeIcon icon={faBars} size="xl" color="gray" />
    </div>
  )
}

export default ButtonOpenMenu