import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSize = 'sm' | 'md' | 'lg';

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  language: string;
  setLanguage: (lang: string) => void;
  skipToMain: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    return (localStorage.getItem('satya_apaar_font_size') as FontSize) || 'md';
  });

  const [language, setLanguageState] = useState<string>(() => {
    return localStorage.getItem('satya_apaar_language') || 'English';
  });

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem('satya_apaar_font_size', size);
    document.documentElement.setAttribute('data-font-size', size);
  };

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('satya_apaar_language', lang);
  };

  const skipToMain = () => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.tabIndex = -1;
      mainContent.focus();
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        language,
        setLanguage,
        skipToMain,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = (): AccessibilityContextType => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};

