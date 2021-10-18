const MarginCell = ({ sourcePrice, targetPrice }) => {
  const [s, t] = [Number.parseFloat(sourcePrice), Number.parseFloat(targetPrice)];

  const shouldRender = () => {
    return !isNaN(s) && !isNaN(t) && isFinite(s) && isFinite(t)
  }

  return (
    <>{shouldRender && (((t - s) / s) * 100).toFixed(1)}</>
  )
}

export default MarginCell;