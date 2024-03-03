import React, { useState } from 'react';
import './FormPage.css';
import { useDispatch } from 'react-redux';
import { createDog } from '../../redux/actions';
import { Link } from "react-router-dom";


const FormPage = ({ alltemperaments, onHomeClick }) => {

    const [Submitted, setIsSubmitted] = useState(false);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [alturaMin, setAlturaMin] = useState('');
    const [alturaMax, setAlturaMax] = useState('');
    const [pesoMin, setPesoMin] = useState('');
    const [pesoMax, setPesoMax] = useState('');
    const [imagen, setImagen] = useState('');
    const [temperamentNames, setTemperamentNames] = useState([]);
    console.log(temperamentNames, "temperamentNames")

    const dispatch = useDispatch();

    const handleRemoveTemperament = (temperament) => {
        setTemperamentNames(temperamentNames.filter(t => t !== temperament));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const nameRegex = /\d/;
        if (nameRegex.test(name)) {
            alert("Nombre no puede tener numeros");
            return;
        }

        if (!name || !alturaMin || !alturaMax || !pesoMin || !pesoMax || !temperamentNames.length) {
            alert("Todos los campos son obligatorios");
            return;
        }

        if (temperamentNames.length > 6) {
            alert("No puedes seleccionar mas de 6 temperamentos");
            return;
        }

        if (parseInt(alturaMin) > parseInt(alturaMax)) {
            alert("Altura minima no puede ser mayor a la maxima");
            return;
        }

        if (parseInt(pesoMin) > parseInt(pesoMax)) {
            alert("Peso minimo no puede ser mayor al maximo");
            return;
        }

        if (Submitted) {
            setIsSubmitted(false);
        }

        const dogData = {
            name: name,
            altura: alturaMin + " - " + alturaMax,
            peso: pesoMin + " - " + pesoMax,
            age: age + " years",
            imagen: imagen,
            temperamentNames: temperamentNames,
        };
        dispatch(createDog(dogData));
        setIsSubmitted(true);

    };


    return (

        <div className='form-container'>

            <h1>Create your Dog!</h1>

            {Submitted && <p>Has creado a tu perro!</p>}


            <form onSubmit={handleSubmit} className='form'>

                <label>
                    Nombre:
                </label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />

                <label>
                    Age:
                </label>
                <input type="text" value={age} onChange={e => setAge(e.target.value)} />

                <label>
                    Altura Min:
                </label>
                <input type="text" value={alturaMin} onChange={e => setAlturaMin(e.target.value)} />

                <label>
                    Altura Max:
                </label>
                <input type="text" value={alturaMax} onChange={e => setAlturaMax(e.target.value)} />

                <label>
                    Peso Min:
                </label>
                <input type="text" value={pesoMin} onChange={e => setPesoMin(e.target.value)} />

                <label>
                    Peso Max:
                </label>
                <input type="text" value={pesoMax} onChange={e => setPesoMax(e.target.value)} />

                <label>
                    Imagen:
                </label>
                <input type="text" placeholder='Ingresa tu URL' value={imagen} onChange={e => setImagen(e.target.value)} />


                <div className='temperaments'>

                    <label>
                        Temperaments:
                    </label>
                    <select onChange={e => {
                        if (e.target.value) {
                            setTemperamentNames(prevTemperaments => [...prevTemperaments, e.target.value]);
                        }
                    }}>
                        <option value=''>Temperaments</option>

                        {alltemperaments?.map((temperament, index) => (
                            <option key={index} value={temperament}>{temperament}</option>
                        ))}
                    </select>

                </div>


                <div className='TempBox'>
                    {temperamentNames?.map((temp, index) => (
                        <p className='SelectedTemps' key={index} value={temp}>
                            {temp}
                            <button onClick={() => handleRemoveTemperament(temp)}>X</button>
                        </p>
                    ))}
                </div>

                <input className='inputButton' type="submit" value="Submit" />

            </form>

            <Link onClick={onHomeClick} className='BackButton' to='/home'>
                <button>Back</button>
            </Link>
        </div>
    );
};

export default FormPage;