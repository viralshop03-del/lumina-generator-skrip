import { GeneratedScript, Platform, SavedScript, ScriptDuration, ScriptOptions } from "../types";

const STORAGE_KEY_SCRIPTS = 'saved_scripts_v1';
const STORAGE_KEY_API = 'gemini_api_key_v1';
const STORAGE_KEY_SESSION = 'app_session_v1';

// --- API Key Management ---

export const saveApiKey = (key: string) => {
  try {
    localStorage.setItem(STORAGE_KEY_API, key);
  } catch (e) {
    console.error("Gagal menyimpan API Key", e);
  }
};

export const getApiKey = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY_API);
  } catch (e) {
    return null;
  }
};

export const removeApiKey = () => {
  try {
    localStorage.removeItem(STORAGE_KEY_API);
  } catch (e) {
    console.error("Gagal menghapus API Key", e);
  }
};

// --- Session Persistence (Anti-Refresh Loss) ---

interface AppSession {
  topic: string;
  duration: ScriptDuration;
  platform: Platform;
  options: ScriptOptions;
  results: GeneratedScript[];
  activeVersionIndex: number;
}

export const saveSession = (session: AppSession) => {
  try {
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
  } catch (e) {
    // Ignore silent errors
  }
};

export const getSession = (): AppSession | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SESSION);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
};

// --- Script History Storage ---

export const saveScriptToStorage = (
  topic: string,
  platform: Platform,
  scriptData: GeneratedScript
): SavedScript => {
  const newScript: SavedScript = {
    ...scriptData,
    id: crypto.randomUUID(),
    topic,
    platform,
    createdAt: Date.now(),
  };

  try {
    const existingData = getSavedScripts();
    const newData = [newScript, ...existingData];
    localStorage.setItem(STORAGE_KEY_SCRIPTS, JSON.stringify(newData));
  } catch (e) {
    console.error("Gagal menyimpan ke local storage", e);
  }

  return newScript;
};

export const getSavedScripts = (): SavedScript[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_SCRIPTS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const deleteSavedScript = (id: string): SavedScript[] => {
  try {
    const current = getSavedScripts();
    const updated = current.filter(script => script.id !== id);
    localStorage.setItem(STORAGE_KEY_SCRIPTS, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
};