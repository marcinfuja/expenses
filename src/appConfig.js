const percentage = {
  paymentPercentageMarcin: 0.5,
  paymentPercentageAnia: 0.5,
};

export default {
  getPercentage: (user) => {
    if (user === 'Marcin') {
      return percentage.paymentPercentageMarcin;
    } else {
      return percentage.paymentPercentageAnia;
    }
  },
};
