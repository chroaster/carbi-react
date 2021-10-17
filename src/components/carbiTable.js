import { useState } from 'react';
import CarbiRow from './carbiRow';
import AddSymbol from './addSymbol';
import StarterData from '../starterData';

const CarbiTable = () => {
  const [symbols, setSymbols] = useState(StarterData.defaultSymbols);
  const [columns] = useState(StarterData.defaultColumns);

  const colHeaders = columns.map(item =>
    <th key={item.order}>{item.abbr}</th>
  );

  const carbiRows = symbols.map(item =>
    <CarbiRow key={item.id} symbol={item.symbol} />
  );

  const handleAddSymbol = (symbolToAdd) => {
    console.log(`received ${symbolToAdd}`);
    setSymbols(prev => {
      return [
        ...prev,
        {
          id: prev.length,
          symbol: symbolToAdd,
        }
      ];
    })
  };

  return (
    <table>
      <thead>
        <tr>
          {colHeaders}
        </tr>
      </thead>
      <tbody>
        {carbiRows}
        <AddSymbol handleAddSymbol={handleAddSymbol} />
      </tbody>
    </table>
  );
}

export default CarbiTable;