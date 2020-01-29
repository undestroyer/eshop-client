import React, { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import CartItem from '../../components/cartItem/CartItem';
import { connect } from 'react-redux';
import './CartPage.scss';
import { setAmountForProductInCart, removeProductFromCart, lockCart } from '../../store/actions/cart';
import PropTypes from 'prop-types';

function CartPage(props) {
    const [isEditable, setIsEditable] = useState(true);
    useEffect( () => {
        setIsEditable(props.cart.lockedUntil < (new Date()).getTime());
    }, [props.cart.lockedUntil]);
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
    const confirmCart = () => {
        props.lockCart();
    }
    const cartItems = [props.cart.items.map(x => 
        <CartItem 
            isEditable={ isEditable }
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
                { props.cart.items.length > 0 
                    ?
                        <>
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
                                <button className="cart-view__confirmBtn"
                                    onClick={ () => {confirmCart()} }
                                    disabled={ !isEditable }
                                >
                                    Подтвердить
                                </button>
                            </div>
                        }
                        </>
                    :  
                        <div className="cart-view__empty">
                            В вашей корзине еще ничего нет. Добавьте товары в корзину чтобы подтвердить свой заказ.
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
    lockCart: () => dispatch(lockCart()),
})

CartPage.propTypes = {
    cart: PropTypes.object,
    product: PropTypes.object,
    auth: PropTypes.object,
    removeProduct: PropTypes.func,
    changeAmount: PropTypes.func,
    lockCart: PropTypes.func,
}

CartPage.defaultProps = {
    cart: {
        items: []
    },
    product: {
        products: []
    },
    auth: {
        token: ''
    },
    removeProduct: () => {},
    changeAmount: () => {},
    lockCart: () => {},
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);