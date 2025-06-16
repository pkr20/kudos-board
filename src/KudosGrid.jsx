import { useState } from 'react';
import KudosCard from './KudosCard';
import kudosData from './data/kudosBoards.json';

//this is the grid of kudos cards

export default function KudosGrid() {
    //this is the data from the json file
    const [kudosBoards] = useState(kudosData.boards);

    return (
        <div className="kudos-grid">
            {kudosBoards.map((board) => (
                <KudosCard key={board.id} title={board.title} description={board.description} upvotes={board.upvotes}/>
            ))}
        </div>
    );
} 