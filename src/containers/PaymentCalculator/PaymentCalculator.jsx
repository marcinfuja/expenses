import React, { useState } from 'react';
import styles from './PaymentCalculator.style';
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
        <div css={styles.payoutSummary}>
            {summary.howMuch === 0 ? 
                <span css={styles.payoutSummaryAmount}>Czyste konto</span>
                :
                <>{summary.whoOws} płaci <span css={styles.payoutSummaryAmmount}>{summary.howMuch} zł</span></>
            }
        </div>
    );
}
 
export default PaymentCalculator;