import React, { useState } from 'react';

function Formulario({ onSubmit }) {
  const [date, setDate] = useState('');
  const [numBigDogs, setnumBigDogs] = useState(0);
  const [numSmallDogs, setnumSmallDogs] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ date, numBigDogs, numSmallDogs });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Encontre o Melhor Petshop</h2>
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
          <label htmlFor="numBigDogs">Quantidade de Cachorros Grandes:</label>
          <input
            type="number"
            id="numBigDogs"
            value={numBigDogs}
            onChange={(e) => setnumBigDogs(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numSmallDogs">Quantidade de Cachorros Pequenos:</label>
          <input
            type="number"
            id="numSmallDogs"
            value={numSmallDogs}
            onChange={(e) => setnumSmallDogs(e.target.value)}
            required
          />
        </div>
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default Formulario;
