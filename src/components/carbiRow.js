import { useState, useEffect } from 'react';
import CoinbasePro from '../external/coinbasePro';
import Bithumb from '../external/bithumb';

const CarbiRow = ({ symbol }) => {
  const [market1, setMarket1] = useState({
    price: 0,
    volume: 0,
    change: 0,
    time: '',
  });
  
  const [market2, setMarket2] = useState({
    price: 0,
    volume: 0,
    change: 0,
    time: '',
  });

  useEffect(() => {
    (async () => {
      const ticker = await fetchTicker1(symbol);
      setMarket1(ticker);
    })();
    (async () => {
      const ticker = await fetchTicker2(symbol);
      setMarket2(ticker);
    })();
  }, [symbol]);

  const fetchTicker1 = async (symbol) => {
    const res = await CoinbasePro.ticker(symbol);
    return res;
  };

  const fetchTicker2 = async (symbol) => {
    const res = await Bithumb.ticker(symbol);
    return res;
  };

  if (market1 === null) {
    return (
      <tr>
        <td>loading...</td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{symbol}</td>
        <td>{market1.change.toFixed(1)}</td>
        <td>{market1.price.toFixed(2)}</td>
        <td></td>
        <td>{market2.price.toFixed(2)}</td>
        <td>{market2.change.toFixed(1)}</td>
      </tr>
    );
  }

};

export default CarbiRow;