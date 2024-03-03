import { GET_DOGS } from "./action-types";
import { GET_TEMPERAMENTS } from "./action-types";
import { GET_DOGS_BY_NAME } from "./action-types";
import { DOGS_FILTERED } from "./action-types";
import { SORT_NAMES } from "./action-types";
import { FILTER_BY_API } from "./action-types";
import { FILTER_BY_DB } from "./action-types";
import { SORT_WEIGHT } from "./action-types";
import { GET_DOGS2 } from "./action-types";

const initialState = {
    dogs: [],
    dogsCopy: [],
    dogsTemperaments: [],
    dogsDB: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_DOGS:
            return {
                ...state,

                dogsCopy: action.payload,
                dogsDB: [],
            }

        case GET_DOGS2:
            return {
                ...state,
                dogs: action.payload,

            }

        case GET_TEMPERAMENTS:
            return {
                ...state,
                dogsTemperaments: action.payload
            }

        case GET_DOGS_BY_NAME:
            return {
                ...state,
                dogsCopy: action.payload,
            }

        case DOGS_FILTERED:
            return {
                ...state,
                dogsCopy: action.payload,
            }

        case SORT_NAMES:
            return {
                ...state,
                dogsCopy: action.payload,
            };

        case FILTER_BY_API:
            return {
                ...state,
                dogsCopy: action.payload,
                dogsDB: [],
            };

        case FILTER_BY_DB:
            return {
                ...state,
                dogsDB: action.payload,
                dogsCopy: action.payload,
            };

        case SORT_WEIGHT:
            return {
                ...state,
                dogsCopy: action.payload,
            };


        default:
            return { ...state }


    }

}

export default reducer;