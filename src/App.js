import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import { firebase, auth, provider } from '../firebase.js';
import { users } from '../variables';
import styles from './App.style';
import './reset.scss';
import './App.scss';

import Dashboard from './containers/Dashboard/Dashboard.jsx';
import ExpenseList from './containers/ExpenseList/ExpenseList';
import Navigation from './components/Navigation/Navigation';
import Button from './components/Button/Button';


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

    writeExpenseData = (userName, type, name, price, date) => {
        const timestamp = date.getTime();

        firebase.database().ref('expenses/' + this.generateID()).set({
            user: userName,
            type: type,
            name : name,
            price: price,
            date: timestamp,
        });
    }

    writeDebtData = (userName, type, name, price, date, whoShouldPay) => {
        const timestamp = date.getTime();

        firebase.database().ref('debt/' + this.generateID()).set({
            user: userName,
            type: type,
            name : name,
            price: price,
            date: timestamp,
            whoShouldPay: whoShouldPay
        });
    }

    addExpense = (name, price, date) => {
        const whoShouldPay = this.state.userName === 'Marcin' ? 'Ania' : 'Marcin';
        if (this.state.expenseTypeSelected === 'debt') {
            this.setState({
                name: name,
                price: price,
                date: date,
                whoShouldPay: whoShouldPay
            }, () => {
                this.writeDebtData(
                    this.state.userName,
                    this.state.expenseTypeSelected,
                    this.state.name,
                    this.state.price,
                    this.state.date,
                    this.state.whoShouldPay
                );
            })
        } else {
            this.setState({
                name: name,
                price: price,
                date: date,
                whoShouldPay: whoShouldPay
            }, () => {
                this.writeExpenseData(
                    this.state.userName,
                    this.state.expenseTypeSelected,
                    this.state.name,
                    this.state.price,
                    this.state.date
                );
            })
        }
    }
    
    componentDidMount() {
        this.login();
        auth.onAuthStateChanged(user => {
            if (user) {
                if (user.email) {
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
    const { expenseTypeSelected, successLightup, expenses, debt, showApp, userName, showModal} = this.state;
      return (
            <div css={styles.app}>
                <div css={styles.container}>
                    <Router>
                        {showApp ? 
                            <>
                                <Navigation userName={userName} logout={this.logout} />
                                <Switch>
                                    <Route path="/expenses">
                                        <ExpenseList
                                            expenses={expenses}
                                            debt={debt}
                                            expenseTypeSelected={expenseTypeSelected}
                                            changeExpenseType={this.changeExpenseType}
                                        />
                                    </Route>
                                    <Route path="/">
                                        <Dashboard
                                            changeUser={this.changeUser}
                                            changeExpenseType={this.changeExpenseType}
                                            resetExpenseForm={this.resetExpenseForm}
                                            addExpense={this.addExpense}
                                            removeExpense={this.removeExpense}
                                            removeDebt={this.removeDebt}
                                            expenseTypeSelected={expenseTypeSelected}
                                            successLightup={successLightup}
                                            expenses={expenses}
                                            debt={debt}
                                            userName={userName}
                                        />
                                    </Route>
                                </Switch>
                                <Button type="reset" onClick={() => this.setState({ showModal: true })}>RESET</Button>
                                {showModal && 
                                    <div className="overlay">
                                        <div className="modal">
                                            Czy na pewno chcesz usunąć wszystkie wpisy w wydatkach?
                                            <div>
                                                <Button onClick={() => this.setState({ showModal: false })}>Nie</Button>
                                                <Button type="reset" onClick={() => {
                                                    this.resetDatabase();
                                                    this.setState({ showModal: false });
                                                }}>Tak</Button>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </> :
                            <div css={styles.loginScreen}>
                                <h1>Wydatki</h1>
                                <button onClick={this.login}>Zaloguj się</button> 
                            </div>
                        }
                </Router>
            </div>
        </div>
      )
    }
}

export default App;