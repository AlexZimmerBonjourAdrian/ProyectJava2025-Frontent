import React from "react";
import PaqueteHeader from "./PaqueteHeader";
import PaqueteDescripcion from "./PaqueteDescripcion";
import CursoIncluidoCard from "./CursoIncluidoCard";
import PaqueteFooter from "./PaqueteFooter";

const cursosIncluidos = [
  {
    nombre: "NOMBRE CURSO",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut congue massa ipsum, quis placerat mauris luctus vel. Maecenas ut felis vel orci ultrices commodo sit amet quis ligula.",
    imagen: null,
  },
  {
    nombre: "NOMBRE CURSO",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut congue massa ipsum, quis placerat mauris luctus vel. Maecenas ut felis vel orci ultrices commodo sit amet quis ligula.",
    imagen: null,
  },
  {
    nombre: "NOMBRE CURSO",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut congue massa ipsum, quis placerat mauris luctus vel. Maecenas ut felis vel orci ultrices commodo sit amet quis ligula.",
    imagen: null,
  },
];

const PaqueteComponent = () => {
  const handleAddToCart = () => {
    alert("Añadido al carrito!");
  };
  const handleInfo = (nombre) => {
    alert(`Más info sobre: ${nombre}`);
  };

  return (
    <div style={{ background: '#e9eef2', minHeight: '100vh', paddingBottom: 40 }}>
      {/* Header y nombre */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 0 0 0' }}>
       
        
        <PaqueteHeader nombre="NOMBRE DEL PAQUETE" subtitulo="PAQUETE DE CURSOS" imagen={null} onAddToCart={handleAddToCart} />
      </div>
      <PaqueteDescripcion descripcion="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut congue massa ipsum, quis placerat mauris luctus vel. Maecenas ut felis vel orci ultrices commodo sit amet quis ligula. Curabitur id dui nec est imperdiet aliquam et id lorem." />
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 0 0 0' }}>
        <div style={{ fontWeight: 700, fontSize: 22, color: '#5a2236', marginBottom: 18 }}>CURSOS INCLUIDOS</div>
        {cursosIncluidos.map((curso, idx) => (
          <CursoIncluidoCard key={idx} nombre={curso.nombre} descripcion={curso.descripcion} imagen={curso.imagen} onInfo={() => handleInfo(curso.nombre)} />
        ))}
      </div>
      <PaqueteFooter onAddToCart={handleAddToCart} />
    </div>
  );
};

export default PaqueteComponent;
