import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

interface EditableBlockProps {
  contentKey: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  className?: string;
}

export const EditableBlock: React.FC<EditableBlockProps> = ({ contentKey, as: Component = 'p', className = '' }) => {
  const { editMode, contentData, updateContent } = useAppContext();
  const [localValue, setLocalValue] = useState(contentData[contentKey] || '');

  useEffect(() => {
    setLocalValue(contentData[contentKey] || '');
  }, [contentData, contentKey]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setLocalValue(e.target.value);
    updateContent(contentKey, e.target.value);
  };

  if (editMode) {
    if (Component === 'h1' || Component === 'h2' || Component === 'h3') {
      return (
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          className={`w-full p-2 border border-teal-500 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white text-gray-800 ${className}`}
        />
      );
    }
    return (
      <textarea
        value={localValue}
        onChange={handleChange}
        rows={4}
        className={`w-full p-2 border border-teal-500 rounded focus:outline-none focus:ring-2 focus:ring-teal-600 bg-white text-gray-800 ${className}`}
      />
    );
  }

  return <Component className={className}>{contentData[contentKey]}</Component>;
};
