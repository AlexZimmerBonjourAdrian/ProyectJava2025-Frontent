import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-slate-50 to-slate-100/50">
      <div className="section-container">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="heading-primary">
            Bienvenido a <span className="text-primary-600">a lo de Sol Fuentes</span>
          </h1>
          <p className="text-body max-w-3xl mx-auto mb-8">
            
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              label="Comenzar" 
              icon="pi pi-arrow-right" 
              className="p-button-primary p-button-rounded text-lg px-6 py-3"
            />
            <Button 
              label="Ver Video Curso" 
              icon="pi pi-play"
              severity="secondary"
              className="p-button-rounded text-lg px-6 py-3"
              onClick={() => navigate('/VideoCurso')}
            />
          </div>
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
              <div className="flex justify-center gap-4">
                <Button 
                  label="Explorar Más" 
                  icon="pi pi-search"
                  className="p-button-outlined p-button-rounded p-button-white text-lg"
                />
                <Button 
                  label="Ir al Video Curso" 
                  icon="pi pi-video"
                  className="p-button-outlined p-button-rounded p-button-white text-lg"
                  onClick={() => navigate('/VideoCurso')}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home; 