const percentage = {
  paymentPercentageMarcin: 0.65,
  paymentPercentageAnia: 0.35,
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
