import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

const RedirectOnReload = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/"); // Solo redirige si NO estás en Home
    }
  }, []);

  return null;
};

export default RedirectOnReload;