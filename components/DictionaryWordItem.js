import React from 'react';

const DictionaryWordItem = ({ word, onSelect }) => {
    return (
        <div className="wordTile" onClick={onSelect}>
            <p className="word-header">{word.word}</p>
            <p className='word-type'>
                {word.wordType}
            </p>
        </div>
    );
}

export default DictionaryWordItem;
