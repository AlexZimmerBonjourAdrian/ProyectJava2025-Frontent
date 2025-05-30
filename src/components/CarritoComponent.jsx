import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import carritoService from "../services/carrito";
import useAuth from "../hooks/useAuth";
import { Toast } from 'primereact/toast';

const primaryColor = "#e98fae";
const accentColor = "#bfa046";
const lightBg = "#f8f9fb";
const cardBg = "#fff";
const borderRadius = 16;

const CarritoComponent = () => {
  const [carrito, setCarrito] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const navigate = useNavigate();
  const toast = React.useRef(null);

  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        const carritoData = await carritoService.obtenerCarritoUsuario(token);
        setCarrito(carritoData);
        const totalData = await carritoService.obtenerTotalCarrito(carritoData.id, token);
        setTotal(totalData);
      } catch (error) {
        console.error('Error al cargar el carrito:', error);
        toast.current.show({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar el carrito',
          life: 3000
        });
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      cargarCarrito();
    }
  }, [token]);

  const handleEliminarItem = async (itemId) => {
    try {
      await carritoService.quitarArticulo(carrito.id, itemId, token);
      const carritoActualizado = await carritoService.obtenerCarritoUsuario(token);
      setCarrito(carritoActualizado);
      const totalActualizado = await carritoService.obtenerTotalCarrito(carrito.id, token);
      setTotal(totalActualizado);
      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Producto eliminado del carrito',
        life: 3000
      });
    } catch (error) {
      console.error('Error al eliminar item:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo eliminar el producto',
        life: 3000
      });
    }
  };

  const handleSeguirComprando = () => {
    navigate('/productos');
  };

  const handlePagar = async (metodo) => {
    try {
      // Aquí iría la lógica de pago según el método seleccionado
      await carritoService.cerrarCarrito(carrito.id, token);
      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Procesando pago...',
        life: 3000
      });
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo procesar el pago',
        life: 3000
      });
    }
  };

  if (loading) {
    return <div>Cargando carrito...</div>;
  }

  if (!carrito || !carrito.items || carrito.items.length === 0) {
    return (
      <div style={{ background: lightBg, minHeight: "100vh", fontFamily: 'Montserrat, sans-serif', padding: 20 }}>
        <div style={{ textAlign: 'center', padding: 40 }}>
          <h2 style={{ color: primaryColor }}>Tu carrito está vacío</h2>
          <button 
            onClick={handleSeguirComprando}
            style={{ 
              background: primaryColor, 
              color: "white", 
              fontWeight: 600, 
              fontSize: 20, 
              border: "none", 
              borderRadius: borderRadius, 
              padding: "12px 24px", 
              marginTop: 20,
              cursor: 'pointer'
            }}
          >
            Seguir Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div key="carrito-container" style={{ background: lightBg, minHeight: "100vh", fontFamily: 'Montserrat, sans-serif' }}>
      <Toast ref={toast} />
      
      {/* Main content */}
      <div key="main-content" style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: 'wrap', padding: 20 }}>
        {/* Opciones de pago y volver */}
        <div key="payment-options" style={{ width: 370, minWidth: 300 }}>
          <button 
            key="seguir-comprando"
            onClick={handleSeguirComprando}
            style={{ 
              background: primaryColor, 
              color: "white", 
              fontWeight: 600, 
              fontSize: 20, 
              border: "none", 
              borderRadius: borderRadius, 
              padding: "12px 0", 
              width: "100%", 
              display: "flex", 
              alignItems: "center", 
              gap: 10, 
              marginBottom: 20, 
              boxShadow: '0 2px 8px rgba(233,143,174,0.10)', 
              transition: 'background 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={e => e.currentTarget.style.background = accentColor}
            onMouseOut={e => e.currentTarget.style.background = primaryColor}
          >
            <span key="arrow-icon" style={{ fontSize: 28, marginLeft: 10 }}>&larr;</span> SEGUIR COMPRANDO
          </button>
          <div key="payment-buttons" style={{ background: primaryColor, borderRadius: borderRadius, padding: 24, display: "flex", flexDirection: "column", gap: 18, boxShadow: '0 2px 8px rgba(233,143,174,0.10)' }}>
            <button 
              key="paypal-button"
              onClick={() => handlePagar('paypal')}
              style={{ 
                background: "#ffd166", 
                border: "none", 
                borderRadius: 10, 
                padding: "14px 0", 
                fontWeight: 700, 
                fontSize: 20, 
                marginBottom: 8, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                gap: 10, 
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)', 
                cursor: 'pointer', 
                transition: 'filter 0.2s' 
              }}
              onMouseOver={e => e.currentTarget.style.filter = 'brightness(0.95)'}
              onMouseOut={e => e.currentTarget.style.filter = 'none'}
            >
              <img key="paypal-icon" src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" style={{ height: 28 }} /> PayPal
            </button>
            <button 
              key="mercadopago-button"
              onClick={() => handlePagar('mercadopago')}
              style={{ 
                background: "#1e9ddb", 
                color: "white", 
                border: "none", 
                borderRadius: 10, 
                padding: "14px 0", 
                fontWeight: 700, 
                fontSize: 20, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                gap: 10, 
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)', 
                cursor: 'pointer', 
                transition: 'filter 0.2s' 
              }}
              onMouseOver={e => e.currentTarget.style.filter = 'brightness(0.95)'}
              onMouseOut={e => e.currentTarget.style.filter = 'none'}
            >
              <img key="mercadopago-icon" src="https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo-1.png" alt="Mercado Pago" style={{ height: 28, background: "white", borderRadius: 4 }} /> Pagar con Mercado Pago
            </button>
          </div>
          <div key="info-pago" style={{ fontSize: 13, color: "#222", marginTop: 18, display: "flex", alignItems: "flex-start", gap: 6, background: cardBg, borderRadius: 8, padding: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <span key="info-icon" style={{ fontSize: 18 }}>ⓘ</span>
            No guardamos datos de pago ni ninguna otra información sensible. Una vez selecciones una opción de pago serás redirigido a la página correspondiente.
          </div>
        </div>

        {/* Carrito y resumen */}
        <div key="cart-summary" style={{ background: primaryColor, borderRadius: borderRadius, padding: 30, flex: 1, minWidth: 340, maxWidth: 700, boxShadow: '0 4px 24px rgba(233,143,174,0.13)' }}>
          {/* Productos en carrito */}
          {carrito.items.map((item, index) => (
            <div key={`item-${item.id}-${index}`} style={{ background: cardBg, borderRadius: 12, padding: 18, display: "flex", alignItems: "center", marginBottom: 30, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1.5px solid #f3c7d6' }}>
              <div key={`imagen-${item.id}-${index}`} style={{ width: 60, height: 60, background: "#f3c7d6", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", marginRight: 18 }}>
                {item.imagen ? (
                  <img key={`img-${item.id}-${index}`} src={item.imagen} alt={item.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }} />
                ) : (
                  <svg key={`svg-${item.id}-${index}`} width="36" height="36" fill="#aaa" viewBox="0 0 24 24"><rect width="100%" height="100%" rx="8" fill="#eee"/><text x="50%" y="55%" textAnchor="middle" fontSize="18" fill="#aaa">✕</text></svg>
                )}
              </div>
              <div key={`info-${item.id}-${index}`} style={{ flex: 1 }}>
                <div key={`nombre-${item.id}-${index}`} style={{ fontWeight: 700, fontSize: 19, color: '#222' }}>{item.nombre}</div>
                <div key={`descripcion-${item.id}-${index}`} style={{ color: primaryColor, fontSize: 15, marginTop: 2 }}>{item.descripcion}</div>
                <div key={`autor-${item.id}-${index}`} style={{ color: primaryColor, fontSize: 15 }}>{item.autor}</div>
              </div>
              <div key={`precio-${item.id}-${index}`} style={{ fontWeight: 700, fontSize: 22, marginRight: 18, color: accentColor }}>${item.precio}</div>
              <button 
                key={`eliminar-${item.id}-${index}`}
                onClick={() => handleEliminarItem(item.id)}
                style={{ 
                  background: "none", 
                  border: "none", 
                  color: primaryColor, 
                  fontSize: 26, 
                  cursor: "pointer", 
                  borderRadius: 8, 
                  padding: 4, 
                  transition: 'background 0.2s' 
                }}
                title="Eliminar"
                onMouseOver={e => e.currentTarget.style.background = '#f3c7d6'}
                onMouseOut={e => e.currentTarget.style.background = 'none'}
              >
                <svg key={`delete-icon-${item.id}-${index}`} width="24" height="24" fill={primaryColor} viewBox="0 0 24 24"><path d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5c-.1.8-.8 1.5-1.6 1.5H8.1c-.8 0-1.5-.7-1.6-1.5L5 9zm3 2v8h2v-8H8zm4 0v8h2v-8h-2z"/></svg>
              </button>
            </div>
          ))}

          {/* Total */}
          <div key="total-section" style={{ background: cardBg, borderRadius: 10, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28, fontWeight: 600, color: accentColor, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', marginBottom: 10 }}>
            <span key="total-label">Total</span>
            <span key="total-value">${total}</span>
          </div>

          {/* ¿Qué estás comprando? */}
          <div key="what-you-buy" style={{ marginTop: 30 }}>
            <div key="what-you-buy-title" style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: '#222' }}>¿Qué estás comprando?</div>
            <div key="acceso-cursos" style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 15, marginBottom: 4, color: '#222' }}>
              <span key="emoji-cursos">😊</span>
              Acceso por tres meses a los cursos que compres. Durante este lapso podrás verlos todas las veces que desees,
            </div>
            <div key="acceso-unidades" style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 15, color: '#222' }}>
              <span key="emoji-unidades">🗂️</span>
              Acceso por tres meses a las diferentes unidades del cursar sus lecciones, textos explicativos y recursos adicionales.
            </div>
          </div>
        </div>
      </div>

      {/* Footer ayuda */}
      <div key="footer-help" style={{ background: lightBg, borderTop: "1px solid #ddd", marginTop: 40, padding: "10px 0 10px 0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: accentColor }}>
        <span key="help-icon" style={{ fontSize: 22, marginRight: 8 }}>❔</span>
        <span key="help-text">¿Necesitas Ayuda?, contactame al <a key="whatsapp-link" href="https://wa.me/" style={{ color: primaryColor, textDecoration: "underline" }}>Link de whatsapp</a></span>
      </div>
    </div>
  );
};

export default CarritoComponent;
