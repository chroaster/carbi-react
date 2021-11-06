const Bithumb = async (currency) => {
  // Docs: https://apidocs.bithumb.com/

  const proxy = 'https://simple-cors-proxy.chroaster.com/?url=';
  const url = `https://api.bithumb.com/public/ticker/${currency}`;
  let response;

  try {
    // attempt fetching directly
    response = await fetch(`${url}`, { cache: 'no-cache', });
  } catch (err) {
    console.warn(`Direct Bithumb fetch failed ${err.name}`);

    try {
      // attempt fetching via proxy
      console.log('Attempting Bithumb fetch via proxy...')
      response = await fetch(`${proxy}${url}`, { cache: 'no-cache', });
    } catch (err) {
      console.error(`Proxied Bithumb fetch failed ${err.name}. Is Bithumb down?`);
      return failureObject(err.name);
    }
  }

  if (response.ok) {
    const bithumbResponse = await response.json();

    if (bithumbResponse.status === "0000") {
      const data = bithumbResponse.data;
      // received normal response from bithumb
      return {
        available: true,
        price: Number.parseFloat(data.closing_price),
        volume: Number.parseFloat(data.units_traded_24H),
        change: Number.parseFloat(data.fluctate_rate_24H),
        time: new Date(Number.parseFloat(data.date)),
      };
    } else {
      // received error response from bithumb
      console.error(`Error response from Bithumb:\n${bithumbResponse.status}`);
      return failureObject(bithumbResponse.status);
    }
  }
}

const failureObject = (errorMessage = 'Unknown error') => {
  return {
    available: false,
    errorMessage: errorMessage,
    price: 0,
    volume: 0,
    change: 0,
    time: new Date(),
  };
};

export default Bithumb;