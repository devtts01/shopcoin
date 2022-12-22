//https://www.samanthaming.com/tidbits/30-how-to-format-currency-in-es6/
export const formatUSD = (number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // notation: 'compact', // compact, short, long - rút gọn
        // compactDisplay: 'short'  ,
    }).format(number);
};
export const coinUSD = (number) => {
    return (
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            // notation: 'compact', // compact, short, long - rút gọn
            // compactDisplay: 'short'  ,
        })
            .format(number)
            .replace('$', '') + ' USD'
    );
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

export const precisionRound = (number) => {
    let precision = 5;
    let factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
};
