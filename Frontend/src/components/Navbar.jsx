import React from 'react';
import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

const Navbar = () => {
  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      url: '/'
    },
    {
      label: 'Acerca de',
      icon: 'pi pi-info-circle',
      url: '/about'
    },
    {
      label: 'Iniciar Sesión',
      icon: 'pi pi-user',
      url: '/login'
    }
  ];

  return (
    <Menubar 
      model={items}
      start={<div className="text-xl font-bold">Mi Aplicación</div>}
    />
  );
};

export default Navbar; 