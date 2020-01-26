import React, { useState, useEffect } from 'react';
import './Product.scss';
import { placeholdedSrc } from '../../helpers/PlaceholdedImgSrc';

function Product(props) {
    const formatPrice = (price) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price);
    const [amount, setAmount] = useState(1);
    const [inCart, setInCart] = useState(false);
    const [btnTitle, setBtnTitle] = useState("");
    
    const cartClick = () => {
        if (inCart) {
            props.removeFromCart(props.product.id);
        } else {
            props.addToCart(props.product.id, amount);
        }
        setInCart(!inCart);
    }

    useEffect(() => {
        setBtnTitle(props.addToCartActive 
            ? "Добавьте в свою корзину" 
            : "Войдите или зарегистрируйтесь чтобы добавить товар в корзину");
    }, [props.addToCartActive])

    useEffect(() => {
        if (inCart) {
            props.updateAmountInCart(props.product.id, amount);
        }
    }, [amount]);

    return(
        <div className="product">
            <div className="product__image">
                {}
                <img src={ placeholdedSrc(props.product.pictureUrl) } alt={ props.product.name } />
            </div>
            <div className="product__name">
                { props.product.name }
            </div>
            <div className="product-details">
                <div className="product-details__mesurement">
                    { props.product.mesurement.size } { props.product.mesurement.name }
                </div>
                <div className="product-details__price">
                    { formatPrice(props.product.price) }
                </div>
            </div>
            <div className="product-order">
                    <div className="product-order__amount">
                        <input type="number" min={1} value={amount} onChange={ (e) => setAmount(e.target.value) } />
                    </div>
                    <div className="product-order__button">
                        <button onClick={ cartClick } disabled={ !props.addToCartActive } title={ btnTitle }> 
                            { inCart ? String.fromCharCode(10004)+" В корзине" : "+ В корзину" }
                        </button>
                    </div>
                </div>
        </div>
    );
}

export default Product;