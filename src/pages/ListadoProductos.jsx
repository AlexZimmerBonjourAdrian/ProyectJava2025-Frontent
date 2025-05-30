import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { Paginator } from 'primereact/paginator';
import { getAllPaquetes } from '../services/paquete';
import carritoService from '../services/carrito.js';
import useAuth from '../hooks/useAuth';
import { Toast } from 'primereact/toast';
import CursoHeader from '../components/CursoHeader';
import { useNavigate } from 'react-router-dom';
import './ListadoProductos.css';

export default function ListadoProductos() {
    const { token, isLoading } = useAuth();
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(12);
    const [carritoId, setCarritoId] = useState(null);
    const toast = useRef(null);
    const navigate = useNavigate();
    
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            if (isLoading) return;
            
            if (!token) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Advertencia',
                    detail: 'Debe iniciar sesión para ver y agregar productos al carrito.',
                    life: 5000
                });
                setProducts([]);
                return;
            }

            try {
                let carrito = await carritoService.obtenerCarritoUsuario(token);
                setCarritoId(carrito.id);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    try {
                        const nuevoCarrito = await carritoService.crearCarrito({}, token);
                        setCarritoId(nuevoCarrito.id);
                    } catch (createError) {
                        console.error('Error al crear carrito:', createError);
                        toast.current.show({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'No se pudo crear el carrito.',
                            life: 3000
                        });
                    }
                } else {
                    console.error('Error al obtener carrito:', error);
                    toast.current.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'No se pudo cargar el carrito.',
                        life: 3000
                    });
                }
            }

            // Traer cursos
            const cursos = await fetch(`${API_URL}/api/curso`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => res.json()).catch(err => { 
                console.error('Error fetching cursos:', err); 
                return []; 
            });

            // Traer paquetes
            let paquetes = [];
            try {
                paquetes = await getAllPaquetes(token);
            } catch (e) { 
                console.error('Error fetching paquetes:', e);
                paquetes = [];
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudieron cargar los paquetes.',
                    life: 3000
                });
            }

            const paquetesNormalizados = (paquetes || []).map(p => ({
                ...p,
                nombre: p.nombre || 'Paquete',
                descripcion: p.descripcion || '',
                precio: p.precio || 0,
                imagen: p.imagen || '',
                activo: p.activo !== false
            }));

            const cursosNormalizados = (cursos || []).map(c => ({
                ...c,
                nombre: c.nombre || 'Curso',
                descripcion: c.descripcion || '',
                precio: c.precio || 0,
                imagen: c.imagen || '',
                activo: c.activo !== false
            }));

            setProducts([...paquetesNormalizados, ...cursosNormalizados]);
        };
        fetchData();
    }, [token, isLoading, API_URL]);

    const handleAgregarAlCarrito = async (productId) => {
        if (!carritoId) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo acceder al carrito. Intente recargar la página.',
                life: 3000
            });
            return;
        }

        if (!token) {
            toast.current.show({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Debe iniciar sesión para agregar productos al carrito.',
                life: 5000
            });
            return;
        }

        try {
            await carritoService.agregarArticulo(carritoId, productId, token);
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Producto agregado al carrito',
                life: 3000
            });
        } catch (error) {
            console.error('Error al agregar item al carrito:', error);
            const errorMessage = error.response?.data?.message || 'No se pudo agregar el producto al carrito';
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: errorMessage,
                life: 3000
            });
        }
    };

    const handleIrAlCarrito = () => {
        navigate('/carrito');
    };

    const gridItem = (product) => {
        return (
            <div className="grid-producto-card" key={product.id}>
                <div className="grid-producto-img-placeholder">
                    {product.imagen ? (
                        <img src={product.imagen} alt={product.nombre} className="grid-producto-img" />
                    ) : (
                        <svg width="100%" height="100%" viewBox="0 0 180 180" style={{background:'#ddd',borderRadius:16}}>
                            <line x1="0" y1="0" x2="180" y2="180" stroke="#aaa" strokeWidth="4" />
                            <line x1="180" y1="0" x2="0" y2="180" stroke="#aaa" strokeWidth="4" />
                        </svg>
                    )}
                </div>
                <div className="grid-producto-content">
                    <div className="grid-producto-nombre">{product.nombre || 'NOMBRE DEL PAQUETE'}</div>
                    <div className="grid-producto-descrip">{product.descripcion || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}</div>
                    <div className="grid-producto-precio-btn">
                        <span className="grid-producto-precio">${product.precio || '0.00'}</span>
                        <Button 
                            label="Añadir al carrito" 
                            className="grid-producto-btn" 
                            disabled={!product.activo}
                            onClick={() => handleAgregarAlCarrito(product.id)}
                        />
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) return null;
        return layout === 'grid' ? gridItem(product) : null;
    };

    const paginatedProducts = products.slice(first, first + rows);

    const listTemplate = (products, layout) => {
        return <div className="grid-producto-container">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-between align-items-center">
                <Button 
                    icon="pi pi-shopping-cart" 
                    label="Ver Carrito" 
                    onClick={handleIrAlCarrito}
                    className="p-button-outlined"
                />
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="listado-productos-container">
            <CursoHeader />
            <div className="listado-productos-bg" style={{paddingBottom: '40px'}}>
                <Toast ref={toast} />
                <DataView 
                    value={paginatedProducts} 
                    listTemplate={listTemplate} 
                    layout={layout} 
                    header={header()} 
                />
                <Paginator 
                    first={first} 
                    rows={rows} 
                    totalRecords={products.length} 
                    onPageChange={(e) => { setFirst(e.first); setRows(e.rows); }}
                />
            </div>
        </div>
    );
}
