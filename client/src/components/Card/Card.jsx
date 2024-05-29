import React from 'react';
import './Card.css';

const Card = ({ dogDB, image, onClick, id, name, temperament, weight }) => {

    console.log(image, "imagen")
    console.log(name, "name")
    console.log(dogDB, "dogDB")
    console.log(weight, "peso")

    return (
        dogDB ? (
            <div className='container-card'>
                <div className="imagen" onClick={() => onClick(id)}>
                    <img src={dogDB?.imagen} alt="dog" />
                </div>

                <div className="title">
                    <h2>{dogDB?.name} </h2>
                    <p><span className='span-temperament'>Temperament:</span>{dogDB?.Temperaments?.map(temp => temp.name).join(', ') || 'N/A'} </p>
                </div>

                <div className="weight">
                    <p>Weight: {dogDB?.peso}kg </p>
                    <p>Height: {dogDB?.altura} </p>
                    <p>Age: {dogDB?.age} </p>
                </div>
            </div>
        ) : (
            <div className='container-card'>
                <div className="imagen" onClick={() => onClick(id)}>
                    <img src={image} alt="dog" />
                </div>

                <div className="title">
                    <h2>{name} </h2>
                    <p><span className='span-temperament'>Temperament:</span>{temperament} </p>
                </div>

                <div className="weight">
                    <p>Weight: {weight}kg </p>
                </div>
            </div>
        )
    );
}

export default Card;