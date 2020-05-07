import React from 'react';
import Button from '../../components/Button/Button';
import DeleteIcon from '../../assets/icon-delete.svg';

const ExpenseList = ({
    expenses,
    debt,
    expenseTypeSelected,
    changeExpenseType
}) => {
    return (
        <> 
            <div className="button-holder">
                <Button type="expense" activeClass={expenseTypeSelected === 'standard' ? true : false} onClick={() => changeExpenseType('standard')}>Wydatki</Button>
                <Button type="expense" activeClass={expenseTypeSelected === 'debt' ? true : false} onClick={() => changeExpenseType('debt')}>Dług</Button>
            </div>
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
                        <div className="row" key={expense.uid}>
                            <div>{expense.name}</div>
                            <div>{expense.price}</div>
                            <div>{expense.user.charAt(0)}</div>
                            <div><Button type="deleteBtn" onClick={() => removeExpense(expense.uid)}><DeleteIcon /></Button></div>
                        </div>
                    ))}
                    {expenseTypeSelected === 'debt' && debt && debt.map((debt, i) => (
                        <div className="row" key={debt.uid}>
                            <div>{debt.name}</div>
                            <div>{debt.price}</div>
                            <div>{debt.user.charAt(0)}</div>
                            <div><Button type="deleteBtn" onClick={() => removeDebt(debt.uid)}><DeleteIcon /></Button></div>
                        </div>
                    ))}
                </div>
            </div>
        </>
     );
}
 
export default ExpenseList;