import AuthForm from '../models/AuthForm';
import Token from '../models/Token';
import Product from '../models/Product';
import Cart from '../models/Cart';

const API_BASE_URL = "http://demo4071048.mockable.io";

/**
 * Регистрирует пользователя по телефону и паролю
 * @param {string} phone Номер телефона
 * @param {string} password Пароль
 * @returns {Token}
 */
export async function register(phone, password) {
    let form = new AuthForm(phone, password);
    let response = await fetch(API_BASE_URL + '/auth/register', {
        method: "POST",
        body: form
    });
    if (response.status === 201) {
        return Token.buildFromJson(await response.json());
    }
}

/**
 * Авторизирует пользователя по логину и паролю
 * @param {string} phone Номер телефона
 * @param {string} password Пароль
 * @returns {Token}
 */
export async function auth(phone, password) {
    let form = new AuthForm(phone, password);
    let response = await fetch(API_BASE_URL + '/auth/login', {
        method: "POST",
        body: form
    });
    if (response.status === 200) {
        return Token.buildFromJson(await response.json());
    }
}

/**
 * Получает данные о корзине текущего пользователя
 * @param {Token} token Токен, полученный после авторизации
 * @returns {Cart}
 */
export async function getCart(token) {
    let response = await fetch(API_BASE_URL + '/cart/view', {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token.token
        }
    });
    if (response.status === 200) {
        const apiCart = await response.json();
        return Cart.buildFromJson(apiCart);
    }
}

/**
 * Отправляет на сервер обновленную корзину
 * @param {Token} token 
 * @param {Cart} cart 
 */
export async function updateCart(token, cart) {
    let response = await fetch(API_BASE_URL + '/cart/update', {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token.token
        },
        body: {
            items: cart.items
        }
    });
    if (response.status === 200) {
        const apiCart = await response.json();
        return Cart.buildFromJson(apiCart);
    }
}

/**
 * Подтверждает корзину на сервере
 * @param {Token} token 
 * @returns {Cart}
 */
export async function confirmCart(token) {
    let response = await fetch(API_BASE_URL + '/cart/confirm', {
        method: "POST",
        headers: {
            'Authorization': 'Bearer ' + token.token
        }
    });
    if (response.status === 200) {
        const apiCart = await response.json();
        return Cart.buildFromJson(apiCart);
    }
}

/**
 * Получает товары с сервера
 * @param {number|null} page 
 * @param {string|null} name 
 * @returns {{items: Product[], total: number}}
 * @todo page нужно проверить на целое число
 */
export async function getProducts(page = 1, name = '') {
    let response = await fetch(API_BASE_URL + `/product/index?name=${name}&page=${page}`, {
        method: "GET",
    });
    if (response.status === 200) {
        const { items, total } = await response.json();
        let result = [];
        items.forEach(x => {
            result.push(Product.buildFromJson(x));
        })
        return { items: result, total: total };
    }
}
