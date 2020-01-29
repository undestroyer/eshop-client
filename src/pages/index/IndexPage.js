import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setProducts, setProductLoadingError } from '../../store/actions/product';
import Product from '../../components/product/Product';
import Pagination from '../../components/pagination/Pagination';
import SearchForm from '../../components/searchForm/SearchForm';
import Header from '../../components/header/Header';
import './IndexPage.scss';
import { addProductToCart, removeProductFromCart, setAmountForProductInCart } from '../../store/actions/cart';
import { getProducts } from '../../api/Client';
import PropTypes from 'prop-types';

function IndexPage(props) {
    const itemsPerPage = 10;
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const [nameFilter, setNameFilter] = useState("");

    const searchCallback = (newNameFilter) => {
        setNameFilter(newNameFilter);
    }

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const { items, total } = await getProducts(page, nameFilter);
                props.setProducts(items);
                setTotalPages(Math.ceil(total / itemsPerPage));
                props.setProductLoadingError("");
            } catch (e) {
                props.setProductLoadingError("Не удалось загрузить товары. Попробуйте позже.");
            }
        }

        loadProducts();
    }, [page, nameFilter]);
    
    const productsRender = props.product.products.map((prod) => 
        <Product 
            key={ prod.id } 
            product={ prod }
            addToCartActive={ props.auth.token?.length > 0 }
            addToCart={ (productId, amount) => props.addProductToCart(productId, amount) }
            removeFromCart={ (productId) => props.removeProductFromCart(productId) }
            updateAmountInCart={ (productId, amount) => props.updateAmountInCart(productId, amount)}
        />);

    return (
        <div className="index-page">
            <Header/>
            {
                props.product.loadingError.length === 0
                ?
                    <>
                        <SearchForm nameFilter={nameFilter} sumbmitCallback={ searchCallback } />
                        <div className="products-container">
                            { productsRender }
                        </div>
                        <div className="products-pagination">
                            <Pagination page={ page } 
                                totalPages={ totalPages } 
                                onNextPage={ () => setPage(page+1) }
                                onPrevPage={ () => setPage(page-1) } />
                        </div>
                    </>
                :
                    <div className="products-error">
                        { props.product.loadingError }
                    </div>
            }
            
        </div>
    );
}

const mapStateToProps = state => {
    const { auth, product } = state;
    return {
        auth: auth,
        product: product
    }
}

const mapDispatchToProps = dispatch => ({
    setProducts: (products) => dispatch(setProducts(products)),
    setProductLoadingError: (error) => dispatch(setProductLoadingError(error)),
    addProductToCart: (productId, amount) => dispatch(addProductToCart(productId, amount)),
    removeProductFromCart: (productId) => dispatch(removeProductFromCart(productId)),
    updateAmountInCart: (productId, amount) => dispatch(setAmountForProductInCart(productId, amount)),
})

IndexPage.propTypes = {
    auth: PropTypes.object,
    product: PropTypes.object,
    setProducts: PropTypes.func,
    setProductLoadingError: PropTypes.func,
    addProductToCart: PropTypes.func,
    removeProductFromCart: PropTypes.func,
    updateAmountInCart: PropTypes.func,
}

IndexPage.defaultPtops = {
    auth: {
        token: null
    },
    products: {
        loadingError: '',
        products: []
    },
    setProducts: () => {},
    setProductLoadingError: () => {},
    addProductToCart: () => {},
    removeProductFromCart: () => {},
    updateAmountInCart: () => {},
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);