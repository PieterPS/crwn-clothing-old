import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth } from '../../firebase/firebase';
import CartIcon from '../cartIcon/CartIcon';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import './header.scss';
import CartDropdown from '../cart/CartDropdown';

const Header = ({ currentUser, hidden }) => {
  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link to='/shop' className="option">SHOP</Link>
        <Link to='/contact' className="option">CONTACT</Link>
        {
          currentUser ? 
          <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
          :
          <Link className="option" to="/signin">SIGN IN</Link>
        }
        <CartIcon />
      </div>
      {
        hidden ? null : <CartDropdown />
      }
    </div>
  );
}

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => {
  return {
    currentUser,
    hidden
  }
}
 
export default connect(mapStateToProps)(Header);