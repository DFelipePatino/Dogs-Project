const { Router } = require('express');
const { getDogs, dogsByID, dogsByName, createDog } = require("../handlers/dogsHandlers");
const { getTemperaments } = require("../handlers/temperamentsHandlers");

const router = Router();

router.get("/dogs", getDogs);
router.get("/dogs/name", dogsByName);
router.get("/dogs/:idRaza", dogsByID);
// router.post("/dogs", createDog);
router.get("/temperaments", getTemperaments);

module.exports = router;
