import React from 'react';

const TypeBadge = ({ type }) => {
    return (
        <span className={`type-${type}`} style={{
            padding: '4px 12px',
            borderRadius: 'var(--radius-pill)',
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
        }}>
            {type}
        </span>
    );
};
export default TypeBadge;
