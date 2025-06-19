import { useParams, useNavigate } from 'react-router-dom';


export default function BoardPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="board-details">
            <div className="board-header">
                <button className="back-button" onClick={() => navigate('/')}>← Back</button>
                <h2>Board Details</h2>
            </div>
            <div className="board-content">
            </div>
        </div>
    );
} 