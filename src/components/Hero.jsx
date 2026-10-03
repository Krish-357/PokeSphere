import React from 'react';

const Hero = () => {
    return (
        <section style={{
            padding: '60px 24px',
            background: 'linear-gradient(135deg, rgba(82, 43, 219, 0.05) 0%, rgba(13, 227, 227, 0.1) 100%)',
            borderRadius: 'var(--radius-lg)',
            margin: '24px 0 48px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.5)'
        }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-dark)' }}>
                    Discover the world of <span style={{ color: 'var(--primary)' }}>Pokémon</span>
                </h2>
                <p style={{ fontSize: '1.125rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto' }}>
                    Explore Pokémon, learn about their abilities, types, stats, and more. A modern discovery platform.
                </p>
            </div>
            {/* Decorative Orbs */}
            <div style={{
                position: 'absolute', width: '300px', height: '300px', background: 'var(--primary)',
                borderRadius: '50%', filter: 'blur(80px)', opacity: 0.1, top: '-100px', left: '-50px'
            }}></div>
            <div style={{
                position: 'absolute', width: '250px', height: '250px', background: 'var(--secondary)',
                borderRadius: '50%', filter: 'blur(80px)', opacity: 0.1, bottom: '-50px', right: '-50px'
            }}></div>
        </section>
    );
};
export default Hero;
