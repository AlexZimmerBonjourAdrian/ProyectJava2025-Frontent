import React from 'react';
import { Card } from 'primereact/card';

const Home = () => {
  return (
    <div className="p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Bienvenido a Mi Aplicación</h1>
        <p className="mb-4">
          Esta es la página principal de la aplicación. Aquí puedes agregar el contenido principal.
        </p>
        <p>
          La aplicación está conectada con un backend Java y utiliza PrimeReact para el diseño.
        </p>
      </Card>
    </div>
  );
};

export default Home; 