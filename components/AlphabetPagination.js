// components/AlphabetPagination.jsx

import React from 'react';
import { useRouter } from 'next/router';

const AlphabetPagination = () => {
  const letters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const router = useRouter();
  const currentLetter = router.query.letter || letters[0]; // Default to first letter if no query param

  const handleClick = (letter) => {
    router.push(`/dictionary?letter=${letter}`);
  };

  return (
    <div 
      className="pagination-container"
    >
      {letters.map((letter, index) => (
        <button
          key={index}
          onClick={() => handleClick(letter)}
          className={`pagination-button ${currentLetter === letter ? 'letter-active' : ''}`}
          style={{
            margin: '0 5px',
            padding: '5px 10px',
            borderRadius: '10px',
            backgroundColor: currentLetter === letter ? 'lightblue' : 'white',
          }}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default AlphabetPagination;
