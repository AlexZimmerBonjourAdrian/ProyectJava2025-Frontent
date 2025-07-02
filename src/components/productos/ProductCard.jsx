import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

export default function ProductCard({ product, onAddToCart, loading }) {
    const hasDiscount = product.precio < product.precioOriginal;
    const defaultImage = `https://picsum.photos/300/300?random=${product.id || Math.random()}`;

    const header = (
        <div className="product-image">
            <img 
                src={product.imagen || defaultImage} 
                alt={product.nombre}
                onError={(e) => e.target.src = defaultImage}
            />
        </div>
    );

    const footer = (
        <div className="product-footer">
            <div className="price-container">
                {hasDiscount && (
                    <span className="original-price">${product.precioOriginal.toFixed(2)}</span>
                )}
                <span className="current-price">${product.precio.toFixed(2)}</span>
            </div>
            <Button
                label="Añadir"
                icon="pi pi-shopping-cart"
                onClick={() => {
                    onAddToCart(product)
                }}
                loading={loading}
                className="add-to-cart-button p-button-sm"
            />
        </div>
    );

    return (
        <Card
            header={header}
            footer={footer}
            className="product-card"
        >
            <div className="product-content">
                <section className={('tipoProd ' + (product.tipo == "paquete" ? 'tipoPaq' : ''))}>{product.tipo}</section>

                <h3 className="product-title">{product.nombre || "NOMBRE DEL PAQUETE"}</h3>
                <p className="product-description">
                    {product.descripcion || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut conque massa ipsum, quis placerat mauris luctus vel."}
                </p>
            </div>
        </Card>
    );
} 