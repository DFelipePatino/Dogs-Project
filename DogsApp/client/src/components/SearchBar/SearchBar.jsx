import { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
    const [term, setTerm] = useState('');

    const termTrim = term.trim();
    console.log("este es el termtrim", termTrim)

    const onSubmit = (event) => {
        event.preventDefault();
        if (termTrim === '') {
            window.alert('Search cannot be empty');
        } else {
            onSearch(termTrim);
            setTerm('');
        }
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setTerm(value);
    }

    return (
        <>
            <div className='SearchBar'>
                <form onSubmit={onSubmit}>
                    <div className='SearchBar__buttons'>
                        <input
                            type="text"
                            value={term}
                            onChange={handleChange}
                            placeholder="Search for a dog..."
                        />
                        <button type="submit">Search</button>
                    </div>
                </form>
            </div>

        </>
    );
}

export default SearchBar;