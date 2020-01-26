import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../../store/actions/product';
import Product from '../../components/product/Product';
import Pagination from '../../components/pagination/Pagination';
import SearchForm from '../../components/searchForm/SearchForm';
import Header from '../../components/header/Header';
import './IndexPage.scss';
import { addProductToCart, removeProductFromCart } from '../../store/actions/cart';

function IndexPage(props) {
    const [page, setPage] = useState(1);
    const totalPages = 4; 
    const searchCallback = (searchText) => { console.log(searchText); }

    const products = [
        {
            "id": "ef55547e-b4b6-4449-bb3a-e0d3ed8a7806", 
            "name": "Молоко", 
            "price": 89.9, 
            "pictureUrl": "http://bdu24.ru/wp-content/uploads/2018/01/%D0%9C%D0%BE%D0%BB%D0%BE%D0%BA%D0%BE-%C2%AB%D0%9F%D1%80%D0%BE%D1%81%D1%82%D0%BE%D0%BA%D0%B2%D0%B0%D1%88%D0%B8%D0%BD%D0%BE%C2%BB-%D0%BF%D0%B0%D1%81%D1%82%D0%B5%D1%80%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE%D0%B5-%D0%BE%D1%82%D0%B1%D0%BE%D1%80%D0%BD%D0%BE%D0%B5-3.4-4.5-%D0%BF%D1%8D%D1%82-930-%D0%BC%D0%BB-%D0%AE%D0%BD%D0%B8%D0%BC%D0%B8%D0%BB%D0%BA-600x600.jpg", 
            "mesurement": {
                "name": "литр",
                "size": 1
            }
        },
        {
            "id": "{{uuid}}", 
            "name": "parametrized: {{params.nameFilter}}, {{params.page}}", 
            "price": 1, 
            "pictureUrl": null, 
            "mesurement": {
                "name": "штук",
                "size": 12
            }
        }
    ];
    const productsRender = products.map((prod) => 
        <Product 
            key={ prod.id } 
            product={ prod }
            addToCart={ (productId, amount) => props.addProductToCart(productId, amount) }
            removeFromCart={ (productId) => props.removeProductFromCart(productId) }
        />);
    return (
        <div className="index-page">
            <Header/>
            <SearchForm sumbmitCallback={ searchCallback }/>
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
})


export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);