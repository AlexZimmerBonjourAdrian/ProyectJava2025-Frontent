import React from "react";
import ModuloItem from "./ModuloItem";

const modulos = [
  {
    titulo: "0. Introduccion a la meditacion",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut congue massa ipsum, quis placerat mauris luctus vel. Maecenas ut felis vel orci ultrices",
    documento: "1 Documento"
  },
  {
    titulo: "1. Sanacion del niño interior - Reconocimiento",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut congue massa ipsum, quis placerat mauris luctus vel. Maecenas ut felis vel orci ultrices",
    documento: "1 Documento"
  },
  {
    titulo: "2. Sanacion del niño interior - Proceso",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut congue massa ipsum, quis placerat mauris luctus vel. Maecenas ut felis vel orci ultrices",
    documento: "1 Documento"
  },
  {
    titulo: "3. Sanacion del niño interior - Culmine",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut congue massa ipsum, quis placerat mauris luctus vel. Maecenas ut felis vel orci ultrices",
    documento: "1 Documento"
  },
  {
    titulo: "4. Sanacion del niño interior - Cambio",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut congue massa ipsum, quis placerat mauris luctus vel. Maecenas ut felis vel orci ultrices",
    documento: "1 Documento"
  }
];

export default function ModuloLista() {
  return (
    <section style={{ margin: "32px 0" }}>
      {modulos.map((mod, idx) => (
        <ModuloItem key={idx} {...mod} onVer={() => {}} />
      ))}
    </section>
  );
} 