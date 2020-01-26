import React from 'react';
import Header from '../../components/header/Header';
import CartItem from '../../components/cartItem/CartItem';
import { connect } from 'react-redux';
import './CartPage.scss';
import { setAmountForProductInCart, removeProductFromCart } from '../../store/actions/cart';

function CartPage(props) {
    const findProduct = (productId) => {
        const candidates = props.product.products.filter(x => x.id === productId);
        if (candidates.length === 1) return candidates[0];
        return null;
    }
    const changeAmount = (productId, amount) => {
        props.changeAmount(productId, amount);
    }
    const removeProduct = (productId) => {
        props.removeProduct(productId);
    }
    const cartItems = [props.cart.items.map(x => 
        <CartItem 
            key={ x.productId } 
            product={ findProduct(x.productId) } 
            amount={ x.amount } 
            onChangeAmount={ (productId, amount) => {
                changeAmount(productId, amount);
            } }
            onDelete={ (productId) => { removeProduct(productId); } }
        />)]

    const totalSum = () => {
        let total = 0;
        if (props.cart.items.length > 0) {
            props.cart.items.forEach(x => {
                const product = findProduct(x.productId);
                total += product.price * x.amount;
            });
        }
        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(total);
    }

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
                <div className="cart-view__total">
                    Итого: { totalSum() }
                </div>
                { props.auth.token === null ?  
                    <div className="cart-view__auth-required">
                        Для подтверждения покупки необходимо войти.
                    </div>
                    :
                    <div className="cart-view__confirm">
                        <button className="cart-view__confirmBtn">Подтвердить</button>
                    </div>
                }
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    const { cart, product, auth } = state;
    return {
        cart: cart,
        product: product,
        auth: auth
    }
}

const mapDispatchToProps = dispatch => ({
    removeProduct: (productId) => dispatch(removeProductFromCart(productId)),
    changeAmount: (productId, amount) => dispatch(setAmountForProductInCart(productId, amount)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);