import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const Header = () => {
    return (
        <header style={{
            background: 'rgba(252, 249, 245, 0.8)',
            backdropFilter: 'blur(10px)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            padding: '16px 0'
        }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        color: 'white',
                        padding: '10px',
                        borderRadius: '16px',
                        display: 'flex',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <Compass size={24} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-dark)' }}>PokeSphere</h1>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', margin: 0, fontWeight: 500 }}>Discover the world of Pokémon.</p>
                    </div>
                </Link>
                <nav style={{ display: 'flex', gap: '24px', fontWeight: 600, fontSize: '0.9rem' }}>
                    <Link to="/" style={{ color: 'var(--primary)', borderBottom: '2px solid var(--primary)', paddingBottom: '4px' }}>Discover</Link>
                </nav>
            </div>
        </header>
    );
};
export default Header;
