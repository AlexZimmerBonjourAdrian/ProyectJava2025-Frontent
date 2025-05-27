import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import './ListadoProductos.css';


export default function ListadoProductos() {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/api/curso`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            setProducts(data)
        })
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
                    {/* Imagen real si existe, si no placeholder */}
                    {product.imagen ? (
                        <img src={product.imagen} alt={product.nombre} className="grid-producto-img" />
                    ) : (
                        <div className="grid-producto-img-x">✕</div>
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
        <div className="listado-productos-bg">
            <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
    )
}
