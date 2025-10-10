export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
  { code: 'ki', name: 'Kirundi', flag: '🇧🇮' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'lg', name: 'Luganda', flag: '🇺🇬' },
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['code'];


