import React, { useState, useRef } from 'react';
import FormControl from '../FormControl/FormControl';
import Button from '../Button/Button';
import DatePicker from "react-datepicker";
import '../../react-datepicker.scss';
import PlusIcon from '../../assets/icon-plus.svg';
import styles from './AddExpense.style';

const initialState = {
    expenseName: "",
    expensePrice: "",
    expenseDate: "",
    expenseWhoToPay: ""
}
const AddExpense = (props) => {
    let [{expenseName, expensePrice, expenseWhoToPay}, setState] = useState(initialState);
    const [expenseDate, setExpenseDate] = useState(new Date());

    const nameInputRef = useRef(null);

    const clearState = () => {
        setState({...initialState})
    }
    const changeValue = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    const enterOnPriceTriggerSubmit = (event) => {
        if (event.which === 13) {
            verfifyexpense();
        }
    }

    const whoShouldPay = props.user === 'Marcin' ? 'Ania' : 'Marcin';

    const verfifyexpense = () => {
        const verifiedDate = expenseDate ? expenseDate : new Date();

        if (props.expenseTypeSelected === 'standard') {
            if (expenseName && expensePrice) {
                props.addExpense(expenseName, expensePrice, verifiedDate);
                clearState()
            }
        }
        
        if (props.expenseTypeSelected === 'debt') {
            if (expenseName && expensePrice) {
                props.addExpense(expenseName, expensePrice, verifiedDate);
                clearState()
            }
        }
        nameInputRef.current.focus();
    }

    return ( 
        <div css={[styles.addExpenseHolder, props.successLightup ? styles.highlight : '']}>
            <div css={styles.top}>
                {props.expenseTypeSelected === 'debt' && 
                    <span css={styles.personInDebt}>
                        Dłużnik - {whoShouldPay}
                    </span>
                }
            </div>
            <div>
                <FormControl nameInputRef={nameInputRef} value={expenseName} name="expenseName" onChange={changeValue} inputType="text" placeholder="Produkt/Usługa" />
                <FormControl value={expensePrice} name="expensePrice" onChange={changeValue} inputType="number" placeholder="Cena"
                    // enterOnPriceTriggerSubmit={enterOnPriceTriggerSubmit}
                     />
                <DatePicker selected={expenseDate} name="expenseDate" onChange={date => setExpenseDate(date)} />
                     
                <Button type="add" onClick={() => verfifyexpense()}>
                    <PlusIcon />
                </Button>
            </div>
        </div>
     );
}
 
export default AddExpense;