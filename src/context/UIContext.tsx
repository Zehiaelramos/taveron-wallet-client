import React, { createContext, useContext, useState } from 'react';

interface UIContextType {
  isAddMethodModalOpen: boolean;
  openAddMethodModal: () => void;
  closeAddMethodModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAddMethodModalOpen, setIsAddMethodModalOpen] = useState(false);

  const openAddMethodModal = () => setIsAddMethodModalOpen(true);
  const closeAddMethodModal = () => setIsAddMethodModalOpen(false);

  return (
    <UIContext.Provider value={{ isAddMethodModalOpen, openAddMethodModal, closeAddMethodModal }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
