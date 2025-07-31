

import { useState } from "react";
import axios from "axios";
import './AjoutProduit.css';
import Navbar from "../../Components/Nav_Bar/Navbar";





const AjoutProduit = () => {
    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const [prix, setPrix] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const nouveauProduit = {
            name: nom,
            description,
            price: parseFloat(prix),
            category,
            stock: 1,
            image_url: imageUrl,

        };

        try {
            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:5000/api/products",
                nouveauProduit,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Produit ajouté avec succès !");
            setNom("");
            setDescription("");
            setPrix("");
            setImageUrl("");

        } catch (error) {
            if (error.response) {
                console.error("Erreur serveur :", error.response.data);
                alert(`Erreur : ${error.response.data.message || "Impossible d'ajouter"}`);
            } else {
                console.error("Erreur réseau :", error.message);
                alert("Erreur réseau. Veuillez réessayer.");
            }
        }
    };

    return (
       <div>
         <Navbar />
        <div className="form-container">
            <h2>Ajouter un produit</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nom du produit"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required
                />
                <textarea
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Prix"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="URL de l'image (facultatif)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />

                {imageUrl && (
                    <div className="image-preview">
                        <img src={imageUrl} alt="Aperçu du produit" />
                    </div>
                )}


                <input
                    type="text"
                    placeholder="Catégorie"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <button type="submit">Ajouter</button>
            </form>
        </div>
        </div>
    );
};

export default AjoutProduit;
