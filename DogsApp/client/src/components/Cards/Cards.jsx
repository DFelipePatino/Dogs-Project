import Card from '../Card/Card';
import './Cards.css';

const Cards = ({ onClick, dogs, dogsFromDB }) => {

    console.log(dogs, "estos son los perros")
    return (
        dogsFromDB && dogsFromDB.length > 0 ? (
            <div className="cards-container">
                {dogsFromDB.map(dogDB => <Card key={dogDB.id} dogDB={dogDB} onClick={onClick} />)}
            </div>
        ) : (
            <div className='main-container'>
                <div className="cards-container">
                    {dogs?.map((dog) => (
                        <Card
                            key={dog.id}
                            id={dog.id}
                            name={dog.name}
                            image={dog.imagen}
                            temperament={dog.temperament}
                            weight={dog.peso}
                            onClick={onClick}
                        />
                    ))}
                </div>
            </div>
        )
    );
}

export default Cards;