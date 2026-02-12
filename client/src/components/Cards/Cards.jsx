import Card from '../Card/DogCard';
import { Grow } from '@mui/material';
import './Cards.css';

const Cards = ({ onClick, dogs, dogsFromDB }) => {

    const renderCards = (list) =>
        list.map((dog, index) => (
            <Grow
                key={dog.id}
                in={true}
                timeout={500 + index * 80} // stagger animation
            >
                <div className="card-wrapper">
                    <Card
                        {...dog}
                        dogDB={dog.dogDB}
                        onClick={onClick}
                    />
                </div>
            </Grow>
        ));

    return (
        <div className="cards-page">
            <div className="cards-container">
                {dogsFromDB?.length > 0
                    ? renderCards(dogsFromDB)
                    : renderCards(dogs || [])}
            </div>
        </div>
    );
};

export default Cards;
