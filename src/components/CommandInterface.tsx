import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, BookOpen, Code, Folder, GitBranch } from 'lucide-react';

interface Command {
  input: string;
  output: string;
  timestamp: Date;
}

const CommandInterface: React.FC = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<Command[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const availableCommands = [
    { command: '/planifica', description: 'Planifica un componente o feature', example: '/planifica componente Header' },
    { command: '/explica', description: 'Explica código o concepto', example: '/explica useEffect' },
    { command: '/mejora', description: 'Sugiere mejoras para código', example: '/mejora accesibilidad' },
    { command: '/divide', description: 'Divide tarea en subtareas', example: '/divide landing page' },
    { command: '/revisa', description: 'Revisa un Pull Request', example: '/revisa PR #123' },
    { command: '/genera', description: 'Genera código o template', example: '/genera hook useApi' },
    { command: '/help', description: 'Muestra todos los comandos', example: '/help' }
  ];

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const processCommand = async (command: string) => {
    if (!command.trim()) return;

    setIsProcessing(true);
    
    // Simular procesamiento
    setTimeout(() => {
      let output = '';
      
      if (command.startsWith('/planifica')) {
        const component = command.replace('/planifica componente ', '').replace('/planifica ', '');
        output = `📋 Plan para ${component}:

1. **Estructura básica**
   - Crear archivo ${component}.tsx
   - Definir interfaces TypeScript
   - Implementar componente funcional

2. **Funcionalidad**
   - Props requeridas: children, className, variant
   - Estados internos necesarios
   - Handlers de eventos

3. **Estilos**
   - Clases Tailwind base
   - Variantes responsive
   - Estados hover y focus

4. **Testing**
   - Tests unitarios básicos
   - Tests de integración
   - Accessibility tests

✅ GitHub Issue creado: "Implementar componente ${component}"`;
      } else if (command.startsWith('/explica')) {
        const concept = command.replace('/explica ', '');
        output = `📚 Explicación de ${concept}:

**¿Qué es?**
${concept} es un hook fundamental de React que permite ejecutar efectos secundarios en componentes funcionales.

**¿Cuándo usarlo?**
- Llamadas a APIs
- Suscripciones
- Manipulación manual del DOM
- Limpieza de recursos

**Ejemplo básico:**
\`\`\`typescript
useEffect(() => {
  // Efecto
  fetchData();
  
  // Limpieza (opcional)
  return () => {
    cleanup();
  };
}, [dependency]); // Array de dependencias
\`\`\`

**Mejores prácticas:**
- Siempre incluir array de dependencias
- Usar múltiples useEffect para lógicas separadas
- Implementar cleanup cuando sea necesario`;
      } else if (command.startsWith('/mejora')) {
        const aspect = command.replace('/mejora ', '');
        output = `🚀 Mejoras para ${aspect}:

**Cambios recomendados:**

1. **Semántica HTML**
   - Usar elementos apropiados (button, nav, main)
   - Añadir landmarks ARIA
   - Estructura jerárquica de headings

2. **Navegación por teclado**
   - tabindex apropiados
   - focus visible
   - skip links

3. **Screen readers**
   - aria-label descriptivos
   - aria-describedby para contexto
   - role attributes cuando sea necesario

4. **Contraste y colores**
   - Ratio mínimo 4.5:1 para texto normal
   - Ratio mínimo 3:1 para texto grande
   - No depender solo del color para información

**Herramientas:**
- axe DevTools
- Lighthouse audit
- React axe`;
      } else if (command === '/help') {
        output = `🤖 Comandos disponibles:

${availableCommands.map(cmd => 
  `**${cmd.command}** - ${cmd.description}\n   Ejemplo: ${cmd.example}`
).join('\n\n')}

💡 **Tip:** Puedes combinar comandos o ser más específico en tus peticiones.`;
      } else {
        output = `❌ Comando no reconocido: ${command}

Escribe /help para ver todos los comandos disponibles.`;
      }

      const newCommand: Command = {
        input: command,
        output,
        timestamp: new Date()
      };

      setCommandHistory(prev => [...prev, newCommand]);
      setCurrentCommand('');
      setIsProcessing(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentCommand.trim() && !isProcessing) {
      processCommand(currentCommand);
    }
  };

  return (
    <div className="space-y-8">
      {/* Terminal */}
      <div className="bg-gray-950 rounded-2xl shadow-lg border border-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <Terminal className="w-5 h-5 text-green-400" />
            <span className="text-green-400 font-mono text-sm">DevAssist Terminal</span>
          </div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
        
        <div ref={terminalRef} className="p-4 h-96 overflow-y-auto font-mono text-sm">
          {commandHistory.length === 0 && (
            <div className="text-gray-400">
              <p>Frontend DevAssist Terminal v1.0</p>
              <p>Escribe /help para ver comandos disponibles</p>
              <br />
            </div>
          )}
          
          {commandHistory.map((cmd, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center space-x-2 text-green-400">
                <span>$</span>
                <span>{cmd.input}</span>
                <span className="text-gray-500 text-xs">
                  {cmd.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <div className="mt-2 text-gray-300 whitespace-pre-line pl-4">
                {cmd.output}
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex items-center space-x-2 text-yellow-400">
              <span>$</span>
              <span>{currentCommand}</span>
              <div className="flex space-x-1">
                <div className="w-1 h-4 bg-yellow-400 animate-pulse"></div>
                <div className="w-1 h-4 bg-yellow-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-4 bg-yellow-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
          <div className="flex items-center space-x-3">
            <span className="text-green-400 font-mono">$</span>
            <input
              type="text"
              value={currentCommand}
              onChange={(e) => setCurrentCommand(e.target.value)}
              placeholder="Escribe tu comando aquí..."
              className="flex-1 bg-transparent text-green-400 font-mono placeholder-gray-500 outline-none"
              disabled={isProcessing}
            />
            <button
              type="submit"
              disabled={!currentCommand.trim() || isProcessing}
              className="p-2 text-green-400 hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>

      {/* Referencia de comandos */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <BookOpen className="w-6 h-6 text-blue-400" />
          <h2 className="text-2xl font-bold text-white">Referencia de Comandos</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availableCommands.map((cmd, index) => (
            <div key={index} className="border border-gray-600 rounded-lg p-4 bg-gray-900/30">
              <div className="flex items-center space-x-2 mb-2">
                <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm font-mono">
                  {cmd.command}
                </code>
              </div>
              <p className="text-sm text-gray-300 mb-2">{cmd.description}</p>
              <div className="text-xs text-gray-400">
                <strong>Ejemplo:</strong> <code>{cmd.example}</code>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flujos de trabajo */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <GitBranch className="w-6 h-6 text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Flujos de Trabajo Automatizados</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Desarrollo de Feature</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-blue-400" />
                <span>1. <code>/planifica feature login</code></span>
              </div>
              <div className="flex items-center space-x-2">
                <Folder className="w-4 h-4 text-green-400" />
                <span>2. <code>/genera estructura carpetas</code></span>
              </div>
              <div className="flex items-center space-x-2">
                <GitBranch className="w-4 h-4 text-purple-400" />
                <span>3. <code>/divide login subtareas</code></span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Code Review</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-blue-400" />
                <span>1. <code>/revisa PR #123</code></span>
              </div>
              <div className="flex items-center space-x-2">
                <Folder className="w-4 h-4 text-green-400" />
                <span>2. <code>/mejora performance</code></span>
              </div>
              <div className="flex items-center space-x-2">
                <GitBranch className="w-4 h-4 text-purple-400" />
                <span>3. <code>/explica cambios</code></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandInterface;