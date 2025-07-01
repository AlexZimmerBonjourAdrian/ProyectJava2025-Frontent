import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Slider } from 'primereact/slider';
import { Checkbox } from 'primereact/checkbox';

export default function ProductFilter({
    searchQuery,
    onSearchChange,
    priceRange,
    onPriceRangeChange,
    selectedTypes,
    onTypeChange
}) {

    return (
        <div className="product-filters">
            {/* Búsqueda */}
            <div className="filter-section">
                <h3>Buscar</h3>
                <span className="p-input-icon-left w-full">
                    <i className="pi pi-search" />
                    <InputText
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar productos..."
                        className="w-full"
                    />
                </span>
            </div>

            {/* Rango de Precio */}
            <div className="filter-section">
                <h3>Rango de Precio</h3>
                <div className="price-range">
                    <Slider
                        value={priceRange}
                        onChange={(e) => onPriceRangeChange(e.value)}
                        range
                        min={0}
                        max={1000}
                    />
                    <div className="price-labels">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* Tipo de Producto */}
            <div className="filter-section">
                <h3>Tipo de Producto</h3>
                <div className="product-types">
                    <div className="field-checkbox">
                        <Checkbox
                            inputId="paquetes"
                            checked={selectedTypes.paquetes}
                            onChange={(e) => onTypeChange('paquetes', e.checked)}
                        />
                        <label htmlFor="paquetes">Paquetes</label>
                    </div>
                    <div className="field-checkbox">
                        <Checkbox
                            inputId="cursos"
                            checked={selectedTypes.cursos}
                            onChange={(e) => onTypeChange('cursos', e.checked)}
                        />
                        <label htmlFor="cursos">Cursos</label>
                    </div>
                </div>
            </div>
        </div>
    );
} 