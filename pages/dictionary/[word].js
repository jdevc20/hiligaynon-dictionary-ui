import React from 'react';
import { useRouter } from 'next/router';

const fetchWordData = async (word) => {
    try {
        const response = await fetch(`https://ilonggogid-api.onrender.com/dictionary/words/by-word/${word}`);
        if (!response.ok) {
            throw new Error('Failed to fetch word data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching word data:', error);
        return null;
    }
};

const WordDetail = ({ wordData }) => {
    const router = useRouter();
    const handleSpeak = () => {
        // Leave Blank for now
    };

    if (!wordData || wordData.length === 0) {
        return <div className='container mt-5 text-white d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>Word is not available yet.</div>;
    }

    return (
        <div className='container mt-5'>
            <button className="btn btn-back" onClick={() => router.back()}><i className="fa fa-chevron-circle-left" aria-hidden="true"></i></button>
            {wordData.map((wordItem, index) => (
                <div key={index} className="wordDetailContainer roboto-mono-message mt-2">                   
                    <div className="container">
                        <h2>{wordItem.word}</h2>
                        <p className={`mb-0 ${wordItem.wordType ? wordItem.wordType.toLowerCase() : ''}`}>
                            {wordItem.wordType}
                        </p>
                        <div className="pronunciation">
                            <span className="pronunciation-text">Pronunciation: {wordItem.pronunciation}</span>
                            <button className="btn btn-speak" onClick={handleSpeak}>
                                <i className="fa fa-volume-up" aria-hidden="true"></i> Speak
                            </button>
                        </div>
                        <label>Definitions:</label>
                        {wordItem.definitions.map((definition, defIndex) => (
                            <div key={defIndex} className="definition-container">
                                <strong>{definition.language}: </strong>
                                {definition.definition}
                            </div>
                        ))}

                        <label>Examples:</label>
                        <ul>
                            {wordItem.examples.map((example, exampleIndex) => (
                                <li key={exampleIndex}>
                                    <em>{example.example}</em> - {example.translation}
                                </li>
                            ))}
                        </ul>
                        {wordItem.furtherDetails && (
                            <p className="mb-0"><strong>Additional details :</strong> {wordItem.furtherDetails}</p>
                        )}
                        {wordItem.etymology && (
                            <p className="mb-0"><strong>Etymology:</strong> {wordItem.etymology}</p>
                        )}
                    </div>
                </div>
            ))}
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
