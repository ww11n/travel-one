"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectLanguage = (language: Language) => {
    setSelectedLanguage(language);
    setIsOpen(false);
    // 在实际应用中，这里会触发语言切换的逻辑
    console.log(`Language changed to ${language.name}`);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 focus:outline-none"
        onClick={toggleDropdown}
      >
        <span className="text-lg">{selectedLanguage.flag}</span>
        <span className="hidden md:inline">{selectedLanguage.name}</span>
        <svg
          className={cn("h-4 w-4 transition-transform", isOpen && "transform rotate-180")}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                className={cn(
                  "w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-2",
                  selectedLanguage.code === language.code && "bg-primary-blue bg-opacity-10 text-primary-blue"
                )}
                onClick={() => selectLanguage(language)}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 