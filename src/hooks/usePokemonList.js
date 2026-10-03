import { useState, useEffect, useRef, useCallback } from 'react';
import { getPokemonList, getPokemonDetails } from '../services/pokemonApi';

export const usePokemonList = () => {
    const [pokemonList, setPokemonList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);

    const isFetchingRef = useRef(false);
    const LIMIT = 20;

    const fetchBatch = useCallback(async (currentOffset) => {
        if (isFetchingRef.current || !hasMore) return;

        isFetchingRef.current = true;
        setLoading(true);
        setError(null);

        try {
            const data = await getPokemonList(LIMIT, currentOffset);

            const detailedPromises = data.results.map(item => getPokemonDetails(item.name));
            const detailedResults = await Promise.all(detailedPromises);

            const newPokemon = detailedResults.map(p => ({
                id: p.id,
                name: p.name,
                // Fallback to older sprite if official missing
                image: p.sprites?.other?.['official-artwork']?.front_default || p.sprites?.front_default,
                types: p.types.map(t => t.type.name),
                formattedId: `#${String(p.id).padStart(3, '0')}` // e.g. #025
            }));

            setPokemonList(prev => {
                const existingIds = new Set(prev.map(p => p.id));
                const filteredNew = newPokemon.filter(p => !existingIds.has(p.id));
                return [...prev, ...filteredNew];
            });

            if (!data.next) {
                setHasMore(false);
            }

            setOffset(currentOffset + LIMIT);
        } catch (err) {
            setError('Something went wrong while loading Pokémon.');
        } finally {
            isFetchingRef.current = false;
            setLoading(false);
        }
    }, [hasMore]);

    // Initial fetch on mount
    useEffect(() => {
        let mounted = true;
        if (pokemonList.length === 0 && mounted) {
            fetchBatch(0);
        }
        return () => {
            mounted = false;
        };
    }, [fetchBatch, pokemonList.length]);

    return { pokemonList, loading, error, hasMore, loadMore: () => fetchBatch(offset) };
};
