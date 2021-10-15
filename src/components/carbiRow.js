import React from 'react';
import CoinbasePro from '../external/coinbasePro';

class CarbiRow extends React.Component {

  constructor(props) {
    super(props);

    this.MAX_WAIT = 3 * 1000;

    this.state = {
      symbol: this.props.symbol,
      result: null,
      waited: 0,
    };
  }

  async componentDidMount() {
    this.setState({
      result: await CoinbasePro.ticker(this.state.symbol)
    })
  }

  render() {
    if (this.state.result === null) {
      return (
        <tr>
          <td>loading...</td>
        </tr>
      );
    } else {
      return (
        <tr>
          <td>{this.state.symbol}</td>
          <td>{this.state.result.change.toFixed(1)}</td>
          <td>{this.state.result.price.toFixed(2)}</td>
        </tr>
      );
    }




  }
}

export default CarbiRow;