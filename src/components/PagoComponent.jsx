import React from 'react';

const PagoComponent = ({
  articulos = [
    {
      paquete: 'Meditacion para todos.',
      cursos: [
        {
          nombre: 'Introduccion a la meditacion',
          autora: 'Sol',
          fecha: '25-05-2025',
        },
        {
          nombre: 'Meditacion avanzada',
          autora: 'Sol',
          fecha: '25-05-2025',
        }
      ],
      monto: 10.00
    }
  ]
}) => {
  // Calcular el total
  const total = articulos.reduce((acc, art) => acc + (art.monto || 0), 0);

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
        maxWidth: '900px',
        textAlign: 'left',
        border: 'none',
        marginTop: '2rem',
        color: '#000'
      }}>
        <h2 style={{
          fontFamily: 'serif',
          fontWeight: 'bold',
          fontStyle: 'italic',
          marginBottom: '0.5rem',
          marginTop: 0,
          color: '#000',
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
        {articulos.map((art, idx) => (
          <div key={idx} style={{marginBottom: '1.2rem', color: '#000'}}>
            {art.paquete && (
              <div style={{fontWeight: 'bold', fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '0.5rem', color: '#000'}}>
                Paquete: {art.paquete}
              </div>
            )}
            <div style={{display: 'flex', gap: '2rem', flexWrap: 'wrap', color: '#000'}}>
              {art.cursos.map((curso, cidx) => (
                <div key={cidx} style={{minWidth: '260px', marginBottom: '0.5rem', color: '#000'}}>
                  <div style={{fontWeight: 'bold', fontSize: '1.1rem', color: '#000'}}>Curso: {curso.nombre}</div>
                  <div style={{fontWeight: 'bold', color: '#000'}}>Autora: <span style={{fontWeight: 'normal', color: '#000'}}>{curso.autora}</span></div>
                  <div style={{fontWeight: 'bold', color: '#000'}}>Fecha Pago: <span style={{fontWeight: 'normal', color: '#000'}}>{curso.fecha}</span></div>
                </div>
              ))}
            </div>
            <div style={{textAlign: 'right', fontWeight: 'bold', fontSize: '1.2rem', marginTop: '0.5rem', color: '#000'}}>
              Monto:$ {art.monto.toFixed(2)}
            </div>
          </div>
        ))}
        <div style={{
          borderTop: '5px solid #e9a9bb',
          margin: '1.5rem 0 0.5rem 0',
          width: '100%'
        }} />
        <div style={{fontWeight: 'bold', fontSize: '1.1rem', fontStyle: 'italic', marginTop: '0.5rem', color: '#000', fontFamily: 'serif'}}>
          Se ha enviado un correo con la facturación de su compra, ¡Muchas gracias y disfrute su compra!
        </div>
      </div>
    </div>
  );
};

export default PagoComponent;
