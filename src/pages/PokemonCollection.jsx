import React, { useState, useEffect, useRef } from 'react';
import { usePokemonList } from '../hooks/usePokemonList';
import { getPokemonDetails } from '../services/pokemonApi';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import { ArrowLeft } from 'lucide-react';

const PokemonCollection = () => {
    const { pokemonList, loading, error, hasMore, loadMore } = usePokemonList();
    const [searchResult, setSearchResult] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const loader = useRef(null);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting && hasMore && !loading && !isSearching) {
            loadMore();
        }
    };

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "40px",
            threshold: 0.1
        };
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current);
        }
        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, [loading, hasMore, isSearching, loadMore]);

    const handleSearch = async (term) => {
        setIsSearching(true);
        setSearchError(null);
        setSearchResult(null);
        try {
            const data = await getPokemonDetails(term);
            setSearchResult({
                id: data.id,
                name: data.name,
                image: data.sprites?.other?.['official-artwork']?.front_default || data.sprites?.front_default,
                types: data.types.map(t => t.type.name),
                formattedId: `#${String(data.id).padStart(3, '0')}`
            });
        } catch (err) {
            setSearchError('No Pokémon found.');
        }
    };

    const handleReset = () => {
        setIsSearching(false);
        setSearchResult(null);
        setSearchError(null);
    };

    return (
        <div className="container" style={{ paddingBottom: '80px' }}>
            <Hero />
            <SearchBar onSearch={handleSearch} isSearching={isSearching} onReset={handleReset} />

            {error && !isSearching && (
                <div style={{ textAlign: 'center', padding: '40px', color: '#ff6b6b' }}>
                    <p>{error}</p>
                    <button onClick={loadMore} style={{ marginTop: '16px', background: 'var(--primary)', color: 'white', padding: '10px 24px', borderRadius: 'var(--radius-pill)', fontWeight: 600 }}>Retry</button>
                </div>
            )}

            {isSearching && searchError && (
                <div style={{ textAlign: 'center', padding: '60px 0', fontSize: '1.25rem', color: 'var(--text-light)' }}>
                    {searchError}
                    <div style={{ marginTop: '24px' }}>
                        <button onClick={handleReset} style={{ color: 'var(--primary)', fontWeight: 600, borderBottom: '2px solid var(--primary)' }}>&larr; Back to Collection</button>
                    </div>
                </div>
            )}

            {isSearching && searchResult && (
                <div style={{ marginBottom: '40px' }}>
                    <button onClick={handleReset} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-light)', fontWeight: 600, marginBottom: '32px', transition: 'var(--transition)' }}
                        onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-light)'}
                    >
                        <ArrowLeft size={20} /> Back to Collection
                    </button>

                    <div style={{ maxWidth: '380px', margin: '0 auto' }}>
                        <PokemonCard pokemon={searchResult} />
                    </div>
                </div>
            )}

            {!isSearching && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '24px',
                    marginBottom: '40px'
                }}>
                    {pokemonList.map(pokemon => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            )}

            {!isSearching && (
                <div ref={loader} style={{ textAlign: 'center', padding: '20px 0' }}>
                    {loading && (
                        <div style={{ color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '3px solid var(--secondary)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div>
                            Discovering more Pokémon...
                        </div>
                    )}
                    {!hasMore && pokemonList.length > 0 && (
                        <p style={{ color: 'var(--text-light)', fontWeight: 500 }}>You've discovered them all!</p>
                    )}
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
        </div>
    );
};
export default PokemonCollection;
