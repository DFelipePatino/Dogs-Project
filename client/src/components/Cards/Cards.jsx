import Card from '../Card/DogCard';
import { Grow } from '@mui/material';
import './Cards.css';

const Cards = ({ onClick, dogs, dogsFromDB }) => {


    return (
        dogsFromDB && dogsFromDB.length > 0 ? (
            <Grow
                in={true}
                style={{ transformOrigin: '1 1 1' }}
                {...(true ? { timeout: 800 } : {})}
            >
                <div className="cards-container">
                    {dogsFromDB.map(dogDB =>
                        <Card
                            key={dogDB.id}
                            dogDB={dogDB}
                            onClick={onClick}
                        />)}
                </div>
            </Grow>
        ) : (
            <Grow
                in={true}
                style={{ transformOrigin: '1 1 1' }}
                {...(true ? { timeout: 800 } : {})}
            >
                <div className='main-container'>
                    <div className="cards-container">
                        {dogs?.map((dog) => (
                            <Card
                                key={dog.id}
                                id={dog.id}
                                name={dog.name}
                                image={dog.imagen}
                                temperament={dog.temperaments}
                                weight={dog.peso}
                                onClick={onClick}
                            />
                        ))}
                    </div>
                </div>
            </Grow>
        )
    );
}

export default Cards;