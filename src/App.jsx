import { useState } from 'react'
import './App.css'
import Header from './Header'
import Footer from './Footer'
import SearchBar from './SearchBar'
import KudosGrid from './KudosGrid'

function App() {
  return (
    <>
      <Header />
      <SearchBar />
      <KudosGrid />
      <Footer />
    </>
  )
}

export default App
