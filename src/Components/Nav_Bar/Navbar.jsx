import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><Link to="/acceuil">Accueil</Link></li>

        <li><Link to="/ajouter-produit">Ajouter un produit</Link></li>
        <li><Link to="/mes-produits">Mes Produits</Link></li>
      </ul>
      <button onClick={handleLogout}>Déconnexion</button>
    </nav>
  );
};

export default Navbar;
