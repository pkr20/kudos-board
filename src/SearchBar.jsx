import { useState } from 'react';

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState("");

    const inputChange = (e) => {
        setSearchInput(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(searchInput);
    }

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={searchInput}
                    onChange={inputChange}
                    placeholder="Search"
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Search
                </button>
            </form>
        </div>
    )
}
