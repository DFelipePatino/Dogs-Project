const { Dog, Temperaments } = require('../db.js');

const postNewDog = async (dogData, temperamentNames) => {
    const newDog = await Dog.create(dogData);

    for (let name of temperamentNames) {
        let temperament = await Temperaments.findOne({ where: { name } });
        if (!temperament) {
            temperament = await Temperaments.create({ name });
        }
        await newDog.addTemperament(temperament);
    }

    return newDog;
}

module.exports = { postNewDog }


// const { Dog, Temperament } = require("../db.js");
// const axios = require("axios");
// const API_KEY = process.env.API_KEY;

// const getDogWithTemperaments = async (dogId) => {
//     const dog = await Dog.findByPk(dogId, {
//         include: {
//             model: Temperament,
//             attributes: ["name"],
//             through: { attributes: [] },
//         },
//     });

//     if (!dog) {
//         return null;
//     }

//     const formattedDog = {
//         id: dog.id,
//         weight: dog.weight,
//         height: dog.height,
//         name: dog.name,
//         bred_for: dog.bred_for,
//         breed_group: dog.breed_group,
//         life_span: dog.life_span,
//         temperament: dog.Temperaments.map((temp) => temp.name).join(", "),
//         image: dog.image,
//     };

//     return formattedDog;
// };

// const createDog = async (req, res) => {
//     const { image, name, height, weight, lifespan, temperament } = req.body;

//     if (!name) {
//         return res.status(400).json({ error: "Name is undefined or not a string" });
//     }

//     try {
//         const existingDog = await Dog.findOne({ where: { name } });

//         if (existingDog) {
//             return res
//                 .status(400)
//                 .json({ error: "Dog with this name already exists" });
//         }

//         const apiResponse = await axios.get(
//             `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
//         );
//         const existingInApi = apiResponse.data.some((dog) => dog.name === name);

//         if (existingInApi) {
//             return res
//                 .status(400)
//                 .json({ error: "Dog with this name already exists in the API" });
//         }

//         const newDog = await Dog.create({
//             image,
//             name,
//             height,
//             weight,
//             lifespan: lifespan || null,
//         });

//         // Crear instancias de temperamentos si no existen y obtener sus objetos completos
//         const temperamentInstances = await Promise.all(
//             temperament.map(async (temperamentName) => {
//                 const [temperamentInstance] = await Temperament.findOrCreate({
//                     where: { name: temperamentName },
//                 });
//                 return temperamentInstance.id; // Devolver el ID del temperamento
//             })
//         );

//         // Asociar las instancias de temperamentos al perro
//         await newDog.setTemperaments(temperamentInstances);

//         // Obtener el perro con sus temperamentos usando la funciÃ³n creada
//         const dogWithTemperaments = await getDogWithTemperaments(newDog.id);

//         // Obtener los nombres de los temperamentos usando los IDs
//         const temperamentNames = await Temperament.findAll({
//             attributes: ["name"],
//             where: { id: temperamentInstances },
//         });

//         // Ajustar la respuesta para tener temperamentos como un array de strings
//         const responseDog = {
//             ...dogWithTemperaments,
//             temperament: temperamentNames.map((temp) => temp.name),
//         };

//         res.status(201).json(responseDog);
//     } catch (error) {
//         console.error("Error creating dog:", error.message);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// };

// module.exports = createDog;