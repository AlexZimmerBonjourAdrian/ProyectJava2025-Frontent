import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-slate-100/50">
      <div className="section-container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="heading-primary">
            Bienvenido a <span className="text-primary-600">Mi Aplicación</span>
          </h1>
          <p className="text-body max-w-3xl mx-auto mb-8">
            Una plataforma moderna construida con React y Java Spring Boot, diseñada para ofrecer la mejor experiencia de usuario.
          </p>
          <Button 
            label="Comenzar" 
            icon="pi pi-arrow-right" 
            className="p-button-primary p-button-rounded text-lg px-6 py-3"
          />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="card-hover">
            <div className="flex flex-col items-center text-center">
              <i className="pi pi-shield text-4xl text-primary-500 mb-4"></i>
              <h3 className="heading-secondary">Seguridad Avanzada</h3>
              <p className="text-body">
                Implementamos las últimas prácticas de seguridad para proteger tus datos.
              </p>
            </div>
          </Card>

          <Card className="card-hover">
            <div className="flex flex-col items-center text-center">
              <i className="pi pi-bolt text-4xl text-primary-500 mb-4"></i>
              <h3 className="heading-secondary">Alto Rendimiento</h3>
              <p className="text-body">
                Optimizado para ofrecer la mejor velocidad y eficiencia.
              </p>
            </div>
          </Card>

          <Card className="card-hover">
            <div className="flex flex-col items-center text-center">
              <i className="pi pi-mobile text-4xl text-primary-500 mb-4"></i>
              <h3 className="heading-secondary">Diseño Responsive</h3>
              <p className="text-body">
                Adaptado perfectamente a cualquier dispositivo y pantalla.
              </p>
            </div>
          </Card>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 text-center">
          <Card className="bg-primary-600 text-white max-w-4xl mx-auto">
            <div className="py-8">
              <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
              <p className="text-lg mb-6 text-primary-100">
                Únete a nosotros y descubre todas las características que tenemos para ti.
              </p>
              <Button 
                label="Explorar Más" 
                icon="pi pi-search"
                className="p-button-outlined p-button-rounded p-button-white text-lg"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home; 