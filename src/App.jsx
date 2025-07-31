import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import LoginForm from './Components/LoginForm/LoginForm'
import SignupForm from './Components/SignupForm/SignupForm'
import Acceuil from './Pages/PageAccueil/Acceuil'
import AjoutProduit from './Pages/AjoutProduit/AjoutProduit'

import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/Acceuil" element={<Acceuil />} /> 
          <Route path="/ajouter-produit" element={<AjoutProduit />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App
