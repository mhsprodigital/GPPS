import React from 'react';
import { EditableBlock } from '../components/EditableBlock';
import { CheckSquare, ListTodo, Calendar, User } from 'lucide-react';

export const PlanoAcao: React.FC = () => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="border-l-4 border-emerald-500 pl-6 py-2">
        <EditableBlock 
          contentKey="plano-title" 
          as="h1" 
          className="text-3xl font-bold text-gray-900 mb-2" 
        />
        <EditableBlock 
          contentKey="plano-body" 
          as="p" 
          className="text-lg text-gray-600 max-w-2xl" 
        />
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h2 className="text-2xl font-semibold text-teal-800 mb-6 flex items-center">
          <ListTodo className="mr-3 text-teal-600" />
          Metodologia 5W2H
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 font-semibold text-gray-700">Letra</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Pergunta</th>
                <th className="py-3 px-4 font-semibold text-gray-700">Significado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-bold text-teal-700">W</td>
                <td className="py-3 px-4 text-gray-800">What?</td>
                <td className="py-3 px-4 text-gray-600">O que será feito? (Objetivo/Meta)</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-bold text-teal-700">W</td>
                <td className="py-3 px-4 text-gray-800">Why?</td>
                <td className="py-3 px-4 text-gray-600">Por que será feito? (Justificativa)</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-bold text-teal-700">W</td>
                <td className="py-3 px-4 text-gray-800">Where?</td>
                <td className="py-3 px-4 text-gray-600">Onde será feito? (Local)</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-bold text-teal-700">W</td>
                <td className="py-3 px-4 text-gray-800">When?</td>
                <td className="py-3 px-4 text-gray-600">Quando será feito? (Cronograma)</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-bold text-teal-700">W</td>
                <td className="py-3 px-4 text-gray-800">Who?</td>
                <td className="py-3 px-4 text-gray-600">Por quem será feito? (Responsável)</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-bold text-sky-600">H</td>
                <td className="py-3 px-4 text-gray-800">How?</td>
                <td className="py-3 px-4 text-gray-600">Como será feito? (Método)</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-bold text-sky-600">H</td>
                <td className="py-3 px-4 text-gray-800">How much?</td>
                <td className="py-3 px-4 text-gray-600">Quanto custará? (Orçamento)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
