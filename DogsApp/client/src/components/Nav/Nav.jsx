import { NavLink, Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Sort from '../Sort/Sort';
import Filter from '../Sort/Filter';
import './Nav.css';


const Nav = ({ onSearch, onHomeClick, alltemperaments, filterDogsByTemp, selectedTemp, setSelectedTemp, resetSelection, setApiDbFilter, apiDbFilter, setWeigthOrderType, weigthOrderType, setOrderType, orderType }) => {


    const handleHomeClick = () => {
        onHomeClick();
        resetSelection();
    };


    return (
        <div className='NavBar'>

            <div className="nav-container">
                <NavLink to='/home'>
                    <button onClick={handleHomeClick}>Home</button>
                </NavLink>

                <NavLink to='/form'>
                    <button>Create your Dog!</button>
                </NavLink>

                <div className='searchBar'>
                    <SearchBar onSearch={onSearch} />
                </div>

                <button onClick={handleHomeClick}>Reset Search</button>

                <Sort setApiDbFilter={setApiDbFilter} apiDbFilter={apiDbFilter} setWeigthOrderType={setWeigthOrderType} weigthOrderType={weigthOrderType} setOrderType={setOrderType} orderType={orderType} selectedTemp={selectedTemp} setSelectedTemp={setSelectedTemp} />

                <Filter selectedTemp={selectedTemp} setSelectedTemp={setSelectedTemp} alltemperaments={alltemperaments} filterDogsByTemp={filterDogsByTemp} handleHomeClick={handleHomeClick} />

                <Link to='/'>
                    <button>Exit</button>
                </Link>

            </div>

        </div>
    );
};

export default Nav;