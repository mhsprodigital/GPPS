import React, { useState } from 'react';
import { EditableBlock } from '../components/EditableBlock';
import { Compass, Search, ListOrdered, PlaySquare, GitMerge, ShieldAlert, ChevronRight } from 'lucide-react';

const categories = [
  {
    id: 'planejamento',
    title: 'Planejamento e Diagnóstico',
    description: 'Entender o cenário atual antes de tomar grandes decisões.',
    icon: Compass,
    color: 'sky',
    tools: [
      { name: 'Matriz SWOT (FOFA)', desc: 'Analisa as Forças e Fraquezas (ambiente interno) e Oportunidades e Ameaças (ambiente externo). No SUS, ajuda a entender o potencial de uma unidade frente às demandas do território.' },
      { name: 'Análise PESTEL', desc: 'Avalia fatores Políticos, Econômicos, Sociais, Tecnológicos, Ecológicos e Legais que podem afetar o sistema de saúde.' },
      { name: 'Balanced Scorecard (BSC)', desc: 'Metodologia de medição e gestão de desempenho que vai além dos dados financeiros, focando também no usuário/paciente, nos processos internos e no aprendizado/crescimento da equipe.' }
    ]
  },
  {
    id: 'causas',
    title: 'Análise de Causas',
    description: 'Tratar a raiz do problema, não apenas o "sintoma".',
    icon: Search,
    color: 'teal',
    tools: [
      { name: 'Diagrama de Ishikawa', desc: 'Organiza as causas de um problema em 6 categorias (6M): Método, Máquina, Medida, Meio Ambiente, Mão de Obra e Material.' },
      { name: 'Os 5 Porquês', desc: 'Técnica de repetir a pergunta "Por quê?" até encontrar a causa fundamental de uma falha.' },
      { name: 'Árvore de Problemas', desc: 'Uma representação visual onde o tronco é o problema central, as raízes são as causas e os galhos são os efeitos/consequências.' },
      { name: 'Análise de Pareto (80/20)', desc: 'Mostra que 80% dos problemas geralmente vêm de 20% das causas. Essencial para priorizar onde investir energia.' }
    ]
  },
  {
    id: 'priorizacao',
    title: 'Priorização',
    description: 'Decidir o que fazer primeiro com recursos limitados.',
    icon: ListOrdered,
    color: 'emerald',
    tools: [
      { name: 'Matriz GUT', desc: 'Prioriza problemas com base em Gravidade, Urgência e Tendência.' },
      { name: 'Matriz de Eisenhower', desc: 'Classifica tarefas entre Urgente/Não Urgente e Importante/Não Importante para ajudar na gestão do tempo do gestor.' },
      { name: 'Matriz de Impacto x Esforço', desc: 'Ajuda a escolher as ações que trazem o maior resultado com o menor esforço ou custo operacional.' }
    ]
  },
  {
    id: 'execucao',
    title: 'Execução e Planos',
    description: 'Garantir que o que foi planejado seja executado e monitorado.',
    icon: PlaySquare,
    color: 'indigo',
    tools: [
      { name: '5W2H', desc: 'Um checklist administrativo de sete perguntas (O que, Por que, Onde, Quando, Quem, Como e Quanto custa) que compõe um plano de ação completo.' },
      { name: 'Ciclo PDCA', desc: 'Método iterativo de gestão que foca na melhoria contínua dos processos.' },
      { name: 'Método OKR', desc: 'Define objetivos ambiciosos e resultados-chave mensuráveis para alinhar o foco da equipe.' }
    ]
  },
  {
    id: 'processos',
    title: 'Processos e Operação',
    description: 'Reduzir desperdícios e aumentar a agilidade no atendimento.',
    icon: GitMerge,
    color: 'orange',
    tools: [
      { name: 'SIPOC', desc: 'Mapeia o fluxo macro de um processo (Fornecedores, Entradas, Processo, Saídas e Clientes).' },
      { name: 'Kanban', desc: 'Sistema visual (geralmente cartões ou quadros) para gerenciar o fluxo de trabalho e evitar sobrecarga em etapas do atendimento.' },
      { name: 'Fluxograma', desc: 'Representação gráfica das etapas de um processo, facilitando a identificação de gargalos e passos desnecessários.' },
      { name: 'Matriz RACI', desc: 'Define quem é o Responsável, a quem se deve prestar Contas, quem deve ser Consultado e quem deve ser Informado sobre cada tarefa.' }
    ]
  },
  {
    id: 'riscos',
    title: 'Riscos e Qualidade',
    description: 'Essenciais em ambientes hospitalares onde o erro pode ser fatal.',
    icon: ShieldAlert,
    color: 'rose',
    tools: [
      { name: 'FMEA', desc: 'Identifica preventivamente onde um processo de saúde pode falhar e qual o impacto dessa falha no paciente.' },
      { name: 'Protocolo de Londres', desc: 'Ferramenta para investigação de incidentes clínicos, focando em fatores organizacionais e não apenas no erro individual.' },
      { name: '5S', desc: 'Metodologia para organização do ambiente de trabalho (Utilização, Ordenação, Limpeza, Padronização e Disciplina).' }
    ]
  }
];

export const Ferramentas: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const currentCategory = categories.find(c => c.id === activeCategory) || categories[0];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <EditableBlock 
          contentKey="ferr-title" 
          as="h1" 
          className="text-3xl font-bold text-gray-900 mb-4" 
        />
        <div className="prose prose-teal max-w-none text-gray-600">
          <p>
            Este é um acervo de ferramentas de gestão indispensáveis para o repertório do Residente que pretende atuar na gestão pública e de saúde. Elas estão organizadas por finalidade, facilitando a escolha da ferramenta certa para cada desafio.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Categories */}
        <div className="lg:w-1/3 space-y-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            // Dynamic color classes based on the category's color property
            const colorMap: Record<string, { bg: string, text: string, border: string, activeBg: string, activeText: string }> = {
              sky: { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200', activeBg: 'bg-sky-600', activeText: 'text-white' },
              teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', activeBg: 'bg-teal-600', activeText: 'text-white' },
              emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', activeBg: 'bg-emerald-600', activeText: 'text-white' },
              indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', activeBg: 'bg-indigo-600', activeText: 'text-white' },
              orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', activeBg: 'bg-orange-600', activeText: 'text-white' },
              rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', activeBg: 'bg-rose-600', activeText: 'text-white' },
            };
            
            const colors = colorMap[category.color];

            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                  isActive 
                    ? `${colors.activeBg} ${colors.activeText} shadow-md border-transparent` 
                    : `bg-white text-gray-700 hover:${colors.bg} border-gray-200 hover:${colors.border}`
                }`}
              >
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg mr-3 ${isActive ? 'bg-white/20' : colors.bg + ' ' + colors.text}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">{category.title}</h3>
                  </div>
                </div>
                <ChevronRight size={18} className={`transition-transform ${isActive ? 'translate-x-1 opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 h-full animate-in fade-in duration-300">
            <div className="flex items-center mb-2">
              <div className={`p-3 rounded-xl mr-4 bg-${currentCategory.color}-100 text-${currentCategory.color}-600`}>
                <currentCategory.icon size={28} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">{currentCategory.title}</h2>
            </div>
            <p className="text-gray-600 mb-8 pb-6 border-b border-gray-100">
              {currentCategory.description}
            </p>

            <div className="space-y-6">
              {currentCategory.tools.map((tool, index) => (
                <div key={index} className="group">
                  <h3 className={`text-lg font-semibold mb-2 flex items-center text-${currentCategory.color}-700`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current mr-2 opacity-70"></span>
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 pl-3.5 border-l-2 border-gray-100 group-hover:border-gray-300 transition-colors">
                    {tool.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
