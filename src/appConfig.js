const percentage = {
    paymentPercentageMarcin: 0.80,
    paymentPercentageAnia: 0.20,
}

export default {
    getPercentage: (user) => {
        if (user === 'Marcin') {
            return percentage.paymentPercentageMarcin
        } else {
            return percentage.paymentPercentageAnia
        }
    }
}