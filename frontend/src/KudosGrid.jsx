import { useState, useEffect } from 'react';
import KudosCard from './KudosCard';
//import kudosData from './data/kudosBoards.json';

//this is the grid of kudos cards

export default function KudosGrid() {
    const [kudosBoards, setKudosBoards] = useState([]);
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

    return (
        <div className="kudos-grid">
            {kudosBoards.map((board) => (
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