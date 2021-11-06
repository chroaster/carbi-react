import { useState, useEffect } from 'react';

import './CarbiRow.css';
import MarginCell from './MarginCell/marginCell';
import LoadingSpinner from '../../LoadingSpinner/LoadingSpinner';
import CoinbasePro from '../../../external/coinbasePro';
import Bithumb from '../../../external/bithumb';
import SigDig from '../../../utils/sigDig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCaretUp,
  faCaretDown,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';

const CarbiRow = ({ item, rate, handleDeleteSymbol }) => {
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

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    (async () => {
      if (sourceMarket.time === null) {
        setSourceMarket(await fetchSource(item.symbol));
      }
    })();

    (async () => {
      if (targetMarket.time === null && !isNaN(rate)) {
        const ticker = await fetchTarget(item.symbol);
        setTargetMarket({
          ...ticker,
          price: ticker.price / rate,
        });
      }
    })();
  }, [item.symbol, sourceMarket, targetMarket, rate]);

  const fetchSource = async (symbol) => {
    const res = await CoinbasePro(symbol);
    return res;
  };

  const fetchTarget = async (symbol, rate) => {
    const res = await Bithumb(symbol, rate);
    return res;
  };

  return (
    <>
      <tr
        className='carbiRow'
        onClick={() => setExpanded(!expanded)}
      >
        <td align='start'><span title={item.name}>{item.symbol}</span></td>
        {(sourceMarket.available && targetMarket.available) ?
          <>
            <td>
              {sourceMarket.change.toFixed(1) > 0 ?
                <span className="caret favorable">
                  <FontAwesomeIcon icon={faCaretUp} />
                </span>
                :
                <span className="caret unfavorable">
                  <FontAwesomeIcon icon={faCaretDown} />
                </span>
              }
              {Math.abs(sourceMarket.change).toFixed(1)}
            </td>
            <td>{SigDig(sourceMarket.price)}</td>
            <td>
              <MarginCell sourcePrice={sourceMarket.price} targetPrice={targetMarket.price} />
            </td>
            <td>{SigDig(targetMarket.price)}</td>
            <td>
              {targetMarket.change.toFixed(1) > 0 ?
                <span className="caret favorable">
                  <FontAwesomeIcon icon={faCaretUp} />
                </span>
                :
                <span className="caret unfavorable">
                  <FontAwesomeIcon icon={faCaretDown} />
                </span>
              }
              {Math.abs(targetMarket.change).toFixed(1)}
            </td>
          </>
          :
          <>
            <td colSpan='5'><LoadingSpinner /></td>
          </>
        }
      </tr >
      {expanded &&
        <tr
          className='expanded'
        >
          <td colSpan='1' align='start'>
            {item.name}
          </td>
          <td colSpan='2' align='end'>
            <span>{sourceMarket.volume.toFixed(0)}</span>
          </td>
          <td colSpan='1' align='center'>
            <span>24h vol</span>
          </td>
          <td colSpan='1' align='start'>
            <span>{targetMarket.volume.toFixed(0)}</span>
          </td>
          <td colSpan='1' align='end'>
            <button onClick={() => handleDeleteSymbol(item.id)} className="delete-button">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </td>
        </tr>
      }
    </>
  );

};

export default CarbiRow;