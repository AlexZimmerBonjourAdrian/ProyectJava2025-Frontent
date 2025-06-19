import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// PrimeReact CSS
import 'primereact/resources/themes/lara-light-cyan/theme.css' // theme
import 'primereact/resources/primereact.min.css' // core css
import 'primeicons/primeicons.css' // icons
import './styles/global.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
