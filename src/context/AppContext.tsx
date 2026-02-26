import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContentData {
  [key: string]: string;
}

interface AppContextType {
  editMode: boolean;
  toggleEditMode: () => void;
  contentData: ContentData;
  updateContent: (key: string, value: string) => void;
  saveContent: () => Promise<void>;
  isSaving: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Initial mock data
  const [contentData, setContentData] = useState<ContentData>({
    'home-title': 'Bem-vindo ao Programa de Residência Multiprofissional',
    'home-body': 'Este é o portal de Gestão de Políticas Públicas para a Saúde. Navegue pelo menu lateral para acessar os módulos.',
    'diag-title': 'Diagnóstico Situacional',
    'diag-body': 'O diagnóstico situacional é o primeiro passo para o planejamento em saúde. Ele permite conhecer a realidade local, identificar problemas e prioridades.',
    'ferr-title': 'Ferramentas de Gestão',
    'ferr-body': 'Conheça e aplique ferramentas como PDCA, Matriz SWOT e Diagrama de Ishikawa para melhorar os processos de trabalho.',
    'ferr-doc-title': 'Ferramentas Documentais',
    'ferr-doc-body': 'Para um gestor da SES-DF, o repertório de ferramentas documentais é o que dá legalidade e direção técnica ao trabalho. Enquanto as ferramentas de gestão (SWOT, PDCA) são o "como fazer", estes documentos são o "o que deve ser feito" e "com quais recursos".',
    'plano-title': 'Plano de Ação',
    'plano-body': 'Elabore planos de ação estruturados (ex: 5W2H) para intervir nos problemas identificados no diagnóstico.'
  });

  const toggleEditMode = () => setEditMode(!editMode);

  const updateContent = (key: string, value: string) => {
    setContentData(prev => ({ ...prev, [key]: value }));
  };

  const saveContent = async () => {
    setIsSaving(true);
    // Simulate API call to Google Apps Script / Google Sheets
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Dados salvos com sucesso:', contentData);
    setIsSaving(false);
    setEditMode(false);
    alert('Conteúdo salvo com sucesso! (Simulação)');
  };

  return (
    <AppContext.Provider value={{ editMode, toggleEditMode, contentData, updateContent, saveContent, isSaving }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
