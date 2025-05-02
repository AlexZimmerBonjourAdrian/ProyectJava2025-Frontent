import React from "react";

const primaryColor = "#e98fae";
const accentColor = "#bfa046";
const lightBg = "#f8f9fb";
const cardBg = "#fff";
const borderRadius = 16;

const CarritoComponent = () => {
  return (
    <div style={{ background: lightBg, minHeight: "100vh", fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "2rem 0 1rem 3rem" }}>
        <span style={{ fontSize: 36, fontWeight: 700, color: accentColor, fontFamily: 'serif', letterSpacing: 2, marginRight: 10, textShadow: '0 2px 8px #e9eef2' }}>SOL FUENTES</span>
        <div style={{ flex: 1 }} />
        <div style={{ border: `2px solid ${accentColor}`, borderRadius: 12, padding: 8, marginRight: 30, background: cardBg, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <svg width="32" height="32" fill={accentColor} viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </div>
      </div>

      {/* Main content */}
      <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: 'wrap' }}>
        {/* Opciones de pago y volver */}
        <div style={{ width: 370, minWidth: 300 }}>
          <button style={{ background: primaryColor, color: "white", fontWeight: 600, fontSize: 20, border: "none", borderRadius: borderRadius, padding: "12px 0", width: "100%", display: "flex", alignItems: "center", gap: 10, marginBottom: 20, boxShadow: '0 2px 8px rgba(233,143,174,0.10)', transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = accentColor}
            onMouseOut={e => e.currentTarget.style.background = primaryColor}
          >
            <span style={{ fontSize: 28, marginLeft: 10 }}>&larr;</span> SEGUIR COMPRANDO
          </button>
          <div style={{ background: primaryColor, borderRadius: borderRadius, padding: 24, display: "flex", flexDirection: "column", gap: 18, boxShadow: '0 2px 8px rgba(233,143,174,0.10)' }}>
            <button style={{ background: "#ffd166", border: "none", borderRadius: 10, padding: "14px 0", fontWeight: 700, fontSize: 20, marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', cursor: 'pointer', transition: 'filter 0.2s' }}
              onMouseOver={e => e.currentTarget.style.filter = 'brightness(0.95)'}
              onMouseOut={e => e.currentTarget.style.filter = 'none'}
            >
              <img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" style={{ height: 28 }} /> PayPal
            </button>
            <button style={{ background: "#1e9ddb", color: "white", border: "none", borderRadius: 10, padding: "14px 0", fontWeight: 700, fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', cursor: 'pointer', transition: 'filter 0.2s' }}
              onMouseOver={e => e.currentTarget.style.filter = 'brightness(0.95)'}
              onMouseOut={e => e.currentTarget.style.filter = 'none'}
            >
              <img src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo-1.png" alt="Mercado Pago" style={{ height: 28, background: "white", borderRadius: 4 }} /> Pagar con Mercado Pago
            </button>
          </div>
          <div style={{ fontSize: 13, color: "#222", marginTop: 18, display: "flex", alignItems: "flex-start", gap: 6, background: cardBg, borderRadius: 8, padding: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <span style={{ fontSize: 18 }}>ⓘ</span>
            No guardamos datos de pago ni ninguna otra información sensible. Una vez selecciones una opción de pago serás redirigido a la página correspondiente.
          </div>
        </div>

        {/* Carrito y resumen */}
        <div style={{ background: primaryColor, borderRadius: borderRadius, padding: 30, flex: 1, minWidth: 340, maxWidth: 700, boxShadow: '0 4px 24px rgba(233,143,174,0.13)' }}>
          {/* Producto en carrito */}
          <div style={{ background: cardBg, borderRadius: 12, padding: 18, display: "flex", alignItems: "center", marginBottom: 30, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1.5px solid #f3c7d6' }}>
            <div style={{ width: 60, height: 60, background: "#f3c7d6", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 18 }}>
              <svg width="36" height="36" fill="#aaa" viewBox="0 0 24 24"><rect width="100%" height="100%" rx="8" fill="#eee"/><text x="50%" y="55%" textAnchor="middle" fontSize="18" fill="#aaa">✕</text></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 19, color: '#222' }}>Curso de sanación del niño interior</div>
              <div style={{ color: primaryColor, fontSize: 15, marginTop: 2 }}>Descripción breve del curso</div>
              <div style={{ color: primaryColor, fontSize: 15 }}>Autora</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: 22, marginRight: 18, color: accentColor }}>$ 5.00</div>
            <button style={{ background: "none", border: "none", color: primaryColor, fontSize: 26, cursor: "pointer", borderRadius: 8, padding: 4, transition: 'background 0.2s' }}
              title="Eliminar"
              onMouseOver={e => e.currentTarget.style.background = '#f3c7d6'}
              onMouseOut={e => e.currentTarget.style.background = 'none'}
            >
              <svg width="24" height="24" fill={primaryColor} viewBox="0 0 24 24"><path d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5c-.1.8-.8 1.5-1.6 1.5H8.1c-.8 0-1.5-.7-1.6-1.5L5 9zm3 2v8h2v-8H8zm4 0v8h2v-8h-2z"/></svg>
            </button>
          </div>
          {/* Total */}
          <div style={{ background: cardBg, borderRadius: 10, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28, fontWeight: 600, color: accentColor, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: 10 }}>
            <span>Total</span>
            <span>$ 5.00</span>
          </div>

          {/* ¿Qué estás comprando? */}
          <div style={{ marginTop: 30 }}>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: '#222' }}>¿Qué estás comprando?</div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 15, marginBottom: 4, color: '#222' }}>
              <span>😊</span>
              Acceso por tres meses a los cursos que compres. Durante este lapso podrás verlos todas las veces que desees,
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 15, color: '#222' }}>
              <span>🗂️</span>
              Acceso por tres meses a las diferentes unidades del cursar sus lecciones, textos explicativos y recursos adicionales.
            </div>
          </div>
        </div>
      </div>

      {/* Footer ayuda */}
      <div style={{ background: lightBg, borderTop: "1px solid #ddd", marginTop: 40, padding: "10px 0 10px 0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: accentColor }}>
        <span style={{ fontSize: 22, marginRight: 8 }}>❔</span>
        <span>¿Necesitas Ayuda?, contactame al <a href="https://wa.me/" style={{ color: primaryColor, textDecoration: "underline" }}>Link de whatsapp</a></span>
      </div>
    </div>
  );
};

export default CarritoComponent;
