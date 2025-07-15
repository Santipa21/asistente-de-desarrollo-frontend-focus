import React, { useState } from 'react';
import { AlertTriangle, Search, CheckCircle, XCircle, Info, Lightbulb } from 'lucide-react';
import Card from './ui/Card'; // Import Card component

interface Solution {
  type: 'quick' | 'stable' | 'optimal';
  title: string;
  description: string;
  code?: string;
  steps: string[];
}

const ProblemSolver: React.FC = () => {
  const [problemDescription, setProblemDescription] = useState('');
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedProblemType, setSelectedProblemType] = useState('');

  const commonProblems = [
    {
      id: 'hydration',
      title: 'Error de Hidratación Next.js',
      description: 'Contenido no coincide entre servidor y cliente'
    },
    {
      id: 'hook-render',
      title: 'Hook llamado condicionalmente',
      description: 'Error de hooks de React fuera de orden'
    },
    {
      id: 'css-layout',
      title: 'Problemas de Layout CSS',
      description: 'Elementos no se posicionan correctamente'
    },
    {
      id: 'state-update',
      title: 'Estado no se actualiza',
      description: 'UseState no refleja cambios inmediatamente'
    }
  ];

  const analyzeProblem = async () => {
    if (!problemDescription.trim()) return;
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const mockSolutions: Solution[] = [
        {
          type: 'quick',
          title: 'Solución Rápida',
          description: 'Fix inmediato para resolver el problema temporalmente',
          code: `// Solución temporal
useEffect(() => {
  // Forzar re-render después del mount
  setMounted(true);
}, []);`,
          steps: [
            'Identifica el componente problemático',
            'Añade el código de fix temporal',
            'Verifica que el error desaparece',
            'Programa una solución más robusta'
          ]
        },
        {
          type: 'stable',
          title: 'Solución Estable',
          description: 'Implementación robusta que previene futuros problemas',
          code: `// Solución estable
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

if (!isClient) {
  return <div>Loading...</div>;
}`,
          steps: [
            'Implementa verificación de cliente',
            'Añade estado de loading apropiado',
            'Maneja casos edge',
            'Añade tests para prevenir regresiones'
          ]
        },
        {
          type: 'optimal',
          title: 'Solución Óptima',
          description: 'Refactorización completa siguiendo mejores prácticas',
          code: `// Solución óptima con patrón HOC
const withClientOnly = (Component) => {
  return function ClientOnlyComponent(props) {
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
      setMounted(true);
    }, []);
    
    return mounted ? <Component {...props} /> : null;
  };
};`,
          steps: [
            'Crear HOC reutilizable',
            'Implementar patrón de loading states',
            'Documentar el patrón para el equipo',
            'Crear tests comprehensivos',
            'Actualizar guía de estilo del proyecto'
          ]
        }
      ];
      
      setSolutions(mockSolutions);
      setIsAnalyzing(false);
    }, 2000);
  };

  const getSolutionIcon = (type: string) => {
    switch (type) {
      case 'quick': return <XCircle className="w-5 h-5 text-orange-400" />;
      case 'stable': return <CheckCircle className="w-5 h-5 text-blue-400" />;
      case 'optimal': return <Lightbulb className="w-5 h-5 text-green-400" />;
      default: return <Info className="w-5 h-5 text-gray-400" />;
    }
  };

  const getSolutionColor = (type: string) => {
    switch (type) {
      case 'quick': return 'border-orange-700 bg-orange-900/20';
      case 'stable': return 'border-blue-700 bg-blue-900/20';
      case 'optimal': return 'border-green-700 bg-green-900/20';
      default: return 'border-gray-700 bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Descripción del problema */}
      <Card title="Diagnóstico de Problemas" icon={AlertTriangle} iconColorClass="text-red-400">
        <div className="space-y-4">
          <div>
            <label htmlFor="problemDescription" className="block text-sm font-medium text-gray-300 mb-2">
              Describe el problema que estás experimentando
            </label>
            <textarea
              id="problemDescription" // Added id for label association
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="Ej: Mi aplicación React muestra contenido diferente en el servidor vs cliente, causando errores de hidratación..."
              className="w-full h-32 p-4 bg-gray-900/50 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 placeholder-gray-500"
            />
          </div>
          
          <button
            onClick={analyzeProblem}
            disabled={!problemDescription.trim() || isAnalyzing}
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 shadow-lg hover:shadow-red-600/25"
          >
            <Search className="w-5 h-5" />
            <span>{isAnalyzing ? 'Analizando problema...' : 'Diagnosticar Problema'}</span>
          </button>
        </div>
      </Card>

      {/* Problemas comunes */}
      <Card title="Problemas Comunes Frontend">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonProblems.map((problem) => (
            <button
              key={problem.id}
              onClick={() => {
                setSelectedProblemType(problem.id);
                setProblemDescription(problem.description);
              }}
              className="p-4 text-left border border-gray-600 rounded-lg hover:border-blue-500 hover:bg-blue-900/20 transition-colors bg-gray-900/30"
            >
              <h3 className="font-semibold text-white mb-1">{problem.title}</h3>
              <p className="text-sm text-gray-300">{problem.description}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Soluciones */}
      {solutions.length > 0 && (
        <Card title="Soluciones Propuestas">
          <div className="space-y-6">
            {solutions.map((solution, index) => (
              <div key={index} className={`border rounded-lg p-6 ${getSolutionColor(solution.type)}`}>
                <div className="flex items-center space-x-3 mb-4">
                  {getSolutionIcon(solution.type)}
                  <h3 className="font-semibold text-white">{solution.title}</h3>
                </div>
                
                <p className="text-gray-300 mb-4">{solution.description}</p>
                
                {solution.code && (
                  <div className="mb-4">
                    <h4 className="font-medium text-white mb-2">Código:</h4>
                    <pre className="bg-gray-950 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto border border-gray-800">
                      <code>{solution.code}</code>
                    </pre>
                  </div>
                )}
                
                <div>
                  <h4 className="font-medium text-white mb-2">Pasos a seguir:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-gray-300">
                    {solution.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Herramientas de debugging */}
      <Card title="Herramientas de Debugging">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-gray-600 rounded-lg bg-gray-900/30">
            <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mx-auto mb-3 border border-blue-700">
              <Search className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">React DevTools</h3>
            <p className="text-sm text-gray-300">Inspecciona componentes y estado</p>
          </div>
          
          <div className="text-center p-4 border border-gray-600 rounded-lg bg-gray-900/30">
            <div className="w-12 h-12 bg-green-900/50 rounded-lg flex items-center justify-center mx-auto mb-3 border border-green-700">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Console.log</h3>
            <p className="text-sm text-gray-300">Debug tradicional en navegador</p>
          </div>
          
          <div className="text-center p-4 border border-gray-600 rounded-lg bg-gray-900/30">
            <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mx-auto mb-3 border border-purple-700">
              <Lightbulb className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="font-semibold text-white mb-2">Error Boundaries</h3>
            <p className="text-sm text-gray-300">Captura errores en producción</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProblemSolver;