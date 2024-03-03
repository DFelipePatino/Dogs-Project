const axios = require("axios")
const { Dog, Temperaments } = require('../db.js');

const API_KEY = process.env.API_KEY;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getAllDogs = async () => {

    const { data } = await axios.get(URL)


    const dogMap = data.map(dog => { return { name: dog.name, id: dog.id, imagen: dog.image.url, altura: dog.height.metric, peso: dog.weight.metric, age: dog.life_span } })

    console.log(dogMap, "Esto es dogMap")

    const allDogsDB = await Dog.findAll({
        include: {
            model: Temperaments,
        }
    })

    const allDogs = [...allDogsDB, ...dogMap]

    return allDogs

}

module.exports = { getAllDogs }


