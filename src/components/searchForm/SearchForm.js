import React, { useState } from 'react';
import './SearchForm.scss';
import PropTypes from 'prop-types';

function SearchForm(props){
    const [filterVal, setFilterVal] = useState(props.nameFilter);
    const onSubmit = (e) => {
        props.sumbmitCallback(filterVal);
        e.preventDefault();
    };
    return (
        <form className="search-form" onSubmit={onSubmit}>
            <input type="text" placeholder="молоко" value={filterVal} onChange={(e) => setFilterVal(e.target.value)} />
            <input type="submit" value="Найти" />
        </form>
    );
}

SearchForm.propTypes = {
    sumbmitCallback: PropTypes.func.isRequired,
    nameFilter: PropTypes.string
}

SearchForm.defaultProps = {
    nameFilter: '',
}

export default SearchForm;