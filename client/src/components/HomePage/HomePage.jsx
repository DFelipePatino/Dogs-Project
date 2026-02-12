import React from 'react';
import { Grow } from '@mui/material';
import Cards from "../Cards/Cards";
import CardsCarousel from '../Cards/CardsCarousel';
import Pages from '../Pages/Pages';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './HomePage.css';

const HomePage = ({ onClick }) => {

    const [loadingShown, setLoadingShown] = useState(false);
    const [homePageGrow, setHomePageGrow] = useState(true);

    const dogs = useSelector((state) => state.dogsCopy);
    console.log("este es el estado global", dogs)

    const dogsFromDB = useSelector((state) => state.dogsDB);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;


    const currentDogs = dogs.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // console.log("perros por mostras after slice", currentDogs)

    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoadingShown(false);
    //     }, 2000)
    // }
    //     , [])


    return (
        <>

            {!loadingShown ? (

                <Grow
                    in={homePageGrow}
                    style={{ transformOrigin: '1 1 1' }}
                    {...(loadingShown ? { timeout: 1500 } : {})}
                >
                    <div className='homePage'>
                        {/* <Cards onClick={onClick} dogs={currentDogs} dogsFromDB={dogsFromDB} /> */}

                        <CardsCarousel onClick={onClick} dogs={currentDogs} dogsFromDB={dogsFromDB} />

                        <div className="pages-wrapper">
                            <Pages
                                itemsPerPage={itemsPerPage}
                                totalItems={dogs.length}
                                paginate={paginate}
                            />
                        </div>
                    </div>
                </Grow>
            ) : (
                <Grow
                    in={loadingShown}
                    style={{ transformOrigin: '1 1 1' }}
                    {...(loadingShown ? { timeout: 1000 } : {})}
                >
                    <div className='loading'>
                        <br />
                        <br />
                        Loading...
                        <br />
                        <br />
                        <p>Preparate para una gran experiencia!</p>
                        <Box sx={{ width: '100%', paddingBottom: "10%" }}>
                            <LinearProgress />
                        </Box>
                    </div>
                </Grow>
            )}
        </>
    );
}

export default HomePage;