import React from 'react';
import { connect } from 'react-redux';
import './Header.scss';
import { logOut } from '../../store/actions/auth';
import { setPage } from '../../store/actions/navigation';


function Header(props) {
    const logInBtnPressed = () => {
        props.goToLogin();
    };
    const registerBtnPressed = () => {
        props.goToRegister();
    };
    const logOutBtnPressed = () => {
        props.logOut();
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
                        <button>Корзина</button>
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
    logOut: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);