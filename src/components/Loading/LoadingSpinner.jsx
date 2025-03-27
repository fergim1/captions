import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons"


const LoadingSpinner = () => {

  return (
    <div className="w-full h-full flex justify-center items-center">
      <FontAwesomeIcon icon={faSpinner} className="text-[50px] fa-spin-pulse" />
    </div>
  )
}

export default LoadingSpinner