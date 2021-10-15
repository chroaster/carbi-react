import React from 'react';
import CarbiRow from './carbiRow';
import defaultSymbolList from '../defaultSymbolList';

class CarbiTable extends React.Component {
  state = {
    cols: [
      {
        id: 0,
        name: 'Symbol',
        abbr: 'Sym',
        icon: null,
        order: 0,
      }, {
        id: 1,
        name: '24h Change (US)',
        abbr: '24h',
        icon: null,
        order: 1,
      }, {
        id: 2,
        name: 'US Price',
        abbr: 'US',
        icon: null,
        order: 2,
      }, {
        id: 3,
        name: 'Margin',
        abbr: 'Mgn',
        icon: null,
        order: 3,
      }, {
        id: 4,
        name: 'KR Price',
        abbr: 'KR',
        icon: null,
        order: 4,
      }, {
        id: 5,
        name: '24h Change (KR)',
        abbr: '24h',
        icon: null,
        order: 5,
      }
    ],
  }

  render() {
    const colHeaders = this.state.cols.map(item =>
      <th key={item.order}>{item.abbr}</th>
    );
    const carbiRows = defaultSymbolList.map(item =>
      <CarbiRow key={item.id} symbol={item.symbol} />
    );

    return (
      <table>
        <thead>
          <tr>
            {colHeaders}
          </tr>
        </thead>
        <tbody>
          {carbiRows}
        </tbody>
      </table>
    );
  }
}

export default CarbiTable;