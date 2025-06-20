import { useState } from 'react';

export default function SearchBar({ searchInput, setSearchInput, setSearchQuery }) {
    // handles form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
    }

    // handles clear
    const handleClear = () => {
        setSearchInput('');
        setSearchQuery('');
    }

    return (
        <div className="search-bar">
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    placeholder="Search"
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Search
                </button>
                <button type="button" onClick={handleClear}>
                    Clear
                </button>
            </form>
        </div>
    )
}
