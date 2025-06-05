import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { Dropdown } from 'primereact/dropdown';
import './ListadoProductos.css';


export default function ListadoProductos() {
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
    )
}
