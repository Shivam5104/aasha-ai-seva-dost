
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Languages } from 'lucide-react';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  selectedLanguage, 
  onLanguageChange 
}) => {
  const languages = [
    { code: 'english', name: 'English', native: 'English' },
    { code: 'hindi', name: 'Hindi', native: 'हिंदी' },
    { code: 'marathi', name: 'Marathi', native: 'मराठी' },
    { code: 'telugu', name: 'Telugu', native: 'తెలుగు' },
    { code: 'kannada', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'bhojpuri', name: 'Bhojpuri', native: 'भोजपुरी' },
    { code: 'kashmiri', name: 'Kashmiri', native: 'कॉशुर' },
    { code: 'odia', name: 'Odia', native: 'ଓଡ଼ିଆ' },
    { code: 'gujarati', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'punjabi', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'bengali', name: 'Bengali', native: 'বাংলা' },
    { code: 'tamil', name: 'Tamil', native: 'தமிழ்' },
    { code: 'malayalam', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'assamese', name: 'Assamese', native: 'অসমীয়া' },
    { code: 'urdu', name: 'Urdu', native: 'اردو' }
  ];

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-4 h-4 text-gray-600" />
      <Select value={selectedLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent className="bg-white border shadow-lg max-h-60 overflow-y-auto z-50">
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code} className="hover:bg-gray-100">
              <div className="flex flex-col">
                <span className="font-medium">{lang.name}</span>
                <span className="text-sm text-gray-500">{lang.native}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
