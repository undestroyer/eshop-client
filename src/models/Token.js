/**
 * @class Token
 * @description Объект токена который приходит из API. Нужен для более строгой структуры проекта.
 */
class Token {
    
    /**
     * Создает объект токена
     * @param {string} token Токен авторизации
     */
    constructor(token) {
        this.token = token;
    }
    
    /**
     * Статический конструктор объекта класса. Используется для приведения объекта API к нужному классу.
     * @param {object} json 
     */
    static buildFromJson(json) {
        const { token } = json;
        if (typeof(token) === 'undefined') {
            throw new Error("Не удалось зарегистрироваться");
        }
        return new Token(token);
    }
}

export default Token