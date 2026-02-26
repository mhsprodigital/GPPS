import React, { useState } from 'react';
import { EditableBlock } from '../components/EditableBlock';
import { Search, Map, ListChecks, BarChart2, Database, ExternalLink, ChevronRight, Info } from 'lucide-react';

export const Diagnostico: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'conceito' | 'passos' | 'indicadores' | 'fontes'>('conceito');

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <EditableBlock 
          contentKey="diag-title" 
          as="h1" 
          className="text-3xl font-bold text-gray-900 mb-4" 
        />
        <div className="prose prose-teal max-w-none text-gray-600">
          <p>
            O <strong>diagnóstico situacional</strong> é uma tecnologia essencial para identificar as características de um território e a situação de saúde de sua população, considerando as vulnerabilidades locais. Ele serve como insumo fundamental para o ciclo de planejamento, permitindo mapear problemas prioritários, propor intervenções factíveis e fortalecer a Rede de Atenção à Saúde (RAS).
          </p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
        <button
          onClick={() => setActiveTab('conceito')}
          className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
            activeTab === 'conceito' ? 'bg-teal-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-teal-50 border border-gray-200'
          }`}
        >
          <Map className="mr-2" size={18} />
          Território do DF
        </button>
        <button
          onClick={() => setActiveTab('passos')}
          className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
            activeTab === 'passos' ? 'bg-teal-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-teal-50 border border-gray-200'
          }`}
        >
          <ListChecks className="mr-2" size={18} />
          Passo a Passo
        </button>
        <button
          onClick={() => setActiveTab('indicadores')}
          className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
            activeTab === 'indicadores' ? 'bg-teal-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-teal-50 border border-gray-200'
          }`}
        >
          <BarChart2 className="mr-2" size={18} />
          Indicadores
        </button>
        <button
          onClick={() => setActiveTab('fontes')}
          className={`flex items-center px-4 py-3 rounded-xl font-medium text-sm whitespace-nowrap transition-colors ${
            activeTab === 'fontes' ? 'bg-teal-600 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-teal-50 border border-gray-200'
          }`}
        >
          <Database className="mr-2" size={18} />
          Fontes de Dados
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[400px]">
        
        {/* CONCEITO & TERRITÓRIO */}
        {activeTab === 'conceito' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-semibold text-teal-800 flex items-center border-b pb-2">
              <Map className="mr-2 text-teal-600" />
              Como se organiza o território da saúde no DF?
            </h2>
            <p className="text-gray-600">
              Para realizar um diagnóstico, o residente deve compreender a divisão administrativa e assistencial do Distrito Federal:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                <h3 className="font-bold text-sky-800 mb-2">Divisão Administrativa</h3>
                <p className="text-sm text-sky-700">O DF possui <strong>35 Regiões Administrativas (RAs)</strong>.</p>
              </div>
              <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
                <h3 className="font-bold text-teal-800 mb-2">Regiões de Saúde</h3>
                <p className="text-sm text-teal-700">São <strong>7 regiões</strong> que agrupam as RAs para organização da assistência.</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                <h3 className="font-bold text-emerald-800 mb-2">Macrorregiões de Saúde</h3>
                <p className="text-sm text-emerald-700">O DF é dividido em <strong>3 Macrorregiões</strong> para fins de planejamento regional integrado.</p>
              </div>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 mt-4">
              <h4 className="font-semibold text-gray-800 mb-3">Detalhamento das Macrorregiões:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><ChevronRight size={16} className="text-teal-500 mr-2" /> <strong>Macrorregião 1:</strong> Regiões Oeste e Sudoeste.</li>
                <li className="flex items-center"><ChevronRight size={16} className="text-teal-500 mr-2" /> <strong>Macrorregião 2:</strong> Regiões Sul, Centro-Sul e Central.</li>
                <li className="flex items-center"><ChevronRight size={16} className="text-teal-500 mr-2" /> <strong>Macrorregião 3:</strong> Regiões Norte e Leste.</li>
              </ul>
            </div>

            <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start">
              <Info className="text-amber-600 mr-3 mt-1 flex-shrink-0" size={20} />
              <div>
                <h4 className="font-semibold text-amber-800">Conclusão e Plano de Ação</h4>
                <p className="text-sm text-amber-700 mt-1">
                  Após compilar as informações, o residente deve realizar uma análise crítica para identificar os problemas prioritários. O diagnóstico só é efetivo se resultar na elaboração de um plano de ação com metas realistas e cronogramas para enfrentar os desafios identificados na região.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* PASSO A PASSO */}
        {activeTab === 'passos' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-semibold text-teal-800 flex items-center border-b pb-2">
              <ListChecks className="mr-2 text-teal-600" />
              Passo a Passo: Como elaborar um Diagnóstico Situacional
            </h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-lg">1</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Planejamento e Territorialização</h3>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc list-inside">
                    <li><strong>Pesquisa Documental:</strong> Analisar legislações vigentes, mapas e atas de reuniões anteriores.</li>
                    <li><strong>Visita ao Território:</strong> Reconhecimento in loco para identificar barreiras geográficas, riscos ambientais, mobilidade e equipamentos sociais.</li>
                    <li><strong>Mapeamento:</strong> Construir mapa geográfico (delimitação) e mapa vivo (registro dinâmico de grupos prioritários).</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold text-lg">2</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Análise do Panorama Sociodemográfico</h3>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc list-inside">
                    <li><strong>População Residente:</strong> Quantitativo de habitantes e densidade demográfica.</li>
                    <li><strong>SUS Dependência:</strong> Percentual sem plano privado (no DF, menor renda = maior dependência).</li>
                    <li><strong>Pirâmide Etária:</strong> Perfil de idade e sexo para prever necessidades.</li>
                    <li><strong>Indicadores Sociais:</strong> Renda domiciliar per capita e níveis de escolaridade.</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg">3</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Análise do Panorama Epidemiológico</h3>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc list-inside">
                    <li><strong>Natalidade:</strong> Nascidos vivos e condições de nascimento.</li>
                    <li><strong>Morbidade:</strong> Causas de internação (DCNT e Doenças Transmissíveis).</li>
                    <li><strong>Mortalidade:</strong> Taxas global, infantil e materna.</li>
                    <li><strong>Arboviroses:</strong> Incidência de Dengue, Zika e Chikungunya.</li>
                    <li><strong>Imunização:</strong> Cobertura vacinal da população-alvo.</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">4</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Avaliação da Rede de Serviços</h3>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc list-inside">
                    <li><strong>Capacidade Instalada:</strong> Mapear UBS, UPAs, Hospitais e Centros de Especialidade.</li>
                    <li><strong>Acesso e Demanda:</strong> Filas de espera e demanda oriunda da RIDE-DF.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* INDICADORES */}
        {activeTab === 'indicadores' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-semibold text-teal-800 flex items-center border-b pb-2">
              <BarChart2 className="mr-2 text-teal-600" />
              Indicadores Fundamentais para o Gestor
            </h2>
            <p className="text-gray-600 text-sm">
              Para a gestão de políticas públicas de saúde, o monitoramento de indicadores é fundamental para diagnosticar vulnerabilidades, planejar ações e avaliar o impacto das intervenções no território.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-sky-50 px-4 py-3 border-b border-sky-100">
                  <h3 className="font-semibold text-sky-800">A. Sociodemográficos</h3>
                </div>
                <div className="p-4 space-y-3 text-sm text-gray-600">
                  <p><strong>População Residente:</strong> Quantitativo total.</p>
                  <p><strong>Densidade Demográfica:</strong> Pessoas por km² e por domicílio.</p>
                  <p><strong>Dependência do SUS:</strong> % sem plano privado (áreas de menor renda &gt; 90%).</p>
                  <p><strong>Pirâmide Etária:</strong> Perfil por idade e sexo.</p>
                  <p><strong>Renda e Escolaridade:</strong> Preditores decisivos para mortalidade e doenças crônicas.</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-rose-50 px-4 py-3 border-b border-rose-100">
                  <h3 className="font-semibold text-rose-800">B. Epidemiológicos</h3>
                </div>
                <div className="p-4 space-y-3 text-sm text-gray-600">
                  <p><strong>Saúde Materno-Infantil:</strong> Nascidos vivos, partos normais, gravidez na adolescência.</p>
                  <p><strong>Morbidade:</strong> DCNT (diabetes, hipertensão) e Transmissíveis (TB, HIV, Sífilis).</p>
                  <p><strong>Arboviroses:</strong> Dengue, Zika, Chikungunya.</p>
                  <p><strong>Mortalidade:</strong> Global, infantil e materna.</p>
                  <p><strong>Imunização:</strong> Cobertura vacinal e homogeneidade.</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-100">
                  <h3 className="font-semibold text-emerald-800">C. Rede e Processos</h3>
                </div>
                <div className="p-4 space-y-3 text-sm text-gray-600">
                  <p><strong>Cobertura da APS:</strong> % de cobertura ESF, Saúde Bucal e NASF.</p>
                  <p><strong>Produção de Serviços:</strong> Volume de consultas e procedimentos.</p>
                  <p><strong>Regulação:</strong> Tamanho das filas por especialidades e tempo de resposta (ex: SAMU).</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FONTES DE DADOS */}
        {activeTab === 'fontes' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-semibold text-teal-800 flex items-center border-b pb-2">
              <Database className="mr-2 text-teal-600" />
              Ferramentas e Fontes de Dados
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Bases de consulta aberta recomendadas para a construção do diagnóstico situacional no DF e no Brasil.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* DF Sources */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-teal-500 rounded-full mr-2"></span>
                  Distrito Federal
                </h3>
                <ul className="space-y-4">
                  <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="font-semibold text-teal-700">Portal Infosaúde (SES-DF)</h4>
                    <p className="text-xs text-gray-600 mt-1 mb-2">Principal ferramenta de transparência da saúde no DF.</p>
                    <div className="flex flex-col space-y-1">
                      <a href="https://info.saude.df.gov.br/sala-de-situacao/" target="_blank" rel="noreferrer" className="text-xs text-sky-600 hover:underline flex items-center"><ExternalLink size={12} className="mr-1"/> Sala de Situação</a>
                      <a href="https://info.saude.df.gov.br/" target="_blank" rel="noreferrer" className="text-xs text-sky-600 hover:underline flex items-center"><ExternalLink size={12} className="mr-1"/> Projeção Populacional</a>
                      <a href="https://www.saude.df.gov.br/plano-distrital-de-saude" target="_blank" rel="noreferrer" className="text-xs text-sky-600 hover:underline flex items-center"><ExternalLink size={12} className="mr-1"/> Plano Distrital de Saúde</a>
                    </div>
                  </li>
                  <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="font-semibold text-teal-700">Geoportal (SEGETH)</h4>
                    <p className="text-xs text-gray-600 mt-1 mb-2">Mapa dinâmico com infraestrutura e dados espaciais.</p>
                    <a href="https://www.seduh.df.gov.br/w/geoportal" target="_blank" rel="noreferrer" className="text-xs text-sky-600 hover:underline flex items-center"><ExternalLink size={12} className="mr-1"/> Acesso ao Mapa</a>
                  </li>
                  <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="font-semibold text-teal-700">IPEDF (antiga CODEPLAN)</h4>
                    <p className="text-xs text-gray-600 mt-1 mb-2">Dados socioeconômicos e PDAD.</p>
                    <a href="http://www.codeplan.df.gov.br/pdad-2018/" target="_blank" rel="noreferrer" className="text-xs text-sky-600 hover:underline flex items-center"><ExternalLink size={12} className="mr-1"/> Portal de dados PDAD</a>
                  </li>
                  <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="font-semibold text-teal-700">Informes Epidemiológicos</h4>
                    <p className="text-xs text-gray-600 mt-1 mb-2">Boletins sobre doenças e agravos no DF.</p>
                    <a href="http://www.saude.df.gov.br/informes-epidemiologicos" target="_blank" rel="noreferrer" className="text-xs text-sky-600 hover:underline flex items-center"><ExternalLink size={12} className="mr-1"/> Acesso aos Informes</a>
                  </li>
                </ul>
              </div>

              {/* National Sources */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-6 bg-sky-500 rounded-full mr-2"></span>
                  Nacionais (Brasil)
                </h3>
                <ul className="space-y-4">
                  <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="font-semibold text-sky-700">SISAB & e-SUS APS</h4>
                    <p className="text-xs text-gray-600 mt-1 mb-2">Relatórios de produção, indicadores e coleta de dados.</p>
                    <div className="flex flex-col space-y-1">
                      <a href="https://sisab.saude.gov.br/" target="_blank" rel="noreferrer" className="text-xs text-sky-600 hover:underline flex items-center"><ExternalLink size={12} className="mr-1"/> SISAB</a>
                      <a href="http://aps.saude.gov.br" target="_blank" rel="noreferrer" className="text-xs text-sky-600 hover:underline flex items-center"><ExternalLink size={12} className="mr-1"/> e-SUS APS</a>
                    </div>
                  </li>
                  <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="font-semibold text-sky-700">CNES</h4>
                    <p className="text-xs text-gray-600 mt-1 mb-2">Base sobre a infraestrutura de saúde no país.</p>
                    <a href="http://cnes.datasus.gov.br/" target="_blank" rel="noreferrer" className="text-xs text-sky-600 hover:underline flex items-center"><ExternalLink size={12} className="mr-1"/> Acesso ao CNES</a>
                  </li>
                  <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="font-semibold text-sky-700">DATASUS / Tabnet</h4>
                    <p className="text-xs text-gray-600 mt-1 mb-2">Extração de dados de mortalidade (SIM), nascidos vivos (SINASC), etc.</p>
                    <a href="https://datasus.saude.gov.br/informacoes-de-saude-tabnet/" target="_blank" rel="noreferrer" className="text-xs text-sky-600 hover:underline flex items-center"><ExternalLink size={12} className="mr-1"/> Acesso ao Tabnet</a>
                  </li>
                  <li className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="font-semibold text-sky-700">Outras Fontes</h4>
                    <div className="flex flex-col space-y-1 mt-2">
                      <a href="https://www.ibge.gov.br" target="_blank" rel="noreferrer" className="text-xs text-sky-600 hover:underline flex items-center"><ExternalLink size={12} className="mr-1"/> IBGE (Estimativas populacionais)</a>
                      <a href="https://conjuntominimo.saude.gov.br/" target="_blank" rel="noreferrer" className="text-xs text-sky-600 hover:underline flex items-center"><ExternalLink size={12} className="mr-1"/> CMD (Conjunto Mínimo de Dados)</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

