const percentage = {
    paymentPercentageMarcin: 0.70,
    paymentPercentageAnia: 0.30,
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