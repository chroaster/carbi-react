import { useState, useEffect } from 'react';

import './CarbiRow.css';
import MarginCell from './MarginCell/marginCell';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import CoinbasePro from '../../../external/coinbasePro';
import Bithumb from '../../../external/bithumb';
import SigDig from '../../../utils/sigDig';

const CarbiRow = ({ symbol, name, rate }) => {
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
      if (targetMarket.time === null && !isNaN(rate)) {
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
      <td><span title={name}>{symbol}</span></td>
      {(sourceMarket.available && targetMarket.available) ?
        <>
          <td>{sourceMarket.change.toFixed(1)}</td>
          <td>{SigDig(sourceMarket.price)}</td>
          <td><MarginCell sourcePrice={sourceMarket.price} targetPrice={targetMarket.price} /></td>
          <td>{SigDig(targetMarket.price)}</td>
          <td>{targetMarket.change.toFixed(1)}</td>
        </>
        :
        <>
          <td colSpan='5'><LoadingSpinner /></td>
        </>
      }
    </tr >
  );

};

export default CarbiRow;