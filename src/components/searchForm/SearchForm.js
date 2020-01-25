import React, { useState } from 'react';
import { isFunction } from '../../helpers/IsFunction';
import './SearchForm.scss';

function SearchForm(props){
    const [filterVal, setFilterVal] = useState('');
    const onSubmit = (e) => {
        if (isFunction(props.sumbmitCallback)) {
            props.sumbmitCallback(filterVal);
        }
        e.preventDefault();
    };
    return (
        <form className="search-form" onSubmit={onSubmit}>
            <input type="text" placeholder="молоко" value={filterVal} onChange={(e) => setFilterVal(e.target.value)} />
            <input type="submit" value="Найти" />
        </form>
    );
}

export default SearchForm;