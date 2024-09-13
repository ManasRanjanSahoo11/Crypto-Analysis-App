import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CryptoContext from './CryptoContext.jsx'
import App from './App.jsx'
import './index.css'
import 'react-alice-carousel/lib/alice-carousel.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CryptoContext>
    <App />
    </CryptoContext>
  </StrictMode>
)
