import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Container, Box } from "@mui/material";
import "./Detail.css";

const Detail = () => {
    const { id } = useParams();
    const [dog, setDog] = useState(null);

    // const baseUrl = "https://dogs-project-d53t.onrender.com";
    const baseUrl = "http://localhost:3001";

    useEffect(() => {
        axios
            .get(`${baseUrl}/dogs/${id}`)
            .then(({ data }) => {
                if (data && data.name) {
                    setDog(data);
                } else {
                    window.alert("No hay perros con ese ID");
                }
            })
            .catch((error) => console.error(error));

        return () => setDog(null);
    }, [id]);

    if (!dog) {
        return <h1 className="Loading">Loading...</h1>;
    }

    return (
        <Container
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: "60px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: 1000,
                    padding: "0 20px",
                }}
            >
                <Card
                    sx={{
                        width: "100%",
                        backgroundColor: "#e07a5f",
                        borderRadius: 10,
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
                            },
                        }}
                        image={dog.image?.url}
                        title={dog.name}
                    />

                    <CardContent>
                        <Typography gutterBottom variant="h4">
                            {dog.name}
                        </Typography>

                        <Typography variant="body1">
                            Temperament: {dog.temperament || "N/A"}
                        </Typography>

                        <Typography variant="body1">
                            Weight: {dog.weight?.metric || "N/A"} kg
                        </Typography>

                        <Typography variant="body1">
                            Height: {dog.height?.metric || "N/A"} cm
                        </Typography>

                        <Typography variant="body1">
                            Breed Group: {dog.breed_group || "N/A"}
                        </Typography>

                        <Typography variant="body1">
                            Bred for: {dog.bred_for || "N/A"}
                        </Typography>

                        <Typography variant="body1">
                            Life Span: {dog.life_span || "N/A"}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default Detail;
