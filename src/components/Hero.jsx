

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Hero() {
  const navigate = useNavigate();

  return (
    <section style={{
      backgroundColor: '#E8EEF2',
      padding: '80px 20px',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        Sol Fuentes
      </h1>
      <p style={{ fontSize: '1.25rem', color: '#555' }}>
        Coaching que cambia la vida
      </p>
      <button style={{
        marginTop: '30px',
        padding: '12px 24px',
        fontSize: '1rem',
        backgroundColor: '#00796b',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
      onClick={() => navigate('/Login')}
      >
        ¡Ya quiero empezar!
      </button>
    </section>
  );
}

export default Hero;