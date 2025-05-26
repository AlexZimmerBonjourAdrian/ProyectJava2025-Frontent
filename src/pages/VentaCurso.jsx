import React, { useState } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Slider } from "primereact/slider";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import "primereact/resources/themes/lara-light-pink/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

// Mock de cursos
const cursos = [
  {
    id: 1,
    nombre: "Sanación Integral",
    descripcion: "Curso de sanación física y emocional.",
    categoria: "Sanacion",
    precio: 10,
    paquete: true,
    imagen: "",
  },
  {
    id: 2,
    nombre: "Feminidad Sagrada",
    descripcion: "Descubre tu energía femenina.",
    categoria: "Feminidad",
    precio: 15,
    paquete: false,
    imagen: "",
  },
  {
    id: 3,
    nombre: "Meditación para el Alma",
    descripcion: "Aprende a meditar y conectar contigo.",
    categoria: "Meditation",
    precio: 20,
    paquete: true,
    imagen: "",
  },
  // ...agrega más cursos si lo deseas
];

const categorias = [
  { label: "Todas", value: null },
  { label: "Sanacion", value: "Sanacion" },
  { label: "Feminidad", value: "Feminidad" },
  { label: "Meditation", value: "Meditation" },
];

export default function VentaCurso() {
  // Estados de filtros
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState(null);
  const [precio, setPrecio] = useState([5, 20]);
  const [soloPaquetes, setSoloPaquetes] = useState(false);
  const [layout, setLayout] = useState("grid");

  // Filtrado de cursos
  const cursosFiltrados = cursos.filter((curso) => {
    const matchSearch =
      curso.nombre.toLowerCase().includes(search.toLowerCase()) ||
      curso.descripcion.toLowerCase().includes(search.toLowerCase());
    const matchCategoria = !categoria || curso.categoria === categoria;
    const matchPrecio = curso.precio >= precio[0] && curso.precio <= precio[1];
    const matchPaquete = !soloPaquetes || curso.paquete;
    return matchSearch && matchCategoria && matchPrecio && matchPaquete;
  });

  // Template para mostrar cada curso
  const itemTemplate = (curso) => (
    <div
      style={{
        background: "#f8b6c6",
        borderRadius: 20,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: 240,
        boxShadow: "0 2px 8px #0001",
        margin: 8,
      }}
    >
      <div
        style={{
          width: 220,
          height: 120,
          background: "#ddd",
          borderRadius: 8,
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ color: "#aaa", fontSize: 32 }}>
          {curso.imagen ? (
            <img src={curso.imagen} alt={curso.nombre} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }} />
          ) : (
            "X"
          )}
        </span>
      </div>
      <div style={{ fontWeight: "bold", fontSize: 18, color: "#fff", width: "100%" }}>
        {curso.nombre}
      </div>
      <div style={{ fontSize: 13, color: "#fff", margin: "8px 0 0 0", width: "100%" }}>
        {curso.descripcion}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: 16 }}>
        <span style={{ color: "#fff", fontSize: 18 }}>${curso.precio}</span>
        <button
          style={{
            background: "#cbb26a",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "6px 18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ background: "#eef1f3", minHeight: "100vh", fontFamily: "serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", padding: "32px 0 0 40px" }}>
       
        <div style={{ flex: 1 }} />
        {/* Eliminados los íconos de carrito y casa */}
      </div>
      {/* Main Content */}
      <div style={{ display: "flex", marginTop: 24 }}>
        {/* Sidebar de filtros */}
        <div
          style={{
            width: 220,
            background: "#3d1426",
            borderRadius: 0,
            marginLeft: 20,
            minHeight: 500,
            padding: "16px 0 0 0",
          }}
        >
          <div style={{ color: "#fff", fontWeight: "bold", marginLeft: 16, marginBottom: 8 }}>
            BUSCADOR
          </div>
          <div style={{ background: "#f8b6c6", borderRadius: 8, margin: "0 12px", padding: 12 }}>
            <span style={{ fontWeight: "bold", fontSize: 14 }}>Buscar</span>
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar curso..."
              style={{
                width: "100%",
                borderRadius: 16,
                border: "none",
                marginBottom: 16,
                fontSize: 16,
              }}
            />
            <div style={{ fontWeight: "bold", marginBottom: 8, fontSize: 14 }}>Categoría</div>
            <Dropdown
              value={categoria}
              options={categorias}
              onChange={(e) => setCategoria(e.value)}
              placeholder="Todas"
              style={{ width: "100%", marginBottom: 12 }}
            />
            <div style={{ margin: "16px 0 8px 0", fontSize: 14 }}>💲 ${precio[0]} ~ ${precio[1]}</div>
            <Slider
              value={precio}
              onChange={(e) => setPrecio(e.value)}
              range
              min={5}
              max={20}
              style={{ width: "100%", marginBottom: 12 }}
            />
            <div style={{ margin: "16px 0 6px 0", fontWeight: "bold", fontSize: 14 }}>Solo paquetes</div>
            <Checkbox
              checked={soloPaquetes}
              onChange={(e) => setSoloPaquetes(e.checked)}
              inputId="paquetes"
            />
            <label htmlFor="paquetes" style={{ marginLeft: 8 }}>
              Paquetes
            </label>
          </div>
        </div>
        {/* Cards Grid con DataView */}
        <div style={{ flex: 1, marginLeft: 32 }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
            <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
          </div>
          <DataView
            value={cursosFiltrados}
            layout={layout}
            itemTemplate={itemTemplate}
            paginator
            rows={6}
            emptyMessage="No se encontraron cursos."
          />
        </div>
      </div>
      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          marginTop: 32,
          color: "#3d1426",
          fontSize: 16,
          fontFamily: "serif",
        }}
      >
        © Solariana 2025
      </div>
    </div>
  );
}
