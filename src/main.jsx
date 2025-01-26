import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import App from './App.jsx'
import { ThemeProvider } from './components/Theme/ThemeProvider.jsx';

import "./index.css"
import { Translations } from './pages/Translations/Translations.jsx';
import { Toaster } from "@/components/ui/toaster"

// TODO: implementar lazy and ¿suspense? 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="translations" element={<Translations />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  </StrictMode>,
)


