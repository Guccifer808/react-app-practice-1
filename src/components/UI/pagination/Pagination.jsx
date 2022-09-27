import React from 'react';
import { getPagesArray } from '../../../utils/pages';
import '../../../styles/App.css';

const Pagination = ({totalPages, page, changePage}) => { //Получаем страницу и массив
    let pagesArray = getPagesArray(totalPages);
    return (

        <div className="page__wrapper">
            {pagesArray.map((p) => (
            <span
            onClick={() => changePage(p)}
            key ={p} 
            className={page === p ? "page page__current" : "page"}>
            {p}
            </span>
            ))}
        </div>

  )
}

export default Pagination