import React from 'react';
import { Card } from 'primereact/card';

const About = () => {
  return (
    <div className="p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Acerca de</h1>
        <p className="mb-4">
          Esta es una aplicación web moderna construida con:
        </p>
        <div className="pl-4">
          <ul className="list-disc">
            <li>React + Vite para el frontend</li>
            <li>PrimeReact para el diseño</li>
            <li>Java Spring Boot para el backend</li>
            <li>API REST para la comunicación</li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default About; 