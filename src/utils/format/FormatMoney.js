//https://www.samanthaming.com/tidbits/30-how-to-format-currency-in-es6/
export const formatUSD = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // notation: 'compact', // compact, short, long - rút gọn
        // compactDisplay: 'short'  ,
    }).format(number);
};
// FORMAT VND
export const formatVND = (number) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        // notation: 'compact', // compact, short, long - rút gọn
        // compactDisplay: 'short'  ,
    }).format(number);
};
