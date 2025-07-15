import React from 'react';

interface CardProps {
  title?: string;
  icon?: React.ElementType;
  iconColorClass?: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  headerActions?: React.ReactNode; // For buttons or other elements in the header
}

const Card: React.FC<CardProps> = ({
  title,
  icon: Icon,
  iconColorClass = 'text-blue-400',
  children,
  className = '',
  titleClassName = '',
  headerActions,
}) => {
  return (
    <div
      className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700 p-6 ${className}`}
    >
      {(title || Icon || headerActions) && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={`w-6 h-6 ${iconColorClass}`} />}
            {title && (
              <h2 className={`text-2xl font-bold text-white ${titleClassName}`}>
                {title}
              </h2>
            )}
          </div>
          {headerActions && <div>{headerActions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
