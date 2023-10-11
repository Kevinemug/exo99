// src/Tenzies.jsx
import React, { useState } from 'react';
import '../tenzies.css'

const Tenzies = () => {
  const [numbers, setNumbers] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);

  const shuffleNumbers = () => {
    setNumbers(numbers.sort(() => Math.random() - 0.5));
  };

  const handleNumberClick = (number) => {
    setSelectedNumber(number);
  };

  const handleRollClick = () => {
    const rolledNumber = Math.floor(Math.random() * 10) + 1;
    setRandomNumber(rolledNumber);
    if (rolledNumber === selectedNumber) {
      alert('Congratulations! You selected the correct number!');
    } else {
      alert('Try again!');
    }
  };

  return (
    <div className='Tenzies'>
      <h1>Tenzies Game</h1>
      <div className='numbers'>
        {numbers.map((number) => (
          <button key={number} onClick={() => handleNumberClick(number)}>
            {number}
          </button>
        ))}
      </div>
      <button onClick={shuffleNumbers}>Shuffle Numbers</button>
      <button onClick={handleRollClick}>Roll</button>
      {randomNumber && <p>Random Number: {randomNumber}</p>}
    </div>
  );
};

export default Tenzies;
