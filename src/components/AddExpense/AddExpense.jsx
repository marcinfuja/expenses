import React, { useState, useRef, useEffect } from 'react';
import FormControl from '../FormControl/FormControl';
import Button from '../Button/Button';
import DatePicker from "react-datepicker";
import '../../react-datepicker.scss';
import PlusIcon from '../../assets/icon-plus.svg';
import styles from './AddExpense.style';
import stylesForm from '../FormControl/FormControl.style';

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

    useEffect(() => {
        nameInputRef.current.focus();
    }, [])

    const triggerSubmit = (event) => {
        if (event.which === 13) {
            verfifyexpense();
        }
    }

    const listenerCallback = () => {
        triggerSubmit()
        document.removeEventListener("keydown", listenerCallback, true);
    }

    const addEnterListener = () => {
        document.addEventListener("keydown", listenerCallback, true);
    }

    const clearState = () => {
        setState({...initialState})
    }
    const changeValue = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({ ...prevState, [name]: value }));
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
            <div css={styles.formContainer}>
                <div>
                    <FormControl nameInputRef={nameInputRef} value={expenseName} name="expenseName" onChange={changeValue} inputType="text" placeholder="Produkt/Usługa" />
                </div>
                <div>
                    <FormControl value={expensePrice} name="expensePrice" onChange={changeValue} inputType="number" placeholder="Cena"
                        enterOnPriceTriggerSubmit={triggerSubmit}
                        />
                </div>
                <div>
                    <DatePicker
                        selected={expenseDate}
                        css={stylesForm.formControl}
                        name="expenseDate"
                        withPortal
                        onChange={date => {
                            addEnterListener();
                            setExpenseDate(date)
                        }} />
                </div>
                <div>
                    <Button type="add" onClick={() => verfifyexpense()}>
                        <PlusIcon />
                    </Button>
                </div>
            </div>
        </div>
     );
}
 
export default AddExpense;