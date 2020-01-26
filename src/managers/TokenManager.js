import Token from "../models/Token";

/**
 * @class TokenManager
 * @description Класс предназначен для хранения токена в LocalStorage
 * Сохранять токен необходимо на случай обновления страницы браузера. Все что было в памяти будет забыто,
 * но если сохранить токен авторизации в localStorage, то после повторной загрузки страницы можно авторизоваться со старым токеном.
 */
class TokenManager 
{
    static TOKEN_STORAGE_KEY = 'token';

    /**
     * Возвращает токен из внутренней памяти или localStorage
     * @returns {Token|null}
     */
    static getToken() {
        const localStorageToken = localStorage.getItem(this.TOKEN_STORAGE_KEY);
        return localStorageToken === null ? null : Token.buildFromJson(JSON.parse(localStorageToken));
    }

    /**
     * Сохраняет токен в LocalStorage
     * @param {Token} token 
     */
    static setToken(token) {
        localStorage.setItem(this.TOKEN_STORAGE_KEY, JSON.stringify(token));
    }

}

export default TokenManager;