
import { GeneratedScript, Platform, SavedScript } from "../types";

const STORAGE_KEY = 'saved_scripts_v1';
const API_KEY_STORAGE = 'gemini_user_api_key';

// --- Script Storage ---

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

  const existingData = getSavedScripts();
  const newData = [newScript, ...existingData];
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  } catch (e) {
    console.error("Gagal menyimpan ke local storage (mungkin penuh)", e);
  }

  return newScript;
};

export const getSavedScripts = (): SavedScript[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error parsing saved scripts", e);
    return [];
  }
};

export const deleteSavedScript = (id: string): SavedScript[] => {
  const current = getSavedScripts();
  const updated = current.filter(script => script.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

// --- API Key Storage (BYOK) ---

export const getStoredApiKey = (): string | null => {
  return localStorage.getItem(API_KEY_STORAGE);
};

export const saveStoredApiKey = (key: string) => {
  localStorage.setItem(API_KEY_STORAGE, key);
};

export const removeStoredApiKey = () => {
  localStorage.removeItem(API_KEY_STORAGE);
};
