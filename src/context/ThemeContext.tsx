import React, { createContext, useContext, useState, useEffect } from 'react';

type AccentColor = 'default' | 'blue' | 'orange' | 'purple';

interface ThemeContextType {
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    const saved = localStorage.getItem('taveron-accent');
    return (saved as AccentColor) || 'default';
  });

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    localStorage.setItem('taveron-accent', color);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (accentColor === 'default') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', accentColor);
    }
  }, [accentColor]);

  return (
    <ThemeContext.Provider value={{ accentColor, setAccentColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
