import React from 'react';
import './Header.scss';
function Header() {
    const isAuthorized = false;
    return(
        <header>
            <div className="header__logo">
                logo
            </div>
            <div className="header__filler"></div>
            <div className="header__links">
                { isAuthorized ?  
                    <>
                    <button>Корзина</button>
                    <button>Выйти</button>
                    </>
                : <button>Войти</button> }
            </div>
        </header>
    );
}

export default Header;