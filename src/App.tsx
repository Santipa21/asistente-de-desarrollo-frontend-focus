import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CodeAssistant from './components/CodeAssistant';
import TaskPlanner from './components/TaskPlanner';
import ProblemSolver from './components/ProblemSolver';
import CommandInterface from './components/CommandInterface';

export type ActiveSection = 'code' | 'planner' | 'problems' | 'commands';

function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('code');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'code':
        return <CodeAssistant />;
      case 'planner':
        return <TaskPlanner />;
      case 'problems':
        return <ProblemSolver />;
      case 'commands':
        return <CommandInterface />;
      default:
        return <CodeAssistant />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Frontend Dev Assistant
            </h1>
            <p className="text-lg text-gray-300">
              ¿En qué parte del trabajo frontend necesitas ayuda hoy: código, planificación o resolución de problemas?
            </p>
          </div>
          
          <Navigation 
            activeSection={activeSection} 
            setActiveSection={setActiveSection} 
          />
          
          <div className="mt-8">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;