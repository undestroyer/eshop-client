import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../../store/actions/product';
import Product from '../../components/product/Product';
import Pagination from '../../components/pagination/Pagination';
import SearchForm from '../../components/searchForm/SearchForm';
import Header from '../../components/header/Header';
import './IndexPage.scss';
import { addProductToCart, removeProductFromCart, setAmountForProductInCart } from '../../store/actions/cart';
import { getProducts } from '../../api/Client';

function IndexPage(props) {
    const itemsPerPage = 10;
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(4); 
    const [nameFilter, setNameFilter] = useState("");
    const [products, setProducts] = useState([]);

    const searchCallback = (newNameFilter) => {
        setNameFilter(newNameFilter);
    }

    useEffect(() => {
        const loadProducts = async () => {
            const { items, total } = await getProducts(page, nameFilter);
            setProducts(items);
            setTotalPages(Math.ceil(total / itemsPerPage));
        }

        loadProducts();
    }, [page, nameFilter]);
    
    const productsRender = products.map((prod) => 
        <Product 
            key={ prod.id } 
            product={ prod }
            addToCart={ (productId, amount) => props.addProductToCart(productId, amount) }
            removeFromCart={ (productId) => props.removeProductFromCart(productId) }
            updateAmountInCart={ (productId, amount) => props.updateAmountInCart(productId, amount)}
        />);

    return (
        <div className="index-page">
            <Header/>
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

const mapDispatchToProps = dispatch => ({
    setProducts: (products) => dispatch(setProducts(products)),
    addProductToCart: (productId, amount) => dispatch(addProductToCart(productId, amount)),
    removeProductFromCart: (productId) => dispatch(removeProductFromCart(productId)),
    updateAmountInCart: (productId, amount) => dispatch(setAmountForProductInCart(productId, amount)),
})


export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);