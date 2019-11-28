const floor = (value) => {
  const n = 2, x = 3;
  const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
  const val = (Math.floor(parseFloat(value || 0) * 100) / 100).toFixed(2);
  return val.replace(new RegExp(re, 'g'), '$&,');
};

export default floor;
