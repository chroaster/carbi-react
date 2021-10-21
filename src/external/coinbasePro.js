const CoinbasePro = async (symbol, baseCurrency = 'USD') => {
  // Docs: https://docs.pro.coinbase.com/#get-24hr-stats
  try {
    // const proxy = 'https://simple-cors-proxy.chroaster.com/?url=';
    const url =
      `https://api.pro.coinbase.com/products/${symbol}-${baseCurrency}/stats`;
    const response = await fetch(`${url}`, { cache: 'no-cache' });
    if (response.ok) {
      const data = await response.json();
      const currentPrice = Number.parseFloat(data.last);
      const openPrice = Number.parseFloat(data.open);
      const changeSinceOpen = 100 * ((currentPrice - openPrice) / openPrice);
      return {
        price: currentPrice,
        volume: Number.parseFloat(data.volume),
        change: changeSinceOpen,
        time: new Date(),
      };
    } else {
      // fetch failed
      throw new Error(response.statusText);
    }
  } catch (err) {
    console.error(`Coinbase retrieval error: ${err.message}`);
    return {
      available: false,
      errorMessage: err.message,
    };
  }
}

export default CoinbasePro;