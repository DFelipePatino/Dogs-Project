const axios = require("axios")
// const { Dog } = require("../db");


const getDogsByID = async (idRaza) => {
    const API_KEY = process.env.API_KEY;
    const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

    let dogFromAPI;
    // let dogsFromDB;

    const { data } = await axios.get(URL);

    if (!isNaN(idRaza)) {
        dogFromAPI = data.find(dog => dog.id === parseInt(idRaza));
        if (dogFromAPI) {
            return { data: [dogFromAPI] };
        }
        // } else {
        //     dogsFromDB = await Dog.findAll({
        //         where: {
        //             id: idRaza
        //         }
        //     });
        //     if (dogsFromDB.length > 0) {
        //         return { data: dogsFromDB };
        //     }
    }

    return { error: `No se encontro perrito con el id ${idRaza}` };


};

module.exports = getDogsByID