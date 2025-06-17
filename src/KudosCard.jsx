import { useState } from 'react';
import Modal from './Modal';

export default function KudosCard({ id, title, description, onDelete }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    //takes onDelete from KudosGrid
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this board?')) {
            onDelete(id);
        }
    };

    return (
        <>
            <div className="kudos-card">
                <h3>{title}</h3>
                <p>{description}</p>
                <div className="kudos-card-bottom">
                    <button className="view-button" onClick={() => setIsModalOpen(true)}>View Board</button>
                    <button className="delete-button" onClick={handleDelete}>Delete Board</button>
                </div>
            </div>

            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="modal-details">
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
            </Modal>
        </>
    );
} 