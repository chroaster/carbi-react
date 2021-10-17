class Bithumb {
  static ticker = async (currency) => {
    // Docs: https://apidocs.bithumb.com/
    try {
      const proxy = 'https://simple-cors-proxy.chroaster.com/?url=';
      const url = `https://api.bithumb.com/public/ticker/${currency}`;
      const response = await fetch(`${proxy}${url}`, { cache: 'no-cache', });
      if (response.ok) {
        const bithumbResponse = await response.json();

        if (bithumbResponse.status === "0000") {
          const data = bithumbResponse.data;
          // received normal response from bithumb
          return {
            price: Number.parseFloat(data.closing_price),
            volume: Number.parseFloat(data.acc_trade_value_24H),
            change: Number.parseFloat(data.fluctate_rate_24H),
            time: new Date(Number.parseFloat(data.date)),
          };
        } else {
          // received error response from bithumb
          throw new Error(bithumbResponse.status);
        }
      } else {
        // fetch failed
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.error(`Bithumb retrieval error: ${err.message}`);
      return {
        available: false,
        errorMessage: err.message,
      };
    }
  }
}

export default Bithumb;