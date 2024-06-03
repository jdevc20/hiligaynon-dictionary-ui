// pages/dictionary/[word].js

import React from 'react';
import { useRouter } from 'next/router';

// Mock data fetching function, replace with your actual data fetching logic
const fetchWordData = async (word) => {
    // Example mock data
    return {
        word: word,
        wordType: "Noun",
        pronunciation: word,
        definitions: [
            { language: "English", definition: "Definition of the word" },
            { language: "Filipino", definition: "Kahulugan ng salita" }
        ],
        examples: [
            { example: "Example usage of the word", translation: "Halimbawa ng paggamit ng salita" }
        ],
        furtherDetails: "Additional details about the word",
        etymology: "Origin of the word"
    };
};

const WordDetail = ({ wordData }) => {
    const router = useRouter();
    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            const synthesis = window.speechSynthesis;
            const utterance = new SpeechSynthesisUtterance(wordData.pronunciation);

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
        <div className='container mt-5'>
                    <div className="wordDetailContainer roboto-mono-message">
            <button className="btn btn-back" onClick={() => router.back()}><i className="fa fa-chevron-circle-left" aria-hidden="true"></i></button>
            <div className="container">
                <h2>{wordData.word}</h2>
                <p className={`mb-0 ${wordData.wordType.toLowerCase()}`}>
                    {wordData.wordType}
                </p>
                <div className="pronunciation">
                    <span className="pronunciation-text">Pronunciation: {wordData.pronunciation}</span>
                    <button className="btn btn-speak" onClick={handleSpeak}>
                        <i className="fa fa-volume-up" aria-hidden="true"></i> Speak
                    </button>
                </div>
                <label>Definitions:</label>
                <ul>
                    {wordData.definitions.map((definition, index) => (
                        <li key={index}>
                            <strong>{definition.language}: </strong>
                            {definition.definition}
                        </li>
                    ))}
                </ul>

                <label>Examples:</label>
                <ul>
                    {wordData.examples.map((example, index) => (
                        <li key={index}>
                            <em>{example.example}</em> - {example.translation}
                        </li>
                    ))}
                </ul>
                {/* Additional Details */}
                {wordData.furtherDetails && (
                    <p className="mb-0"><strong>Additional details :</strong> {wordData.furtherDetails}</p>
                )}
                {/* Etymology */}
                {wordData.etymology && (
                    <p className="mb-0"><strong>Etymology:</strong> {wordData.etymology}</p>
                )}
            </div>
        </div>
        </div>
    );
}

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
