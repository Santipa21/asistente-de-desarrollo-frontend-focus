import React, { useState } from 'react';
import { Code2, CheckCircle, AlertCircle, Lightbulb, Copy } from 'lucide-react';

const CodeAssistant: React.FC = () => {
  const [codeInput, setCodeInput] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeCode = async () => {
    if (!codeInput.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulación de análisis de código
    setTimeout(() => {
      setAnalysis(`
**Análisis de código React/TypeScript:**

✅ **Aspectos positivos:**
- Uso correcto de hooks
- Tipado TypeScript adecuado
- Estructura de componente clara

⚠️ **Mejoras sugeridas:**
- Considera usar useMemo para optimizar rendimiento
- Añadir manejo de errores
- Implementar testing con React Testing Library

💡 **Recomendaciones:**
- Extraer lógica compleja a custom hooks
- Usar PropTypes para validación adicional
- Implementar lazy loading para componentes pesados
      `);
      setIsAnalyzing(false);
    }, 2000);
  };

  const codeSnippets = [
    {
      title: 'Custom Hook para API',
      language: 'TypeScript',
      code: `const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);

  return { data, loading, error };
};`
    },
    {
      title: 'Componente Accesible',
      language: 'JSX',
      code: `const Button = ({ children, variant = 'primary', ...props }) => (
  <button
    className={\`btn btn-\${variant}\`}
    aria-label={props['aria-label'] || children}
    {...props}
  >
    {children}
  </button>
);`
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-8">
      {/* Análisis de código */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Code2 className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Análisis de Código</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Pega tu código React/TypeScript
            </label>
            <textarea
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="// Pega aquí tu código JSX, TSX o componente React..."
              className="w-full h-48 p-4 bg-gray-900/50 border border-gray-600 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 placeholder-gray-500"
            />
          </div>
          
          <button
            onClick={analyzeCode}
            disabled={!codeInput.trim() || isAnalyzing}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-blue-600/25"
          >
            {isAnalyzing ? 'Analizando...' : 'Analizar Código'}
          </button>
          
          {analysis && (
            <div className="mt-6 p-6 bg-gray-900/50 rounded-lg border border-gray-600">
              <h3 className="font-semibold text-white mb-3">Resultados del Análisis</h3>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm text-gray-300">{analysis}</pre>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Snippets de código */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          <h2 className="text-2xl font-bold text-white">Snippets Útiles</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {codeSnippets.map((snippet, index) => (
            <div key={index} className="border border-gray-600 rounded-lg p-4 bg-gray-900/30">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white">{snippet.title}</h3>
                  <span className="text-sm text-gray-400">{snippet.language}</span>
                </div>
                <button
                  onClick={() => copyToClipboard(snippet.code)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <pre className="bg-gray-950 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto border border-gray-800">
                <code>{snippet.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* Mejores práticas */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <h2 className="text-2xl font-bold text-white">Mejores Prácticas Frontend</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-white">React & TypeScript</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Usa interfaces TypeScript para props</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Implementa error boundaries</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Utiliza React.memo para optimización</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Separa lógica en custom hooks</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Rendimiento & Accesibilidad</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Implementa lazy loading</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Usa semantic HTML</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Añade ARIA labels apropiados</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Optimiza bundle size</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeAssistant;