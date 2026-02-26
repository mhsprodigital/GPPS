import React, { useState } from 'react';
import { EditableBlock } from '../components/EditableBlock';
import { FileSignature, Users, Network, FileBarChart, Settings, ChevronRight } from 'lucide-react';

const categories = [
  {
    id: 'acordos',
    title: 'Acordos de Resultados',
    description: 'O Coração da Gestão SES-DF. Instituídos pelo Decreto nº 37.515/2016, são os instrumentos que vinculam a autonomia do gestor ao cumprimento de metas.',
    icon: FileSignature,
    color: 'sky',
    tools: [
      { name: 'AGR (Acordo de Gestão Regional)', desc: 'Firmado entre a Administração Central (ADMC) e as Superintendências das Regiões de Saúde (ou URDs - Unidades de Referência Distrital). Define as metas macro da região para o período.' },
      { name: 'AGL (Acordo de Gestão Local)', desc: 'Desdobramento do AGR. É firmado entre a Superintendência e cada unidade específica (UBS, CAPS, Policlínica). É aqui que o gerente da unidade pactua os indicadores que sua equipe deve atingir.' },
      { name: 'Caderno de Indicadores e Metas', desc: 'Documento técnico que acompanha o AGR/AGL, detalhando como cada indicador (ex: taxa de cobertura vacinal, giro de leito) é calculado e qual a fonte de dados (SISREG, e-SUS).' }
    ]
  },
  {
    id: 'forca-trabalho',
    title: 'Gestão da Força de Trabalho',
    description: 'Documentos que orientam a alocação de pessoas e a carga horária no serviço público do DF.',
    icon: Users,
    color: 'teal',
    tools: [
      { name: 'Manual de Dimensionamento da Força de Trabalho (DFT)', desc: 'Guia oficial (baseado no Decreto nº 43.291/2022) que estabelece a metodologia para calcular o número ideal de servidores por unidade, cruzando carga horária e volume de entregas.' },
      { name: 'Manual de Parâmetros Mínimos para Dimensionamento', desc: 'Define o quantitativo padrão de profissionais por serviço na Rede SES-DF (ex: quantos enfermeiros por leito de UTI ou quantas equipes de ESF por habitante).' },
      { name: 'Escala de Serviço / TPC (Trabalho por Cota)', desc: 'Documentos operacionais de controle diário da força de trabalho, fundamentais para a transparência e legalidade do pagamento de horas extras ou produtividade.' }
    ]
  },
  {
    id: 'ordenacao',
    title: 'Ordenação da Rede e Clínica',
    description: 'Ferramentas que guiam como o paciente deve transitar pelo sistema (PlanificaSUS e Integração).',
    icon: Network,
    color: 'emerald',
    tools: [
      { name: 'Guia de Territorialização e Diagnóstico de Área (APS)', desc: 'O "mapa vivo" da unidade. Documento que descreve a população adscrita, áreas de risco geológico e social, e microáreas de atuação dos ACS.' },
      { name: 'Cadernos do PlanificaSUS', desc: 'Metodologia de organização das Redes de Atenção à Saúde (RAS). Orienta a organização do Fluxo de Atendimento e a transição do cuidado entre a UBS e o Hospital.' },
      { name: 'Notas Técnicas de Matriciamento', desc: 'Documentos que estabelecem o cronograma e o fluxo de suporte dos especialistas (Saúde Mental, Reabilitação) para as equipes da APS.' },
      { name: 'Protocolos Clínicos e Diretrizes Terapêuticas (PCDT)', desc: 'Padronizam o atendimento para doenças específicas no âmbito do DF, garantindo segurança jurídica e técnica ao profissional.' }
    ]
  },
  {
    id: 'planejamento',
    title: 'Planejamento e Prestação de Contas',
    description: 'Documentos obrigatórios por lei (Lei Complementar 141/2012) que todo gestor deve conhecer (Ciclo de Gestão).',
    icon: FileBarChart,
    color: 'indigo',
    tools: [
      { name: 'PES (Plano Estadual de Saúde)', desc: 'Planejamento estratégico de 4 anos da SES-DF.' },
      { name: 'PAS (Programação Anual de Saúde)', desc: 'Metas e orçamento detalhado para o ano vigente.' },
      { name: 'RDQA (Relatório Detalhado do Quadrimestre Anterior)', desc: 'Prestação de contas enviada à CLDF sobre metas e gastos.' },
      { name: 'RAG (Relatório Anual de Gestão)', desc: 'O balanço final do ano, confrontando o que foi planejado na PAS com o executado.' }
    ]
  },
  {
    id: 'apoio',
    title: 'Documentos de Apoio Operacional',
    description: 'Guias práticos para o funcionamento diário das unidades.',
    icon: Settings,
    color: 'orange',
    tools: [
      { name: 'POPs (Procedimentos Operacionais Padrão)', desc: 'O "passo a passo" técnico de cada tarefa dentro da unidade.' },
      { name: 'Regimento Interno da Unidade', desc: 'Define as competências de cada núcleo e gerência dentro da estrutura da SES-DF.' }
    ]
  }
];

export const FerramentasDocumentais: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const currentCategory = categories.find(c => c.id === activeCategory) || categories[0];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <EditableBlock 
          contentKey="ferr-doc-title" 
          as="h1" 
          className="text-3xl font-bold text-gray-900 mb-4" 
        />
        <div className="prose prose-teal max-w-none text-gray-600">
          <EditableBlock 
            contentKey="ferr-doc-body" 
            as="p" 
            className="" 
          />
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
