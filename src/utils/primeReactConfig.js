export const primeReactConfig = {
    ripple: true,
    inputStyle: 'filled',
    theme: 'lara-light-pink',
    scale: 14, // tamaño base de fuente
    zIndex: {
        modal: 1100, // dialogs, sidebar
        overlay: 1000, // dropdown, overlay panel
        menu: 1000, // floating menu
        tooltip: 1100, // tooltip
        toast: 1200 // toast messages
    }
};

export const primeReactCustomConfig = {
    // Configuración de DataView
    dataView: {
        grid: {
            columns: 3, // número de columnas en vista grid
            gutter: '1rem' // espacio entre items
        },
        paginator: {
            rows: 9, // items por página
            rowsPerPageOptions: [9, 18, 27]
        }
    },
    // Configuración de Toast
    toast: {
        position: 'top-right',
        autoClose: 3000,
        closeOnClick: true
    }
};