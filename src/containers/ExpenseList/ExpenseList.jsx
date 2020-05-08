import React from 'react';
import Button from '../../components/Button/Button';
import DeleteIcon from '../../assets/icon-delete.svg';

const ExpenseList = ({
    expenses,
    debt,
    expenseTypeSelected,
    changeExpenseType
}) => {
    
    const sortedExpenses = expenses.sort((a, b) => b.date - a.date);
    const sortedDebt = debt.sort((a, b) => b.date - a.date);

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
                    {expenseTypeSelected === 'standard' && sortedExpenses.map((expense, i) => {
                        const formattedDate = new Date(expense.date).toLocaleDateString("pl-PL")
                        return (
                            <div className="row" key={expense.uid}>
                                <div>{expense.name}</div>
                                <div>{expense.price}</div>
                                <div>{expense.user.charAt(0)}</div>
                                <div>{formattedDate}</div>
                                <div><Button type="deleteBtn" onClick={() => removeExpense(expense.uid)}><DeleteIcon /></Button></div>
                            </div>
                        )
                    }
                    )}
                    {expenseTypeSelected === 'debt' && debt && sortedDebt.map((debt, i) =>  {
                        const formattedDate = new Date(debt.date).toLocaleDateString("pl-PL")
                        return (
                        <div className="row" key={debt.uid}>
                            <div>{debt.name}</div>
                            <div>{debt.price}</div>
                            <div>{debt.user.charAt(0)}</div>
                            <div>{formattedDate}</div>
                            <div><Button type="deleteBtn" onClick={() => removeDebt(debt.uid)}><DeleteIcon /></Button></div>
                        </div>
                        )
                    }
                    )}
                </div>
            </div>
        </>
     );
}
 
export default ExpenseList;