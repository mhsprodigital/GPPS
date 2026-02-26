import React from 'react';
import { EditableBlock } from '../components/EditableBlock';
import { Activity, Users, FileText } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <EditableBlock 
          contentKey="home-title" 
          as="h1" 
          className="text-3xl md:text-4xl font-bold text-teal-900 mb-4 tracking-tight" 
        />
        <EditableBlock 
          contentKey="home-body" 
          as="p" 
          className="text-lg text-gray-600 leading-relaxed max-w-3xl" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4 text-sky-600">
            <Activity size={24} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Diagnóstico</h3>
          <p className="text-gray-600 text-sm">Análise situacional e levantamento de dados epidemiológicos.</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 text-teal-700">
            <Users size={24} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Gestão Participativa</h3>
          <p className="text-gray-600 text-sm">Ferramentas para engajamento da comunidade e controle social.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
            <FileText size={24} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Planejamento</h3>
          <p className="text-gray-600 text-sm">Elaboração de planos de ação baseados em evidências.</p>
        </div>
      </div>
    </div>
  );
};
