import React, { useState, useEffect } from 'react';

const WordForm = () => {
    const [word, setWord] = useState('');
    const [definition, setDefinition] = useState('');
    const [examples, setExamples] = useState([{ example: '', translation: '' }]);
    const [pronunciation, setPronunciation] = useState('');
    const [isActive] = useState(true);
    const [wordType, setWordType] = useState('');
    const [furtherDetails, setFurtherDetails] = useState('');
    const [etymology, setEtymology] = useState('');
    const [isRootWord, setIsRootWord] = useState(true);

    useEffect(() => {
        // Function to fetch word details based on word_id from URL params
        const fetchWordDetails = async () => {
            try {
                // Extracting word_id from URL params
                const urlParams = new URLSearchParams(window.location.search);
                const wordId = urlParams.get('word_id');
                if (!wordId) {
                    throw new Error('Word ID parameter missing');
                }

                // Fetching word details from API
                const response = await fetch(`https://ilonggogid-api.onrender.com/api/words/by-id/${wordId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch word details');
                }
                const data = await response.json();

                // Setting fetched data to form fields
                setWord(data.word || '');
                setDefinition(data.definition || '');
                setExamples(data.examples || [{ example: '', translation: '' }]);
                setPronunciation(data.pronunciation || '');
                setWordType(data.wordType || '');
                setFurtherDetails(data.furtherDetails || '');
                setEtymology(data.etymology || '');
                setIsRootWord(data.isRootWord || true);
            } catch (error) {
                console.error('Error fetching word details:', error);
            }
        };

        fetchWordDetails();
    }, []); // empty dependency array ensures this effect runs only once on component mount

    const handleAddExample = () => setExamples([...examples, { example: '', translation: '' }]);

    const handleExampleChange = (index, field, value) => {
        const newExamples = examples.map((ex, i) => (i === index ? { ...ex, [field]: value } : ex));
        setExamples(newExamples);
    };

    const handleDeleteExample = (index) => {
        setExamples(examples.filter((_, i) => i !== index));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const wordData = { word, definition, examples, pronunciation, isActive, wordType, furtherDetails, etymology, isRootWord };

        try {
            let response;
            // Determine whether to create or update based on presence of word_id in URL
            const urlParams = new URLSearchParams(window.location.search);
            const wordId = urlParams.get('word_id');
            
            if (wordId) {
                // Update existing word
                response = await fetch(`https://ilonggogid-api.onrender.com/api/words/${wordId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(wordData),
                });
                alert("Naupdate naman guid ang word. Madamo guid nga salamat sa inyo!");
            } else {
                // Create new word
                response = await fetch('https://ilonggogid-api.onrender.com/api/words', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(wordData),
                });
                alert("Successfully Submitted Entry. Madamo guid nga salamat sa inyo!");
            }

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            console.log('Form submitted successfully');
            resetForm();          
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };

    const resetForm = () => {
        setWord('');
        setDefinition('');
        setExamples([{ example: '', translation: '' }]);
        setPronunciation('');
        setWordType('');
        setFurtherDetails('');
        setEtymology('');
        setIsRootWord(true);
    };

    return (
        <form className="container form-container page" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="wordInput">Word:</label>
                <input id="wordInput" className="form-control" type="text" value={word} onChange={(e) => setWord(e.target.value)} required />
            </div>

            <div className="form-group">
                <label htmlFor="definitionInput">Definition:</label>
                <textarea id="definitionInput" className="form-control" value={definition} onChange={(e) => setDefinition(e.target.value)} required />
            </div>

            <div className="container mt-2">
                <label className="mx-2">Give Examples</label>
                <button className="btn btn-add" type="button" onClick={handleAddExample}><i className="fa fa-plus" aria-hidden="true"></i></button>
            </div>
            {examples.map((ex, index) => (
                <div className="examples" key={index}>
                    <div className="row">
                        <div className="col">
                            <label htmlFor={`exampleInput-${index}`}>Example:</label>
                            <textarea
                                id={`exampleInput-${index}`}
                                className="form-control full-width-textarea"
                                value={ex.example}
                                onChange={(e) => handleExampleChange(index, 'example', e.target.value)}
                                required
                            />
                        </div>
                        <div className="col">
                            <label htmlFor={`translationInput-${index}`}>Translation:</label>
                            <textarea
                                id={`translationInput-${index}`}
                                className="form-control full-width-textarea"
                                value={ex.translation}
                                onChange={(e) => handleExampleChange(index, 'translation', e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button className="btn btn-delete" type="button" onClick={() => handleDeleteExample(index)}>Delete</button>
                </div>
            ))}

            <div className="form-group">
                <label htmlFor="pronunciationInput">Pronunciation:</label>
                <input id="pronunciationInput" className="form-control" type="text" value={pronunciation} onChange={(e) => setPronunciation(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="wordTypeInput">Part of Speech:</label>
                <select id="wordTypeInput" className="form-select" value={wordType} onChange={(e) => setWordType(e.target.value)}>
                    <option value="">--Please choose an option--</option>
                    <option value="noun">Noun</option>
                    <option value="verb">Verb</option>
                    <option value="adjective">Adjective</option>
                    <option value="adverb">Adverb</option>
                    <option value="pronoun">Pronoun</option>
                    <option value="preposition">Preposition</option>
                    <option value="conjunction">Conjunction</option>
                    <option value="interjection">Interjection</option>
                    <option value="none">Expression</option>
                    <option value="none">Slang</option>
                    <option value="none">Not Applicable</option>                  
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="furtherDetailsInput">Additional Details:</label>
                <textarea id="furtherDetailsInput" className="form-control" value={furtherDetails} onChange={(e) => setFurtherDetails(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="etymologyInput">Etymology:</label>
                <textarea id="etymologyInput" className="form-control" value={etymology} onChange={(e) => setEtymology(e.target.value)} />
            </div>

            <div className="form-group">
                <label htmlFor="isRootWordInput">Is Root Word:</label>
                <input id="isRootWordInput" type="checkbox" checked={isRootWord} onChange={(e) => setIsRootWord(e.target.checked)} />
            </div>

            <div className="form-group">
                <label htmlFor="isActiveInput">Is Active:</label>
                <input id="isActiveInput" type="checkbox" checked={isActive} disabled />
            </div>

            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default WordForm;
