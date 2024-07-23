import { useState } from "react";
import { useDispatch } from "react-redux";

const Filter = ({ alltemperaments, filterDogsByTemp, selectedTemp, setSelectedTemp }) => {



    const handleChange = (event) => {
        setSelectedTemp(event.target.value);
        if (event.target.value !== "") {
            filterDogsByTemp(event.target.value);
        }
    };

    return (
        <div >
            <select value={selectedTemp} onChange={handleChange}>
                <option value="">Temperaments</option>
                {alltemperaments?.map((temp, index) => (
                    <option key={index} value={temp}>
                        {temp}
                    </option>
                ))}
            </select>
        </div>
    );
}


export default Filter;