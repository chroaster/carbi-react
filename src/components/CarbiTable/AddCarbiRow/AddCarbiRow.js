import { useState } from 'react';
import './AddCarbiRow.css';

const AddCarbiRow = ({ handleAddSymbol }) => {
  const [symbol, setSymbol] = useState('');
  const [active, setActive] = useState(false);

  const handleChange = (event) => {
    setSymbol(event.target.value.toUpperCase());
  }

  const handleKeyPress = ({ key }) => {
    if (key === 'Enter' && symbol !== '') {
      setSymbol('');
      handleAddSymbol(symbol.toUpperCase());
      toggleActive();
    }
  }

  const handleClick = () => {
    toggleActive();
  };

  const toggleActive = () => {
    setActive(prev => { return !prev });
  };

  return (
    <tr>
      <td colSpan="6">
        {active ?
          <div>
            <input
              type='text'
              name='symbol'
              placeholder='Symbol...'
              value={symbol}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <button className='btn' onClick={handleClick}>X</button>
          </div>
          :
          <button className='btn' onClick={handleClick}>Add</button>
        }

      </td>
    </tr>
  );
};

export default AddCarbiRow;