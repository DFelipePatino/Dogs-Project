const axios = require("axios");
const { Dog } = require("../db");
const Op = require('sequelize').Op; // Asegúrate de que esto esté definido

const getDogsByName = async (name) => {
    const lowerCaseName = name.toLowerCase();
    const URL = `https://api.thedogapi.com/v1/breeds/search?q=${lowerCaseName}`;
    const { data: apiData } = await axios.get(URL);

    const dogsFromDB = await Dog.findAll({
        where: {
            name: {
                [Op.iLike]: '%' + name + '%'
            }
        }
    });



    const apiDogsWithImages = await Promise.all(apiData.map(async (apiDog) => {
        // Hacer una solicitud adicional para obtener la imagen basada en el id_reference_image
        const imageResponse = await axios.get(`https://api.thedogapi.com/v1/images/${apiDog.reference_image_id}`);
        const image = {
            id: imageResponse.data.id,
            width: imageResponse.data.width,
            height: imageResponse.data.height,
            url: imageResponse.data.url
        };

        // Agregar la propiedad 'image' al objeto apiDog
        return { ...apiDog, image };
    }));

    const allDogs = [...apiDogsWithImages, ...dogsFromDB];

    if (allDogs.length === 0) {
        return `No se encontro perrito con el nombre ${name}`;
    }

    return allDogs;
}

module.exports = { getDogsByName }