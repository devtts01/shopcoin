/* eslint-disable prettier/prettier */
const useGetUSDT = (dataDeposits, email) => {
  const dataUserDeposits = dataDeposits?.reduce((acc, item) => {
    if (item?.user === email) {
      acc.push(item);
    }
    return acc;
  }, []);
  const totalAmountUSDT = dataUserDeposits?.reduce((acc, item) => {
    acc += parseFloat(item?.amount);
    return acc;
  }, 0);
  return totalAmountUSDT;
};

export default useGetUSDT;
