import React from 'react';
import './Pagination.scss';

//todo: поправить в стилях обводку при клике
function Pagination(props) {

    function isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }
    const isPrevBtnEnabled = () => props.page > 1;
    const isNextBtnEnabled = () => props.page < props.totalPages;
    const onClickPrev = () => {
        if (isFunction(props.onPrevPage)) {
            props.onPrevPage();
        }
    }
    const onClickNext = () => {
        if (isFunction(props.onNextPage)) {
            props.onNextPage();
        }
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

export default Pagination;