import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Nav_Bar/Navbar";
import "./acceuil.css";

const Accueil = () => {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get("http://localhost:5000/api/products", {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        setProduits(response.data.data);
      } catch (error) {
        console.error("Erreur lors du chargement des produits : ", error);
      }
    };

    fetchProduits();
  }, []);

  return (
  <div>
    <Navbar />
    <div className="content">
      

      <h2 className="section-title">Produits en vente</h2>
      <div className="horizontal-scroll">
        {produits.map((produit) => (
          <div key={produit.id} className="horizontal-card">
            {produit.image_url && (
              <img src={produit.image_url} alt={produit.name} />
            )}
            <h3>{produit.name}</h3>
            <p className="prix">{produit.price} DA</p>
            <button>Acheter</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default Accueil;
