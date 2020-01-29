import React from 'react';
import './Pagination.scss';
import PropTypes from 'prop-types';

//todo: поправить в стилях обводку при клике
function Pagination(props) {

    
    const isPrevBtnEnabled = () => props.page > 1;
    const isNextBtnEnabled = () => props.page < props.totalPages;
    const onClickPrev = () => {
        props.onPrevPage();
    }
    const onClickNext = () => {
        props.onNextPage();
    }

    return (
        <div className="pagination">
            <button className="pagination__btn" disabled={!isPrevBtnEnabled()} onClick={onClickPrev}>
                { String.fromCharCode(8592) }
            </button>
            <span>
                { props.page } / { props.totalPages }
            </span>
            <button className="pagination__btn" disabled={!isNextBtnEnabled()} onClick={onClickNext}>
                { String.fromCharCode(8594) }
            </button>
        </div>
    );
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPrevPage: PropTypes.func.isRequired,
    onNextPage: PropTypes.func.isRequired,
}

export default Pagination;