import { useState, useEffect } from 'react';
import CoinbasePro from '../external/coinbasePro';
import Bithumb from '../external/bithumb';

const CarbiRow = ({ symbol, rate }) => {
  const [market1, setMarket1] = useState({
    price: 0,
    volume: 0,
    change: 0,
    time: null,
  });

  const [market2, setMarket2] = useState({
    price: 0,
    volume: 0,
    change: 0,
    time: null,
  });

  const [margin, setMargin] = useState(null);

  useEffect(() => {
    (async () => {
      if (market1.time === null) {
        setMarket1(await fetchTicker1(symbol));
        if (market2.time !== null && margin === null) {
          setMargin(4.1);
        }
      }
    })();
    (async () => {
      if (market2.time === null) {
        const ticker = await fetchTicker2(symbol);
        setMarket2({
          ...ticker,
          price: ticker.price / rate,
        });
        if (market1.time !== null && margin === null) {
          setMargin(4.2);
        }
      }
    })();
  }, [symbol, market1.time, market2.time, margin, rate]);

  const fetchTicker1 = async (symbol) => {
    const res = await CoinbasePro.ticker(symbol);
    return res;
  };

  const fetchTicker2 = async (symbol, rate) => {
    const res = await Bithumb.ticker(symbol, rate);
    return res;
  };

  if (rate === null || market1.time === null || market2.time === null) {
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
        <td>{margin}</td>
        <td>{market2.price.toFixed(2)}</td>
        <td>{market2.change.toFixed(1)}</td>
      </tr>
    );
  }

};

export default CarbiRow;