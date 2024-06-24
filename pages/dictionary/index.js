import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DictionaryWordItem from "@/components/DictionaryWordItem";
import api from "../api/api";
import AlphabetPagination from "@/components/AlphabetPagination";

function Dictionary() {
  const [selectedWord, setSelectedWord] = useState(null);
  const [words, setWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    // Default to letter 'a' if query.letter is not present
    const initialLetter = query.letter || "a";
    fetchWords(initialLetter);

    // Redirect to /dictionary?letter=a if no query parameter is present
    if (!query.letter) {
      router.replace("/dictionary?letter=a");
    }
  }, [query.letter]);

  const fetchWords = async (letter) => {
    setIsLoading(true);
    try {
      const wordsData = await api.get(`/dictionary/words?letter=${letter}`);
      setWords(wordsData);
    } catch (error) {
      console.error("Error fetching words:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWordSelect = (word) => {
    router.push(`/dictionary/${word.word}`);
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

  const collator = new Intl.Collator(undefined, { sensitivity: "base" });
  const sortedWords = [...words].sort((a, b) =>
    collator.compare(a.word, b.word)
  );

  const filteredWords = sortedWords.filter((word) =>
    removeAccents(word.word.toLowerCase()).includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container page">
      <div className="searchContainer">
        <input
          type="text"
          className="searchBar"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <AlphabetPagination />
          </div>
          <div className="col-md-9">
            <div className="resultContainer">
        {isLoading ? (
          <div className="loadingContainer">Loading Dictionary...</div>
        ) : selectedWord ? (
          <div className="container detail-container">
            {/* Render detailed view of selected word */}
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Dictionary;
