import { useNavigate } from 'react-router-dom';

export default function KudosCard({ id, title, description, gifUrl, onDelete }) {
    const navigate = useNavigate();

    //takes onDelete from KudosGrid
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this board?')) {
            onDelete(id);
        }
    };

    return (
        <div className="kudos-card">
            <div className="kudos-card-gif">
                <img src={gifUrl} alt={`${title} celebration`} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="kudos-card-bottom">
                <button className="view-button" onClick={() => navigate(`/board/${id}`)}>View Board</button>
                <button className="delete-button" onClick={handleDelete}>Delete Board</button>
            </div>
        </div>
    );
} 