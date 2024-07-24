import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { Container, Box } from "@mui/material";
import './Detail.css';

const Detail = () => {
    const { id } = useParams();
    const [dog, setDog] = useState({});

    const baseUrl = "https://dogs-project-d53t.onrender.com";

    useEffect(() => {
        axios.get(`${baseUrl}/dogs/${id}`)
            .then(({ data }) => {
                if (data.data.length > 0 && data.data[0].name) {
                    // validamos que el id exista y que tenga un nombre
                    setDog(data.data[0]);
                } else {
                    window.alert("No hay perros con ese ID");
                }
            })
            .catch(error => console.error(error));

        return () => setDog({});
    }, [id]);

    return (
        <>
            {dog.name ? (
                <Container
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '60px' }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                            maxWidth: 1000,
                            padding: '0 20px',
                        }}
                    >
                        <Card
                            sx={{
                                width: '100%',
                                height: {
                                    xs: 'auto',
                                    sm: 'auto',
                                    md: 'auto',
                                    lg: 'auto',
                                    backgroundColor: "#e07a5f",
                                    borderRadius: 50,
                                },
                                boxShadow: 3,
                            }}
                        >
                            <CardMedia
                                sx={{
                                    height: {
                                        xs: 300,
                                        sm: 400,
                                        md: 500,
                                        lg: 600,
                                    }
                                }}
                                image={dog.image.url}
                                title={dog.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div">
                                    {dog.name}
                                </Typography>
                                <br />
                                <Typography variant="body1" color="text.secondary">
                                    Temperament: {dog.temperament}
                                </Typography>
                                <br />
                                <Typography variant="body1" color="text.secondary">
                                    Weight: {dog.weight.metric} kg
                                </Typography>

                                <Typography variant="body1" color="text.secondary">
                                    Height: {dog.height.metric} m
                                </Typography>
                                {/* <br />
                                <Typography variant="body1" color="text.secondary">
                                    Origin: {dog.country_code}
                                </Typography> */}
                                <br />
                                <Typography variant="body1" color="text.secondary">
                                    Breed Group: {dog.breed_group}
                                </Typography>

                                <Typography variant="body1" color="text.secondary">
                                    Bred for: {dog.bred_for}
                                </Typography>

                                <Typography variant="body1" color="text.secondary">
                                    Life Span: {dog.life_span}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Container>
            ) : (
                <h1 className="Loading">Loading...</h1>
            )}
        </>
    );
};

export default Detail;
