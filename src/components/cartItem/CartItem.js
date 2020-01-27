import React, { useState, useEffect } from 'react';
import { placeholdedSrc } from '../../helpers/PlaceholdedImgSrc';
import './CartItem.scss';

function CartItem(props) {
    const [amount, setAmount] = useState(props.amount);
    useEffect(() => {
        props.onChangeAmount(props.product.id, amount);
    }, [amount]);
    const removeItem = (productId) => {
        props.onDelete(productId);
    }
    return (
        <div className="cart-item">
            <div className="cart-item__photo">
                <img src={ placeholdedSrc(props.product.pictureUrl) } alt={props.product.name} />
            </div>
            <div className="cart-item__description">
                <span className="cart-item__name">
                    {props.product.name}
                </span>
                <span className="cart-item__mesure">
                    { props.product.mesurement.size } { props.product.mesurement.name }
                </span>
            </div>
            <div className="cart-item__amount">
                <input 
                    type="number" 
                    min={ 1 } 
                    value={ amount } 
                    onChange={ (e) => setAmount(e.target.value)} 
                    disabled={ !props.isEditable }
                    />
            </div>
            <div className="cart-item__actions">
                <button 
                    className="cart-item__remove" 
                    onClick={ () => removeItem(props.product.id) }
                    disabled={ !props.isEditable }
                    >
                        Удалить
                    </button>
            </div>
        </div>
    );
}

export default CartItem;