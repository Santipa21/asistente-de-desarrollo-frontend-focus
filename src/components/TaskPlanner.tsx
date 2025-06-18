import React, { useState } from 'react';
import { Calendar, Plus, CheckSquare, Clock, User, Tag } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'in-progress' | 'done';
  assignee?: string;
  tags: string[];
}

const TaskPlanner: React.FC = () => {
  const [projectIdea, setProjectIdea] = useState('');
  const [generatedTasks, setGeneratedTasks] = useState<Task[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTasks = async () => {
    if (!projectIdea.trim()) return;
    
    setIsGenerating(true);
    
    // Simulación de generación de tareas
    setTimeout(() => {
      const tasks: Task[] = [
        {
          id: '1',
          title: 'Configurar estructura del proyecto',
          description: 'Crear carpetas, configurar TypeScript, ESLint y Prettier',
          priority: 'high',
          status: 'todo',
          tags: ['setup', 'config']
        },
        {
          id: '2',
          title: 'Crear componentes base',
          description: 'Header, Footer, Layout principal y navegación',
          priority: 'high',
          status: 'todo',
          tags: ['components', 'ui']
        },
        {
          id: '3',
          title: 'Implementar sistema de routing',
          description: 'Configurar React Router y rutas principales',
          priority: 'medium',
          status: 'todo',
          tags: ['routing', 'navigation']
        },
        {
          id: '4',
          title: 'Diseñar responsive layout',
          description: 'Implementar breakpoints y adaptabilidad mobile',
          priority: 'medium',
          status: 'todo',
          tags: ['responsive', 'css']
        },
        {
          id: '5',
          title: 'Configurar testing setup',
          description: 'Vitest, Testing Library y tests básicos',
          priority: 'low',
          status: 'todo',
          tags: ['testing', 'quality']
        }
      ];
      setGeneratedTasks(tasks);
      setIsGenerating(false);
    }, 2000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-900/50 text-red-300 border-red-700';
      case 'medium': return 'bg-yellow-900/50 text-yellow-300 border-yellow-700';
      case 'low': return 'bg-green-900/50 text-green-300 border-green-700';
      default: return 'bg-gray-900/50 text-gray-300 border-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'bg-gray-900/50 text-gray-300';
      case 'in-progress': return 'bg-blue-900/50 text-blue-300';
      case 'done': return 'bg-green-900/50 text-green-300';
      default: return 'bg-gray-900/50 text-gray-300';
    }
  };

  const generateGitHubIssue = (task: Task) => {
    return `## ${task.title}

**Descripción:**
${task.description}

**Prioridad:** ${task.priority}

**Criterios de aceptación:**
- [ ] Implementar funcionalidad básica
- [ ] Añadir tests correspondientes
- [ ] Revisar accesibilidad
- [ ] Documentar cambios

**Labels:** ${task.tags.join(', ')}

**Estimación:** 2-4 horas`;
  };

  return (
    <div className="space-y-8">
      {/* Generador de tareas */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Generador de Tareas</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Describe tu idea o proyecto frontend
            </label>
            <textarea
              value={projectIdea}
              onChange={(e) => setProjectIdea(e.target.value)}
              placeholder="Ej: Crear una landing page para una startup de tecnología con secciones de hero, features, testimonios y contacto..."
              className="w-full h-32 p-4 bg-gray-900/50 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 placeholder-gray-500"
            />
          </div>
          
          <button
            onClick={generateTasks}
            disabled={!projectIdea.trim() || isGenerating}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 shadow-lg hover:shadow-blue-600/25"
          >
            <Plus className="w-5 h-5" />
            <span>{isGenerating ? 'Generando tareas...' : 'Generar Plan de Tareas'}</span>
          </button>
        </div>
      </div>

      {/* Lista de tareas generadas */}
      {generatedTasks.length > 0 && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Plan de Tareas Generado</h2>
            <span className="text-sm text-gray-400">{generatedTasks.length} tareas</span>
          </div>
          
          <div className="space-y-4">
            {generatedTasks.map((task) => (
              <div key={task.id} className="border border-gray-600 rounded-lg p-4 hover:shadow-lg hover:shadow-gray-900/25 transition-shadow bg-gray-900/30">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{task.title}</h3>
                    <p className="text-sm text-gray-300">{task.description}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <div className="flex space-x-1">
                        {task.tags.map((tag) => (
                          <span key={tag} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => navigator.clipboard.writeText(generateGitHubIssue(task))}
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium hover:bg-gray-700/50 px-3 py-1 rounded transition-colors"
                  >
                    Copiar GitHub Issue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Templates de organización */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <CheckSquare className="w-6 h-6 text-green-400" />
          <h2 className="text-2xl font-bold text-white">Templates de Organización</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-600 rounded-lg p-4 bg-gray-900/30">
            <h3 className="font-semibold text-white mb-3">Estructura de Carpetas Frontend</h3>
            <pre className="text-sm text-gray-300 bg-gray-950 p-3 rounded border border-gray-800">
{`src/
├── components/
│   ├── ui/          # Componentes base
│   ├── forms/       # Formularios
│   └── layout/      # Layout components
├── pages/           # Páginas/vistas
├── hooks/           # Custom hooks
├── utils/           # Utilidades
├── types/           # TypeScript types
└── __tests__/       # Tests`}
            </pre>
          </div>
          
          <div className="border border-gray-600 rounded-lg p-4 bg-gray-900/30">
            <h3 className="font-semibold text-white mb-3">Convenciones de Commits</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <div><strong className="text-blue-400">feat:</strong> Nueva funcionalidad</div>
              <div><strong className="text-red-400">fix:</strong> Corrección de bug</div>
              <div><strong className="text-purple-400">style:</strong> Cambios de estilo/CSS</div>
              <div><strong className="text-yellow-400">refactor:</strong> Refactorización</div>
              <div><strong className="text-green-400">test:</strong> Añadir/modificar tests</div>
              <div><strong className="text-cyan-400">docs:</strong> Documentación</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPlanner;