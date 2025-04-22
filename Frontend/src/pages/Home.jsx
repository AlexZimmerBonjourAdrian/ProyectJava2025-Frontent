import React from 'react';
import { Card } from 'primereact/card';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tarjeta principal */}
          <Card className="col-span-full flex flex-col items-center text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
              Bienvenido a Mi Aplicación
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-4 max-w-2xl">
              Esta es la página principal de la aplicación. Aquí puedes agregar el contenido principal.
            </p>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl">
              La aplicación está conectada con un backend Java y utiliza PrimeReact para el diseño.
            </p>
          </Card>

          {/* Tarjetas de características */}
          <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Característica 1</h2>
            <p className="text-gray-600">Descripción de la primera característica importante.</p>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Característica 2</h2>
            <p className="text-gray-600">Descripción de la segunda característica importante.</p>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">Característica 3</h2>
            <p className="text-gray-600">Descripción de la tercera característica importante.</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home; 