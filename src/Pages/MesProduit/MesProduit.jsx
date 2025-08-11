import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../Components/Nav_Bar/Navbar";
import "./MesProduit.css";

const MesProduit = () => {
  const [mesProduits, setMesProduits] = useState([]);

  useEffect(() => {
    const fetchMesProduit = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token non trouvé");
          return;
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
       
        const userId = decodedToken.user_id;

        const response = await axios.get(`http://localhost:5000/api/products/seller/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setMesProduits(response.data.data);
      } catch (error) {
        console.error("Erreur lors du chargement de vos produits :", error);
      }
    };

    fetchMesProduit();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="content">
        <h2>Mes Produits</h2>
        
        <div className="product-list">
          {mesProduits.map((produit) => (
            console.log(produit),
            <div key={produit.id} className="product-card">
              <h3>{produit.name}</h3>
              <p>{produit.description}</p>
              <p>{produit.price} DA</p>
              {produit.image_url && <img src={produit.image_url} alt={produit.name} />}
              <button>Modifier</button>
              <button>Supprimer</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MesProduit;
