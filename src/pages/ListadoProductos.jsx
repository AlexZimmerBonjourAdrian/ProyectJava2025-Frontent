import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import './ListadoProductos.css';

export default function ListadoProductos() {
    const { token, isLoading } = useAuth();
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');

    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState(0);
    const [sortField, setSortField] = useState('');
    const sortOptions = [
        { label: 'Price High to Low', value: '!precio' },
        { label: 'Price Low to High', value: 'precio' }
    ];
    
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
                console.error('Error al obtener carrito:', error);
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo cargar el carrito.',
                    life: 3000
                });
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

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        } else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    };

    const gridItem = (product, index) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2 grid-producto" key={index}>
                <img src='' className='grid-pruducto-imagen'/>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <h3 className="text-2xl font-bold text-900 grid-pruducto-nombre">{product.nombre}</h3>
                    <p className="text-2xl font-bold text-900 grid-pruducto-descrip">{product.descripcion}</p>                        
                </div>
                <div className="grid-pruducto-precio">
                    <span className="text-2xl font-semibold grid-pruducto-precio">${product.precio}</span>
                    <Button icon="pi pi-shopping-cart" className="boton-dorado p-button-rounded grid-pruducto-button" disabled={!product.activo}>Añadir</Button>
                </div>
            </div>
        );
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product, index) => gridItem(product, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} className="w-full sm:w-14rem" />
                {/* <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} /> */}
            </div>
        );
    };

    return (
        <div>
            <section className='filters'>
                {header()}
            </section>
            <section className='data-view'>
                <DataView value={products} sortField={sortField} sortOrder={sortOrder} listTemplate={listTemplate} layout='grid' />

            </section>
        </div>
    );
}
