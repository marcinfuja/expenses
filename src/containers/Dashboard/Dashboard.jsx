import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import AddExpense from '../../components/AddExpense/AddExpense';
import DeleteIcon from '../../assets/icon-delete.svg';
import PaymentCalculator from '../PaymentCalculator/PaymentCalculator';
import styles from './Dashboard.style';

const Dashboard = ({
    changeUser,
    changeExpenseType,
    resetExpenseForm,
    addExpense,
    removeExpense,
    removeDebt,
    expenseTypeSelected,
    successLightup,
    expenses,
    debt,
    userName,
}) => {

    const sortedExpenses = expenses.sort((a, b) => b.date - a.date);
    
    return ( 
        <>
            <main css={styles.main}>
                <PaymentCalculator expenses={expenses} debt={debt} />
                {false && <div className="button-holder">
                    <button onClick={() => changeUser('Marcin')}>Marcin</button>
                    <button onClick={() => changeUser('Ania')}>Ania</button>
                </div>}
                <div className="button-holder">
                    <Button type="expense" activeClass={expenseTypeSelected === 'standard' ? true : false} onClick={() => changeExpenseType('standard')}>Dodaj wydatek</Button>
                    <Button type="expense" activeClass={expenseTypeSelected === 'debt' ? true : false} onClick={() => changeExpenseType('debt')}>Dodaj dług</Button>
                </div>
                <AddExpense user={userName} addExpense={addExpense} resetExpenseForm={resetExpenseForm} expenseTypeSelected={expenseTypeSelected} successLightup={successLightup} />
                <div className="table-alike">
                    <div className="head">
                        <div className="row">
                            <div>Nazwa:</div>
                            <div>Cena</div>
                            <div>Kto:</div>
                            <div>Data:</div>
                            <div></div>
                        </div>
                    </div>
                    <div className="body">
                        {expenseTypeSelected === 'standard' && sortedExpenses.map((expense, i) => {
                            const formattedDate = new Date(expense.date).toLocaleDateString("pl-PL", { month:"2-digit", day:"2-digit" })
                            return (
                                <div className="row" key={expense.uid}>
                                    <div>{expense.name}</div>
                                    <div>{expense.price}</div>
                                    <div>{expense.user && expense.user.charAt(0)}</div>
                                    <div>{formattedDate}</div>
                                    <div><Button type="deleteBtn" onClick={() => removeExpense(expense.uid)}><DeleteIcon /></Button></div>
                                </div>
                            )
                        }
                        )}
                        {expenseTypeSelected === 'debt' && debt && debt.map((debt, i) =>  {
                            const formattedDate = new Date(debt.date).toLocaleDateString("pl-PL")
                            return (
                            <div className="row" key={debt.uid}>
                                <div>{debt.name}</div>
                                <div>{debt.price}</div>
                                <div>{debt.user && debt.user.charAt(0)}</div>
                                <div>{formattedDate}</div>
                                <div><Button type="deleteBtn" onClick={() => removeDebt(debt.uid)}><DeleteIcon /></Button></div>
                            </div>
                            )
                        }
                        )}
                    </div>
                </div>
            </main>
        </>
     );
}
 
export default Dashboard;