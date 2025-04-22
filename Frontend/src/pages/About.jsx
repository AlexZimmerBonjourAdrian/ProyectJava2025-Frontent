import React from 'react';
import { Card } from 'primereact/card';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-6 sm:px-8 lg:px-12">
      <div className="w-full max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
          {/* Sección de información */}
          <Card className="h-full flex flex-col items-center text-center p-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-800">
              Acerca de
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 max-w-2xl">
              Esta es una aplicación web moderna construida con:
            </p>
            <div className="space-y-6 w-full max-w-xl">
              <div className="flex items-center justify-center space-x-4">
                <i className="pi pi-check-circle text-green-500 text-2xl"></i>
                <span className="text-lg text-gray-700">React + Vite para el frontend</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <i className="pi pi-check-circle text-green-500 text-2xl"></i>
                <span className="text-lg text-gray-700">PrimeReact para el diseño</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <i className="pi pi-check-circle text-green-500 text-2xl"></i>
                <span className="text-lg text-gray-700">Java Spring Boot para el backend</span>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <i className="pi pi-check-circle text-green-500 text-2xl"></i>
                <span className="text-lg text-gray-700">API REST para la comunicación</span>
              </div>
            </div>
          </Card>

          {/* Sección de estadísticas */}
          <Card className="h-full flex flex-col items-center text-center p-6">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800">
              Estadísticas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-xl">
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-blue-600 mb-3">100%</div>
                <div className="text-lg text-gray-600">Responsive</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-green-600 mb-3">24/7</div>
                <div className="text-lg text-gray-600">Disponible</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-purple-600 mb-3">1000+</div>
                <div className="text-lg text-gray-600">Usuarios</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="text-4xl font-bold text-orange-600 mb-3">99%</div>
                <div className="text-lg text-gray-600">Satisfacción</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About; 