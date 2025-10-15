import { Languages } from 'lucide-react';
import { Language } from '../types';

interface LanguageSelectorProps {
  onSelectLanguage: (language: Language) => void;
}

export const LanguageSelector = ({ onSelectLanguage }: LanguageSelectorProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6">
              <Languages className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              PrithviRakshak
            </h1>
            <p className="text-xl text-gray-600 mb-2">पृथ्वीरक्षक | ಪೃಥ್ವೀರಕ್ಷಕ</p>
            <p className="text-lg text-gray-500">AI-Powered Soil Health Assistant</p>
          </div>

          <div className="mb-8">
            <p className="text-2xl font-semibold text-gray-700 mb-6">
              What language do you prefer?
            </p>
            <p className="text-xl font-semibold text-gray-700 mb-6">
              आप कौन सी भाषा पसंद करते हैं?
            </p>
            <p className="text-xl font-semibold text-gray-700 mb-8">
              ನೀವು ಯಾವ ಭಾಷೆಯನ್ನು ಬಯಸುತ್ತೀರಿ?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => onSelectLanguage('english')}
              className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="relative z-10">
                <div className="text-3xl mb-2">🇬🇧</div>
                <div className="text-xl">English</div>
              </div>
            </button>

            <button
              onClick={() => onSelectLanguage('hindi')}
              className="group relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="relative z-10">
                <div className="text-3xl mb-2">🇮🇳</div>
                <div className="text-xl">हिंदी</div>
              </div>
            </button>

            <button
              onClick={() => onSelectLanguage('kannada')}
              className="group relative overflow-hidden bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="relative z-10">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-xl">ಕನ್ನಡ</div>
              </div>
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Empowering farmers through natural farming principles
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
