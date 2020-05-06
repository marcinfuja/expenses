import React, { useState } from 'react';
import './PaymentCalculator.scss';
import AppConfig from '../../appConfig';

const PaymentCalculator = ({expenses, debt}) => {
    const expensesArray = expenses;
    const debtArray = debt;

    const difference = (a, b) => { return Math.abs(a - b); }

    const dividePayments = (user, expenses) => {
        const precentage = AppConfig.getPercentage(user);
        const dividedPayments = expenses.length > 0 && 
            expenses
                .filter(expense => expense.user !== user)
                .map(expense => {
                    return parseInt(expense.price * precentage);
                })
                .reduce((previousValue, currentValue) => previousValue + currentValue, 0 );

        return dividedPayments;
    }

    const divideDebt = (user, debt) => {
        const dividedDebt = debt
            .filter(element => element.whoShouldPay === user)
            .map(element => {
                return parseInt(element.price);
            })
            .reduce((previousValue, currentValue) => previousValue + currentValue, 0 );

        return dividedDebt;

    }

    const standardPaymentsMarcin = dividePayments('Marcin', expensesArray, 'standard');
    const standardPaymentsAnia = dividePayments('Ania', expensesArray, 'standard');
    const dividedDebtForMarcin = divideDebt('Marcin', debtArray);
    const dividedDebtForAnia = divideDebt('Ania', debtArray);
    // const specificPaymentsAnia = dividePayments('Ania', expensesArray, 'specific');

    const calculateSummary = () => {
        const marcin = standardPaymentsMarcin + dividedDebtForMarcin;
        const ania = standardPaymentsAnia + dividedDebtForAnia;

        if (marcin > ania) {
            return {
                whoOws: 'Marcin',
                howMuch: difference(marcin, ania)
            }
        } else {
            return {
                whoOws: 'Ania',
                howMuch: difference(ania, marcin)
            }
        }
    }

    const summary = calculateSummary();

    return ( 
        <div className="payout-summary">
            {summary.howMuch === 0 ? 
                <span className="payout-summary__amount">Czyste konto</span>
                :
                <>{summary.whoOws} płaci <span className="payout-summary__amount">{summary.howMuch} zł</span></>
            }
        </div>
    );
}
 
export default PaymentCalculator;