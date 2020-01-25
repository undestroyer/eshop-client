/**
 * @class AuthForm
 * @description Форма авторизации пользователя
 */
class AuthForm
{
    /**
     * Создает объект формы
     * @param {string} phone строка номера телефона только из цифр (79998887766)
     * @param {string} password строка пароля
     */
    constructor(phone, password) {
        this.phone = phone;
        this.password = password;
    }
}

export default AuthForm