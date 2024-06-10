import React, { useState } from 'react';
import './Formulário.css';

function Formulario({ onSubmit, onClear }) {
  const [date, setDate] = useState('');
  const [numBigDogs, setNumBigDogs] = useState(0);
  const [numSmallDogs, setNumSmallDogs] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (numBigDogs === 0 && numSmallDogs === 0) {
      setError('Pelo menos um cachorro grande ou um cachorro pequeno deve ser incluído na requisição.');
      onClear();
      return;
    }
    onSubmit({ date, numBigDogs, numSmallDogs });
    setError('');
  };

  const handleNumBigDogsChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (newValue < 0) {
      setNumBigDogs(0);
    } else {
      setNumBigDogs(newValue);
    }
  };

  const handleNumSmallDogsChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (newValue < 0) {
      setNumSmallDogs(0);
    } else {
      setNumSmallDogs(newValue);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Encontre o Melhor Petshop</h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label htmlFor="date">Data:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numBigDogs">Cachorros Grandes:</label>
          <input
            type="number"
            id="numBigDogs"
            value={numBigDogs}
            onChange={handleNumBigDogsChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="numSmallDogs">Cachorros Pequenos:</label>
          <input
            type="number"
            id="numSmallDogs"
            value={numSmallDogs}
            onChange={handleNumSmallDogsChange}
          />
        </div>
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default Formulario;
