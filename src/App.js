import React, { Component } from 'react';
import * as firebase from "firebase/app";
import "firebase/database";
import { css } from '@emotion/core';

import './reset.scss';
import './App.scss';

import Navigation from './components/Navigation/Navigation';
import Button from './components/Button/Button';
import AddExpense from './components/AddExpense/AddExpense';
import DeleteIcon from './assets/icon-delete.svg';
import PaymentCalculator from './containers/PaymentCalculator/PaymentCalculator';

class App extends Component {
    state = {
        showModal: false,
        user: 'Marcin',
        expenseTypeSelected: 'standard',
        expenses: [],
        debt: [],
        successLightup: false
    }

    updateExpensesList = (expenses) => {
        let value;

        if (expenses === null) {
            value = [];
        }
        if (typeof expenses === 'undefined') {
            value = [];
        }
        if (expenses) {
            value = expenses;
        }

        this.setState({
            expenses: [...value],
            successLightup: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    successLightup: false
                });
            }, 500)
        });
    }

    connectToFirebaseRef = (ref) => {
        const databaseRef = firebase.database().ref(ref);

        databaseRef.on("value", function(snapshot) {
            if (ref === 'expenses') {
                this.readExpenseData(snapshot);
            }
            if (ref === 'debt') {
                this.readDebtData(snapshot);
            }
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        }, this);
    }

    readExpenseData = (snapshot) => {
        if (snapshot.val()) {
            let expensesObject = snapshot.val();
            const expensesList = Object.keys(expensesObject).map(key => ({
                ...expensesObject[key],
                uid: key,
            }));
            this.updateExpensesList(expensesList)
        } else {
            this.updateExpensesList()
        }
    }

    readDebtData = (snapshot) => {
        if (snapshot.val()) {
            let debtObject = snapshot.val();
            const debtList = Object.keys(debtObject).map(key => ({
                ...debtObject[key],
                uid: key,
            }));
            this.setState({
                debt: debtList,
            });
        } else {
            this.setState({
                debt: [],
            });
        }
    }
    
    changeExpenseType = (type) => {
        this.setState({
            expenseTypeSelected: type
        })
    }

    resetDatabase = () => {
        firebase.database().ref('expenses').remove();
        firebase.database().ref('debt').remove();
        this.setState({showModal: false});
    }
    
    generateID = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    removeExpense = (uid) => {
        firebase.database().ref('expenses/' + uid).remove();
    }
    removeDebt = (uid) => {
        firebase.database().ref('debt/' + uid).remove();
    }

    changeUser = (user) => {
        this.setState({
            user: user
        })
    }

    writeExpenseData = (user, type, name, price) => {
        firebase.database().ref('expenses/' + this.generateID()).set({
            user: user,
            type: type,
            name : name,
            price: price,
        });
    }
1
    writeDebtData = (user, type, name, price, whoShouldPay) => {
        firebase.database().ref('debt/' + this.generateID()).set({
            user: user,
            type: type,
            name : name,
            price: price,
            whoShouldPay: whoShouldPay
        });
    }

    addExpense = (name, price) => {
        const whoShouldPay = this.state.user === 'Marcin' ? 'Ania' : 'Marcin';
        if (this.state.expenseTypeSelected === 'debt') {
            this.setState({
                name: name,
                price: price,
                whoShouldPay: whoShouldPay
            }, () => {
                this.writeDebtData(this.state.user, this.state.expenseTypeSelected, this.state.name, this.state.price, this.state.whoShouldPay);
            })
        } else {
            this.setState({
                name: name,
                price: price,
                whoShouldPay: whoShouldPay
            }, () => {
                this.writeExpenseData(this.state.user, this.state.expenseTypeSelected, this.state.name, this.state.price);
            })
        }
    }
    
    componentDidMount() {
        this.connectToFirebaseRef('expenses');
        this.connectToFirebaseRef('debt');
    }

    render() {
    const { expenseTypeSelected, successLightup, expenses, debt, showModal } = this.state;
      return (
        <div className="App">
            <div className="container">
                <Navigation />
                <main>
                    <PaymentCalculator expenses={expenses} debt={debt} />
                    <h2 className="header--secondary">Dodaj wydatek</h2>
                    <div className="button-holder">
                        <button onClick={() => this.changeUser('Marcin')}>Marcin</button>
                        <button onClick={() => this.changeUser('Ania')}>Ania</button>
                    </div>
                    <div className="button-holder">
                        <Button type="expense" activeClass={expenseTypeSelected === 'standard' ? true : false} onClick={() => this.changeExpenseType('standard')}>Standardowe</Button>
                        <Button type="expense" activeClass={expenseTypeSelected === 'debt' ? true : false} onClick={() => this.changeExpenseType('debt')}>Dodaj dług</Button>
                    </div>
                    <AddExpense user={this.state.user} addExpense={this.addExpense} resetExpenseForm={this.resetExpenseForm} expenseTypeSelected={expenseTypeSelected} successLightup={successLightup} />
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
                            {this.state.expenseTypeSelected === 'standard' && this.state.expenses.map(expense => (
                                <div className="row" key={expense.uid}>
                                    <div>{expense.name}</div>
                                    <div>{expense.price}</div>
                                    <div>{expense.user}</div>
                                    <div><Button type="delete" onClick={() => this.removeExpense(expense.uid)}><DeleteIcon /></Button></div>
                                </div>
                            ))}
                            {this.state.expenseTypeSelected === 'debt' && this.state.debt && this.state.debt.map(debt => (
                                <div className="row" key={debt.uid}>
                                    <div>{debt.name}</div>
                                    <div>{debt.price}</div>
                                    <div>{debt.user}</div>
                                    <div><Button type="delete" onClick={() => this.removeDebt(debt.uid)}><DeleteIcon /></Button></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
                <Button type="reset" onClick={() => this.setState({showModal: true})}>RESET</Button>
                {showModal && 
                    <div className="overlay">
                        <div className="modal">
                            Czy na pewno chcesz usunąć wszystkie wpisy w wydatkach?
                            <Button onClick={() => this.setState({showModal: false})}>Nie</Button>
                            <Button type="reset" onClick={this.resetDatabase}>Tak</Button>
                        </div>
                    </div>
                }
            </div>
        </div>
      )
    }
}

export default App;