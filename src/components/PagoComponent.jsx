import React from 'react';

const PagoComponent = ({
  curso = 'Introduccion a la meditacion',
  autora = 'Sol',
  fecha = '25-05-2025',
  monto = '5.00'
}) => {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'transparent',
      margin: '0',
      padding: '0'
    }}>
      <div style={{
        background: '#fff',
        padding: '2.5rem 2.5rem 2rem 2.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        width: '100%',
        maxWidth: '700px',
        textAlign: 'left',
        border: 'none',
        marginTop: '2rem',
      }}>
        <h2 style={{
          fontFamily: 'serif',
          fontWeight: 'bold',
          fontStyle: 'italic',
          marginBottom: '0.5rem',
          marginTop: 0,
          color: '#222',
          fontSize: '2.3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          Pago realizado con exito <span style={{color: 'green', fontSize: '2.2rem', verticalAlign: 'middle'}}>✔️</span>
        </h2>
        <div style={{
          borderTop: '5px solid #e9a9bb',
          margin: '0.5rem 0 1.5rem 0',
          width: '100%'
        }} />
        <div style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#222', marginBottom: '1.2rem', fontFamily: 'serif'}}>
          <div><span style={{fontWeight: 'bold'}}>Curso: </span>Introduccion a la meditacion</div>
          <div><span style={{fontWeight: 'bold'}}>Autora: </span>Sol</div>
          <div><span style={{fontWeight: 'bold'}}>Fecha Pago: </span>25-05-2025</div>
          <div><span style={{fontWeight: 'bold'}}>Monto:$ </span>5.00</div>
        </div>
        <div style={{
          borderTop: '5px solid #e9a9bb',
          margin: '1.5rem 0 0.5rem 0',
          width: '100%'
        }} />
        <div style={{fontWeight: 'bold', fontSize: '1.1rem', fontStyle: 'italic', marginTop: '0.5rem', color: '#222', fontFamily: 'serif'}}>
          Se ha enviado un correo con la facturación de su compra, ¡Muchas gracias y disfrute su compra!
        </div>
      </div>
    </div>
  );
};

export default PagoComponent;
