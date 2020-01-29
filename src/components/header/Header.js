import React from 'react';
import { connect } from 'react-redux';
import TokenManager from '../../managers/TokenManager';
import './Header.scss';
import { logOut } from '../../store/actions/auth';
import { setPage } from '../../store/actions/navigation';
import PropTypes from 'prop-types';


function Header(props) {
    const logInBtnPressed = () => {
        props.goToLogin();
    };
    const registerBtnPressed = () => {
        props.goToRegister();
    };
    const logOutBtnPressed = () => {
        TokenManager.removeToken();
        props.logOut();
    }
    const cartBtnPressed = () => {
        props.goToCart();
    }
    const logoPressed = (event) => {
        props.goToIndex();
        event.preventDefault();
    }
    return (
        <header>
            <div className="header__logo">
                <a href="#" onClick={ logoPressed }>logo</a>
            </div>
            <div className="header__filler"></div>
            <div className="header__links">
                {!(props.token === null || props.token === '') ?
                    <>
                        <button onClick={cartBtnPressed}>Корзина</button>
                        <button onClick={logOutBtnPressed}>Выход</button>
                    </>
                    : 
                    <>
                        <button onClick={registerBtnPressed}>Регистрация</button>
                        <button onClick={logInBtnPressed}>Вход</button>
                    </>
                    }
            </div>
        </header>
    );
}

const mapStateToProps = state => {
    const { auth } = state;
    return {
        token: auth.token,
    }
}

const mapDispatchToProps = dispatch => ({
    goToLogin: () => dispatch(setPage("login")),
    goToIndex: () => dispatch(setPage("index")),
    goToRegister: () => dispatch(setPage("register")),
    goToCart: () => dispatch(setPage("cart")),
    logOut: () => dispatch(logOut())
})

Header.propTypes = {
    token: PropTypes.string,
    goToLogin: PropTypes.func.isRequired,
    goToIndex: PropTypes.func.isRequired,
    goToRegister: PropTypes.func.isRequired,
    goToCart: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);