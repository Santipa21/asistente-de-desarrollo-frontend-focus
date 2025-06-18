import React from 'react';
import { Github, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/90 backdrop-blur-sm shadow-lg border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">DevAssist</h1>
              <p className="text-sm text-gray-400">Frontend Specialist</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-300">
              <Github className="w-4 h-4" />
              <span>Integrado con GitHub</span>
            </div>
            <div className="w-8 h-8 bg-green-900/50 rounded-full flex items-center justify-center border border-green-700">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;