const axios = require("axios");

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.error("API_KEY is not set");
    process.exit(1);
}

const getDogsByID = async (idRaza) => {
    try {
        const URL = `https://api.thedogapi.com/v1/breeds/${idRaza}`;

        const { data } = await axios.get(URL, {
            headers: {
                "x-api-key": API_KEY,
            },
        });

        // If API returns empty or invalid
        if (!data || !data.id) {
            throw new Error("Dog not found");
        }

        return data;

    } catch (error) {
        return {
            error: `No se encontró perrito con el id ${idRaza}`,
        };
    }
};

module.exports = getDogsByID;
