import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLongArrowAltLeft,
  faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';

const MarginCell = ({ sourcePrice, targetPrice }) => {
  const [s, t] = [Number.parseFloat(sourcePrice), Number.parseFloat(targetPrice)];
  const margin = (((t - s) / s) * 100).toFixed(1);
  const parts = [
    <span className="caret unfavorable">
      <FontAwesomeIcon icon={faLongArrowAltLeft} />
    </span>,
    <span>{margin}</span>,
    <span className="caret favorable">
      <FontAwesomeIcon icon={faLongArrowAltRight} />
    </span>,
  ];

  return <>
    {
      margin <= 0 ?
        <>
          {parts[0]}
          {parts[1]}
        </>
        :
        <>
          {parts[1]}
          {parts[2]}
        </>
    }
  </>
}

export default MarginCell;