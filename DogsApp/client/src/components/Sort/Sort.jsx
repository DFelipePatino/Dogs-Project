import { useState } from "react";
import { useDispatch } from "react-redux";
import { sortNames, sortSource, orderDogByWeight } from "../../redux/actions";


const Sort = ({ setApiDbFilter, apiDbFilter, setWeigthOrderType, weigthOrderType, setOrderType, orderType }) => {


    const dispatch = useDispatch();

    // const [orderType, setOrderType] = useState("Alphabetic Order");

    // const [weigthOrderType, setWeigthOrderType] = useState("SORT BY WEIGHT");
    // const [apiDbFilter, setApiDbFilter] = useState("All");


    const handleNameOrderChange = (e) => {
        setOrderType(e.target.value);
        dispatch(sortNames(e.target.value))
    }

    const handleWeigthOrderChange = (e) => {
        setWeigthOrderType(e.target.value);
        dispatch(orderDogByWeight(e.target.value));
    };

    const handleApiDbFilterChange = (e) => {
        setApiDbFilter(e.target.value);
        dispatch(sortSource(e.target.value));
    };

    return (


        <div className="Sort">
            <select value={orderType} onChange={handleNameOrderChange}>
                <option value="Alphabetic Order" placeholder="Alphabetic Order">
                    Alphabetic Order
                </option>
                <option value="A">Ascending</option>
                <option value="D">Descending</option>
            </select>

            <select value={weigthOrderType} onChange={handleWeigthOrderChange}>
                <option>SORT BY WEIGHT</option>
                <option value="WEIGTH ⬇">Weight Descending</option>
                <option value="WEIGTH ⬆">Weight Ascending</option>
            </select>

            <select value={apiDbFilter} onChange={handleApiDbFilterChange}>
                <option value="Api">Api</option>
                <option value="DB">Db</option>
            </select>
        </div>
    );
}

export default Sort;