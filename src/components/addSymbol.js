import { useState } from 'react';

const AddSymbol = ({ handleAddSymbol }) => {
  const [symbol, setSymbol] = useState('');

  const handleChange = (event) => {
    setSymbol(event.target.value);
  }

  const handleKeyPress = ({ key }) => {
    if (key === 'Enter' && symbol !== '') {
      setSymbol('');
      handleAddSymbol(symbol.toUpperCase());
    }
  }

  return (
    <tr>
      <td colSpan="6">
        <input
          type='text'
          name='symbol'
          placeholder='Symbol...'
          value={symbol}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </td>
    </tr>
  );
};

export default AddSymbol;