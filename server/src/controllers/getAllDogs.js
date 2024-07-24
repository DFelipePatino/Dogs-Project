const axios = require("axios")
// const { Dog, Temperaments } = require('../db.js');

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error('API_KEY is not set');
    process.exit(1); // Exit the process with an error code
}


const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getAllDogs = async () => {

    const { data } = await axios.get(URL)


    const dogMap = data.map(dog => { return { name: dog.name, id: dog.id, imagen: dog.image.url, altura: dog.height.metric, peso: dog.weight.metric, age: dog.life_span, temperaments: dog.temperament } })


    // const allDogsDB = await Dog.findAll({
    //     include: {
    //         model: Temperaments,
    //     }
    // })

    // const allDogs = [...allDogsDB, ...dogMap]
    const allDogs = [...dogMap]

    return allDogs

}

module.exports = { getAllDogs }


