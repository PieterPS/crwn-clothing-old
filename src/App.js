import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux';

import { setCurrentUser } from './redux/user/userActions';

import './App.css';

import Header from './components/header/Header';
import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shoppage/ShopPage';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/SignInAndSignUpPage';
import { auth, createUserProfileDocument } from './firebase/firebase';

class App extends Component {
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        });
      } else {
        setCurrentUser(userAuth)
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default connect(null,  { setCurrentUser })(App);
