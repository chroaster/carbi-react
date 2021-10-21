import './CarbiHead.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faChartLine, faArrowsAltH } from '@fortawesome/free-solid-svg-icons'
import Flags from '../../../assets/images/Flags';

const icons = {
  'symbol':
  {
    type: 'icon',
    icon: <FontAwesomeIcon icon={faCoins} />,
  },
  'change-us':
  {
    type: 'icon',
    icon: <FontAwesomeIcon icon={faChartLine} />,
  },
  'price-us':
  {
    type: 'img',
    src: Flags.usa.src,
    alt: Flags.usa.alt,
  },
  'margin':
  {
    type: 'icon',
    icon: <FontAwesomeIcon icon={faArrowsAltH} />,
  },
  'price-kr':
  {
    type: 'img',
    src: Flags.kor.src,
    alt: Flags.kor.alt,
  },
  'change-kr':
  {
    type: 'icon',
    icon: <FontAwesomeIcon icon={faChartLine} />,
  },
};

const CarbiHead = ({ columns }) => {
  const colHeaders = columns.map(item => {
    if (icons[item.name].type === 'icon') {
      return <th key={item.order}>{icons[item.name].icon}</th>;
    } else {
      return <th key={item.order}>
        <img
          className='flag'
          src={icons[item.name].src}
          alt={icons[item.name].alt}
          key={item.order}
        />
      </th>;
    }
  }
  );

  return (
    <tr>
      {colHeaders}
    </tr>
  );
}

export default CarbiHead;