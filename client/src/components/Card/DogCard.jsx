import React from 'react';
import './Card.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const DogCard = ({ dogDB, image, onClick, id, name, temperament, weight, lifeSpan }) => {


    // console.log(dogDB)
    return (
        dogDB ? (
            <div className='container-card'>
                <div className="imagen" onClick={() => onClick(id)}>
                    <img src={dogDB?.imagen} alt="dog" />
                </div>

                <div className="title">
                    <h2>{dogDB?.name}</h2>
                    <p>
                        <span className="span-temperament">Temperament:</span>{' '}
                        {dogDB?.temperaments
                            ? dogDB.temperaments.split(', ').join(', ')
                            : 'N/A'}
                    </p>
                </div>


                <div className="weight">
                    <p>Weight: {dogDB?.peso}kg </p>
                    <p>Height: {dogDB?.altura} </p>
                    <p>Age: {dogDB?.age} </p>
                </div>
            </div>
        ) : (
            <Card sx={{
                maxWidth: '100%',
                width: '100%',
                height: 'auto',
                minHeight: 400,
                margin: '0 auto',
                fontSize: "18px",
                backgroundColor: "#e07a5f",
                borderRadius: '40px',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
                transition: 'box-shadow 0.3s ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)'
                }
            }}>
                {image &&
                    <CardMedia
                        onClick={() => onClick(id)}
                        component="img"
                        height="200"
                        image={image}
                        alt="dog"
                        sx={{
                            cursor: 'pointer',
                            borderRadius: '40px 40px 0 0',
                            objectFit: 'cover'
                        }}
                    />
                }
                <CardContent sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#fff'
                }}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                            color: '#fff',
                            fontWeight: 'bold',
                            textAlign: 'center'
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            mt: 1
                        }}
                    >
                        <span style={{ fontWeight: 'bold' }}>Temperament:</span> {temperament || 'N/A'}
                        <br />
                        <br />
                        <span style={{ fontWeight: 'bold' }}>Weight:</span> {weight}kg
                    </Typography>
                </CardContent>
            </Card>
        )
    );
}

export default DogCard;