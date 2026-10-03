import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ onSearch, isSearching, onReset }) => {
    const [term, setTerm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (term.trim()) {
            onSearch(term.trim().toLowerCase());
        }
    };

    return (
        <div style={{ marginBottom: '40px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{
                    position: 'relative', flex: 1,
                    display: 'flex', alignItems: 'center'
                }}>
                    <Search size={20} style={{ position: 'absolute', left: '20px', color: 'var(--text-light)' }} />
                    <input
                        type="text"
                        placeholder="Search by exact Pokémon name..."
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '16px 16px 16px 56px',
                            borderRadius: 'var(--radius-pill)',
                            border: '2px solid rgba(0,0,0,0.05)',
                            fontSize: '1.05rem',
                            outline: 'none',
                            transition: 'var(--transition)',
                            fontFamily: 'inherit',
                            boxShadow: 'var(--shadow-sm)'
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(0,0,0,0.05)'}
                    />
                    {term && (
                        <button type="button" onClick={() => setTerm('')} style={{ position: 'absolute', right: '16px', color: 'var(--text-light)' }}>
                            <X size={18} />
                        </button>
                    )}
                </div>
                <button type="submit" style={{
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '0 32px',
                    borderRadius: 'var(--radius-pill)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    transition: 'var(--transition)',
                    boxShadow: 'var(--shadow-md)'
                }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-hover)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'var(--primary)'}
                >
                    Search
                </button>
            </form>

        </div>
    );
};
export default SearchBar;
