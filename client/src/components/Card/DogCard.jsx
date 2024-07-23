import React from 'react';
// import './Card.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const DogCard = ({ dogDB, image, onClick, id, name, temperament, weight, lifeSpan }) => {

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
            <Card sx={{ maxWidth: 345, height: 400, marginTop: "10px", fontSize: "18px", backgroundColor: "#e07a5f" }}>

                {image &&
                    <CardMedia
                        onClick={() => onClick(id)}
                        component="img"
                        height="140"
                        image={image}
                        alt="dog"
                    />
                }
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Temperaments: {temperament}
                        <br />
                        <br />
                        Weigth: {weight}kg
                        <br />
                        <br />
                        Espectativa de Vida: {lifeSpan}
                    </Typography>
                </CardContent>

            </Card>

            // <div className='container-card'>
            //     <div className="imagen" onClick={() => onClick(id)}>
            //         <img src={image} alt="dog" />
            //     </div>

            //     <div className="title">
            //         <h2>{name} </h2>
            //         <p><span className='span-temperament'>Temperament:</span>{temperament} </p>
            //     </div>

            //     <div className="weight">
            //         <p>Weight: {weight}kg </p>
            //     </div>
            // </div>

        )
    );
}

export default DogCard;