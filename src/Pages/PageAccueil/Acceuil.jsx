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

  const handleAcheter = async (produitId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          product_id: produitId,
          number: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Achat réussi !");
      setProduits((prev) =>
        prev.map((p) =>
          p.id === produitId ? { ...p, status: "sold" } : p
        )
      );
    } catch (error) {
      console.error("Erreur lors de l'achat : ", error);
      alert(error.response?.data?.message || "Erreur lors de l'achat");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="content">
       
        <div className="hero-banner">
          <div className="banner-content">
            <h1>Bienvenue sur notre plateforme</h1>
            <p>Découvrez nos produits et achetez en toute sécurité</p>
          </div>
        </div>

        <h2 className="section-title">Produits en vente</h2>
        <div className="product-grid">
          {produits.map((produit) => (
            <div key={produit.id} className="product-card">
              <div className="image-container">
                {produit.image_url && (
                  <img src={produit.image_url} alt={produit.name} />
                )}
                {produit.status === "sold" && (
                  <div className="sold-ribbon">Vendu</div>
                )}
              </div>

              <h3>{produit.name}</h3>
              <p className="prix">{produit.price} DA</p>

              {produit.status !== "sold" && (
                <div className="card-buttons">
                  <button className="btn-buy" onClick={() => handleAcheter(produit.id)}>
                    Acheter
                  </button>
                  <button className="btn-details">Voir Détails</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accueil;
