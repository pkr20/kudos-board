import { useState } from 'react';

const categories = [
  'Celebration',
  'Thank you',
  'Inspiration'
];

export default function NewBoardForm({ onBoardCreated }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title || !category) {
      setError('Title and Category are required.');
      return;
    }

    const newBoard = {
      title,
      category,
      owner: author,
      description,
      imgUrl
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/boards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBoard)
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Failed to create board.');
        return;
      }
      const created = await res.json();
      onBoardCreated(created);
      // Reset form
      setTitle('');
      setCategory('');
      setAuthor('');
      setDescription('');
      setImgUrl('');
    } catch (err) {
      setError('Failed to create board.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>Create New Board</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>
          Title*:
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Category*:
          <select value={category} onChange={e => setCategory(e.target.value)} required>
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
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
          Description:
          <input value={description} onChange={e => setDescription(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Image URL:
          <input value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
        </label>
      </div>
      <button type="submit">Create Board</button>
    </form>
  );
}
