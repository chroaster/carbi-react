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
  const [rateTimeStamp, setRateTimeStamp] = useState();
  const [rateLoaded, setRateLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await Spot();
      setRate(res.rate);
      setRateTimeStamp(res.retrieved);
      setRateLoaded(true);
    })();
  }, [setRate, setRateTimeStamp]);

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
      item={item}
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
        <tr>
          <td colSpan="6">
            <div className='rate-info'>
              using USD = {Math.round(rate).toLocaleString()} KRW from {timeAgo(rateTimeStamp)}
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

function timeAgo(dateParam) {
  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const now = new Date();
  const seconds = Math.round((now - date) / 1000);
  const minutes = Math.round(seconds / 60);

  if (minutes === 0) return 'just now';
  if (minutes === 1) return 'a minute ago';
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.round(minutes / 60);
  if (hours === 1) return 'an hour ago';
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.round(hours / 24);
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;

  const weeks = Math.round(days / 7);
  if (weeks === 1) return 'last week';
  if (weeks < 4) return `${weeks} weeks ago`;

  const months = Math.round(days / 30);
  if (months === 1) return 'last month';
  if (months < 12) return `${months} months ago`;

  const years = Math.round(days / 365);
  if (years === 1) return 'last year';
  return `${years} years ago`;
}

export default CarbiTable;