import React, { useState } from 'react';
import Input from '../Input/Input';
import './SignupForm.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState(false); 
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        email: formData.email,
        password: formData.password,
      });

      setMessage("Inscription réussie ");
      console.log("Uitilisateur inscrit :", response.data);

      localStorage.setItem("token", response.data.data.token);

      setRedirect(true); 

    } catch (error) {
      setMessage("Erreur lors de l'inscription");
      console.error(error);
    }
  };

  
  if (redirect) {
    return <Navigate to="/Acceuil" />;
  }

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <h2>Inscription</h2>

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Entrez votre email"
        />

        <Input
          label="Mot de passe"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Entrez votre mot de passe"
        />

        <button type="submit">S'inscrire</button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default SignupForm;
