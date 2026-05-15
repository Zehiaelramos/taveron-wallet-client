import React, { createContext, useContext, useState } from 'react';

interface UIContextType {
  isAddMethodModalOpen: boolean;
  openAddMethodModal: () => void;
  closeAddMethodModal: () => void;
  selectedMethodId: number | null;
  openMethodDetails: (id: number) => void;
  closeMethodDetails: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAddMethodModalOpen, setIsAddMethodModalOpen] = useState(false);
  const [selectedMethodId, setSelectedMethodId] = useState<number | null>(null);

  const openAddMethodModal = () => setIsAddMethodModalOpen(true);
  const closeAddMethodModal = () => setIsAddMethodModalOpen(false);

  const openMethodDetails = (id: number) => setSelectedMethodId(id);
  const closeMethodDetails = () => setSelectedMethodId(null);

  return (
    <UIContext.Provider value={{ 
      isAddMethodModalOpen, 
      openAddMethodModal, 
      closeAddMethodModal,
      selectedMethodId,
      openMethodDetails,
      closeMethodDetails
    }}>
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
