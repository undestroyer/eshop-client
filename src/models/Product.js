// eslint-disable-next-line no-unused-vars
import Mesurement from "./Mesurement";

/**
 * @class Product
 * @description Объект товара (используется для отображения списка товаров и товаров в корзине)
 */
class Product
{
    /**
     * Создает объект товара
     * @param {string} id UUID товара
     * @param {string} name Название товара
     * @param {number} price Цена товара
     * @param {string} pictureUrl URL до изображения товара
     * @param {Mesurement} mesurement Объект описывающий единицы измерения товара
     */
    constructor(id, name, price, pictureUrl, mesurement) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.pictureUrl = pictureUrl;
        this.mesurement = mesurement;
    }

    /**
     * Статический конструктор для приведения объекта из API к нужному типу
     * @param {object} json 
     * @returns {Product}
     */
    static buildFromJson(json) {
        const { id, name, price, pictureUrl, mesurement } = json; 
        return new Product(id, name, price, pictureUrl, Mesurement.buildFromJson(mesurement));
    }
}

export default Product