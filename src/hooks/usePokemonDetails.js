import { useState, useEffect } from 'react';
import { getPokemonDetails } from '../services/pokemonApi';

export const usePokemonDetails = (id) => {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        let mounted = true;

        const fetchDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getPokemonDetails(id);
                if (mounted) {
                    setPokemon(data);
                }
            } catch (err) {
                if (mounted) {
                    setError('Unable to load this Pokémon.');
                }
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchDetails();

        return () => {
            mounted = false;
        };
    }, [id]);

    return { pokemon, loading, error };
};
