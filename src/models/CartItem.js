import Product from './Product';
/**
 * @class CartItem
 * @description Товар в корзине
 */
class CartItem
{
    /**
     * Создает объект товара в корзине
     * @param {Product} product объект товара
     * @param {number} amount количество товара
     */
    constructor(product, amount) {
        this.product = product;
        this.amount = amount;
    }

    /**
     * Статический конструктор для приведения объекта из API к нужному типу
     * @param {object} json 
     * @returns {CartItem}
     */
    static buildFromJson(json) {
        const { product, amount } = json;
        return new CartItem(Product.buildFromJson(product), amount);
    }
}

export default CartItem