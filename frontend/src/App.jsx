import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Header'
import Footer from './Footer'
import SearchBar from './SearchBar'
import KudosGrid from './KudosGrid'
import BoardPage from './BoardPage'
import FilterBar from './FilterBar'
import NewBoardForm from './NewBoardForm'
import { useState, useEffect } from 'react';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [boards, setBoards] = useState([]);
  const [loadingBoards, setLoadingBoards] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // fetch boards once on mount
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BASE_URL}/api/boards`)
      .then(res => res.json())
      .then(data => {
        setBoards(data);
        setLoadingBoards(false);
      })
      .catch(() => setLoadingBoards(false));
  }, []);

  // Add new board to the grid
  const handleBoardCreated = (newBoard) => {
    setBoards(prev => [newBoard, ...prev]);
    setShowForm(false); // Hide form after creation
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={
            <>
              <SearchBar
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                setSearchQuery={setSearchQuery}
              />
              <FilterBar filter={filter} setFilter={setFilter} />
              <button onClick={() => setShowForm(f => !f)} style={{ marginBottom: '1rem' }}>
                {showForm ? 'Cancel' : 'Add New Playlist'}
              </button>
              {showForm && <NewBoardForm onBoardCreated={handleBoardCreated} />}
              <KudosGrid
                searchQuery={searchQuery}
                filter={filter}
                boards={boards}
                loading={loadingBoards}
              />
            </>
          } />
          <Route path="/board/:id" element={<BoardPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
