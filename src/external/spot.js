const Spot = async (currency = 'KRW', baseCurrency = 'USD') => {
  const url = `https://spot.coolbeans.fyi/${baseCurrency}/${currency}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.rate;
  } catch (err) {
    console.error(`${new Date().toLocaleTimeString()} ERROR Spot API...`);
    console.error(`${err}`);
  }
}

export default Spot;