import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

export default function Logout() {
  const navigate = useNavigate();
  const { clearUser } = useContext(UserContext);
  useEffect(() => {
    clearUser();
    return navigate("/");
  }, []);
  return null;
}
