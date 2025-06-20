import { useParams, Link } from 'react-router-dom';


export default function BoardPage() {
    const { id } = useParams();

    return (
        <div className="board-details">
            <div className="board-header">
                <Link className="back-button" to="/">← Back</Link>
                <h2>Board Details</h2>
            </div>
            <div className="board-content">
            </div>
        </div>
    );
} 