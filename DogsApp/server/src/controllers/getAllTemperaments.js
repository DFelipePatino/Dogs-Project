const axios = require('axios');
const { Temperaments } = require('../db');

const getAllTemperaments = async () => {
    const URL = 'https://api.thedogapi.com/v1/breeds?api_key=';
    const { data } = await axios.get(URL);

    let apiTemperaments = data.map(dog => dog.temperament);

    let temperaments = [];

    apiTemperaments.forEach(temperament => {
        if (temperament) {
            let tempArray = temperament.split(', ');
            tempArray.forEach(temp => {
                if (!temperaments.includes(temp)) {
                    temperaments.push(temp);
                }
            })
        }
    })
    // orgnizo array para que este sea creado en orden alfabetico 
    temperaments.sort();

    for (let temp of temperaments) {
        await Temperaments.findOrCreate({ where: { name: temp } });
    }

    //aqui traigo todos los temperaments y los organizo
    const dbTemperaments = await Temperaments.findAll({
        order: [
            ['name', 'ASC']
        ]
    });

    let dbTemperamentsNames = dbTemperaments.map(temp => temp.name)

    return dbTemperamentsNames
}

module.exports = { getAllTemperaments }