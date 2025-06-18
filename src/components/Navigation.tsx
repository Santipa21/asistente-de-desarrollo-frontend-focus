import React from 'react';
import { Code2, Calendar, AlertTriangle, Terminal } from 'lucide-react';
import type { ActiveSection } from '../App';

interface NavigationProps {
  activeSection: ActiveSection;
  setActiveSection: (section: ActiveSection) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    {
      id: 'code' as ActiveSection,
      label: 'Asistente de Código',
      icon: Code2,
      description: 'Componentes, optimización y mejores prácticas'
    },
    {
      id: 'planner' as ActiveSection,
      label: 'Planificador de Tareas',
      icon: Calendar,
      description: 'Organización de trabajo y estructura de proyectos'
    },
    {
      id: 'problems' as ActiveSection,
      label: 'Resolución de Problemas',
      icon: AlertTriangle,
      description: 'Diagnóstico y solución de bugs técnicos'
    },
    {
      id: 'commands' as ActiveSection,
      label: 'Interfaz de Comandos',
      icon: Terminal,
      description: 'Comandos avanzados y automatización'
    }
  ];

  return (
    <nav className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700 p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`
                relative p-4 rounded-xl text-left transition-all duration-200
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105' 
                  : 'hover:bg-gray-700/50 text-gray-300 hover:scale-105 hover:text-white'
                }
              `}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-400'}`} />
                <span className="font-semibold text-sm">{item.label}</span>
              </div>
              <p className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-400'}`}>
                {item.description}
              </p>
              
              {isActive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;