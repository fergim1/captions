import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import App from './App.jsx'

import "./main.css"
import { Translations } from './pages/Translations/Translations.jsx';

// TODO: implementar lazy and ¿suspense? 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<App />} /> */}
        <Route index element={<App />} />
        <Route path="translations" element={<Translations />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)


