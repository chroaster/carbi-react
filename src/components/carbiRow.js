import { useState, useEffect } from 'react';
import CoinbasePro from '../external/coinbasePro';
import Bithumb from '../external/bithumb';
import MarginCell from './marginCell';
import SigDig from '../utils/sigDig';

const CarbiRow = ({ symbol, rate }) => {
  const [sourceMarket, setSourceMarket] = useState({
    price: 0,
    volume: 0,
    change: 0,
    time: null,
  });

  const [targetMarket, setTargetMarket] = useState({
    price: 0,
    volume: 0,
    change: 0,
    time: null,
  });

  useEffect(() => {
    (async () => {
      if (sourceMarket.time === null) {
        setSourceMarket(await fetchSource(symbol));
      }
    })();

    (async () => {
      if (targetMarket.time === null) {
        const ticker = await fetchTarget(symbol);
        setTargetMarket({
          ...ticker,
          price: ticker.price / rate,
        });
      }
    })();
  }, [symbol, sourceMarket, targetMarket, rate]);

  const fetchSource = async (symbol) => {
    const res = await CoinbasePro(symbol);
    return res;
  };

  const fetchTarget = async (symbol, rate) => {
    const res = await Bithumb(symbol, rate);
    return res;
  };

  return (
    <tr className='carbiRow'>
      <td>{symbol}</td>
      <td>{sourceMarket.time && sourceMarket.change.toFixed(1)}</td>
      <td>{sourceMarket.time && SigDig(sourceMarket.price)}</td>
      <td><MarginCell source={sourceMarket.price} target={targetMarket.price} /></td>
      <td>{targetMarket.time && SigDig(targetMarket.price)}</td>
      <td>{targetMarket.time && targetMarket.change.toFixed(1)}</td>
    </tr>
  );

};

export default CarbiRow;