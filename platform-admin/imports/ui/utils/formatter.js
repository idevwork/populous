import moment from 'moment';

export const formatDateTime = value => {
  if (!value) {
    return value;
  }
  return moment(value).toISOString();
};


export const humanize = (text, addSpace = false) => {
  text = text
          .toString()
          .replace(/^[\s_]+|[\s_]+$/g, '')
          .replace(/[_\s]+/g, ' ')
          .replace(/^[a-z]/, (m) => m.toUpperCase());
  if(!addSpace) return text;
  return text.replace(/([A-Z])/g, ' $1').trim();
};

export const scientificToDecimal = (value) => {

  //if the number is in scientific notation remove it
  if(/\d+\.?\d*e[\+\-]*\d+/i.test(value)) {
    let zero = '0',
      parts = String(value).toLowerCase().split('e'), //split into coeff and exponent
      e = parts.pop(),                                //store the exponential part
      l = Math.abs(e),                                //get the number of zeros
      sign = e/l,
      coeff_array = parts[0].split('.');
    if(sign === -1) {
      value = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
    }
    else {
      let dec = coeff_array[1];
      if(dec) l = l - dec.length;
      value = coeff_array.join('') + new Array(l+1).join(zero);
    }
  }

  return value;
};

export default {
  formatDateTime,
  scientificToDecimal
};
