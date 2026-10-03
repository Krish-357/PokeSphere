import React from 'react';
import { Link } from 'react-router-dom';
import TypeBadge from './TypeBadge';

const PokemonCard = ({ pokemon }) => {
    return (
        <Link to={`/pokemon/${pokemon.id}`} style={{ display: 'block' }}>
            <div
                style={{
                    background: 'var(--card-bg)',
                    borderRadius: 'var(--radius-md)',
                    padding: '24px',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'var(--transition)',
                    cursor: 'pointer',
                    border: '1px solid rgba(0,0,0,0.03)',
                    position: 'relative',
                    overflow: 'hidden',
                    height: '100%'
                }}
                onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
            >
                <div style={{
                    position: 'absolute', top: '16px', right: '16px',
                    fontWeight: 700, color: 'var(--text-light)', fontSize: '0.875rem',
                    background: 'rgba(0,0,0,0.04)', padding: '4px 8px', borderRadius: 'var(--radius-sm)',
                    lineHeight: 1
                }}>
                    {pokemon.formattedId}
                </div>

                <div style={{ textAlign: 'center', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                    <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        style={{ width: '130px', height: '130px', objectFit: 'contain', filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.1))' }}
                        loading="lazy"
                    />
                </div>

                <h3 style={{ textTransform: 'capitalize', fontSize: '1.25rem', marginBottom: '12px', fontWeight: 600 }}>
                    {pokemon.name}
                </h3>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {pokemon.types.map(t => (
                        <TypeBadge key={t} type={t} />
                    ))}
                </div>
            </div>
        </Link>
    );
};
export default PokemonCard;
