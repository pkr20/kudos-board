import { useState } from 'react';

const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY

export default function NewCardForm({ boardId, onCardCreated }) {
  const [message, setMessage] = useState('');
  const [author, setAuthor] = useState('');
  const [gifSearch, setGifSearch] = useState('');
  const [gifResults, setGifResults] = useState([]);
  const [selectedGif, setSelectedGif] = useState('');
  const [error, setError] = useState('');

  const handleGifSearch = async (e) => {
    e.preventDefault();
    setGifResults([]);
    if (!gifSearch) return;
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(gifSearch)}&limit=6`
    );
    const data = await res.json();
    console.log(data);
    setGifResults(data.data.map(gif => gif.images.fixed_height.url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!message || !selectedGif) {
      setError('Message and GIF are required.');
      return;
    }
    const newCard = {
      message,
      author,
      boardId: Number(boardId),
      imgUrl: selectedGif
    };
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/cards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCard)
    });
    if (!res.ok) {
      setError('Failed to create card.');
      return;
    }
    const created = await res.json();
    onCardCreated(created);
    setMessage('');
    setAuthor('');
    setGifSearch('');
    setGifResults([]);
    setSelectedGif('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h3>Add a New Card</h3>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>
          Message*:
          <input value={message} onChange={e => setMessage(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input value={author} onChange={e => setAuthor(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          GIF*:
          <form onSubmit={handleGifSearch} style={{ display: 'inline' }}>
            <input
              value={gifSearch}
              onChange={e => setGifSearch(e.target.value)}
              placeholder="Search GIPHY"
            />
            <button type="button" onClick={handleGifSearch}>Search</button>
          </form>
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', margin: '0.5rem 0' }}>
          {gifResults.map(url => (
            <img
              key={url}
              src={url}
              alt="gif"
              style={{
                width: 80,
                height: 80,
                border: selectedGif === url ? '2px solid blue' : '2px solid transparent',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedGif(url)}
            />
          ))}
        </div>
        {selectedGif && (
          <div>
            <strong>Selected GIF:</strong>
            <img src={selectedGif} alt="selected gif" style={{ width: 100, height: 100, border: '2px solid green' }} />
          </div>
        )}
      </div>
      <button type="submit">Add Card</button>
    </form>
  );
}
