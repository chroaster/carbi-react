import React from 'react';

const MarginCell = ({ source, target }) => {
  const [s, t] = [Number.parseFloat(source), Number.parseFloat(target)];
  if (!isNaN(s) && !isNaN(t)) {
    const m = ((t - s) / s) * 100;
    return (
      <>
        {m.toFixed(1)}
      </>
    );
  } else {
    return (
      <></>
    );
  }
}

export default MarginCell;