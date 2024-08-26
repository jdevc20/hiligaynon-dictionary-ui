import React from 'react';

const HiligaynonCities = () => {
  const cities = [
    'Iloilo City - The capital of Iloilo Province and a major urban center.',
    'Bacolod City - The capital of Negros Occidental and a significant commercial and economic hub.',
    'Roxas City - The capital of Capiz Province.',
    'Kabankalan City - The Rising City of the South.',
    'Victorias City - The Sugarlandia of Negros.',
    'Silay City - Paris of Negros.',
    'Bago City - The Home of Historical and Natural Treasures.',
    'Sara - A town in Iloilo Province.',
    'Koronadal City - Ilonggo City of the South'
  ];

  return (
    <div className='container mx-1'>
      <h4>Major Cities and Towns Where Hiligaynon is Dominant</h4>
      <ul>
        {cities.map((city, index) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
    </div>
  );
};

export default HiligaynonCities;
