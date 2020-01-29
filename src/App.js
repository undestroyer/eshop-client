import IndexPage from './pages/index/IndexPage'
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { setPage } from './store/actions/navigation';
import { resetCart } from './store/actions/cart';
import './App.css';
import LoginPage from './pages/login/LoginPage';
import RegisterPage from './pages/register/RegisterPage';
import CartPage from './pages/cart/CartPage';
import TokenManager from './managers/TokenManager';
import Token from './models/Token';
import { logIn } from './store/actions/auth';

function App(props) {
  const [cartLockoutTimer, setCartLockoutTimer] = useState();
  
  useEffect(() => {
    const savedToken = TokenManager.getToken(null)
    if (savedToken !== null) {
      const tokenObject = Token.buildFromJson(savedToken);
      props.logIn(tokenObject.token);
    }
  }, []);

  /**
   * Эффект запускается при назначении значения стейту cart.cartLockedUntil
   * Эффект вычисляет сколько миллисекунд между датой очистки корзины и 
   * текущим временем у пользователя. Ставит отложенный вызов функции очистки 
   * на этот интервал времени. За счет этого в 00:00 у пользователя автоматически
   * очищается корзина.
   */
  useEffect(() => {
    if (cartLockoutTimer !== null) {
      clearTimeout(cartLockoutTimer);
      setCartLockoutTimer(null);
    }
    if (props.cartLockedUntil === null) return;
    const curDate = new Date();
    const curTS = curDate.getTime();
    setCartLockoutTimer(setTimeout(() => {
      console.log("clear");
    },  props.cartLockedUntil-curTS));
  }, [props.cartLockedUntil]);

  return (
    <div className="App">
      { props.pageName === "index" ? <IndexPage /> : 
          props.pageName === "login" ? <LoginPage /> :
            props.pageName === "register" ? <RegisterPage /> :
              props.pageName === "cart" ? <CartPage /> :
              ""
      }
    </div>
  );
}

const mapStateToProps = state => {
  const { navigation, cart } = state;
  return {
      pageName: navigation.pageName,
      cartLockedUntil: cart.lockedUntil
  }
}

const mapDispatchToProps = dispatch => ({
  goToPage: (pageName) => dispatch(setPage(pageName)),
  logIn: (token) => dispatch(logIn(token)),
  resetCart: () => dispatch(resetCart()),
})

App.propTypes = {
  cartLockedUntil: PropTypes.number,
  pageName: PropTypes.string,
  goToPage: PropTypes.func,
  logIn: PropTypes.func,
  resetCart: PropTypes.func,
}

App.defaultProps = {
  pageName: "",
  goToPage: () => {},
  logIn: () => {},
  resetCart: () => {},
}

export default connect(mapStateToProps, mapDispatchToProps)(App);