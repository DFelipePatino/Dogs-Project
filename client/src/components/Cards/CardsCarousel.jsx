import React, { useState, forwardRef, useRef, useImperativeHandle } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import Card from '../Card/DogCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@mui/material";
import DogCard from "../Card/DogCard";
// import './Cards.css';

function CardsCarousel({ onClick, dogs, dogsFromDB }) {

    // console.log(dogs, 'dogs', 'at CardsCarousel');

    const settings = {
        arrows: true,
        className: "center",
        with: "100%",
        centerMode: true,
        centerPadding: "60px",
        lazyLoad: true,
        dots: true,
        infinite: true,
        pauseOnHover: true,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 4,
        slidesToScroll: 1,
        // slidesPerRow: 2,
        // rows: 2,
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    rows: 1,
                    centerMode: false,
                    pauseOnHover: true,
                    arrows: true,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    rows: 1,
                    centerMode: false,
                    pauseOnHover: true,
                    arrows: true,
                }
            },

            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: 1,
                    centerMode: false,
                    pauseOnHover: true,
                    arrows: false,
                }
            }
        ]
    };

    return (

        dogsFromDB && dogsFromDB.length > 0 ? (
            <div className="slider-container">

                <Slider {...settings}
                >
                    <div className="cards-container">
                        {dogsFromDB.map(dogDB =>
                            <DogCard
                                key={dogDB.id}
                                dogDB={dogDB}
                                onClick={onClick}
                            />)}
                    </div>

                </Slider>
            </div>

        ) : (

            <Slider {...settings}
            >

                {dogs?.map((dog) => (
                    <div className='main-container' key={dog.id}>
                        <div className="cards-container">
                            <DogCard
                                key={dog.id}
                                id={dog.id}
                                name={dog.name}
                                image={dog.imagen}
                                temperament={dog.temperaments}
                                weight={dog.peso}
                                onClick={onClick}
                            />
                        </div>
                    </div>
                ))}

            </Slider>
        )
    );
}

export default CardsCarousel;
