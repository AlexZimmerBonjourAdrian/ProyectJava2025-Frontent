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
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [selectedTypes, setSelectedTypes] = useState({
        paquetes: true,
        cursos: true
    });
    const [loading, setLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const toast = useRef(null);
    const { token } = useAuth();
    const navigate = useNavigate();
    
    const API_URL = import.meta.env.VITE_API_URL;

    // Cargar cursos y paquetes
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoadingData(true);
            try {
                let cursosData = [];
                let paquetesData = [];

                // Intentar obtener cursos
                try {
                    cursosData = await getAllCursos(token);
                } catch (error) {
                    console.error('Error al cargar cursos:', error);
                }

                // Intentar obtener paquetes
                try {
                    paquetesData = await getAllPaquetes(token);
                } catch (error) {
                    console.error('Error al cargar paquetes:', error);
                }

                // Si no hay datos y no hay token, redirigir al login
                if (cursosData.length === 0 && paquetesData.length === 0 && !token) {
                    toast.current.show({
                        severity: 'info',
                        summary: 'Iniciar sesión',
                        detail: 'Por favor, inicia sesión para ver los productos',
                        life: 3000
                    });
                    navigate('/login');
                    return;
                }

                // Formatear cursos
                const formattedCursos = cursosData.map(curso => ({
                    ...curso,
                    tipo: 'curso',
                    precio: parseFloat(curso.precio || 0),
                    precioOriginal: parseFloat(curso.precioOriginal || curso.precio || 0)
                }));

                // Formatear paquetes
                const formattedPaquetes = paquetesData.map(paquete => ({
                    ...paquete,
                    tipo: 'paquete',
                    precio: parseFloat(paquete.precio || 0),
                    precioOriginal: parseFloat(paquete.precioOriginal || paquete.precio || 0)
                }));

                // Combinar y establecer productos
                const allProducts = [...formattedCursos, ...formattedPaquetes];
                
                if (allProducts.length > 0) {
                    // Encontrar el rango de precios
                    const prices = allProducts.map(p => p.precio).filter(p => !isNaN(p));
                    const minPrice = Math.floor(Math.min(...prices));
                    const maxPrice = Math.ceil(Math.max(...prices));
                    setPriceRange([minPrice, maxPrice]);
                }

                setProducts(allProducts);
                setFilteredProducts(allProducts);

            } catch (error) {
                console.error('Error al cargar productos:', error);
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'No se pudieron cargar los productos',
                    life: 3000
                });
            } finally {
                setIsLoadingData(false);
            }
        };

        fetchProducts();
    }, [token, navigate]);

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

        // Filtrar por categoría
        if (category) {
            result = result.filter(product => product.categoria === category);
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

        setFilteredProducts(result);
    }, [searchQuery, category, priceRange, selectedTypes, products]);

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
                    category={category}
                    onCategoryChange={setCategory}
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
                    rows={9}
                    paginator
                    loading={isLoadingData}
                    emptyMessage={token ? "No se encontraron productos" : "Inicia sesión para ver los productos"}
                />
            </main>
        </div>
    );
}
