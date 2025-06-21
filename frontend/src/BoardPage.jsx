import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NewCardForm from './NewCardForm';

export default function BoardPage() {
    const { id } = useParams();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BASE_URL}/api/boards/${id}/cards`)
            .then(res => res.json())
            .then(data => {
                setCards(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    const handleCardCreated = (newCard) => {
        setCards(cards => [newCard, ...cards]);
    };

    const handleDelete = async (cardId) => {
        await fetch(`${import.meta.env.VITE_BASE_URL}/api/cards/${cardId}`, { method: 'DELETE' });
        setCards(cards => cards.filter(card => card.id !== cardId));
    };

    const handleUpvote = async (cardId) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/cards/${cardId}/upvote`, { method: 'PUT' });
        if (res.ok) {
            const updated = await res.json();
            setCards(cards => cards.map(card => card.id === cardId ? updated : card));
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="board-details">
            <div className="board-header">
                <Link className="back-button" to="/">← Back</Link>
                <h2>Board Details</h2>
            </div>
            <div className="board-content">
                <h2>Cards for Board {id}</h2>
                <NewCardForm boardId={id} onCardCreated={handleCardCreated} />
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    padding: '2rem 0',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}>
                    {cards.map(card => (
                        <div key={card.id} >
                            <div>
                                <img src={card.imgUrl} alt="gif" style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px' }} />
                            </div>
                            <p><strong>Message:</strong> {card.message}</p>
                            <p><strong>Upvotes:</strong> {card.upvotes}</p>
                            <button onClick={() => handleUpvote(card.id)}>Upvote</button>
                            <button onClick={() => handleDelete(card.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
