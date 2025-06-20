export default function FilterBar({ filter, setFilter }) {
  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Recent', value: 'recent' },
    { label: 'Celebration', value: 'Celebration' },
    { label: 'Thank you', value: 'Thank you' },
    { label: 'Inspiration', value: 'Inspiration' }
  ];

  return (
    <nav >
      {categories.map(category => (
        <button
          key={category.value}
          onClick={() => setFilter(category.value)}
          style={{
            fontWeight: filter === category.value ? 'bold' : 'normal'
          }}
        >
          {category.label}
        </button>
      ))}
    </nav>
  );
} 