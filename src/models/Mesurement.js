/**
 * @class Mesurement
 * @description Объект единиц измерения товара
 */
class Mesurement 
{
    /**
     * Создает объект ед.измерения
     * @param {string} name Название единиц измерения товара (литр)
     * @param {number} size Число единиц измерения у одной номенклатурной позиции (например 5 для 5-литровой бутылки воды)
     */
    constructor(name, size) {
        this.name = name;
        this.size = size;
    }

    /**
     * Статический конструктор для приведения объекта из API к нужному типу
     * @param {object} json 
     * @returns {Mesurement}
     */
    static buildFromJson(json) {
        const { name, size } = json;
        return new Mesurement(name, size);
    }
}

export default Mesurement;