import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePokemonDetails } from '../hooks/usePokemonDetails';
import TypeBadge from '../components/TypeBadge';
import StatBar from '../components/StatBar';
import { ArrowLeft } from 'lucide-react';

const PokemonDetails = () => {
    const { id } = useParams();
    const { pokemon, loading, error } = usePokemonDetails(id);

    if (loading) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '100px 0', color: 'var(--primary)', fontWeight: 600 }}>
                Loading details...
            </div>
        );
    }

    if (error || !pokemon) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '100px 0' }}>
                <h2 style={{ color: '#ff6b6b', marginBottom: '16px' }}>{error || 'Unable to load this Pokémon.'}</h2>
                <Link to="/" style={{ color: 'var(--primary)', fontWeight: 600, borderBottom: '2px solid var(--primary)' }}>
                    Back to Collection
                </Link>
            </div>
        );
    }

    const image = pokemon.sprites?.other?.['official-artwork']?.front_default || pokemon.sprites?.front_default;
    const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;

    return (
        <div className="container" style={{ padding: '40px 24px', paddingBottom: '80px' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-light)', fontWeight: 600, marginBottom: '32px', transition: 'var(--transition)' }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-light)'}>
                <ArrowLeft size={20} /> Back to Collection
            </Link>

            <div className="details-card" style={{
                background: 'var(--card-bg)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.8fr)',
                border: '1px solid rgba(0,0,0,0.03)'
            }}>
                {/* Left Hero Panel */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(138, 79, 255, 0.08) 0%, rgba(13, 227, 227, 0.12) 100%)',
                    padding: '48px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRight: '1px solid rgba(0,0,0,0.04)',
                    position: 'relative'
                }}>
                    <div style={{ fontSize: '4rem', fontWeight: 800, color: 'rgba(0,0,0,0.04)', lineHeight: 1, marginBottom: '-20px' }}>
                        {formattedId}
                    </div>
                    <img
                        src={image}
                        alt={pokemon.name}
                        style={{ width: '100%', maxWidth: '300px', height: 'auto', filter: 'drop-shadow(0 25px 30px rgba(0,0,0,0.15))', marginBottom: '32px', zIndex: 1 }}
                    />
                    <h1 style={{ textTransform: 'capitalize', fontSize: '2.5rem', fontWeight: 700, margin: '0 0 16px', color: 'var(--text-dark)' }}>
                        {pokemon.name}
                    </h1>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {pokemon.types.map(t => (
                            <TypeBadge key={t.type.name} type={t.type.name} />
                        ))}
                    </div>
                </div>

                {/* Right Info Panel */}
                <div style={{ padding: '48px 40px' }}>
                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-dark)' }}>Quick Facts</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '16px' }}>
                            <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0,0,0,0.04)' }}>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '4px' }}>Height</div>
                                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{pokemon.height / 10} m</div>
                            </div>
                            <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0,0,0,0.04)' }}>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '4px' }}>Weight</div>
                                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{pokemon.weight / 10} kg</div>
                            </div>
                            <div style={{ background: 'var(--bg-color)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0,0,0,0.04)' }}>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '4px' }}>Base Exp</div>
                                <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>{pokemon.base_experience}</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: '40px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-dark)' }}>Abilities</h3>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            {pokemon.abilities.map(a => (
                                <div key={a.ability.name} style={{
                                    background: 'var(--bg-color)',
                                    border: '1px solid rgba(0,0,0,0.05)',
                                    padding: '12px 24px',
                                    borderRadius: 'var(--radius-pill)',
                                    textTransform: 'capitalize',
                                    fontWeight: 600,
                                    color: 'var(--primary)',
                                    boxShadow: 'var(--shadow-sm)'
                                }}>
                                    {a.ability.name.replace('-', ' ')}
                                    {a.is_hidden && <span style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginLeft: '8px', fontWeight: 500 }}>(Hidden)</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '24px', color: 'var(--text-dark)' }}>Base Statistics</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {pokemon.stats.map(s => (
                                <StatBar key={s.stat.name} label={s.stat.name} value={s.base_stat} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Basic Mobile Responsive Styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @media (max-width: 900px) {
          .details-card {
            grid-template-columns: 1fr !important;
          }
          .details-card > div:first-child {
            border-right: none !important;
            border-bottom: 1px solid rgba(0,0,0,0.05);
          }
        }
      `}} />
        </div>
    );
};
export default PokemonDetails;
