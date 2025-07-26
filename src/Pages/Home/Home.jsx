import './Home.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenue sur Mini Marketplace</h1>
      <p>Découvrez et vendez vos produits préférés</p>
      <p>
        <Link to="/signup">S’inscrire</Link>
        <Link to="/login">Se connecter</Link>
      </p>
    </div>
  );
}
