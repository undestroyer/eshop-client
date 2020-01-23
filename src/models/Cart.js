import CartItem from './CartItem';

/**
 * @class Cart
 * @description Класс корзины
 */
class Cart 
{
    /**
     * Создает объект корзины
     * @param {CartItem[]} items Товары в корзине
     * @param {Date} createdAt дата создания корзины
     * @param {Date|null} confirmedAt дата подтверждения корзины
     * @param {Date} expiredAt истечения срока действия корзины
     */
    constructor(items, createdAt, confirmedAt, expiresAt) {
        this.items = items;
        this.createdAt = createdAt;
        this.confirmedAt = confirmedAt;
        this.expiresAt = expiresAt;
    }

    /**
     * Статический конструктор для приведения объекта из API к нужному типу
     * @param {object} json 
     * @returns {CartItem}
     */
    static buildFromJson(json) {
        const { createdAt, confirmedAt, expiresAt, items } = json;
        let cartItems = [];
        items.forEach(x => {
            cartItems.push(CartItem.buildFromJson(x));
        });
        return new Cart(cartItems, createdAt, confirmedAt, expiresAt);
    }
}

export default Cart