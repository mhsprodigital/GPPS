import React, { useState, useRef } from 'react';
import { EditableBlock } from '../components/EditableBlock';
import { useAppContext, ScenarioData, ActivityData } from '../context/AppContext';
import { X, Printer, Save, AlertCircle, Building2, ChevronRight, Plus, Trash2, Edit3 } from 'lucide-react';

export const CompetenciasPPP: React.FC = () => {
  const { scenarios, updateScenario } = useAppContext();
  const [selectedScenario, setSelectedScenario] = useState<ScenarioData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state for editing in modal
  const [editActivities, setEditActivities] = useState<ActivityData[]>([]);
  const [editFerramentasApoio, setEditFerramentasApoio] = useState('');
  const [editReferencias, setEditReferencias] = useState('');
  const [updaterName, setUpdaterName] = useState('');
  const [updaterMatricula, setUpdaterMatricula] = useState('');
  const [showError, setShowError] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = (scenario: ScenarioData) => {
    setSelectedScenario(scenario);
    setEditActivities(
      scenario.activities && scenario.activities.length > 0 
        ? [...scenario.activities] 
        : [{
            id: `act-${Math.random().toString(36).substring(2, 9)}`,
            descricao: '',
            ferramentaGestao: ''
          }]
    );
    setEditFerramentasApoio(scenario.ferramentasApoio || '');
    setEditReferencias(scenario.referencias || '');
    setUpdaterName('');
    setUpdaterMatricula('');
    setShowError(false);
    setIsEditing(false); // Always open in view mode
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedScenario(null);
    setIsEditing(false);
  };

  const handleAddActivity = () => {
    setEditActivities([
      ...editActivities,
      {
        id: `act-${Math.random().toString(36).substring(2, 9)}`,
        descricao: '',
        ferramentaGestao: ''
      }
    ]);
  };

  const handleUpdateActivity = (id: string, field: keyof ActivityData, value: string) => {
    setEditActivities(editActivities.map(act => 
      act.id === id ? { ...act, [field]: value } : act
    ));
  };

  const handleRemoveActivity = (id: string) => {
    setEditActivities(editActivities.filter(act => act.id !== id));
  };

  const handleSave = () => {
    if (!selectedScenario) return;

    if (!updaterName.trim() || !updaterMatricula.trim()) {
      setShowError(true);
      return;
    }

    updateScenario(
      selectedScenario.id, 
      { 
        activities: editActivities,
        ferramentasApoio: editFerramentasApoio,
        referencias: editReferencias
      }, 
      updaterName, 
      updaterMatricula
    );
    
    // Update local selected scenario to reflect changes immediately in view mode
    setSelectedScenario({
      ...selectedScenario,
      activities: editActivities,
      ferramentasApoio: editFerramentasApoio,
      referencias: editReferencias,
      lastUpdate: {
        date: new Date().toISOString(),
        name: updaterName,
        matricula: updaterMatricula
      }
    });

    setIsEditing(false);
  };

  const handlePrint = () => {
    if (!selectedScenario) return;
    
    const rows = (isEditing ? editActivities : selectedScenario.activities).map(act => `
      <tr>
        <td style="padding: 10px; border: 1px solid #e2e8f0; vertical-align: top;">${act.descricao.replace(/\n/g, '<br>')}</td>
        <td style="padding: 10px; border: 1px solid #e2e8f0; vertical-align: top;">${act.ferramentaGestao.replace(/\n/g, '<br>')}</td>
      </tr>
    `).join('');

    const ferramentasApoio = isEditing ? editFerramentasApoio : selectedScenario.ferramentasApoio;
    const referencias = isEditing ? editReferencias : selectedScenario.referencias;

    const printContent = `
      <html>
        <head>
          <title>Relatório - ${selectedScenario.title}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; }
            h1 { color: #0f766e; border-bottom: 2px solid #0f766e; padding-bottom: 10px; }
            h2 { color: #0f766e; margin-top: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 14px; }
            th { background-color: #f0fdfa; color: #0f766e; padding: 12px 10px; border: 1px solid #e2e8f0; text-align: left; }
            .section { margin-top: 30px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; }
            .section h3 { color: #0f766e; margin-top: 0; }
            .footer { margin-top: 40px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px; }
          </style>
        </head>
        <body>
          <h1>Relatório de Competências PPP</h1>
          <h2>Cenário: ${selectedScenario.title}</h2>
          
          <table>
            <thead>
              <tr>
                <th style="width: 50%;">Atividade Desenvolvida</th>
                <th style="width: 50%;">Ferramenta de Gestão</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>

          <div class="section">
            <h3>Ferramentas de Apoio (Geral)</h3>
            <div>${ferramentasApoio?.replace(/\n/g, '<br>') || 'Não preenchido.'}</div>
          </div>

          <div class="section">
            <h3>Referências Bibliográficas (Geral)</h3>
            <div>${referencias?.replace(/\n/g, '<br>') || 'Não preenchido.'}</div>
          </div>

          <div class="footer">
            Gerado em: ${new Date().toLocaleString('pt-BR')}
            ${selectedScenario.lastUpdate ? `<br>Última atualização por: ${selectedScenario.lastUpdate.name} (Matrícula: ${selectedScenario.lastUpdate.matricula}) em ${new Date(selectedScenario.lastUpdate.date).toLocaleString('pt-BR')}` : ''}
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <EditableBlock 
          contentKey="comp-title" 
          as="h1" 
          className="text-3xl font-bold text-gray-900 mb-4" 
        />
        <div className="prose prose-teal max-w-none text-gray-600">
          <EditableBlock 
            contentKey="comp-body" 
            as="p" 
            className="" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((scenario) => (
          <button
            key={scenario.id}
            onClick={() => handleOpenModal(scenario)}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-teal-300 hover:shadow-md transition-all duration-200 text-left group flex flex-col h-full"
          >
            <div className="flex items-start w-full mb-4">
              <div className="bg-teal-50 p-3 rounded-xl text-teal-600 mr-4 group-hover:bg-teal-100 transition-colors">
                <Building2 size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-teal-700 transition-colors flex-1">
                {scenario.title}
              </h3>
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-50 w-full flex items-center justify-between">
              {scenario.lastUpdate ? (
                <p className="text-xs text-gray-500 flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  Atualizado em {new Date(scenario.lastUpdate.date).toLocaleDateString('pt-BR')}
                </p>
              ) : (
                <p className="text-xs text-gray-400">Sem atualizações</p>
              )}
              <ChevronRight className="text-gray-300 group-hover:text-teal-500 transition-colors" size={18} />
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedScenario && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[95vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Building2 className="mr-3 text-teal-600" />
                  {selectedScenario.title}
                </h2>
                {selectedScenario.lastUpdate && !isEditing && (
                  <p className="text-sm text-gray-500 mt-1 ml-9">
                    Última atualização por <span className="font-medium">{selectedScenario.lastUpdate.name}</span> em {new Date(selectedScenario.lastUpdate.date).toLocaleDateString('pt-BR')}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {!isEditing && (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors flex items-center font-medium"
                  >
                    <Edit3 size={20} className="mr-2" />
                    Editar
                  </button>
                )}
                <button 
                  onClick={handlePrint}
                  className="p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors flex items-center"
                  title="Imprimir Relatório"
                >
                  <Printer size={20} />
                  <span className="ml-2 hidden sm:inline text-sm font-medium">Imprimir</span>
                </button>
                <button 
                  onClick={handleCloseModal}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1" ref={printRef}>
              
              {!isEditing ? (
                /* VIEW MODE */
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-teal-800 mb-4">Atividades e Ferramentas de Gestão</h3>
                    <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-teal-50 border-b border-teal-100 text-teal-800">
                            <th className="p-4 font-semibold w-1/2">Atividade Desenvolvida</th>
                            <th className="p-4 font-semibold w-1/2">Ferramenta de Gestão</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {selectedScenario.activities.map((act, idx) => (
                            <tr key={act.id || idx} className="hover:bg-gray-50 transition-colors">
                              <td className="p-4 align-top whitespace-pre-wrap text-gray-700">{act.descricao || '-'}</td>
                              <td className="p-4 align-top whitespace-pre-wrap text-gray-700">{act.ferramentaGestao || '-'}</td>
                            </tr>
                          ))}
                          {(!selectedScenario.activities || selectedScenario.activities.length === 0) && (
                            <tr>
                              <td colSpan={2} className="p-4 text-center text-gray-500">Nenhuma atividade cadastrada.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-sky-50 p-5 rounded-xl border border-sky-100">
                      <h3 className="text-md font-semibold text-sky-800 mb-3">Ferramentas de Apoio (Geral)</h3>
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedScenario.ferramentasApoio || 'Não preenchido.'}</p>
                    </div>
                    <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                      <h3 className="text-md font-semibold text-indigo-800 mb-3">Referências Bibliográficas (Geral)</h3>
                      <p className="text-gray-700 whitespace-pre-wrap">{selectedScenario.referencias || 'Não preenchido.'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                /* EDIT MODE */
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-xl flex items-start">
                    <AlertCircle className="mr-3 mt-0.5 flex-shrink-0" size={20} />
                    <p className="text-sm">Você está no <strong>Modo de Edição</strong>. Faça as alterações necessárias abaixo e preencha seus dados no final para salvar.</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-teal-800 mb-4">Atividades e Ferramentas de Gestão</h3>
                    <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="bg-teal-50 border-b border-teal-100 text-teal-800">
                            <th className="p-4 font-semibold w-[45%]">Atividade Desenvolvida</th>
                            <th className="p-4 font-semibold w-[45%]">Ferramenta de Gestão</th>
                            <th className="p-4 font-semibold w-[10%] text-center">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {editActivities.map((act) => (
                            <tr key={act.id} className="hover:bg-gray-50 transition-colors group">
                              <td className="p-3 align-top">
                                <textarea
                                  value={act.descricao}
                                  onChange={(e) => handleUpdateActivity(act.id, 'descricao', e.target.value)}
                                  className="w-full p-2 border border-transparent hover:border-gray-200 focus:border-teal-500 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white bg-transparent min-h-[80px] resize-y text-sm transition-all"
                                  placeholder="Descreva a atividade..."
                                />
                              </td>
                              <td className="p-3 align-top">
                                <textarea
                                  value={act.ferramentaGestao}
                                  onChange={(e) => handleUpdateActivity(act.id, 'ferramentaGestao', e.target.value)}
                                  className="w-full p-2 border border-transparent hover:border-gray-200 focus:border-teal-500 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white bg-transparent min-h-[80px] resize-y text-sm transition-all"
                                  placeholder="Ex: PDCA, SWOT..."
                                />
                              </td>
                              <td className="p-3 align-top text-center">
                                <button 
                                  onClick={() => handleRemoveActivity(act.id)}
                                  className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all mt-1 opacity-0 group-hover:opacity-100 focus:opacity-100"
                                  title="Remover atividade"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <button 
                      onClick={handleAddActivity}
                      className="mt-3 flex items-center text-teal-600 hover:text-teal-800 font-medium text-sm px-4 py-2 hover:bg-teal-50 rounded-lg transition-colors"
                    >
                      <Plus size={16} className="mr-2" /> 
                      Adicionar Nova Atividade
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Ferramentas de Apoio (Geral para o Cenário)</label>
                      <textarea
                        value={editFerramentasApoio}
                        onChange={(e) => setEditFerramentasApoio(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent min-h-[120px] resize-y"
                        placeholder="Liste as ferramentas de apoio que se aplicam a este cenário..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">Referências Bibliográficas (Geral para o Cenário)</label>
                      <textarea
                        value={editReferencias}
                        onChange={(e) => setEditReferencias(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent min-h-[120px] resize-y"
                        placeholder="Liste as referências..."
                      />
                    </div>
                  </div>

                  {/* Update Registration Form */}
                  <div className="p-5 bg-teal-50 border border-teal-100 rounded-xl">
                    <h4 className="text-sm font-semibold text-teal-800 mb-3 flex items-center">
                      <AlertCircle size={16} className="mr-2" />
                      Registro de Atualização
                    </h4>
                    <p className="text-xs text-teal-600 mb-4">
                      Para salvar as alterações, é obrigatório informar seu nome e matrícula.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Seu Nome Completo"
                          value={updaterName}
                          onChange={(e) => setUpdaterName(e.target.value)}
                          className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm ${showError && !updaterName.trim() ? 'border-red-300 bg-red-50' : 'border-teal-200'}`}
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Sua Matrícula"
                          value={updaterMatricula}
                          onChange={(e) => setUpdaterMatricula(e.target.value)}
                          className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm ${showError && !updaterMatricula.trim() ? 'border-red-300 bg-red-50' : 'border-teal-200'}`}
                        />
                      </div>
                    </div>
                    {showError && (
                      <p className="text-red-500 text-xs mt-2">Por favor, preencha nome e matrícula para salvar.</p>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            {isEditing && (
              <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 text-gray-600 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancelar Edição
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-teal-600 text-white rounded-xl hover:bg-teal-700 font-medium transition-colors flex items-center shadow-sm"
                >
                  <Save size={18} className="mr-2" />
                  Salvar Alterações
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};
