import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './Header'
import Footer from './Footer'
import SearchBar from './SearchBar'
import KudosGrid from './KudosGrid'
import BoardPage from './BoardPage'

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<>
              <SearchBar />
              <KudosGrid /></>
          } />
          <Route path="/board/:id" element={<BoardPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
