import { Link, useNavigate } from "react-router-dom";
import "./acceuil.css";
import Navbar from "../../Components/Nav_Bar/Navbar";

const Accueil = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <Navbar />

      <div className="content">
        <h1>Bienvenue sur la page d’accueil</h1>
      </div>
    </div>
  );
};

export default Accueil;
