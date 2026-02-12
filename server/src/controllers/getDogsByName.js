const axios = require("axios");
// const { Dog } = require("../db");
// const { Op } = require("sequelize");

const API_KEY = process.env.API_KEY; // Make sure your API key is in your environment variables

if (!API_KEY) {
    console.error("API_KEY is not set");
    process.exit(1); // Exit if API key is missing
}

const getDogsByName = async (name) => {
    const lowerCaseName = name.toLowerCase();
    const URL = `https://api.thedogapi.com/v1/breeds/search?q=${lowerCaseName}`;

    // Get breeds from API with API key
    const { data: apiData } = await axios.get(URL, {
        headers: {
            "x-api-key": API_KEY
        }
    });

    // Map each dog to include its image
    const apiDogsWithImages = await Promise.all(
        apiData.map(async (apiDog) => {
            let image = null;

            if (apiDog.reference_image_id) {
                const imageResponse = await axios.get(
                    `https://api.thedogapi.com/v1/images/${apiDog.reference_image_id}`,
                    { headers: { "x-api-key": API_KEY } }
                );

                image = {
                    id: imageResponse.data.id,
                    width: imageResponse.data.width,
                    height: imageResponse.data.height,
                    url: imageResponse.data.url,
                };
            }

            return { ...apiDog, image };
        })
    );

    // const dogsFromDB = await Dog.findAll({
    //   where: {
    //     name: {
    //       [Op.iLike]: `%${name}%`
    //     }
    //   }
    // });

    // Merge API dogs with DB dogs if needed
    // const allDogs = [...apiDogsWithImages, ...dogsFromDB];
    const allDogs = [...apiDogsWithImages];

    if (allDogs.length === 0) {
        return `No se encontró perrito con el nombre "${name}"`;
    }

    return allDogs;
};

module.exports = { getDogsByName };
