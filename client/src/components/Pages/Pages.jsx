import React from "react";
import style from "./Pages.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Pages = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (

        <div >
            {/* <nav className={style.pg}> */}
            <ul className={style.pagination}>
                {pageNumbers.map((number) => (
                    <li key={number} className={style.pageItem}>
                        <a
                            onClick={() => paginate(number)}
                            href="#"
                            className={style.pageLink}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
            {/* </nav> */}
        </div>
    );
};

export default Pages;