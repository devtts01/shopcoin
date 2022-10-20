/* eslint-disable prettier/prettier */
export const formatVND = money => {
  return money?.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
};
export const formatUSDT = usdt => {
  return usdt?.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'USD',
  });
};
