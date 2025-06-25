import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import carritoService from "../services/carrito";
import useAuth from "../hooks/useAuth";
import { Toast } from 'primereact/toast';
import { crearArticuloClienteDesdeDTO } from '../services/ArticuloCliente';
import { useDecryptToken } from '../App';

const primaryColor = "#e98fae";
const accentColor = "#bfa046";
const lightBg = "#f8f9fb";
const cardBg = "#fff";
const borderRadius = 16;

const CarritoComponent = () => {
  const [carrito, setCarrito] = useState(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const token = useDecryptToken(localStorage.getItem('authToken'));
  const navigate = useNavigate();
  const toast = React.useRef(null);
  const userId = useDecryptToken(localStorage.getItem('authToken'))?.userId;
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        // 1. Obtener el carrito básico del usuario
        const carritoData = await carritoService.obtenerCarritoUsuario(token);

        if (carritoData && carritoData.items && carritoData.items.length > 0) {
          // 2. Extraer IDs de artículos y obtener detalles completos para cada uno
          const itemDetailsPromises = carritoData.items.map(async (item) => {
            // Asumiendo que item.articulo contiene el ID del curso/producto
            // Si el backend usa otro nombre (ej: itemId, productId), habrá que ajustar aquí
            if (item.articulo) {
              try {
                // Obtener detalles completos del curso/producto usando su ID
                const detalles = await import('../services/curso').then(module => module.getCursoById(item.articulo, token));
                // Combinar los datos básicos del item del carrito con los detalles obtenidos
                return { ...item, ...detalles };
              } catch (detailError) {
                console.error(`Error al obtener detalles para el artículo ${item.articulo}:`, detailError);
                // Si falla obtener detalles, devolver el item básico (con normalización fallback)
                return { 
                  ...item, 
                  nombre: item.nombre || 'Error al cargar nombre',
                  precio: item.precio || 0, // O quizás item.precio si el carrito básico lo trae
                  descripcion: item.descripcion || 'Error al cargar descripción.',
                  autor: item.autor || 'Error al cargar autor'
                };
              }
            } else {
              // Si el item no tiene un ID de artículo referenciado, devolver el item básico (con normalización fallback)
               return { 
                  ...item, 
                  nombre: item.nombre || 'Artículo sin referencia',
                  precio: item.precio || 0, // O quizás item.precio si el carrito básico lo trae
                  descripcion: item.descripcion || 'Sin descripción referenciada.',
                  autor: item.autor || 'Autor desconocido'
                };
            }
          });

          // Esperar a que se completen todas las promesas de obtención de detalles
          const itemsConDetalles = await Promise.all(itemDetailsPromises);

          // 3. Actualizar el estado del carrito con los items enriquecidos
          setCarrito({ ...carritoData, items: itemsConDetalles });

        } else {
           // Si el carrito está vacío o no tiene items, simplemente establecerlo
           setCarrito(carritoData);
        }

        // Obtener el total del carrito (esto puede que ya esté correcto si depende solo del ID del carrito)
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
    if (!token) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: 'Usuario no autenticado. No se pueden asignar artículos.',
        life: 3000
      });
      return;
    }

    if (!carrito || !carrito.items || carrito.items.length === 0) {
       toast.current.show({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El carrito está vacío.',
        life: 3000
      });
      return;
    }

    try {
      const itemsToAssign = [...carrito.items]; // Clonar los items por si el estado cambia antes de asignarlos
      
      console.log(carrito)
      console.log(itemsToAssign)
      if(metodo == "mercadopago"){
        console.log("mercadopago")
        const body = {
          items: carrito.items.map(el=>{return {nombre: el.nombre, precio: el.precio}}),
          usuarioId: userId,
          carritoId: carrito.id
        };
        console.log("body:", body)
        fetch(`${API_URL}/api/mercado-pago/crear-preferencia`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }).then(res => res.text())
          .then(url =>{
            console.log(url);
            window.open(url, '_blank');
          });
      }else if (metodo == 'paypal'){
        console.log("paypal")
        const body = {
          items: carrito.items.map(el=>{return {nombre: el.nombre, precio: el.precio}}),
          usuarioId: userId,
          carritoId: carrito.id
        };
        console.log("body:", body)
        fetch(`${API_URL}/api/paypal/crear-preferencia`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body)
        }).then(res => res.text())
          .then(url =>{
            console.log(url);
            window.open(url);
          });
      }

      // // Mostrar éxito y actualizar UI (ej: vaciar carrito visualmente)
      // toast.current.show({
      //   severity: 'success',
      //   summary: 'Éxito',
      //   detail: 'Pago procesado y artículos asignados.',
      //   life: 5000
      // });

      // // Vaciar el carrito en el frontend o recargar para reflejar los cambios
      // setCarrito({ ...carrito, items: [] }); // Vaciar visualmente el carrito
      // setTotal(0); // Resetear total

    } catch (error) {
      console.error('Error al procesar el pago o asignar artículos:', error);
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: error.response?.data?.message || 'No se pudo procesar el pago o asignar artículos',
        life: 5000
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
          {carrito.items.map((item, index) => {
            return (
              <div
                key={`item-${item.id}-${index}`}
                className="carrito-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#fff',
                  borderRadius: 16,
                  boxShadow: '0 2px 12px rgba(233,143,174,0.10)',
                  marginBottom: 22,
                  padding: 18,
                  gap: 18,
                  transition: 'box-shadow 0.2s',
                  border: '1.5px solid #f3c7d6',
                  position: 'relative',
                  minHeight: 120
                }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(233,143,174,0.18)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 12px rgba(233,143,174,0.10)'}
              >
                {/* Imagen o placeholder */}
                <div style={{ minWidth: 80, minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fb', borderRadius: 12, overflow: 'hidden', border: '1px solid #eee' }}>
                  {item.imagen ? (
                    <img src={item.imagen} alt={item.nombre} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 12 }} />
                  ) : (
                    <svg width="48" height="48" fill="#e98fae" viewBox="0 0 24 24"><rect width="100%" height="100%" rx="12" fill="#f3c7d6"/><text x="50%" y="55%" textAnchor="middle" fontSize="22" fill="#e98fae">🎓</text></svg>
                  )}
                </div>
                {/* Info del curso */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ fontWeight: 700, fontSize: 22, color: '#bfa046', marginBottom: 2 }}>{item.nombre}</div>
                  <div style={{ fontSize: 15, color: '#222', marginBottom: 2 }}>{item.descripcion}</div>
                  <div style={{ fontSize: 14, color: '#888', marginBottom: 2 }}>Autor: <span style={{ color: '#e98fae', fontWeight: 600 }}>{item.autor || 'Desconocido'}</span></div>
                  <div style={{ fontSize: 20, color: '#e98fae', fontWeight: 700, marginTop: 4 }}>${item.precio}</div>
                </div>
                {/* Botón eliminar */}
                <button
                  onClick={() => handleEliminarItem(item.id)}
                  style={{
                    background: '#f8f9fb',
                    border: 'none',
                    color: '#e98fae',
                    fontSize: 22,
                    cursor: 'pointer',
                    borderRadius: 8,
                    padding: 6,
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    transition: 'background 0.2s'
                  }}
                  title="Eliminar"
                  onMouseOver={e => e.currentTarget.style.background = '#f3c7d6'}
                  onMouseOut={e => e.currentTarget.style.background = '#f8f9fb'}
                >
                  <svg width="22" height="22" fill="#e98fae" viewBox="0 0 24 24"><path d="M3 6h18v2H3V6zm2 3h14l-1.5 12.5c-.1.8-.8 1.5-1.6 1.5H8.1c-.8 0-1.5-.7-1.6-1.5L5 9zm3 2v8h2v-8H8zm4 0v8h2v-8h-2z"/></svg>
                </button>
              </div>
            );
          })}

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
