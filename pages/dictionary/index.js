import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DictionaryWordItem from "@/components/DictionaryWordItem";
import api from "../api/api";
import AlphabetPagination from "@/components/AlphabetPagination";
import debounce from "lodash.debounce";

function Dictionary() {
  const router = useRouter();
  const { query } = router;

  const [words, setWords] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingWord, setIsLoadingWord] = useState(false);

  useEffect(() => {
    const initialLetter = query.letter || "a";
    fetchWords(initialLetter, searchTerm);
    if (!query.letter) {
      router.replace("/dictionary?letter=a");
    }
  }, [query.letter, searchTerm]);

  const fetchWords = async (letter, searchTerm = "") => {
    setIsLoading(true);
    try {
      let endpoint = searchTerm
        ? `/api/search?query=${encodeURIComponent(searchTerm)}`
        : `/api/words?letter=${letter}`;
      const response = await api.get(endpoint);
      setWords(response.data); 
    } catch (error) {
      console.error("Error fetching words:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = debounce((searchTerm) => {
    // Only perform search if searchTerm is longer than 2 characters or empty
    if (searchTerm.length > 2 || searchTerm.length === 0) {
      fetchWords(query.letter || 'a', searchTerm);
    } else {
      setWords([]); // Clear previous search results or set to initial state
    }
  }, 300);

  const handleSearchChange = (event) => {
    const searchTerm = removeAccents(event.target.value);
    setSearchTerm(searchTerm);
    debouncedSearch(searchTerm);
  };

  const handleWordSelect = (word) => {
    setIsLoadingWord(true);
    router.push(`/api/${word.word}`);
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
              ) : (
                <>
                  {isLoadingWord && (
                    <div className="loadingContainer">Getting Word Definition...</div>
                  )}
                  {!isLoadingWord && filteredWords.length > 0 ? (
                    <div className="wordGrid">
                      {filteredWords.map((word, index) => (
                        <DictionaryWordItem
                          key={index}
                          word={word}
                          definition={word.definition} // Adjust as per your data structure
                          onSelect={() => handleWordSelect(word)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div></div>
                  )}
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
