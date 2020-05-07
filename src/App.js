import React, { Component } from 'react';
import { firebase, auth, provider } from '../firebase.js';
import { users } from '../variables';
import styles from './App.style';
import './reset.scss';
import './App.scss';

import Navigation from './components/Navigation/Navigation';
import Button from './components/Button/Button';
import AddExpense from './components/AddExpense/AddExpense';
import DeleteIcon from './assets/icon-delete.svg';
import PaymentCalculator from './containers/PaymentCalculator/PaymentCalculator';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            showModal: false,
            userName: null,
            expenseTypeSelected: 'standard',
            expenses: [],
            debt: [],
            successLightup: false,
            showApp: false
        }
        
    }

    login = () => {
        auth.signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
                this.setState({
                    user: result.user,
                    showApp: true
                });
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
        // auth.signInWithPopup(provider).then((result) => {
        //     this.setState({
        //         user: result.user
        //     });
        // });
    }
    logout = () => {
        auth.signOut().then((result) => {
            this.setState({
                user: null,
                showApp: false
            })
        })
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

    changeUser = (userName) => {
        this.setState({
            userName: userName
        })
    }

    writeExpenseData = (userName, type, name, price) => {
        firebase.database().ref('expenses/' + this.generateID()).set({
            user: userName,
            type: type,
            name : name,
            price: price,
        });
    }

    writeDebtData = (userName, type, name, price, whoShouldPay) => {
        firebase.database().ref('debt/' + this.generateID()).set({
            user: userName,
            type: type,
            name : name,
            price: price,
            whoShouldPay: whoShouldPay
        });
    }

    addExpense = (name, price) => {
        const whoShouldPay = this.state.userName === 'Marcin' ? 'Ania' : 'Marcin';
        if (this.state.expenseTypeSelected === 'debt') {
            this.setState({
                name: name,
                price: price,
                whoShouldPay: whoShouldPay
            }, () => {
                this.writeDebtData(this.state.userName, this.state.expenseTypeSelected, this.state.name, this.state.price, this.state.whoShouldPay);
            })
        } else {
            this.setState({
                name: name,
                price: price,
                whoShouldPay: whoShouldPay
            }, () => {
                this.writeExpenseData(this.state.userName, this.state.expenseTypeSelected, this.state.name, this.state.price);
            })
        }
    }
    
    componentDidMount() {
        // this.login();
        auth.onAuthStateChanged(user => {
            if (user) {
                if (user.email) {
                    console.log(user)
                    this.setState({
                        showApp: true
                    })
                }
                this.setState({
                    user,
                })
                for (let key in users) {
                    if (users[key].email === user.email) {
                        this.setState({
                            userName: users[key].name
                        });
                    }
                }
            }
        })
        this.connectToFirebaseRef('expenses');
        this.connectToFirebaseRef('debt');

    }

    render() {
    const { expenseTypeSelected, successLightup, expenses, debt, showModal, showApp, userName} = this.state;
      return (
        <div css={styles.app}>
            <div css={styles.container}>
            {showApp ? 
                <>
                    <Navigation userName={userName} logout={this.logout} />
                    <main css={styles.main}>
                        <PaymentCalculator expenses={expenses} debt={debt} />
                        {false && <div className="button-holder">
                            <button onClick={() => this.changeUser('Marcin')}>Marcin</button>
                            <button onClick={() => this.changeUser('Ania')}>Ania</button>
                        </div>}
                        <div className="button-holder">
                            <Button type="expense" activeClass={expenseTypeSelected === 'standard' ? true : false} onClick={() => this.changeExpenseType('standard')}>Dodaj wydatek</Button>
                            <Button type="expense" activeClass={expenseTypeSelected === 'debt' ? true : false} onClick={() => this.changeExpenseType('debt')}>Dodaj dług</Button>
                        </div>
                        <AddExpense user={this.state.userName} addExpense={this.addExpense} resetExpenseForm={this.resetExpenseForm} expenseTypeSelected={expenseTypeSelected} successLightup={successLightup} />
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
                                {this.state.expenseTypeSelected === 'standard' && this.state.expenses.map((expense, i) => (
                                    i < 3 && <div className="row" key={expense.uid}>
                                        <div>{expense.name}</div>
                                        <div>{expense.price}</div>
                                        <div>{expense.user.charAt(0)}</div>
                                        <div><Button type="deleteBtn" onClick={() => this.removeExpense(expense.uid)}><DeleteIcon /></Button></div>
                                    </div>
                                ))}
                                {this.state.expenseTypeSelected === 'debt' && this.state.debt && this.state.debt.map((debt, i) => (
                                    i < 3 && <div className="row" key={debt.uid}>
                                        <div>{debt.name}</div>
                                        <div>{debt.price}</div>
                                        <div>{debt.user.charAt(0)}</div>
                                        <div><Button type="deleteBtn" onClick={() => this.removeDebt(debt.uid)}><DeleteIcon /></Button></div>
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
                </> :
                <div css={styles.loginScreen}>
                    <h1>Wydatki</h1>
                    <button onClick={this.login}>Zaloguj się</button> 
                </div>
            }
            </div>
        </div>
      )
    }
}

export default App;