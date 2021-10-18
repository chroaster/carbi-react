const SigDig = (value) => {
  if (value < .0001) {
    return '< .0001';
  } else if (value < .001) {
    return '< .001';
  } else if (value < .01) {
    return '< .01';
  } else if (value < .1) {
    return '< .1';
  } else if (value < 1) {
    return value.toFixed(4).substr(1);
  } else if (value < 10) {
    return value.toFixed(3);
  } else if (value < 100) {
    return value.toFixed(2);
  } else if (value < 1000) {
    return value.toFixed(1);
  } else {
    return value.toFixed(0);
  }
}

export default SigDig;