import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DogCard from "../Card/DogCard";
import axios from 'axios';
import './Detail.css';

const Detail = () => {
    const { id } = useParams();
    const [dog, setDog] = useState({});

    const baseUrl = "https://dogs-project-d53t.onrender.com";

    useEffect(() => {
        axios.get(`${baseUrl}/${id}`)
            .then(({ data }) => {
                if (data.data.length > 0 && data.data[0].name) {
                    //validamos que el id exista y que tenga un nombre
                    setDog(data.data[0]);
                } else {
                    window.alert("No hay personajes con ese ID");
                }
            })
            .catch(error => console.error(error));

        return () => setDog({});
    }, [id]);

    return (
        <>
            {dog.name ? (
                <div className="detail-container">
                    <div className="image-container">
                        <img src={dog.image.url} alt={dog.name} />
                    </div>
                    <div className="info-container">
                        <DogCard
                            name={dog.name}
                            temperament={dog.temperament}
                            weight={dog.weight.metric}
                            lifeSpan={dog.life_span}
                        />
                    </div>
                    {/* <div className="info-container">
                        <h1>{dog.name}</h1>
                        <p>ID: {dog.id}</p>
                        <p>Temperamentos: {dog.temperament}</p>
                        <p>Peso: {dog.weight.metric}</p>
                        <p>Altura: {dog.height.metric}</p>
                        <p>Años de Vida: {dog.life_span}</p>
                    </div> */}
                </div>
            ) : (
                <h1 className="Loading">Loading...</h1>
            )}
        </>
    );
};

export default Detail;