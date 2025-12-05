import { GeneratedScript, Platform, SavedScript } from "../types";

const STORAGE_KEY = 'saved_scripts_v1';

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

  try {
    const existingData = getSavedScripts();
    const newData = [newScript, ...existingData];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  } catch (e) {
    console.error("Gagal menyimpan ke local storage (mungkin penuh atau diblokir)", e);
  }

  return newScript;
};

export const getSavedScripts = (): SavedScript[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Error parsing saved scripts or storage access denied", e);
    return [];
  }
};

export const deleteSavedScript = (id: string): SavedScript[] => {
  try {
    const current = getSavedScripts();
    const updated = current.filter(script => script.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Error deleting script", e);
    return [];
  }
};