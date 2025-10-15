import { Language } from '../types';

export interface AnalysisResult {
  soilType: string;
  fertilityLevel: 'low' | 'medium' | 'high';
  organicContent: string;
  healthIndicators: string[];
  crops: CropRecommendation[];
  improvements: Improvement[];
}

export interface CropRecommendation {
  name: string;
  nameLocal: string;
  season: string;
  rotationYear: number;
  benefits: string;
  icon: string;
}

export interface Improvement {
  title: string;
  description: string;
  icon: string;
}

export const analyzeSoilFromImage = async (
  imageData: string,
  location: string,
  language: Language
): Promise<AnalysisResult> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const soilTypes = ['sandy', 'clay', 'loamy', 'silt'];
  const randomSoilType = soilTypes[Math.floor(Math.random() * soilTypes.length)];
  const fertilityLevels: Array<'low' | 'medium' | 'high'> = ['low', 'medium', 'high'];
  const randomFertility = fertilityLevels[Math.floor(Math.random() * fertilityLevels.length)];

  const soilTypeInfo = {
    sandy: {
      organic: 'Low organic matter, drains quickly',
      indicators: ['Light colored', 'Loose texture', 'Good drainage'],
      crops: getSandyCrops(language),
    },
    clay: {
      organic: 'High water retention, rich in minerals',
      indicators: ['Dark color', 'Dense texture', 'Holds moisture'],
      crops: getClayCrops(language),
    },
    loamy: {
      organic: 'Balanced organic content, ideal structure',
      indicators: ['Medium texture', 'Good structure', 'Balanced drainage'],
      crops: getLoamyCrops(language),
    },
    silt: {
      organic: 'Moderate organic matter, smooth texture',
      indicators: ['Smooth texture', 'Fair drainage', 'Fertile'],
      crops: getSiltCrops(language),
    },
  };

  const info = soilTypeInfo[randomSoilType as keyof typeof soilTypeInfo];

  return {
    soilType: randomSoilType,
    fertilityLevel: randomFertility,
    organicContent: info.organic,
    healthIndicators: info.indicators,
    crops: info.crops,
    improvements: getImprovements(randomSoilType, language),
  };
};

const getSandyCrops = (language: Language): CropRecommendation[] => {
  const crops = {
    english: [
      { name: 'Pearl Millet', nameLocal: 'Bajra', season: 'Kharif', rotationYear: 1, benefits: 'Drought tolerant, improves soil structure', icon: '🌾' },
      { name: 'Groundnut', nameLocal: 'Moongphali', season: 'Kharif/Rabi', rotationYear: 2, benefits: 'Fixes nitrogen, adds organic matter', icon: '🥜' },
      { name: 'Watermelon', nameLocal: 'Tarbuj', season: 'Summer', rotationYear: 3, benefits: 'High value crop, minimal water needs', icon: '🍉' },
      { name: 'Green Gram', nameLocal: 'Moong', season: 'Rabi', rotationYear: 4, benefits: 'Nitrogen fixer, quick growing', icon: '🫘' },
    ],
    hindi: [
      { name: 'बाजरा', nameLocal: 'Pearl Millet', season: 'खरीफ', rotationYear: 1, benefits: 'सूखा सहन करने वाला, मिट्टी की संरचना में सुधार', icon: '🌾' },
      { name: 'मूंगफली', nameLocal: 'Groundnut', season: 'खरीफ/रबी', rotationYear: 2, benefits: 'नाइट्रोजन स्थिर करता है, कार्बनिक पदार्थ जोड़ता है', icon: '🥜' },
      { name: 'तरबूज', nameLocal: 'Watermelon', season: 'गर्मी', rotationYear: 3, benefits: 'उच्च मूल्य वाली फसल, न्यूनतम पानी की जरूरत', icon: '🍉' },
      { name: 'मूंग', nameLocal: 'Green Gram', season: 'रबी', rotationYear: 4, benefits: 'नाइट्रोजन स्थिरक, तेजी से बढ़ने वाला', icon: '🫘' },
    ],
    kannada: [
      { name: 'ಸಜ್ಜೆ', nameLocal: 'Pearl Millet', season: 'ಖರೀಫ್', rotationYear: 1, benefits: 'ಬರ ಸಹನೀಯ, ಮಣ್ಣಿನ ರಚನೆ ಸುಧಾರಿಸುತ್ತದೆ', icon: '🌾' },
      { name: 'ಕಡಲೆಕಾಯಿ', nameLocal: 'Groundnut', season: 'ಖರೀಫ್/ರಬಿ', rotationYear: 2, benefits: 'ಸಾರಜನಕ ಸ್ಥಿರೀಕರಣ, ಸಾವಯವ ಪದಾರ್ಥ ಸೇರಿಸುತ್ತದೆ', icon: '🥜' },
      { name: 'ಕಲ್ಲಂಗಡಿ', nameLocal: 'Watermelon', season: 'ಬೇಸಿಗೆ', rotationYear: 3, benefits: 'ಹೆಚ್ಚಿನ ಮೌಲ್ಯದ ಬೆಳೆ, ಕನಿಷ್ಠ ನೀರು ಬೇಕು', icon: '🍉' },
      { name: 'ಹೆಸರುಕಾಳು', nameLocal: 'Green Gram', season: 'ರಬಿ', rotationYear: 4, benefits: 'ಸಾರಜನಕ ಸ್ಥಿರೀಕರಣ, ತ್ವರಿತ ಬೆಳವಣಿಗೆ', icon: '🫘' },
    ],
  };
  return crops[language];
};

const getClayCrops = (language: Language): CropRecommendation[] => {
  const crops = {
    english: [
      { name: 'Rice', nameLocal: 'Dhan', season: 'Kharif', rotationYear: 1, benefits: 'Thrives in waterlogged conditions', icon: '🌾' },
      { name: 'Wheat', nameLocal: 'Gehun', season: 'Rabi', rotationYear: 2, benefits: 'Deep roots break soil compaction', icon: '🌾' },
      { name: 'Chickpea', nameLocal: 'Chana', season: 'Rabi', rotationYear: 3, benefits: 'Nitrogen fixer, improves soil health', icon: '🫘' },
      { name: 'Sugarcane', nameLocal: 'Ganna', season: 'Year-round', rotationYear: 4, benefits: 'High moisture requirement, adds biomass', icon: '🎋' },
    ],
    hindi: [
      { name: 'धान', nameLocal: 'Rice', season: 'खरीफ', rotationYear: 1, benefits: 'जलभराव वाली परिस्थितियों में पनपता है', icon: '🌾' },
      { name: 'गेहूं', nameLocal: 'Wheat', season: 'रबी', rotationYear: 2, benefits: 'गहरी जड़ें मिट्टी का संघनन तोड़ती हैं', icon: '🌾' },
      { name: 'चना', nameLocal: 'Chickpea', season: 'रबी', rotationYear: 3, benefits: 'नाइट्रोजन स्थिरक, मिट्टी स्वास्थ्य सुधारता है', icon: '🫘' },
      { name: 'गन्ना', nameLocal: 'Sugarcane', season: 'पूरे साल', rotationYear: 4, benefits: 'उच्च नमी आवश्यकता, बायोमास जोड़ता है', icon: '🎋' },
    ],
    kannada: [
      { name: 'ಭತ್ತ', nameLocal: 'Rice', season: 'ಖರೀಫ್', rotationYear: 1, benefits: 'ನೀರು ತುಂಬಿದ ಪರಿಸ್ಥಿತಿಗಳಲ್ಲಿ ಬೆಳೆಯುತ್ತದೆ', icon: '🌾' },
      { name: 'ಗೋಧಿ', nameLocal: 'Wheat', season: 'ರಬಿ', rotationYear: 2, benefits: 'ಆಳವಾದ ಬೇರುಗಳು ಮಣ್ಣಿನ ಸಂಕೋಚನ ಮುರಿಯುತ್ತವೆ', icon: '🌾' },
      { name: 'ಕಡಲೆ', nameLocal: 'Chickpea', season: 'ರಬಿ', rotationYear: 3, benefits: 'ಸಾರಜನಕ ಸ್ಥಿರೀಕರಣ, ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಸುಧಾರಿಸುತ್ತದೆ', icon: '🫘' },
      { name: 'ಕಬ್ಬು', nameLocal: 'Sugarcane', season: 'ವರ್ಷಪೂರ್ತಿ', rotationYear: 4, benefits: 'ಹೆಚ್ಚಿನ ತೇವಾಂಶ ಅವಶ್ಯಕತೆ, ಜೀವರಾಶಿ ಸೇರಿಸುತ್ತದೆ', icon: '🎋' },
    ],
  };
  return crops[language];
};

const getLoamyCrops = (language: Language): CropRecommendation[] => {
  const crops = {
    english: [
      { name: 'Tomato', nameLocal: 'Tamatar', season: 'Rabi', rotationYear: 1, benefits: 'High value crop, ideal for balanced soil', icon: '🍅' },
      { name: 'Maize', nameLocal: 'Makka', season: 'Kharif', rotationYear: 2, benefits: 'Heavy feeder, adds organic residue', icon: '🌽' },
      { name: 'Soybean', nameLocal: 'Bhatmas', season: 'Kharif', rotationYear: 3, benefits: 'Nitrogen fixer, protein rich', icon: '🫘' },
      { name: 'Potato', nameLocal: 'Aloo', season: 'Rabi', rotationYear: 4, benefits: 'Breaks soil, high yield', icon: '🥔' },
    ],
    hindi: [
      { name: 'टमाटर', nameLocal: 'Tomato', season: 'रबी', rotationYear: 1, benefits: 'उच्च मूल्य वाली फसल, संतुलित मिट्टी के लिए आदर्श', icon: '🍅' },
      { name: 'मक्का', nameLocal: 'Maize', season: 'खरीफ', rotationYear: 2, benefits: 'भारी आहारक, कार्बनिक अवशेष जोड़ता है', icon: '🌽' },
      { name: 'सोयाबीन', nameLocal: 'Soybean', season: 'खरीफ', rotationYear: 3, benefits: 'नाइट्रोजन स्थिरक, प्रोटीन से भरपूर', icon: '🫘' },
      { name: 'आलू', nameLocal: 'Potato', season: 'रबी', rotationYear: 4, benefits: 'मिट्टी तोड़ता है, उच्च उपज', icon: '🥔' },
    ],
    kannada: [
      { name: 'ಟೊಮೇಟೊ', nameLocal: 'Tomato', season: 'ರಬಿ', rotationYear: 1, benefits: 'ಹೆಚ್ಚಿನ ಮೌಲ್ಯದ ಬೆಳೆ, ಸಮತೋಲಿತ ಮಣ್ಣಿಗೆ ಸೂಕ್ತ', icon: '🍅' },
      { name: 'ಜೋಳ', nameLocal: 'Maize', season: 'ಖರೀಫ್', rotationYear: 2, benefits: 'ಹೆಚ್ಚು ಪೋಷಕಾಂಶ ಬೇಕು, ಸಾವಯವ ಅವಶೇಷ ಸೇರಿಸುತ್ತದೆ', icon: '🌽' },
      { name: 'ಸೋಯಾಬೀನ್', nameLocal: 'Soybean', season: 'ಖರೀಫ್', rotationYear: 3, benefits: 'ಸಾರಜನಕ ಸ್ಥಿರೀಕರಣ, ಪ್ರೋಟೀನ್ ಸಮೃದ್ಧ', icon: '🫘' },
      { name: 'ಆಲೂಗಡ್ಡೆ', nameLocal: 'Potato', season: 'ರಬಿ', rotationYear: 4, benefits: 'ಮಣ್ಣನ್ನು ಮುರಿಯುತ್ತದೆ, ಹೆಚ್ಚಿನ ಇಳುವರಿ', icon: '🥔' },
    ],
  };
  return crops[language];
};

const getSiltCrops = (language: Language): CropRecommendation[] => {
  const crops = {
    english: [
      { name: 'Cabbage', nameLocal: 'Patta Gobhi', season: 'Rabi', rotationYear: 1, benefits: 'Thrives in fertile silt, high value', icon: '🥬' },
      { name: 'Mustard', nameLocal: 'Sarson', season: 'Rabi', rotationYear: 2, benefits: 'Oil seed, improves soil structure', icon: '🌿' },
      { name: 'Lentil', nameLocal: 'Masoor', season: 'Rabi', rotationYear: 3, benefits: 'Nitrogen fixer, protein source', icon: '🫘' },
      { name: 'Onion', nameLocal: 'Pyaz', season: 'Rabi', rotationYear: 4, benefits: 'High value, shallow roots', icon: '🧅' },
    ],
    hindi: [
      { name: 'पत्ता गोभी', nameLocal: 'Cabbage', season: 'रबी', rotationYear: 1, benefits: 'उपजाऊ गाद में पनपता है, उच्च मूल्य', icon: '🥬' },
      { name: 'सरसों', nameLocal: 'Mustard', season: 'रबी', rotationYear: 2, benefits: 'तेल बीज, मिट्टी की संरचना में सुधार', icon: '🌿' },
      { name: 'मसूर', nameLocal: 'Lentil', season: 'रबी', rotationYear: 3, benefits: 'नाइट्रोजन स्थिरक, प्रोटीन स्रोत', icon: '🫘' },
      { name: 'प्याज', nameLocal: 'Onion', season: 'रबी', rotationYear: 4, benefits: 'उच्च मूल्य, उथली जड़ें', icon: '🧅' },
    ],
    kannada: [
      { name: 'ಎಲೆಕೋಸು', nameLocal: 'Cabbage', season: 'ರಬಿ', rotationYear: 1, benefits: 'ಫಲವತ್ತಾದ ಮರಳಿನಲ್ಲಿ ಬೆಳೆಯುತ್ತದೆ, ಹೆಚ್ಚಿನ ಮೌಲ್ಯ', icon: '🥬' },
      { name: 'ಸಾಸುವೆ', nameLocal: 'Mustard', season: 'ರಬಿ', rotationYear: 2, benefits: 'ಎಣ್ಣೆ ಬೀಜ, ಮಣ್ಣಿನ ರಚನೆ ಸುಧಾರಿಸುತ್ತದೆ', icon: '🌿' },
      { name: 'ಮಸೂರ', nameLocal: 'Lentil', season: 'ರಬಿ', rotationYear: 3, benefits: 'ಸಾರಜನಕ ಸ್ಥಿರೀಕರಣ, ಪ್ರೋಟೀನ್ ಮೂಲ', icon: '🫘' },
      { name: 'ಈರುಳ್ಳಿ', nameLocal: 'Onion', season: 'ರಬಿ', rotationYear: 4, benefits: 'ಹೆಚ್ಚಿನ ಮೌಲ್ಯ, ಆಳವಿಲ್ಲದ ಬೇರುಗಳು', icon: '🧅' },
    ],
  };
  return crops[language];
};

const getImprovements = (soilType: string, language: Language): Improvement[] => {
  const improvements = {
    english: {
      common: [
        { title: 'Composting', description: 'Add organic compost to boost microbes and nutrients. Layer green and brown materials.', icon: '♻️' },
        { title: 'Cover Crops', description: 'Plant legumes or mustard after harvest to fix nitrogen and prevent erosion.', icon: '🌱' },
        { title: 'Minimal Tillage', description: 'Reduce plowing to preserve soil structure and earthworm populations.', icon: '🚜' },
        { title: 'Mulching', description: 'Spread crop residue to retain moisture and add organic matter naturally.', icon: '🍂' },
        { title: 'Earthworm Culture', description: 'Introduce earthworms - nature\'s soil engineers. They improve aeration and fertility.', icon: '🪱' },
      ],
      sandy: [
        { title: 'Add Organic Matter', description: 'Mix in compost or cow dung to improve water retention. Sandy soil needs binding.', icon: '💧' },
      ],
      clay: [
        { title: 'Improve Drainage', description: 'Add sand and organic matter. Break up compacted layers with deep-rooted crops.', icon: '🌊' },
      ],
    },
    hindi: {
      common: [
        { title: 'कम्पोस्टिंग', description: 'सूक्ष्मजीवों और पोषक तत्वों को बढ़ावा देने के लिए जैविक खाद डालें। हरी और भूरी सामग्री परत करें।', icon: '♻️' },
        { title: 'कवर फसलें', description: 'नाइट्रोजन स्थिर करने और कटाव रोकने के लिए फसल के बाद फलियां या सरसों लगाएं।', icon: '🌱' },
        { title: 'न्यूनतम जुताई', description: 'मिट्टी की संरचना और केंचुओं को संरक्षित करने के लिए जुताई कम करें।', icon: '🚜' },
        { title: 'मल्चिंग', description: 'नमी बनाए रखने और प्राकृतिक रूप से कार्बनिक पदार्थ जोड़ने के लिए फसल अवशेष फैलाएं।', icon: '🍂' },
        { title: 'केंचुआ संवर्धन', description: 'केंचुए पेश करें - प्रकृति के मिट्टी इंजीनियर। वे वातन और उर्वरता में सुधार करते हैं।', icon: '🪱' },
      ],
      sandy: [
        { title: 'कार्बनिक पदार्थ जोड़ें', description: 'जल प्रतिधारण में सुधार के लिए खाद या गोबर मिलाएं। रेतीली मिट्टी को बंधन की जरूरत है।', icon: '💧' },
      ],
      clay: [
        { title: 'जल निकासी में सुधार', description: 'रेत और कार्बनिक पदार्थ जोड़ें। गहरी जड़ों वाली फसलों से संघनित परतों को तोड़ें।', icon: '🌊' },
      ],
    },
    kannada: {
      common: [
        { title: 'ಗೊಬ್ಬರ ತಯಾರಿಕೆ', description: 'ಸೂಕ್ಷ್ಮಜೀವಿಗಳು ಮತ್ತು ಪೋಷಕಾಂಶಗಳನ್ನು ಹೆಚ್ಚಿಸಲು ಸಾವಯವ ಗೊಬ್ಬರ ಸೇರಿಸಿ। ಹಸಿರು ಮತ್ತು ಕಂದು ವಸ್ತುಗಳನ್ನು ಪದರ ಮಾಡಿ।', icon: '♻️' },
        { title: 'ಕವರ್ ಬೆಳೆಗಳು', description: 'ಸಾರಜನಕ ಸ್ಥಿರೀಕರಣ ಮತ್ತು ಸವೆತ ತಡೆಯಲು ಸುಗ್ಗಿಯ ನಂತರ ದ್ವಿದಳಗಳು ಅಥವಾ ಸಾಸುವೆ ನೆಡಿ।', icon: '🌱' },
        { title: 'ಕನಿಷ್ಠ ಉಳುಮೆ', description: 'ಮಣ್ಣಿನ ರಚನೆ ಮತ್ತು ಎರೆಹುಳುಗಳನ್ನು ಸಂರಕ್ಷಿಸಲು ಉಳುಮೆ ಕಡಿಮೆ ಮಾಡಿ।', icon: '🚜' },
        { title: 'ಮಲ್ಚಿಂಗ್', description: 'ತೇವಾಂಶ ಉಳಿಸಲು ಮತ್ತು ನೈಸರ್ಗಿಕವಾಗಿ ಸಾವಯವ ಪದಾರ್ಥ ಸೇರಿಸಲು ಬೆಳೆ ಅವಶೇಷ ಹರಡಿ।', icon: '🍂' },
        { title: 'ಎರೆಹುಳು ಸಾಕಣೆ', description: 'ಎರೆಹುಳುಗಳನ್ನು ಪರಿಚಯಿಸಿ - ಪ್ರಕೃತಿಯ ಮಣ್ಣಿನ ಎಂಜಿನಿಯರ್ಗಳು. ಅವು ಗಾಳಿ ಮತ್ತು ಫಲವತ್ತತೆ ಸುಧಾರಿಸುತ್ತವೆ।', icon: '🪱' },
      ],
      sandy: [
        { title: 'ಸಾವಯವ ಪದಾರ್ಥ ಸೇರಿಸಿ', description: 'ನೀರು ಧಾರಣ ಸುಧಾರಿಸಲು ಗೊಬ್ಬರ ಅಥವಾ ಹಸುವಿನ ಗೊಬ್ಬರ ಬೆರೆಸಿ। ಮರಳು ಮಣ್ಣಿಗೆ ಬಂಧನ ಬೇಕು।', icon: '💧' },
      ],
      clay: [
        { title: 'ಒಳಚರಂಡಿ ಸುಧಾರಿಸಿ', description: 'ಮರಳು ಮತ್ತು ಸಾವಯವ ಪದಾರ್ಥ ಸೇರಿಸಿ। ಆಳವಾದ ಬೇರುಗಳ ಬೆಳೆಗಳಿಂದ ಸಂಕುಚಿತ ಪದರಗಳನ್ನು ಮುರಿಯಿರಿ।', icon: '🌊' },
      ],
    },
  };

  const langImprovements = improvements[language];
  const result = [...langImprovements.common];

  if (soilType === 'sandy' && langImprovements.sandy) {
    result.push(...langImprovements.sandy);
  } else if (soilType === 'clay' && langImprovements.clay) {
    result.push(...langImprovements.clay);
  }

  return result;
};
