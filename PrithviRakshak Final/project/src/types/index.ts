export type Language = 'english' | 'hindi' | 'kannada';

export interface SoilAnalysis {
  id: string;
  soil_type: string;
  fertility_level: 'low' | 'medium' | 'high';
  organic_content?: string;
  health_indicators: string[];
  location?: string;
  notes?: string;
  image_url?: string;
  created_at: string;
}

export interface CropRecommendation {
  id: string;
  analysis_id: string;
  crop_name: string;
  crop_name_local?: string;
  season?: string;
  rotation_year: number;
  benefits?: string;
}

export interface UserPreferences {
  id: string;
  language: Language;
}
