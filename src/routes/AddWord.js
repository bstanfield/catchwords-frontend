import React, { useState } from 'react';
import Network from '../helpers/network';

const AddWord = () => {
  const [word, setWord] = useState('');

  const addWordToDb = async () => {
    const [response, responseBody] = await Network.post('add-word', {
      name: word
    });
    if (!response.ok) {
      alert(`${word} already exists in the game 😲`);
    } else {
      alert(`${word} added to the game!`);
    }
    setWord('');
  };

  const handleChange = event => {
    setWord(event.target.value);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 58 }}>
      <h1>Add a new word to the game</h1>
      <label>
        Word:
        <input type="text" value={word} onChange={handleChange} name="name" />
      </label>
      <button onClick={async () => addWordToDb()}>Submit</button>
    </div>
  );
};

export default AddWord;
