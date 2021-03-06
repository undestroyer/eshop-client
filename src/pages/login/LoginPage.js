import React, { useState } from 'react';
import Header from '../../components/header/Header';
import { setPage } from '../../store/actions/navigation';
import { logIn } from '../../store/actions/auth';
import './LoginPage.scss';
import { connect } from 'react-redux';
import { auth } from '../../api/Client';
import TokenManager from '../../managers/TokenManager';
import PropTypes from 'prop-types';

function LoginPage(props) {
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const formSubmit = async (event) => {
        event.preventDefault();
        let validated = true;
        if (phone.length === 0) {
            setPhoneError('Телефон долен быть заполнен');
            validated = false;
        }
        if (password.length === 0) {
            setPasswordError('Пароль должен быть заполнен');
            validated = false;
        }
        if (validated) {
            let token = await auth(phone, password);
            TokenManager.setToken(token);
            props.logIn(token.token)
            props.goToHome();
        }
        
    }

    return(
        <div className="login-page">
            <Header />
            <div className="login-form">
                <div className="login-form__title">
                    <h1>Вход</h1>
                </div>
                <form onSubmit={formSubmit} className="login-form__form">
                    <div className="form-item">
                        <label htmlFor="login-phone">Номер телефона</label>
                        <input id="login-phone" type="text" value={ phone } onChange={ (e) => setPhone(e.target.value) } />
                        <span className="form-item__error">{ phoneError }</span>
                    </div>
                    <div className="form-item">
                        <label htmlFor="login-password">Пароль</label>
                        <input id="login-password" type="password" value={ password } onChange={ (e) => setPassword(e.target.value) } />
                        <span className="form-item__error">{ passwordError }</span>
                    </div>
                    <div className="form-submit">
                        <input type="submit" value="Войти"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    goToHome: () => dispatch(setPage("index")),
    logIn: (token) => dispatch(logIn(token))
})

LoginPage.propTypes = {
    goToHome: PropTypes.func,
    logIn: PropTypes.func
}

LoginPage.defaultProps = {
    goToHome: () => {},
    logIn: () => {},
}
  
export default connect(null, mapDispatchToProps)(LoginPage);