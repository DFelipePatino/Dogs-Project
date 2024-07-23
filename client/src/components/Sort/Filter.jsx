import { useDispatch } from "react-redux";
import { filterTemps } from "../../redux/actions";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Typography } from "@mui/material";

const Filter = ({ alltemperaments, filterDogsByTemp, selectedTemp, setSelectedTemp }) => {

    const dispatch = useDispatch();

    const handleChange = (event) => {
        setSelectedTemp(event.target.value);
        if (event.target.value !== "") {
            filterDogsByTemp(event.target.value);
            dispatch(filterTemps(event.target.value));
        }
    };

    return (
        <div>
            <Typography variant="h6">Filtrar por:</Typography>

            <br />

            <FormControl variant="outlined" style={{ width: '200px' }}>
                <InputLabel htmlFor="temperament-select">Temperamentos</InputLabel>
                <Select
                    value={selectedTemp}
                    onChange={handleChange}
                    label="Temperamentos"
                    inputProps={{
                        id: 'temperament-select',
                    }}
                >
                    <MenuItem value="">Temperamentos</MenuItem>
                    {alltemperaments?.map((temp, index) => (
                        <MenuItem key={index} value={temp}>
                            {temp}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default Filter;
