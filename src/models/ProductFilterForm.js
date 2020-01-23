/**
 * @class ProductFilterForm
 * @description Объект фильтра поиска и навигации по товарам
 */
class ProductFilterForm 
{
    /**
     * Создает объект фильтра товаров
     * @param {number} page 
     * @param {string} name 
     */
    constructor(page = 1, name = '') {
        this.page = page;
        this.name = name;
    }
}

export default ProductFilterForm