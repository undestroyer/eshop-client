import React, { useState } from 'react';
import Header from '../../components/header/Header';
import { setPage } from '../../store/actions/navigation';
import { logIn } from '../../store/actions/auth';
import './RegisterPage.scss';
import { connect } from 'react-redux';
import { register } from '../../api/Client';
import TokenManager from '../../managers/TokenManager';
import PropTypes from 'prop-types';

function RegisterPage(props) {
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordRepeatError, setPasswordRepeatError] = useState('');

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
        if (passwordRepeat.length === 0) {
            setPasswordRepeatError('Поле должно быть заполнен');
            validated = false;
        } else if (passwordRepeat !== password) {
            setPasswordRepeatError('Пароли не совпадают');
            validated = false;
        }
        if (validated) {
            const registerResult = await register(phone, password);
            TokenManager.setToken(registerResult);
            props.register(registerResult.token);
            props.goToHome();
        }
    }

    return(
        <div className="register-page">
            <Header />
            <div className="register-form">
                <div className="register-form__title">
                    <h1>Регистрация</h1>
                </div>
                <form onSubmit={formSubmit} className="register-form__form">
                    <div className="form-item">
                        <label htmlFor="register-phone">Номер телефона</label>
                        <input id="register-phone" type="text" value={ phone } onChange={ (e) => setPhone(e.target.value) } />
                        <span className="form-item__error">{ phoneError }</span>
                    </div>
                    <div className="form-item">
                        <label htmlFor="register-password">Пароль</label>
                        <input id="register-password" type="password" value={ password } onChange={ (e) => setPassword(e.target.value) } />
                        <span className="form-item__error">{ passwordError }</span>
                    </div>
                    <div className="form-item">
                        <label htmlFor="register-password-repeat">Повторите пароль</label>
                        <input id="register-password-repeat" type="password" value={ passwordRepeat } onChange={ (e) => setPasswordRepeat(e.target.value) } />
                        <span className="form-item__error">{ passwordRepeatError }</span>
                    </div>
                    <div className="form-submit">
                        <input type="submit" value="Зарегистрироваться"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    goToHome: () => dispatch(setPage("index")),
    register: (token) => dispatch(logIn(token))
})

RegisterPage.propTypes = {
    goToHome: PropTypes.func,
    register: PropTypes.func
}

RegisterPage.defaultProps = {
    goToHome: () => {},
    register: () => {},
}

export default connect(null, mapDispatchToProps)(RegisterPage);