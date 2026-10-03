const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async (limit = 20, offset = 0) => {
    const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
        throw new Error('Failed to fetch Pokemon list');
    }
    return response.json();
};

export const getPokemonDetails = async (idOrName) => {
    const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
    if (!response.ok) {
        throw new Error('Failed to fetch Pokemon details');
    }
    return response.json();
};
