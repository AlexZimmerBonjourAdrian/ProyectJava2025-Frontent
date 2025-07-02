import React, { useState, useEffect, useRef } from 'react';
import { DataView } from 'primereact/dataview';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import carritoService from '../services/carrito';
import { getAllCursos } from '../services/curso';
import { getAllPaquetes } from '../services/paquete';
import useAuth from '../hooks/useAuth';
import ProductFilter from '../components/productos/ProductFilter';
import ProductCard from '../components/productos/ProductCard';
import './ListadoProductos.css';

export default function ListadoProductos() {
    const [max, setMax] = useState(1000);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState([0, max]);
    const [selectedTypes, setSelectedTypes] = useState({
        paquetes: true,
        cursos: true
    });
    const [loading, setLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const toast = useRef(null);
    const { token } = useAuth();
    const navigate = useNavigate();
    const [totalRecords, setTotalRecords] = useState(0);
    const [first, setFirst] = useState(0); // índice del primer elemento a mostrar
    const rowsPerPage = 6;
    
    const API_URL = import.meta.env.VITE_API_URL;

    const fetchProducts = async (page = 0) => {
        setIsLoadingData(true);
        try {
            const params = new URLSearchParams({
                pagina: page,
                cantidad: rowsPerPage,
            });

            if (searchQuery) params.append("search", searchQuery);

            params.append("precioMin", priceRange[0]);
            params.append("precioMax", priceRange[1]);

            // Agregar filtros por tipo (curso o paquete)
            const tiposSeleccionados = [];
            if (selectedTypes.cursos) tiposSeleccionados.push("curso");
            if (selectedTypes.paquetes) tiposSeleccionados.push("paquete");

            if (tiposSeleccionados.length > 0) {
                params.append("tipos", tiposSeleccionados.join(","));
            }
            
            console.log('params', params.toString());
            const res = await fetch(`${API_URL}/api/articulos/paginado?${params.toString()}`);
            console.log('res', res);
            const data = await res.json();
            console.log('data', data);
            const productos = data.content.map(art => ({
                ...art,
                precio: parseFloat(art.precio || 0),
                precioOriginal: parseFloat(art.precioOriginal || art.precio || 0)
            }));

            setProducts([...productos, {'a': 'b'}]);

            console.log('productos', productos);
            setFilteredProducts(productos);
            setTotalRecords(data.totalElements + 1);
        } catch (err) {
            console.error("Error al cargar productos:", err);
        } finally {
            setIsLoadingData(false);
        }
            setIsLoadingData(false);

    };

    // Cargar cursos y paquetes
    useEffect(() => {
        fetchProducts(0);
    }, [token, searchQuery, selectedTypes, priceRange]);

    useEffect(() => {
        fetch(`${API_URL}/api/articulos/max-precio`)
            .then(res => res.json())
            .then(data => {
                console.log('Max price data:', data);
                const maxPrice = parseFloat(data || 0);
                console.log('Max price:', maxPrice);
                setPriceRange([0, maxPrice]);
                setMax(maxPrice);
                fetchProducts(0)
            })
            .catch(err => {
                console.error("Error al obtener el precio máximo:", err);
            });
    }, []);

    const handlePageChange = (e) => {
        const newPage = e.first / rowsPerPage;
        setFirst(e.first);
        fetchProducts(newPage);
    };

    // Filtrar productos
    useEffect(() => {
        let result = [...products];

        // Filtrar por búsqueda
        if (searchQuery) {
            result = result.filter(product => 
                product.nombre?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.descripcion?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filtrar por rango de precio
        result = result.filter(product => 
            product.precio >= priceRange[0] && product.precio <= priceRange[1]
        );

        // Filtrar por tipo
        result = result.filter(product => 
            (selectedTypes.paquetes && product.tipo === 'paquete') ||
            (selectedTypes.cursos && product.tipo === 'curso')
        );

        //setFilteredProducts(result);
    }, [searchQuery, priceRange, selectedTypes, products]);

    const handleAddToCart = async (product) => {
        if (!token) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Debes iniciar sesión para añadir productos al carrito',
                life: 3000
            });
            navigate('/login');
            return;
        }

        setLoading(true);
        try {
            const carritoData = await carritoService.obtenerCarritoUsuario(token);
            if (!carritoData) {
                const nuevoCarrito = await carritoService.crearCarrito({}, token);
                await carritoService.agregarArticulo(nuevoCarrito.id, product.id, token);
            } else {
                await carritoService.agregarArticulo(carritoData.id, product.id, token);
            }
            
            toast.current.show({
                severity: 'success',
                summary: 'Éxito',
                detail: `${product.nombre} añadido al carrito`,
                life: 3000
            });
        } catch (error) {
            if (error.response?.data?.message?.includes('ya está en el carrito')) {
                toast.current.show({
                    severity: 'warn',
                    summary: 'Artículo duplicado',
                    detail: 'Este producto ya está en tu carrito',
                    life: 3000
                });
            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudo añadir el producto al carrito',
                    life: 3000
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleTypeChange = (type, checked) => {
        setSelectedTypes(prev => ({
            ...prev,
            [type]: checked
        }));
    };

    return (
        <div className="listado-productos-container">
            <Toast ref={toast} />
            
            {/* Sidebar de filtros */}
            <aside className="filters-sidebar">
                <ProductFilter 
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    priceRange={priceRange}
                    onPriceRangeChange={setPriceRange}
                    selectedTypes={selectedTypes}
                    onTypeChange={handleTypeChange}
                />
            </aside>

            {/* Grid de productos */}
            <main className="products-grid">
                <DataView 
                    value={filteredProducts} 
                    itemTemplate={(product) => (
                        <div className="product-grid-item">
                            <ProductCard 
                                product={product}
                                onAddToCart={handleAddToCart}
                                loading={loading}
                            />
                        </div>
                    )}
                    layout='grid'
                    rows={rowsPerPage}
                    paginator
                    lazy
                    totalRecords={totalRecords}
                    first={first}
                    onPage={(e) => handlePageChange(e)}
                    loading={isLoadingData}
                    emptyMessage={token ? "No se encontraron productos" : "Inicia sesión para ver los productos"}
                />
            </main>
        </div>
    );
}
