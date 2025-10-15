import { ArrowLeft, Camera, Mic, TrendingUp } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';
import { AnalysisResult } from '../utils/soilAnalyzer';

interface AnalysisDisplayProps {
  result: AnalysisResult;
  language: Language;
  onReset: () => void;
  onChangeLanguage: () => void;
}

export const AnalysisDisplay = ({ result, language, onReset, onChangeLanguage }: AnalysisDisplayProps) => {
  const t = (key: keyof ReturnType<typeof getTranslation>) => getTranslation(language, key as any);

  const getSoilTypeIcon = (soilType: string) => {
    const icons: Record<string, string> = {
      sandy: '🏖️',
      clay: '🧱',
      loamy: '🌱',
      silt: '🏞️',
    };
    return icons[soilType] || '🌍';
  };

  const getFertilityColor = (level: string) => {
    const colors: Record<string, string> = {
      low: 'from-red-500 to-orange-500',
      medium: 'from-yellow-500 to-amber-500',
      high: 'from-green-500 to-emerald-500',
    };
    return colors[level] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={onReset}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all duration-300"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t('back')}
                </button>
                <button
                  onClick={onChangeLanguage}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl transition-all duration-300"
                >
                  {language === 'english' && 'English'}
                  {language === 'hindi' && 'हिंदी'}
                  {language === 'kannada' && 'ಕನ್ನಡ'}
                </button>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl">{getSoilTypeIcon(result.soilType)}</div>
                    <div>
                      <h3 className="text-sm font-semibold text-blue-900">{t('soilType')}</h3>
                      <p className="text-2xl font-bold text-blue-700 capitalize">{t(result.soilType as any)}</p>
                    </div>
                  </div>
                  <p className="text-blue-800">{result.organicContent}</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-5xl">
                      <TrendingUp className="w-12 h-12 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-purple-900">{t('fertility')}</h3>
                      <p className={`text-2xl font-bold bg-gradient-to-r ${getFertilityColor(result.fertilityLevel)} bg-clip-text text-transparent capitalize`}>
                        {t(result.fertilityLevel as any)}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${getFertilityColor(result.fertilityLevel)}`}
                      style={{
                        width: result.fertilityLevel === 'low' ? '33%' : result.fertilityLevel === 'medium' ? '66%' : '100%',
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <span className="text-3xl">✅</span>
                  {t('healthIndicators')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {result.healthIndicators.map((indicator, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                      <p className="text-green-800 font-medium">{indicator}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 border-2 border-amber-200">
                <h3 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
                  <span className="text-3xl">🌾</span>
                  {t('cropRecommendations')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {result.crops.map((crop, index) => (
                    <div key={index} className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                      <div className="text-center mb-3">
                        <div className="text-5xl mb-2">{crop.icon}</div>
                        <h4 className="font-bold text-amber-900 text-lg">{crop.name}</h4>
                        <p className="text-amber-700 text-sm">{crop.nameLocal}</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🌤️</span>
                          <span className="text-amber-800">{crop.season}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">📅</span>
                          <span className="text-amber-800">
                            {t('year')} {crop.rotationYear}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-6 border-2 border-teal-200">
                <h3 className="text-xl font-bold text-teal-900 mb-4 flex items-center gap-2">
                  <span className="text-3xl">🔄</span>
                  {t('rotationPlan')}
                </h3>
                <div className="space-y-4">
                  {result.crops.map((crop, index) => (
                    <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {crop.rotationYear}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl">{crop.icon}</span>
                            <h4 className="font-bold text-teal-900 text-lg">{crop.name}</h4>
                          </div>
                          <p className="text-teal-800">{crop.benefits}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 border-2 border-emerald-200">
                <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
                  <span className="text-3xl">♻️</span>
                  {t('improvements')}
                </h3>
                <div className="space-y-4">
                  {result.improvements.map((improvement, index) => (
                    <div key={index} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="text-4xl flex-shrink-0">{improvement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-emerald-900 text-lg mb-2">{improvement.title}</h4>
                          <p className="text-emerald-800">{improvement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-4">{t('howCanIHelp')}</h3>
                <p className="text-xl mb-6">{t('sendVoiceOrPhoto')}</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={onReset}
                    className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <Camera className="w-5 h-5" />
                    {language === 'english' && 'New Photo'}
                    {language === 'hindi' && 'नई तस्वीर'}
                    {language === 'kannada' && 'ಹೊಸ ಫೋಟೋ'}
                  </button>
                  <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                    <Mic className="w-5 h-5" />
                    {language === 'english' && 'Voice Input'}
                    {language === 'hindi' && 'आवाज इनपुट'}
                    {language === 'kannada' && 'ಧ್ವನಿ ಇನ್‌ಪುಟ್'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {language === 'english' && 'Track your progress monthly for best results'}
              {language === 'hindi' && 'सर्वोत्तम परिणामों के लिए अपनी प्रगति की मासिक निगरानी करें'}
              {language === 'kannada' && 'ಉತ್ತಮ ಫಲಿತಾಂಶಗಳಿಗಾಗಿ ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಮಾಸಿಕ ಟ್ರ್ಯಾಕ್ ಮಾಡಿ'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
