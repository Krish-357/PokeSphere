import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import PokemonCollection from './pages/PokemonCollection'
import PokemonDetails from './pages/PokemonDetails'

function App() {
    return (
        <BrowserRouter>
            <div className="app-container">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<PokemonCollection />} />
                        <Route path="/pokemon/:id" element={<PokemonDetails />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App
