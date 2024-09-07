import React from "react";
import { useRouter } from "next/router";

const fetchWordData = async (word) => {
  try {
    const response = await fetch(
      `https://ilonggogid-api.onrender.com/api/words/by-word/${word}`
      
    );
    console.log("Hello");
    if (!response.ok) {
      throw new Error("Failed to fetch word data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching word data:", error);
    return null;
  }
};

const WordDetail = ({ wordData }) => {
  const router = useRouter();

  if (!wordData || !wordData.data || wordData.data.length === 0) {
    return (
      <div
        className="container mt-5 text-white d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        Word is not available yet.
      </div>
    );
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this word?")) {
      try {
        const response = await fetch(`https://ilonggogid-api.onrender.com/api/words/${id}`, {
          method: 'DELETE',
        });

        console.log(response)
  
        if (response.ok) {
          // Handle successful deletion, e.g., refresh the list of words
          alert('Word deleted successfully');
          window.location.reload();
          // You can add a function here to update the UI after deletion
        } else {
          window.location.reload();
        }
      } catch (error) {
        console.error('Error deleting word:', error);
      }
    }
  };
  

  // Ensure wordData.data is an array before mapping over it
  if (!Array.isArray(wordData.data)) {
    return (
      <div className="container mt-5">
        <p>Error: Word data is not in the expected format.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5 pb-2 page">
      <br />
      <button className="btn btn-back" onClick={() => router.back()}>
        <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>
      </button>
      {wordData.data.map((wordItem, index) => (
        
        <div
          key={index}
          className="wordDetailContainer roboto-mono-message mt-2"
        >
          <div className="container">
            <h1>{wordItem.word}</h1>

            <p
              className={`mb-0 ${
                wordItem.wordType ? wordItem.wordType.toLowerCase() : ""
              }`}
            >
              {wordItem.wordType}
            </p>
            {wordItem.spellingVariations && (
              <p>{wordItem.spellingVariations.join(", ")}</p>
            )}

            {wordItem.definition ? (
              <div className="definition-container">{wordItem.definition}</div>
            ) : (
              <p>No definition yet.</p>
            )}

            <br />
            <label>Examples:</label>
            <ul>
              {wordItem.examples.length > 0 ? (
                wordItem.examples.map((example, exampleIndex) => (
                  <li key={exampleIndex}>
                    <em>{example.example}</em> - {example.translation}
                  </li>
                ))
              ) : (
                <p>No examples yet.</p>
              )}
            </ul>
            <hr />
            {wordItem.furtherDetails && (
              <p className="mb-0">
                <strong>Additional details :</strong> {wordItem.furtherDetails}
              </p>
            )}
            {wordItem.etymology && (
              <p className="mb-0">
                <strong>Etymology:</strong> {wordItem.etymology}
              </p>
            )}
            <br />
            <a href={`/dictionary/edit?word_id=${wordItem._id}`} className="btn btn-primary">
                <i className="fa fa-edit" aria-hidden="true"></i> Edit
            </a>
            <a  className="btn btn-secondary mx-2" onClick={() => handleDelete(wordItem._id)}>
                <i className="fa fa-delete" aria-hidden="true"></i> Delete
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { word } = context.params;
  const wordData = await fetchWordData(word);
  return {
    props: {
      wordData,
    },
  };
}

export default WordDetail;
