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

    // console.log(dogsFromDB, 'dogsFromDB', dogs, 'dogs', 'at CardsCarousel');

    const settings = {
        arrows: false,
        className: "center",
        with: "100%",
        // centerMode: true,
        centerPadding: "60px",
        lazyLoad: true,
        dots: false,
        infinite: true,
        pauseOnHover: true,
        adaptiveHeight: true,
        autoplay: false,
        autoplaySpeed: 4000,
        slidesToShow: 3,
        slidesToScroll: 3,
        slidesPerRow: 2,
        rows: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                    pauseOnHover: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    pauseOnHover: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    pauseOnHover: true,
                }
            },
            {
                breakpoint: 385,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 1,
                    pauseOnHover: true,
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
                    <div className='main-container'>
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
