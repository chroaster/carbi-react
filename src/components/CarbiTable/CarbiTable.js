import { useState, useEffect } from 'react';
import './CarbiTable.css';
import CarbiHead from './CarbiHead/CarbiHead';
import CarbiRow from './CarbiRow/CarbiRow';
import AddCarbiRow from './AddCarbiRow/AddCarbiRow';
import StarterData from '../../utils/starterData';
import Spot from '../../external/spot';

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

  const handleAddSymbol = (symbolToAdd) => {
    setSymbols(prev => {
      return [
        ...prev,
        {
          id: prev.map(item => item.id).reduce((pv, id) => Math.max(pv, id)) + 1,
          symbol: symbolToAdd,
        }
      ];
    });
  };

  const handleDeleteSymbol = (idToDelete) => {
    setSymbols(prev => prev.filter(item => item.id !== idToDelete));
  }

  const carbiRows = symbols.map(item =>
    <CarbiRow
      key={item.id}
      id={item.id}
      symbol={item.symbol}
      name={item.name}
      rate={rate}
      handleDeleteSymbol={handleDeleteSymbol}
    />
  );

  return (
    <table>
      <thead>
        <CarbiHead columns={columns} />
      </thead>
      <tbody>
        {rateLoaded && carbiRows}
      </tbody>
      <tfoot>
        <AddCarbiRow handleAddSymbol={handleAddSymbol} />
      </tfoot>
    </table>
  );
}

export default CarbiTable;