import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { Paginator } from 'primereact/paginator';
import { getAllPaquetes } from '../services/paquete';
import { useDecryptToken } from '../App';
import './ListadoProductos.css';


export default function ListadoProductos() {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(12); // 3 columnas x 4 filas
    
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            const encryptedToken = localStorage.getItem('authToken');
            const token = useDecryptToken(encryptedToken);
            // Traer cursos
            const cursos = await fetch(`${API_URL}/api/curso`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).then(res => res.json());
            // Traer paquetes
            let paquetes = [];
            try {
                paquetes = await getAllPaquetes(token);
            } catch (e) { paquetes = []; }
            // Normaliza ambos para que tengan los mismos campos visuales
            const paquetesNormalizados = (paquetes || []).map(p => ({
                ...p,
                nombre: p.nombre || 'Paquete',
                descripcion: p.descripcion || '',
                precio: p.precio || 0,
                imagen: p.imagen || '',
                activo: p.activo !== false // por si falta el campo
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
    }, []);

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const listItem = (product, index) => {
        return (
            <div className="col-12" key={product.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.nombre} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <h3 className="text-2xl font-bold text-900">{product.nombre}</h3>
                            <p className="text-2xl font-bold text-900">{product.descripcion}</p>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="text-2xl font-semibold">${product.precio}</span>
                            <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={!product.activo}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (product) => {
        return (
            <div className="grid-producto-card" key={product.id}>
                <div className="grid-producto-img-placeholder">
                    {/* Imagen real si existe, si no placeholder con X */}
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
                    <div className="grid-producto-descrip">{product.descripcion || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut congue massa ipsum, quis placerat mauris luctus vel. Maecenas ut felis vel orci ultrices'}</div>
                    <div className="grid-producto-precio-btn">
                        <span className="grid-producto-precio">${product.precio || '0.00'}</span>
                        <Button label="Añadir al carrito" className="grid-producto-btn" disabled={!product.activo} />
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const paginatedProducts = products.slice(first, first + rows);

    const listTemplate = (products, layout) => {
        return <div className="grid-producto-container">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="listado-productos-bg" style={{paddingBottom: '40px'}}>
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
                template="PrevPageLink PageLinks NextPageLink"
                className="custom-paginator"
            />
            <div style={{textAlign:'center',marginTop:32,color:'#3d1426',fontSize:16,fontFamily:'serif'}}>
                © Solariana 2025
            </div>
        </div>
    )
}
