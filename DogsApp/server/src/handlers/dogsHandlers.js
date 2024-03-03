const { getDogsByName } = require("../controllers/getDogsByName")
const { getAllDogs } = require("../controllers/getAllDogs")
const getDogsByID = require("../controllers/getDogsByID")
const { postNewDog } = require("../controllers/postNewDog");

const getDogs = async (req, res) => {

    try {
        const response = await getAllDogs();
        res.status(200).json(response);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const dogsByName = async (req, res) => {
    const { name } = req.query;

    try {
        const response = await getDogsByName(name);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



const dogsByID = async (req, res) => {
    const { idRaza } = req.params;

    try {
        const response = await getDogsByID(idRaza);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}


const createDog = async (req, res) => {
    const dogData = req.body;

    try {
        const response = await postNewDog(dogData, dogData.temperamentNames);
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    getDogs,
    dogsByID,
    dogsByName,
    createDog,
}