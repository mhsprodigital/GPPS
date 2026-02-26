import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Menu, X, Edit3, Save, Home, Activity, Wrench, FileText, CheckSquare } from 'lucide-react';

const menuItems = [
  { id: 'home', label: 'Início', path: '/', icon: Home },
  { id: 'diagnostico', label: 'Diagnóstico Situacional', path: '/diagnostico', icon: Activity },
  { id: 'ferramentas', label: 'Ferramentas de Gestão', path: '/ferramentas', icon: Wrench },
  { id: 'ferramentas-documentais', label: 'Ferramentas Documentais', path: '/ferramentas-documentais', icon: FileText },
  { id: 'plano', label: 'Plano de Ação', path: '/plano', icon: CheckSquare },
];

export const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { editMode, toggleEditMode, saveContent, isSaving } = useAppContext();
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      {/* Sidebar (Mobile Overlay) */}
      <div 
        className={`fixed inset-0 bg-gray-800/50 z-20 md:hidden transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-teal-900 text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} flex flex-col shadow-xl`}
      >
        <div className="flex items-center justify-between p-4 border-b border-teal-800">
          <h2 className="text-xl font-bold tracking-tight">Gestão em Saúde</h2>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden text-teal-200 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center px-4 py-3 mx-2 rounded-lg transition-colors ${isActive ? 'bg-teal-700 text-white font-medium' : 'text-teal-100 hover:bg-teal-800 hover:text-white'}`}
                  >
                    <Icon size={20} className="mr-3 opacity-80" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-teal-800 text-xs text-teal-300/60 text-center">
          Residência Multiprofissional
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 z-10">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center">
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="mr-4 text-gray-500 hover:text-teal-700 md:hidden"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-lg font-medium text-gray-700 hidden sm:block">
                Políticas Públicas para a Saúde
              </h1>
            </div>
            
            <div className="flex items-center space-x-3">
              {editMode ? (
                <button
                  onClick={saveContent}
                  disabled={isSaving}
                  className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-sm font-medium transition-colors shadow-sm disabled:opacity-70"
                >
                  <Save size={16} className="mr-2" />
                  {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                </button>
              ) : (
                <button
                  onClick={toggleEditMode}
                  className="flex items-center px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md text-sm font-medium transition-colors shadow-sm"
                >
                  <Edit3 size={16} className="mr-2" />
                  Editar Conteúdo
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
