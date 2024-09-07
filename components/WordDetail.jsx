import React from 'react';

const WordDetail = ({ word, onBack }) => {
    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            const synthesis = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(word.pronunciation);

            // Adjust properties for Filipino accent simulation
            utterance.lang = 'fil-PH'; // Set language to Filipino (Philippines)
            utterance.rate = 0.6; // Adjust speech rate (0.5 - 2, 1 being the default)
            utterance.pitch = 1; // Adjust speech pitch (0 - 2, 1 being the default)

            // Optionally, you can select a specific voice that sounds more Filipino
            const voices = synthesis.getVoices();
            const filipinoVoice = voices.find(voice => voice.lang === 'fil-PH');
            if (filipinoVoice) {
                utterance.voice = filipinoVoice;
            }

            synthesis.speak(utterance);
        } else {
            alert('Text-to-speech is not supported in your browser.');
        }
    };

    return (
        <div className="wordDetailContainer roboto-mono-message">
            <button className="btn btn-back" onClick={onBack}><i className="fa fa-chevron-circle-left" aria-hidden="true"></i></button>
            <div className="container">
                <h2>{word.word}</h2>
                <p className={`mb-0 ${word.wordType.toLowerCase()}`}>
                    {word.wordType}
                </p>
                <div className="pronunciation">
                    <span className="pronunciation-text">Pronunciation: {word.pronunciation}</span>
                    <button className="btn btn-speak" onClick={handleSpeak}>
                        <i className="fa fa-volume-up" aria-hidden="true"></i> Speak
                    </button>
                </div>
                <label>Definitions:</label>
                <ul>
                    {word.definitions.map((definition, index) => (
                        <li key={index}>
                            <strong>{definition.language}: </strong>
                            {definition.definition}
                        </li>
                    ))}
                </ul>

                <label>Examples:</label>
                <ul>
                    {word.examples.map((example, index) => (
                        <li key={index}>
                            <em>{example.example}</em> - {example.translation}
                        </li>
                    ))}
                </ul>
                {/* Additional Details */}
                {word.furtherDetails && (
                    <p className="mb-0"><strong>Additional details :</strong> {word.furtherDetails}</p>
                )}
                {/* Etymology */}
                {word.etymology && (
                    <p className="mb-0"><strong>Etymology:</strong> {word.etymology}</p>
                )}
            </div>
        </div>
    );
}

export default WordDetail;
