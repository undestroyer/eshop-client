import Token from "../models/Token";

/**
 * @class TokenManager
 * @description Класс предназначен для хранения токена в LocalStorage
 * Сохранять токен необходимо на случай обновления страницы браузера. Все что было в памяти будет забыто,
 * но если сохранить токен авторизации в localStorage, то после повторной загрузки страницы можно авторизоваться со старым токеном.
 */
class TokenManager 
{
    TOKEN_STORAGE_KEY = 'token';

    /**
     * Создает объект менеджера токена
     * @param {Token|null} token 
     */
    constructor(token = null) {
        this.token = token;
    }

    /**
     * Возвращает токен из внутренней памяти или localStorage
     * @returns {Token|null}
     */
    getToken() {
        if (this.token !== null) {
            return this.token;
        }
        const localStorageToken = localStorage.getItem(this.TOKEN_STORAGE_KEY);
        return localStorageToken === null ? null : Token.buildFromJson(JSON.parse(localStorageToken));
    }

    /**
     * Сохраняет токен в LocalStorage
     * @param {Token} token 
     */
    setToken(token) {
        this.token = token;
        localStorage.setItem(this.TOKEN_STORAGE_KEY, JSON.stringify(token));
    }

}

export default TokenManager;