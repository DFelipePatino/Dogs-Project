import Slider from "react-slick";
import DogCard from "../Card/DogCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Cards.css';
import PropTypes from "prop-types";


function CardsCarousel({ onClick, dogs, dogsFromDB }) {
    const list = dogsFromDB?.length ? dogsFromDB : dogs || [];
    // console.log(list, 'la lista')

    // Don't enable infinite if we have fewer items than slides to show
    const slidesToShow = 4;
    const shouldInfinite = list.length > slidesToShow;

    const settings = {
        dots: true,
        arrows: true,
        infinite: shouldInfinite,
        centerMode: false,
        autoplay: shouldInfinite,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        adaptiveHeight: false,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        speed: 500,
        cssEase: "ease-in-out",
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '20px'
                }
            }
        ]
    };

    if (!list || list.length === 0) {
        return (
            <div className="slider-container">
                <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    No dogs to display
                </p>
            </div>
        );
    }

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {list.map(dog => (
                    <div className="slide" key={dog.id}>
                        <DogCard
                            dogDB={dog}
                            id={dog.id}
                            name={dog.name}
                            image={dog.imagen}
                            temperament={dog.temperaments}
                            weight={dog.peso}
                            onClick={onClick}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );

}

CardsCarousel.propTypes = {
    onClick: PropTypes.func,
    dogs: PropTypes.array,
    dogsFromDB: PropTypes.array,
};


export default CardsCarousel;

