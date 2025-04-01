import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import App from './App.jsx'
import { ThemeProvider } from './components/Theme/ThemeProvider.jsx';
import "./index.css"
import { Toaster } from "@/components/ui/toaster"
import RedirectOnReload from './components/RedirectOnReload/RedirectOnReload.jsx';

// Lazy load pages
const VideoPage = lazy(() => import('./pages/Video/VideoPage.jsx'))
const TranslationsPage = lazy(() => import('./pages/Translations/TranslationsPage.jsx'))
const QuestionsPage = lazy(() => import('./pages/Questions/QuestionsPage.jsx'))
const ReadingPage = lazy(() => import('./pages/Reading/ReadingPage.jsx'))
const WordsPage = lazy(() => import('./pages/Words/WordsPage.jsx'))
const MainPointsPage = lazy(() => import('./pages/MainPoints/MainPointsPage.jsx'))
const TrueOrFalsePage = lazy(() => import('./pages/TrueOrFalsePage/TrueOrFalsePage.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme" >
      <BrowserRouter>
        <RedirectOnReload />
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <Routes>
            <Route index element={<App />} />
            <Route path="video" element={<VideoPage />} />
            <Route path="translations" element={<TranslationsPage />} />
            <Route path="questions" element={<QuestionsPage />} />
            <Route path="reading" element={<ReadingPage />} />
            <Route path="words" element={<WordsPage />} />
            <Route path="main-points" element={<MainPointsPage />} />
            <Route path="true-or-false" element={<TrueOrFalsePage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  </StrictMode>,
)


