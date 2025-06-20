import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NewCardForm from './NewCardForm';

export default function BoardPage() {
    const { id } = useParams();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/api/boards/${id}/cards`)
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
        await fetch(`http://localhost:3000/api/cards/${cardId}`, { method: 'DELETE' });
        setCards(cards => cards.filter(card => card.id !== cardId));
    };

    const handleUpvote = async (cardId) => {
        const res = await fetch(`http://localhost:3000/api/cards/${cardId}/upvote`, { method: 'PUT' });
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
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '1rem'
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