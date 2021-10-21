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

  const carbiRows = symbols.map(item =>
    <CarbiRow key={item.id} symbol={item.symbol} name={item.name} rate={rate} />
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