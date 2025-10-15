import { useState, useRef } from 'react';
import { Camera, Upload, Mic, Loader2, History, Leaf } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';
import { analyzeSoilFromImage, AnalysisResult } from '../utils/soilAnalyzer';
import { AnalysisDisplay } from './AnalysisDisplay';

interface MainInterfaceProps {
  language: Language;
  onChangeLanguage: () => void;
}

export const MainInterface = ({ language, onChangeLanguage }: MainInterfaceProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const t = (key: keyof ReturnType<typeof getTranslation>) => getTranslation(language, key as any);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imagePreview) return;

    setIsAnalyzing(true);
    try {
      const result = await analyzeSoilFromImage(imagePreview, location, language);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => setIsRecording(false), 3000);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setImagePreview(null);
    setAnalysisResult(null);
    setLocation('');
  };

  if (analysisResult) {
    return (
      <AnalysisDisplay
        result={analysisResult}
        language={language}
        onReset={handleReset}
        onChangeLanguage={onChangeLanguage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white">{t('welcome')}</h1>
                    <p className="text-green-100 text-lg">{t('subtitle')}</p>
                  </div>
                </div>
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

            <div className="p-6 md:p-8">
              {!imagePreview ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <Upload className="w-12 h-12 mx-auto mb-4" />
                      <p className="font-bold text-lg">{t('uploadPhoto')}</p>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    <button
                      onClick={() => cameraInputRef.current?.click()}
                      className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <Camera className="w-12 h-12 mx-auto mb-4" />
                      <p className="font-bold text-lg">{t('takePhoto')}</p>
                    </button>
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleFileSelect}
                      className="hidden"
                    />

                    <button
                      onClick={handleVoiceInput}
                      className={`group relative overflow-hidden ${
                        isRecording
                          ? 'bg-gradient-to-br from-red-500 to-red-600'
                          : 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                      } text-white p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl`}
                    >
                      <Mic className={`w-12 h-12 mx-auto mb-4 ${isRecording ? 'animate-pulse' : ''}`} />
                      <p className="font-bold text-lg">{t('voiceInput')}</p>
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border-2 border-amber-200">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">💡</div>
                      <div className="flex-1">
                        <h3 className="font-bold text-amber-900 text-lg mb-2">
                          {language === 'english' && 'How to Use'}
                          {language === 'hindi' && 'उपयोग कैसे करें'}
                          {language === 'kannada' && 'ಹೇಗೆ ಬಳಸುವುದು'}
                        </h3>
                        <ul className="space-y-2 text-amber-800">
                          <li className="flex items-center gap-2">
                            <span className="text-2xl">📸</span>
                            <span>
                              {language === 'english' && 'Upload or take a photo of your soil'}
                              {language === 'hindi' && 'अपनी मिट्टी की तस्वीर अपलोड या लें'}
                              {language === 'kannada' && 'ನಿಮ್ಮ ಮಣ್ಣಿನ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಅಥವಾ ತೆಗೆಯಿರಿ'}
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-2xl">🗺️</span>
                            <span>
                              {language === 'english' && 'Tell us your farm location'}
                              {language === 'hindi' && 'हमें अपने खेत का स्थान बताएं'}
                              {language === 'kannada' && 'ನಿಮ್ಮ ಜಮೀನಿನ ಸ್ಥಳವನ್ನು ಹೇಳಿ'}
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-2xl">✨</span>
                            <span>
                              {language === 'english' && 'Get instant soil analysis and crop recommendations'}
                              {language === 'hindi' && 'तुरंत मिट्टी विश्लेषण और फसल सिफारिशें प्राप्त करें'}
                              {language === 'kannada' && 'ತತ್ಕ್ಷಣ ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ಪಡೆಯಿರಿ'}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <img src={imagePreview} alt="Soil" className="w-full h-96 object-cover" />
                    <button
                      onClick={handleReset}
                      className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition-all duration-300"
                    >
                      ✕
                    </button>
                  </div>

                  <div>
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
                      🗺️ {t('location')}
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder={t('locationPlaceholder')}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none text-lg"
                    />
                  </div>

                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
                  >
                    {isAnalyzing ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        {t('analyzing')}
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Leaf className="w-6 h-6" />
                        {t('analyze')}
                      </span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {language === 'english' && 'Empowering farmers through natural farming principles'}
              {language === 'hindi' && 'प्राकृतिक खेती सिद्धांतों के माध्यम से किसानों को सशक्त बनाना'}
              {language === 'kannada' && 'ನೈಸರ್ಗಿಕ ಕೃಷಿ ತತ್ವಗಳ ಮೂಲಕ ರೈತರನ್ನು ಶಕ್ತಗೊಳಿಸುವುದು'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
