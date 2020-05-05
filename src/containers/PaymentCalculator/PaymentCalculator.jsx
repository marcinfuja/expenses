import React, { useState } from 'react';
import './PaymentCalculator.scss';
import AppConfig from '../../appConfig';

const PaymentCalculator = ({expenses}) => {
    const expensesArray = expenses;

    const difference = (a, b) => { return Math.abs(a - b); }

    const dividePayments = (user, expenses, expenseType) => {
        const precentage = AppConfig.getPercentage(user);
        const dividedPayments = expenses.length > 0 && 
            expenses
                .filter(expense => expense.type === expenseType)
                .filter(expense => expense.user !== user)
                .map(expense => {
                    if (expenseType === 'standard') {
                        return expense.price * precentage;
                    } else {
                        return expense.price
                    }
                })
                .reduce((previousValue, currentValue) => {
                    return previousValue + currentValue;
                });

        return dividedPayments;
    }

    const standardPaymentsMarcin = dividePayments('Marcin', expensesArray, 'standard');
    const standardPaymentsAnia = dividePayments('Ania', expensesArray, 'standard');
    // const specificPaymentsMarcin = dividePayments('Marcin', expensesArray, 'specific');
    // const specificPaymentsAnia = dividePayments('Ania', expensesArray, 'specific');


    const summary = Math.round(difference(standardPaymentsMarcin, standardPaymentsAnia));

    return ( 
        <div className="payout-summary">
            Marcin płaci <span className="payout-summary__amount">{summary} zł</span>
        </div>
    );
}
 
export default PaymentCalculator;