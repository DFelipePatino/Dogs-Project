import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchAppBar from './components/Nav/Nav';
import LandingPage from './components/LandingPage/LandingPage';
import { useState } from 'react';
import Detail from './components/Detail/Detail';
import CardsCarousel from '../src/components/Cards/CardsCarousel';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getDogsByName, getTemperaments, filterTemps } from './redux/actions';
import { useNavigate } from 'react-router-dom';
import FormPage from './components/FormPage/FormPage';
import HomePage from './components/HomePage/HomePage';


function App() {
  const dispatch = useDispatch();

  const alltemperaments = useSelector(state => state.dogsTemperaments);
  const navigate = useNavigate();

  const [selectedTemp, setSelectedTemp] = useState("");
  const [orderType, setOrderType] = useState("");
  const [weigthOrderType, setWeigthOrderType] = useState("");
  const [apiDbFilter, setApiDbFilter] = useState("All");


  const [reload, setReload] = useState(false);

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
    setReload(false);
  }, [dispatch, reload]);

  const onHomeClick = () => {
    setReload(true);
    ([]);
  };

  const onClick = (id) => {
    navigate(`/dogs/${id}`)
  }

  const onSearch = (termTrim) => {
    dispatch(getDogsByName(termTrim));
  };

  const filterDogsByTemp = (dogTemp) => {
    dispatch(filterTemps(dogTemp));
  };

  const resetSelection = () => {
    setSelectedTemp("");
    setOrderType("");
    setWeigthOrderType("");
    setApiDbFilter("");
  };

  return (
    <>

      {location.pathname !== "/" && location.pathname !== "/form" && <SearchAppBar setApiDbFilter={setApiDbFilter} apiDbFilter={apiDbFilter} setWeigthOrderType={setWeigthOrderType} weigthOrderType={weigthOrderType} setOrderType={setOrderType} orderType={orderType} selectedTemp={selectedTemp} setSelectedTemp={setSelectedTemp} resetSelection={resetSelection} alltemperaments={alltemperaments} filterDogsByTemp={filterDogsByTemp}
        onSearch={onSearch} onHomeClick={onHomeClick} />}

      <Routes>
        <Route path='nav' element={<SearchAppBar onHomeClick={onHomeClick} />} />
        <Route path='/' element={<LandingPage onHomeClick={onHomeClick} />} />
        <Route path='/test' element={<CardsCarousel />} />
        <Route path='/home' element={<HomePage onClick={onClick} />} />
        <Route path="/dogs/:id" element={<Detail />} />
        <Route path='/form' element={<FormPage onHomeClick={onHomeClick} alltemperaments={alltemperaments} />} />
      </Routes>
    </>
  );
}

export default App;