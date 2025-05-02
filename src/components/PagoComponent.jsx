import React from 'react';

const PagoComponent = ({
  curso = 'Introduccion a la meditacion',
  autora = 'Sol',
  fecha = '25-05-2025',
  monto = '5.00'
}) => {
  return (
    <div style={{
      background: '#f8f9fa',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      border: '1px solid #222',
      borderRadius: '8px',
      margin: '2rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    }}>
      <div style={{
        background: '#fff',
        padding: '2rem 2.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        width: '100%',
        maxWidth: '600px',
        textAlign: 'center',
        border: '1px solid #eee'
      }}>
        <h2 style={{
          fontFamily: 'serif',
          fontWeight: 'bold',
          fontStyle: 'italic',
          marginBottom: '0.5rem',
          marginTop: 0
        }}>
          Pago realizado con exito <span style={{color: 'green', fontSize: '1.6rem', verticalAlign: 'middle'}}>✔️</span>
        </h2>
        <div style={{
          borderTop: '4px solid #f7b6c7',
          margin: '0.5rem 0 1.5rem 0',
          width: '100%'
        }} />
        <div style={{textAlign: 'left', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem'}}>
          <div>Curso: <span style={{fontWeight: 'bold'}}>{curso}</span></div>
          <div>Autora: <span style={{fontWeight: 'bold'}}>{autora}</span></div>
          <div>Fecha Pago: <span style={{fontWeight: 'bold'}}>{fecha}</span></div>
          <div>Monto:$ <span style={{fontWeight: 'bold'}}>{monto}</span></div>
        </div>
        <div style={{
          borderTop: '4px solid #f7b6c7',
          margin: '1.5rem 0 0.5rem 0',
          width: '100%'
        }} />
        <div style={{fontWeight: 'bold', fontSize: '1rem', fontStyle: 'italic', marginTop: '0.5rem', textAlign: 'left'}}>
          Se ha enviado un correo con la facturación de su compra, ¡Muchas gracias y disfrute su compra!
        </div>
      </div>
    </div>
  );
};

export default PagoComponent;
