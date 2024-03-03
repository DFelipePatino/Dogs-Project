import React from 'react';
import Cards from "../Cards/Cards";
import Pages from '../Pages/Pages';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import './HomePage.css';

const HomePage = ({ onClick }) => {

    const dogs = useSelector((state) => state.dogsCopy);
    console.log("estes es el estado global", dogs)

    const dogsFromDB = useSelector((state) => state.dogsDB);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;


    const currentDogs = dogs.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    console.log("perros por mostras after slice", currentDogs)


    return (
        <div className='homePage'>
            <Cards onClick={onClick} dogs={currentDogs} dogsFromDB={dogsFromDB} />

            <Pages
                itemsPerPage={itemsPerPage}
                totalItems={dogs.length}
                paginate={paginate}
            />
        </div>
    );
}

export default HomePage;