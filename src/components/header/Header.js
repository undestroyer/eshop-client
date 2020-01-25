import React from 'react';
import { connect } from 'react-redux';
import './Header.scss';
import { logIn, logOut } from '../../store/actions/auth';


function Header(props) {
    const logInBtnPressed = () => {
        props.logIn("test");
    };
    const logOutBtnPressed = () => {
        props.logOut();
    }
    return (
        <header>
            <div className="header__logo">
                logo
            </div>
            <div className="header__filler"></div>
            <div className="header__links">
                {!(props.token === null || props.token === '') ?
                    <>
                        <button>Корзина</button>
                        <button onClick={logOutBtnPressed}>Выйти</button>
                    </>
                    : <button onClick={logInBtnPressed}>Войти</button>}
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
    logIn: (token) => dispatch(logIn(token)),
    logOut: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);