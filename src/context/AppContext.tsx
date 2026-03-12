import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ContentData {
  [key: string]: string;
}

export interface UpdateRecord {
  date: string;
  name: string;
  matricula: string;
}

export interface ActivityData {
  id: string;
  descricao: string;
  ferramentaGestao: string;
}

export interface ScenarioData {
  id: string;
  title: string;
  activities: ActivityData[];
  ferramentasApoio: string;
  referencias: string;
  lastUpdate?: UpdateRecord;
}

interface AppContextType {
  editMode: boolean;
  toggleEditMode: () => void;
  contentData: ContentData;
  updateContent: (key: string, value: string) => void;
  saveContent: () => Promise<void>;
  isSaving: boolean;
  scenarios: ScenarioData[];
  updateScenario: (id: string, data: Partial<ScenarioData>, updaterName: string, updaterMatricula: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const scenarioNames = [
  'GEAQAPS', 'GSAP', 'GPMA HOSPITALAR', 'FARMÁCIA UBS 1 DE VP', 
  'DIPLAN', 'GEROE', 'NQSP', 'GSAS', 'GAPAPS', 'DIRASE', 
  'GENF DIRAPS', 'NHEP', 'ASPLAN', 'DA'
];

const initialScenarios: ScenarioData[] = scenarioNames.map((name, index) => ({
  id: `cenario-${index + 1}`,
  title: name,
  ferramentasApoio: '',
  referencias: '',
  activities: [
    {
      id: `act-${Math.random().toString(36).substring(2, 9)}`,
      descricao: '',
      ferramentaGestao: ''
    }
  ]
}));

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [scenarios, setScenarios] = useState<ScenarioData[]>(initialScenarios);
  
  const scriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;

  // Load data on mount
  useEffect(() => {
    if (scriptUrl) {
      fetch(scriptUrl)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            // Merge fetched data with initial scenarios to ensure all scenarios exist
            setScenarios(prev => prev.map(p => {
              const fetched = data.find((d: any) => d.id === p.id);
              return fetched ? { ...p, ...fetched } : p;
            }));
          }
        })
        .catch(err => console.error('Error fetching scenarios from Google Sheets:', err));
    }
  }, [scriptUrl]);

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
    'comp-title': 'Competências PPP',
    'comp-body': 'Selecione um cenário de prática para visualizar e editar as atividades, ferramentas e referências associadas em formato de tabela.'
  });

  const toggleEditMode = () => setEditMode(!editMode);

  const updateContent = (key: string, value: string) => {
    setContentData(prev => ({ ...prev, [key]: value }));
  };

  const updateScenario = async (id: string, data: Partial<ScenarioData>, updaterName: string, updaterMatricula: string) => {
    const updateDate = new Date().toISOString();
    
    // Optimistic update
    setScenarios(prev => prev.map(scenario => {
      if (scenario.id === id) {
        return {
          ...scenario,
          ...data,
          lastUpdate: {
            date: updateDate,
            name: updaterName,
            matricula: updaterMatricula
          }
        };
      }
      return scenario;
    }));

    if (scriptUrl) {
      const scenarioToSave = scenarios.find(s => s.id === id);
      const payload = {
        ...scenarioToSave,
        ...data,
        updaterName,
        updaterMatricula,
        updateDate
      };

      try {
        await fetch(scriptUrl, {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'text/plain;charset=utf-8', // Important for Google Apps Script CORS
          }
        });
      } catch (error) {
        console.error('Error saving to Google Sheets:', error);
        alert('Erro ao salvar na planilha. Verifique a conexão.');
      }
    }
  };

  const saveContent = async () => {
    setIsSaving(true);
    // Simulate API call to Google Apps Script / Google Sheets
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Dados salvos com sucesso:', contentData, scenarios);
    setIsSaving(false);
    setEditMode(false);
    alert('Conteúdo salvo com sucesso! (Simulação)');
  };

  return (
    <AppContext.Provider value={{ editMode, toggleEditMode, contentData, updateContent, saveContent, isSaving, scenarios, updateScenario }}>
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
