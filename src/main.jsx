import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";

import App from './App.jsx'
import { ThemeProvider } from './components/Theme/ThemeProvider.jsx';

import "./index.css"
import { Toaster } from "@/components/ui/toaster"
import VideoPage from './pages/Video/VideoPage.jsx';
import TranslationsPage from './pages/Translations/TranslationsPage.jsx';
import QuestionsPage from './pages/Questions/QuestionsPage.jsx';
import ReadingPage from './pages/Reading/ReadingPage.jsx';
import WordsPage from './pages/Words/WordsPage.jsx';

// TODO: implementar lazy and ¿suspense?

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
          <Route path="video" element={<VideoPage />} />
          <Route path="translations" element={<TranslationsPage />} />
          <Route path="questions" element={<QuestionsPage />} />
          <Route path="reading" element={<ReadingPage />} />
          <Route path="words" element={<WordsPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  </StrictMode>,
)


