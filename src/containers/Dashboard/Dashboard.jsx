import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import AddExpense from '../../components/AddExpense/AddExpense';
import DeleteIcon from '../../assets/icon-delete.svg';
import PaymentCalculator from '../PaymentCalculator/PaymentCalculator';
import styles from './Dashboard.style';

const Dashboard = ({
    logout,
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
    resetDatabase
}) => {
    const [showModal, setShowModal] = useState(false);

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
                            <div>Opłacone przez:</div>
                            <div></div>
                        </div>
                    </div>
                    <div className="body">
                        {expenseTypeSelected === 'standard' && expenses.map((expense, i) => (
                            i < 3 && <div className="row" key={expense.uid}>
                                <div>{expense.name}</div>
                                <div>{expense.price}</div>
                                <div>{expense.user.charAt(0)}</div>
                                <div><Button type="deleteBtn" onClick={() => removeExpense(expense.uid)}><DeleteIcon /></Button></div>
                            </div>
                        ))}
                        {expenseTypeSelected === 'debt' && debt && debt.map((debt, i) => (
                            i < 3 && <div className="row" key={debt.uid}>
                                <div>{debt.name}</div>
                                <div>{debt.price}</div>
                                <div>{debt.user.charAt(0)}</div>
                                <div><Button type="deleteBtn" onClick={() => removeDebt(debt.uid)}><DeleteIcon /></Button></div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Button type="reset" onClick={() => setShowModal(true)}>RESET</Button>
            {showModal && 
                <div className="overlay">
                    <div className="modal">
                        Czy na pewno chcesz usunąć wszystkie wpisy w wydatkach?
                        <Button onClick={() => setShowModal(false)}>Nie</Button>
                        <Button type="reset" onClick={() => {
                            resetDatabase();
                            setShowModal(false);
                        }}>Tak</Button>
                    </div>
                </div>
            }
        </>
     );
}
 
export default Dashboard;