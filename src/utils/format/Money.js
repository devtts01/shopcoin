/* eslint-disable prettier/prettier */
export const formatVND = money => {
  return money?.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
};
export const formatUSDT = usdt => {
  return usdt
    ?.toLocaleString('it-IT', {
      style: 'currency',
      currency: 'USD',
    })
    ?.replace(/\$/g, 'D');
};
export const precisionRound = number => {
  let precision = 5;
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};
