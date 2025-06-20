import { useState, useEffect } from 'react';
import KudosCard from './KudosCard';
//import kudosData from './data/kudosBoards.json';

//this is the grid of kudos cards

export default function KudosGrid({ searchQuery, filter }) {
    //state for all boards fetched from the backend
    const [kudosBoards, setKudosBoards] = useState([]);
    //loading state for fetch
    const [loading, setLoading] = useState(true);

    //fetches from backend API retreiving boards
    useEffect(() => {
        fetch('http://localhost:3000/api/boards')
            .then(res => res.json())
            .then(data => {
                setKudosBoards(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch boards:', err);
                setLoading(false);
            });
    }, []);

    //handle delete board 
    const handleDeleteBoard = (boardId) => {
        setKudosBoards(prevBoards => prevBoards.filter(board => board.id !== boardId));
        // send a DELETE request to the backend here
    };

    //to show loading indicator while fetching
    if (loading) return <div>Loading...</div>;

    // flter boards by search query and make case insensitive
    let filteredBoards = kudosBoards.filter(board =>
        board.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //further filter by selected filter
    if (filter === 'recent') {
        //show 6 most recently created boards uses createdAt
        filteredBoards = [...filteredBoards]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 6);
    } else if (filter !== 'all') {
        //show only boards matching the selected category
        filteredBoards = filteredBoards.filter(board =>
            board.category === filter
        );
    }

    return (
        <div className="kudos-grid">
            {filteredBoards.map((board) => (
                <KudosCard 
                    key={board.id} 
                    id={board.id}
                    title={board.title} 
                    description={board.description}
                    imgUrl={board.imgUrl}
                    onDelete={handleDeleteBoard}
                />
            ))}
        </div>
    );
} 