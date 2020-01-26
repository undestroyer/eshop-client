import React, { useState } from 'react';
import './Product.scss';
import { placeholdedSrc } from '../../helpers/PlaceholdedImgSrc';

function Product(props) {
    const formatPrice = (price) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price);
    const [inCart, setInCart] = useState(false);
    const cartClick = (event) => {
        if (inCart) {
            props.removeFromCart(props.product.id);
        } else {
            props.addToCart(props.product.id, 1);
        }
        setInCart(!inCart);
    }
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
                        <input type="number"/>
                    </div>
                    <div className="product-order__button">
                        <button onClick={ cartClick }>{ inCart ? String.fromCharCode(10004)+" В корзине" : "+ В корзину" }</button>
                    </div>
                </div>
        </div>
    );
}

export default Product;