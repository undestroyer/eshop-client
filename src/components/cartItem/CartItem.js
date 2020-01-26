import React from 'react';
import { placeholdedSrc } from '../../helpers/PlaceholdedImgSrc';

function CartItem(props) {

    return (
        <div className="cart-item">
            <div className="cart-item__photo">
                <img src={ placeholdedSrc(props.product.imgUrl) } alt={props.product.name} />
            </div>
            <div className="cart-item__description">
                <span className="cart-item__name">
                    {props.product.name}
                </span>
                <span className="cart-item__mesure">
                    { props.product.mesure.size } { props.product.mesure.name }
                </span>
            </div>
            <div className="cart-item__amount">
                <input type="number" value={ props.amount } />
            </div>
            <div className="cart-item__actions">
                <button className="cart-item__remove">Удалить</button>
            </div>
        </div>
    );
}

export default CartItem;