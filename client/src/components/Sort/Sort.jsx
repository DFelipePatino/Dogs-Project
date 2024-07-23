import { useDispatch } from "react-redux";
import { sortNames, sortSource, orderDogByWeight } from "../../redux/actions";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Typography } from "@mui/material";

const Sort = ({ setApiDbFilter, apiDbFilter, setWeigthOrderType, weigthOrderType, setOrderType, orderType }) => {
    const dispatch = useDispatch();

    const handleNameOrderChange = (e) => {
        setOrderType(e.target.value);
        dispatch(sortNames(e.target.value));
    };

    const handleWeigthOrderChange = (e) => {
        const newWeightOrderType = e.target.value;
        setWeigthOrderType(newWeightOrderType);
        dispatch(orderDogByWeight(newWeightOrderType));
    };

    // const handleApiDbFilterChange = (e) => {
    //     setApiDbFilter(e.target.value);
    //     dispatch(sortSource(e.target.value));
    // };

    return (
        <div className="Sort">
            <Typography variant="h6">Ordenar por:</Typography>

            <br />

            <FormControl variant="outlined" style={{ width: '200px' }}>
                <InputLabel htmlFor="name-order-select">Orden Alfabético</InputLabel>
                <Select
                    value={orderType}
                    onChange={handleNameOrderChange}
                    label="Orden Alfabético"
                    inputProps={{
                        id: 'name-order-select',
                    }}
                >
                    <MenuItem value="A">Ascendente</MenuItem>
                    <MenuItem value="D">Descendente</MenuItem>
                </Select>
            </FormControl>

            <br />
            <br />

            <FormControl variant="outlined" style={{ width: '200px' }}>
                <InputLabel htmlFor="weight-order-select">Orden por Peso</InputLabel>
                <Select
                    value={weigthOrderType}
                    onChange={handleWeigthOrderChange}
                    label="Orden por Peso"
                    inputProps={{
                        id: 'weight-order-select',
                    }}
                >
                    <MenuItem value="WEIGHT ⬆">Peso Ascendente</MenuItem>
                    <MenuItem value="WEIGHT ⬇">Peso Descendente</MenuItem>
                </Select>
            </FormControl>

            {/* <br />
            <br />

            <FormControl variant="outlined" style={{ width: '200px' }}>
                <InputLabel htmlFor="api-db-filter-select">Filtro API/DB</InputLabel>
                <Select
                    value={apiDbFilter}
                    onChange={handleApiDbFilterChange}
                    label="Filtro API/DB"
                    inputProps={{
                        id: 'api-db-filter-select',
                    }}
                >
                    <MenuItem value="All">Todos</MenuItem>
                    <MenuItem value="Api">API</MenuItem>
                    <MenuItem value="DB">DB</MenuItem>
                </Select>
            </FormControl> */}
        </div>
    );
};

export default Sort;
