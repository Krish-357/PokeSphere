import React from 'react';

const StatBar = ({ label, value, max = 255 }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
        <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.875rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-light)', textTransform: 'capitalize' }}>
                    {label.replace('-', ' ')}
                </span>
                <span style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{value}</span>
            </div>
            <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(0,0,0,0.04)',
                borderRadius: 'var(--radius-pill)',
                overflow: 'hidden'
            }}>
                <div style={{
                    width: `${percentage}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--secondary) 0%, var(--primary) 100%)',
                    borderRadius: 'var(--radius-pill)',
                    transition: 'width 1.2s cubic-bezier(0.25, 1.2, 0.25, 1)'
                }} />
            </div>
        </div>
    );
};
export default StatBar;
