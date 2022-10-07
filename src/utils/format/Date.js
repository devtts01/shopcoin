/* eslint-disable prettier/prettier */
import moment from 'moment';
export const dateFormat = (date, format) => {
  return moment(date).format(format);
};
