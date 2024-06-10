import React, { useState } from 'react';
import axios from 'axios';
import Formulario from './components/Formulário.js';
import './App.css';

function App() {
  const [melhorPetShop, setMelhorPetShop] = useState(null); // Estado para armazenar a resposta do servidor

  const handleSubmit = async (formData) => {
    try {
      setMelhorPetShop(null); // Limpa o estado antes de enviar uma nova requisição
      const response = await axios.post('http://localhost:8080/calculate', formData);
      console.log(response.data);
      setMelhorPetShop(response.data); // Atualiza o estado com a resposta do servidor
    } catch (error) {
      console.error('Erro ao enviar requisição:', error);
    }
  };

  const handleClear = () => {
    setMelhorPetShop(null);
  };

  return (
    <div className="App">
      <Formulario onSubmit={handleSubmit} onClear={handleClear} />
      {melhorPetShop && ( // Renderiza apenas se houver uma resposta
        <div className="melhor-petshop">
          <h3>Melhor PetShop</h3>
          <p>{melhorPetShop.name} - {melhorPetShop.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </div>
      )}
    </div>
  );
}

export default App;
