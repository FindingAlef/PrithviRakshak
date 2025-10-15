import { useState } from 'react';
import { LanguageSelector } from './components/LanguageSelector';
import { MainInterface } from './components/MainInterface';
import { Language } from './types';

function App() {
  const [language, setLanguage] = useState<Language | null>(null);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  const handleChangeLanguage = () => {
    setLanguage(null);
  };

  if (!language) {
    return <LanguageSelector onSelectLanguage={handleSelectLanguage} />;
  }

  return <MainInterface language={language} onChangeLanguage={handleChangeLanguage} />;
}

export default App;
