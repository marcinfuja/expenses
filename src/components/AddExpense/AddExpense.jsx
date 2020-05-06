import React, { useState } from 'react';
import FormControl from '../FormControl/FormControl';
import Button from '../Button/Button';
import PlusIcon from '../../assets/icon-plus.svg';
import './addExpense.scss';

const initialState = {
    expenseName: "",
    expensePrice: "",
    expenseWhoToPay: ""
}
const AddExpense = (props) => {
    let [{expenseName, expensePrice, expenseWhoToPay}, setState] = useState(initialState);

    const clearState = () => {
        setState({...initialState})
    }
    const changeValue = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    const whoShouldPay = props.user === 'Marcin' ? 'Ania' : 'Marcin';

    const verfifyexpense = () => {
        if (props.expenseTypeSelected === 'standard') {
            if (expenseName && expensePrice) {
                props.addExpense(expenseName, expensePrice);
                clearState()
            }
        }
        
        if (props.expenseTypeSelected === 'debt') {
            if (expenseName && expensePrice) {
                props.addExpense(expenseName, expensePrice);
                clearState()
            }
        }
    }

    return ( 
        <div className={`${props.successLightup ? 'highlight' : ''} addExpense-holder`}>
            <div>
                {props.expenseTypeSelected === 'debt' && 
                    <div>
                        Dłużnik - {whoShouldPay}
                    </div>
                }
            </div>
            <div>
                <FormControl value={expenseName} name="expenseName" onChange={changeValue} inputType="text" placeholder="Produkt/Usługa" />
                <FormControl value={expensePrice} name="expensePrice" onChange={changeValue} inputType="number" placeholder="Cena" />
                <Button type="add" onClick={() => verfifyexpense()}>
                    <PlusIcon />
                </Button>
            </div>
        </div>
     );
}
 
export default AddExpense;