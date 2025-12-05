
export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export type Platform = 'tiktok' | 'youtube_shorts' | 'instagram_reels' | 'youtube_long' | 'facebook_post' | 'general';

export const PLATFORM_LABELS: Record<Platform, string> = {
  tiktok: 'TikTok',
  youtube_shorts: 'YouTube Shorts',
  instagram_reels: 'Instagram Reels',
  youtube_long: 'YouTube Video (Long)',
  facebook_post: 'Facebook/IG Post',
  general: 'Semua Platform (Umum)',
};

export type ScriptDuration = '5s' | '15s' | '25s' | '35s' | '45s' | '1m' | '2m' | '5m' | '10m';

export type AudienceType = 'Gen Z / Anak Muda' | 'Millennials / Dewasa Muda' | 'Profesional / Bisnis' | 'Ibu-ibu / Parenting' | 'Umum / Semua Kalangan' | 'Pelajar / Mahasiswa';
export type ToneType = 'Santai & Lucu' | 'Serius & Edukatif' | 'Antusias & Ceria' | 'Tegas & To-the-point' | 'Emosional & Storytelling' | 'Sarkas & Menggelitik';
export type ContentGoal = 'Viral / Views (Broad)' | 'Jualan (Hard Sell)' | 'Edukasi / Save' | 'Interaksi / Komen' | 'Followers Baru' | 'Klik Link di Bio';

export interface ScriptOptions {
  useCustomAudience: boolean;
  audience: AudienceType;
  tone: ToneType;
  useCustomGoal: boolean;
  goal: ContentGoal;
  useMagicHook: boolean;
}

export interface StoryboardScene {
  sceneNumber: number;
  color: 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'black';
  narration: string;
}

export interface GeneratedScript {
  coverTitle: string;
  hookUsed: string;
  alternativeHooks?: string[]; // Array of alternative hooks from DB
  scriptContent: string;
  visualStoryboard: StoryboardScene[];
  caption: string;
  hashtags: string[];
}

// Interface untuk data yang disimpan di Folder
export interface SavedScript extends GeneratedScript {
  id: string;
  topic: string;
  platform: Platform;
  createdAt: number; // timestamp
}

export interface ScriptGeneratorProps {
  selectedPlatform: Platform;
  onGenerate: (topic: string, duration: ScriptDuration, options: ScriptOptions, image?: string) => Promise<void>;
  onRegenerateWithHook: (hook: string) => Promise<void>;
  onVersionChange: (index: number) => void;
  isGenerating: boolean;
  results: GeneratedScript[]; // Changed from single result to array for versions
  activeVersionIndex: number;
  error: string | null;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  image?: string;
  isError?: boolean;
}

export interface ChatProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (message: string, image?: string) => void;
  selectedPlatform: Platform;
}
