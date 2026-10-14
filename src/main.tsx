import './lib/https' // must run first: upgrades http → https on real domains
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
createRoot(document.getElementById('root')!).render(<App />)
