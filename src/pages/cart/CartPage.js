import React from 'react';
import Header from '../../components/header/Header';
import CartItem from '../../components/cartItem/CartItem';
import { connect } from 'react-redux';

function CartPage(props) {
    const cartItems = [props.cart.items.map(x => <CartItem key={x.product.id} product={x.product} amount={x.amount} />)]

    return(
        <div className="cart-page">
            <Header />
            <div className="cart-view">
                <div className="cart-view__title">
                    <h1>Корзина</h1>
                </div>
                <div className="cart-view__products">
                    { cartItems }
                </div>
                <div className="cart-view__confirm">
                    <button className="cart-view__confirmBtn">Подтвердить</button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    const { cart, product } = state;
    return {
        cart: cart,
        product: product
    }
}

export default connect(mapStateToProps, null)(CartPage);