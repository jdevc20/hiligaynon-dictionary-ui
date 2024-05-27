import React, { useState, useEffect } from 'react';
import DictionaryWordItem from '../components/DictionaryWordItem';
import WordDetail from '../components/WordDetail';
import api from './api/api';

function Dictionary() {
  const [selectedWord, setSelectedWord] = useState(null);
  const [words, setWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const wordsData = await api.get('/dictionary/words');
      setWords(wordsData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const handleWordSelect = (word) => {
    setSelectedWord(word);
  };

  const handleBackButtonClick = () => {
    setSelectedWord(null);
  };

  const handleSearchChange = (event) => {
    const searchTerm = removeAccents(event.target.value);
    setSearchTerm(searchTerm);
  };

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const collator = new Intl.Collator(undefined, { sensitivity: 'base' });
  const sortedWords = [...words].sort((a, b) => collator.compare(a.word, b.word));

  const filteredWords = sortedWords.filter(word =>
    removeAccents(word.word.toLowerCase()).includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="searchContainer">
        <input
          type="text"
          className="searchBar"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="resultContainer">
        {isLoading ? (
          <div className="loadingContainer">Loading Dictionary...</div>
        ) : selectedWord ? (
          <div className="container detail-container">
            <WordDetail word={selectedWord} onBack={handleBackButtonClick} />
          </div>
        ) : (
          <div className="wordGrid">
            {filteredWords.map((word, index) => (
              <DictionaryWordItem
                key={index}
                word={word}
                definition={word.definition}
                onSelect={() => handleWordSelect(word)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dictionary;
