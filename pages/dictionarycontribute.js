import React, { useState } from 'react';

const WordForm = ({ onSubmit }) => {
    const [word, setWord] = useState('');
    const [definitions, setDefinitions] = useState([{ language: '', definition: '' }]);
    const [examples, setExamples] = useState([{ example: '', translation: '' }]);
    const [pronunciation, setPronunciation] = useState('');
    const [isActive] = useState(false); // isActive is disabled for editing
    const [wordType, setWordType] = useState('');
    const [furtherDetails, setFurtherDetails] = useState('');
    const [etymology, setEtymology] = useState('');
    const [isRootWord, setIsRootWord] = useState(true);

    const handleAddDefinition = () => {
        setDefinitions(prevState => [...prevState, { language: '', definition: '' }]);
    };

    const handleAddExample = () => {
        setExamples(prevState => [...prevState, { example: '', translation: '' }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://ilonggogid-api.onrender.com/dictionary/words', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ word, definitions, examples, pronunciation, isActive, wordType, furtherDetails, etymology, isRootWord })
            });
            if (!response.ok) {
                throw new Error('Failed to submit form');
            }
            // If submission is successful, you can handle the response here
            console.log('Form submitted successfully');
            // Optionally, you can reset the form fields
            setWord('');
            setDefinitions([{ language: '', definition: '' }]);
            setExamples([{ example: '', translation: '' }]);
            setPronunciation('');
            setWordType('');
            setFurtherDetails('');
            setEtymology('');
            setIsRootWord(true);
            alert("Successfully Submitted Entry. Madamo guid nga salamat sa inyo!");
        } catch (error) {
            console.error('Error submitting form:', error.message);
        }
    };


    const handleDeleteExample = (index) => {
        setExamples(prevState => {
            const newExamples = [...prevState];
            newExamples.splice(index, 1);
            return newExamples;
        });
    };

    const handleDeleteDefinition = (index) => {
        setDefinitions(prevState => {
            const newDefinitions = [...prevState];
            newDefinitions.splice(index, 1);
            return newDefinitions;
        });
    };

    return (
        <form className="container form-container" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="wordInput">Word:</label>
                <input id="wordInput" className="form-control" type="text" value={word} onChange={(e) => setWord(e.target.value)} required />
            </div>

            <div className="container mt-2">
                <label className="mx-2">Definition</label>
                <button className="btn btn-add" type="button" onClick={handleAddDefinition}><i className="fa fa-plus" aria-hidden="true"></i></button>
            </div>
            {definitions.map((def, index) => (
                <div className="definition" key={index}>
                    <div className="row">
                        <div className="col">
                            <select id={`languageInput-${index}`} className="form-select" value={def.language} onChange={(e) => setDefinitions(prevState => {
                                const newDefinitions = [...prevState];
                                newDefinitions[index].language = e.target.value;
                                return newDefinitions;
                            })} required>
                                <option value="">--Please choose a language--</option>
                                <option value="Hiligaynon">Hiligaynon</option>
                                <option value="English">English</option>
                                <option value="Kinaray-a">Kinaray-a</option>
                            </select>

                        </div>
                        <div className="col">
                            <label htmlFor={`definitionInput-${index}`}>Definition:</label>
                            <textarea id={`definitionInput-${index}`} className="form-control" type="text" value={def.definition} onChange={(e) => setDefinitions(prevState => {
                                const newDefinitions = [...prevState];
                                newDefinitions[index].definition = e.target.value;
                                return newDefinitions;
                            })} required />
                        </div>
                    </div>
                    <br />
                    <button className="btn btn-delete" type="button" onClick={() => handleDeleteDefinition(index)}>Delete</button>
                </div>
            ))}

            <div className="container mt-2">
                <label className="mx-2">Give Examples</label>
                <button className="btn btn-add" type="button" onClick={handleAddExample}><i className="fa fa-plus" aria-hidden="true"></i></button>
            </div>
            {examples.map((ex, index) => (
                <div className="examples" key={index}>
                    <div className="row">
                        <div className="col">
                            <label htmlFor={`exampleInput-${index}`}>Example:</label>
                            <textarea id={`exampleInput-${index}`} className="form-control full-width-textarea" type="text" value={ex.example} onChange={(e) => setExamples(prevState => {
                                const newExamples = [...prevState];
                                newExamples[index].example = e.target.value;
                                return newExamples;
                            })} required />
                        </div>
                        <div className="col">
                            <label htmlFor={`translationInput-${index}`}>Translation:</label>
                            <textarea id={`translationInput-${index}`} className="form-control full-width-textarea" type="text" value={ex.translation} onChange={(e) => setExamples(prevState => {
                                const newExamples = [...prevState];
                                newExamples[index].translation = e.target.value;
                                return newExamples;
                            })} required />
                        </div>
                    </div>
                    <br />
                    <button className="btn btn-delete" type="button" onClick={() => handleDeleteExample(index)}>Delete</button>
                </div>
            ))}

            <div>
                <label htmlFor="pronunciationInput">Pronunciation:</label>
                <input id="pronunciationInput" className="form-control" type="text" value={pronunciation} onChange={(e) => setPronunciation(e.target.value)} />
            </div>

            <div>
                <label htmlFor="wordTypeInput">Word Type:</label>
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
                    <option value="none">Not Applicable</option>
                </select>
            </div>

            <div>
                <label htmlFor="furtherDetailsInput">Additional Details:</label><br />
                <textarea id="furtherDetailsInput" value={furtherDetails} onChange={(e) => setFurtherDetails(e.target.value)} />
            </div>

            <div>
                <label htmlFor="etymologyInput">Etymology:</label>
                <input id="etymologyInput" type="text" value={etymology} onChange={(e) => setEtymology(e.target.value)} />
            </div>

            <div>
                <label htmlFor="isRootWordInput">Is Root Word:</label>
                <input id="isRootWordInput" type="checkbox" checked={isRootWord} onChange={(e) => setIsRootWord(e.target.checked)} />
            </div>

            <div>
                <label htmlFor="isActiveInput">Is Active:</label>
                <input id="isActiveInput" type="checkbox" checked={isActive} disabled />
            </div>

            <br />
            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
    );
};

export default WordForm;
