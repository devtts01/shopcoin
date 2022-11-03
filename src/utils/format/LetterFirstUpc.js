const FirstUpc = (str) => {
    // viết hoa chữ cái mỗi từ: example on hold => On Hold
    // if (str) {
    //     return str
    //         .split(' ')
    //         .map((word) => word[0].toUpperCase() + word.slice(1))
    //         .join(' ');
    // }
    return str?.charAt(0)?.toUpperCase() + str?.slice(1)?.toLowerCase();
};
export { FirstUpc };
