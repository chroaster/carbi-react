import { useState, useEffect } from 'react';
import CarbiRow from './carbiRow';
import AddSymbol from './addSymbol';
import StarterData from '../utils/starterData';
import Spot from '../external/spot';

const CarbiTable = () => {
  const [symbols, setSymbols] = useState(StarterData.defaultSymbols);
  const [columns] = useState(StarterData.defaultColumns);
  const [rate, setRate] = useState(1);
  const [rateLoaded, setRateLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const r = await Spot();
      setRate(r);
      setRateLoaded(true);
    })();
  }, [setRate]);

  const colHeaders = columns.map(item =>
    <th key={item.order}>{item.abbr}</th>
  );

  const carbiRows = symbols.map(item =>
    <CarbiRow key={item.id} symbol={item.symbol} rate={rate} />
  );

  const handleAddSymbol = (symbolToAdd) => {
    setSymbols(prev => {
      return [
        ...prev,
        {
          id: prev.length,
          symbol: symbolToAdd,
        }
      ];
    });
  };

  return (
    <table>
      <thead className='carbiTableHead'>
        <tr>
          {colHeaders}
        </tr>
      </thead>
      <tbody>
        {rateLoaded && carbiRows}
        <AddSymbol handleAddSymbol={handleAddSymbol} />
      </tbody>
    </table>
  );
}

export default CarbiTable;