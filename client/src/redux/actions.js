import { GET_DOGS } from "./action-types";
import { GET_TEMPERAMENTS } from "./action-types";
import { CREATE_DOG } from "./action-types";
import { GET_DOGS_BY_NAME } from "./action-types";
import { DOGS_FILTERED } from "./action-types";
import { SORT_NAMES } from "./action-types";
import { FILTER_BY_API } from "./action-types";
import { FILTER_BY_DB } from "./action-types";
import { SORT_WEIGHT } from "./action-types";
import { GET_DOGS2 } from "./action-types";
import axios from "axios";

baseUrl = "https://dogs-project-d53t.onrender.com";

export const getDogs = () => {
    return (dispatch) => {
        axios(`${baseUrl}/dogs`)
            .then(({ data }) => {
                const filteredApi = data.filter((dog) => typeof dog.id === "number");
                dispatch({ type: GET_DOGS, payload: filteredApi });
                dispatch({ type: GET_DOGS2, payload: data });
            })
            .catch(error => console.log(error));
    }
}

// export const getDogsByName = (dog) => {
//     const lowerCaseName = dog.toLowerCase();
//     const URL = `http://localhost:3001/dogs/name?name=${lowerCaseName}`;
//     return (dispatch) => {
//         axios(URL)
//             .then(({ data }) => {
//                 return dispatch({ type: GET_DOGS_BY_NAME, payload: data })
//             })
//             .catch(error => console.log(error))
//     }
// }

export const getDogsByName = (name) => {
    return async (dispatch, getState) => {
        try {

            const { dogsCopy } = getState();

            let dogsToFilter;

            const lowerCaseName = name.toLowerCase();
            const URL = `${baseUrl}/dogs/name?name=${lowerCaseName}`;


            if (dogsCopy.length > 0) {
                dogsToFilter = dogsCopy;

            } else if (dogsCopy.length === 0) {

                window.alert(`No hay perros para filtrar, tu busqueda por ${name} se realizara ahora`)

                const allDogs = await axios(`${baseUrl}/dogs`);
                dogsToFilter = allDogs.data;
                // console.log(dogsToFilter, "dogsToFilter")
            }

            const nameFilteredDogs = await axios(URL);
            const filteredDogs = dogsToFilter.filter((dog) => nameFilteredDogs.data.some((filteredDog) => dog.id === filteredDog.id));

            dispatch({ type: GET_DOGS_BY_NAME, payload: nameFilteredDogs.data });
            dispatch({ type: DOGS_FILTERED, payload: filteredDogs });
        } catch (error) {
            console.log(error);
        }
    };
};


// export const filterDogs = (temperament) => {
//     return (dispatch) => {
//         axios(`http://localhost:3001/dogs`)
//             .then(({ data }) => {
//                 const filteredDogs = data.filter(dog => dog.temperament && dog.temperament.includes(temperament));
//                 return dispatch({ type: DOGS_FILTERED, payload: filteredDogs });
//             })
//             .catch(error => console.log(error))
//     }
// }

export const filterTemps = (temperament) => {
    return async (dispatch, getState) => {
        try {
            const { dogsCopy } = getState();

            // let dogsToFilter;


            // if (dogsCopy.length > 0) {
            //     dogsToFilter = dogsCopy;


            // } else if (dogsCopy.length === 0) {
            //     window.alert(`No hay perros para filtrar, tu busqueda por ${temperament} se realizara ahora`)

            //     const allDogs = await axios('http://localhost:3001/dogs');
            //     dogsToFilter = allDogs.data;
            // }

            const filteredDogs = dogsCopy.filter((dog) => dog.temperaments && dog.temperaments.includes(temperament));

            if (filteredDogs.length === 0) {
                window.alert(`No hay perros que tengan el temperamento ${temperament}`)
            }

            dispatch({ type: DOGS_FILTERED, payload: filteredDogs });
        } catch (error) {
            console.log(error);
        }
    };
};



export const getTemperaments = () => {
    return (dispatch) => {
        axios(`${baseUrl}/temperaments`)
            .then(({ data }) => {
                return dispatch({ type: GET_TEMPERAMENTS, payload: data })
            })
            .catch(error => console.log(error))
    }
}

// export const createDog = (dog) => {
//     return async (dispatch) => {
//         await axios.post('http://localhost:3001/dogs', dog)
//             .catch(error => console.log(error))
//     }
// }

export const sortNames = (order) => {
    // console.log(order, "order")

    return (dispatch, getState) => {
        const { dogsCopy } = getState();
        const orderCopy = [...dogsCopy]

        if (order === "A") {
            orderCopy.sort((a, b) => a.id - b.id);
        }
        if (order === "D") {
            orderCopy.sort((a, b) => b.id - a.id);
        }

        // console.log(orderCopy, "dogsCopy Action names")
        return dispatch({ type: SORT_NAMES, payload: orderCopy });
    }
};


export const sortSource = (idType) => {
    return (dispatch, getState) => {
        const { dogs } = getState();

        if (idType === "Api") {
            const filteredApi = dogs.filter((dog) => typeof dog.id === "number");

            dispatch({ type: FILTER_BY_API, payload: filteredApi });

        } else if (idType === "DB") {
            const filteredDb = dogs.filter((dog) => typeof dog.id === "string");

            // console.log(filteredDb, "asi se ve desde la BD")
            dispatch({ type: FILTER_BY_DB, payload: filteredDb });
        }
    };
};




export const orderDogByWeight = (payload) => {
    // console.log(payload, "payload en actions");
    return (dispatch, getState) => {
        try {
            const { dogsCopy } = getState();
            const dogsWeight = [...dogsCopy];

            dogsWeight.sort((a, b) => {
                const parseWeight = (weightString) => {
                    if (!weightString) {
                        return 0;
                    }
                    const parts = weightString.split(" - ").map(Number);

                    return (parts[0] + parts[1]) / 2;
                };

                const averageWeightA = a.peso ? parseWeight(a.peso) : 0;

                const averageWeightB = b.peso ? parseWeight(b.peso) : 0;


                if (payload === "WEIGHT ⬆") {
                    return averageWeightA - averageWeightB;
                } else if (payload === "WEIGHT ⬇") {
                    return averageWeightB - averageWeightA;
                } else {
                    return 0;
                }

            });

            dispatch({ type: SORT_WEIGHT, payload: dogsWeight });
        } catch (error) {
            console.log(error);
        }
    };
}



// export const sortNames = (order) => {
//     return (dispatch, getState) => {
//         const { dogsCopy } = getState();

//         if (order === "A-Z") {
//             dogsCopy.sort((a, b) => a - b);
//         } else if (order === "Z-A") {
//             dogsCopy.sort((a, b) => b - a);
//         }

//         console.log(dogsCopy, "dogsCopy")

//         dispatch({ type: SORT_NAMES, payload: dogsCopy });
//     }
// }
