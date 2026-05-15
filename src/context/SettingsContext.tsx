import React, { createContext, useContext, useState, useEffect } from 'react';

export type AccentColor = 'default' | 'blue' | 'orange' | 'purple';
export type Currency = 'MXN' | 'USD' | 'EUR';

interface SettingsContextType {
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    const saved = localStorage.getItem('taveron-accent');
    return (saved as AccentColor) || 'default';
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('taveron-currency');
    return (saved as Currency) || 'MXN';
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('taveron-dark-mode');
    return saved === null ? true : saved === 'true';
  });

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    localStorage.setItem('taveron-accent', color);
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('taveron-currency', curr);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newVal = !prev;
      localStorage.setItem('taveron-dark-mode', String(newVal));
      return newVal;
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    
    // Tema de acento
    if (accentColor === 'default') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', accentColor);
    }

    // Modo oscuro/claro
    if (darkMode) {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [accentColor, darkMode]);

  return (
    <SettingsContext.Provider value={{ accentColor, setAccentColor, currency, setCurrency, darkMode, toggleDarkMode }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
