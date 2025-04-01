import { useState, useEffect } from 'react';

export const useTextSelection = () => {
  const [selectedText, setSelectedText] = useState('');
  const [selectionType, setSelectionType] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const isMobile = typeof window !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent);

  const processSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const text = selection.toString().trim();
    if (!text) return;

    if (text.split(/\s+/).length === 1) {
      setSelectedText(text);
      setSelectionType('word');
    } else {
      setSelectedText(text);
      setSelectionType('phrase');
    }

    // No removemos la selección visual (mejor UX en móvil)
  };

  useEffect(() => {
    if (isMobile) {
      // En móvil usamos selectionchange con delay
      const handleSelectionChange = () => {
        if (timeoutId) clearTimeout(timeoutId);
        const newTimeoutId = setTimeout(() => {
          processSelection();
        }, 300);
        setTimeoutId(newTimeoutId);
      };

      document.addEventListener('selectionchange', handleSelectionChange);

      return () => {
        if (timeoutId) clearTimeout(timeoutId);
        document.removeEventListener('selectionchange', handleSelectionChange);
      };
    } else {
      // En desktop usamos mouseup (cuando el usuario termina de seleccionar)
      const handleMouseUp = () => {
        processSelection();
      };

      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, []);

  return { selectedText, selectionType, setSelectedText, setSelectionType };
};