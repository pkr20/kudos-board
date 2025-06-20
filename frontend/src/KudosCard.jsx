import { Link } from 'react-router-dom';

export default function KudosCard({ id, title, description, imgUrl, onDelete }) {


    //takes onDelete from KudosGrid
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this board?')) {
            onDelete(id);
        }
    };

    return (
        <div className="kudos-card">
            <div className="kudos-card-gif">
                <img src={imgUrl} alt={`${title} celebration`} />
            </div>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="kudos-card-bottom">
                <Link className="view-button" to={`/board/${id}`}>View Board</Link>
                <button className="delete-button" onClick={handleDelete}>Delete Board</button>
            </div>
        </div>
    );
} 