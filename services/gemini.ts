import { GoogleGenAI } from "@google/genai";
import { Platform, PLATFORM_LABELS, ScriptDuration, GeneratedScript, ScriptOptions } from "../types";
import { HOOK_DATABASE } from "../data/hooks";

export const generateScript = async (
  apiKey: string,
  topic: string,
  duration: ScriptDuration,
  platform: Platform,
  options: ScriptOptions,
  imageBase64?: string,
  specificHook?: string
): Promise<GeneratedScript> => {
  
  if (!apiKey) {
    throw new Error("API Key tidak ditemukan. Silakan masukkan API Key Anda.");
  }

  // Gunakan API Key dari parameter user (BYOK)
  const ai = new GoogleGenAI({ apiKey });
  const modelId = 'gemini-2.5-flash';

  const parts: any[] = [];

  if (imageBase64) {
    const base64Data = imageBase64.includes('base64,') 
      ? imageBase64.split('base64,')[1] 
      : imageBase64;
      
    parts.push({
      inlineData: {
        mimeType: 'image/jpeg', 
        data: base64Data
      }
    });
  }

  // --- STRATEGY SELECTION LOGIC ---
  
  let systemInstruction = "";
  let promptContent = "";

  // 1. STRATEGY: DISRUPTIVE / ADDICTIVE VIRAL (R.A.P.E.D)
  // Fitur ini "Lepas Kandang": Tidak pakai Database Hook standar, Pake Logic Sendiri.
  if (options.strategy === 'disruptive') {
    
    const audienceContext = options.useCustomAudience 
      ? `TARGET: ${options.audience}` 
      : "TARGET: Analyze the topic to determine the best target (Gen Z vs Moms vs Business).";

    systemInstruction = `
    ROLE: You are the "ADDICTIVE VIDEO SCRIPT WRITER". 
    You are NOT a polite assistant. You are a Growth Hacker with a God Complex.
    Your goal is to stop the scroll, spark emotion (Rage/Fear/Greed), and drive massive retention.

    *** STRICT RULE: DO NOT USE THE STANDARD 'HOOK DATABASE'. YOU MUST CREATE YOUR OWN 'RAGE HOOK' BASED ON THE TOPIC. ***

    --- THE FORMULA: R.A.P.E.D FRAMEWORK (DO NOT DEVIATE) ---
    
    1. **RAGE HOOK (0-3s)**: 
       - Attack the viewer's excuse or mental block immediately. 
       - Use "Polarizing Statements". 
       - NO "Hello guys". NO "Welcome back".
       - Example: "Stop saying you're consistent if you still have 11 views!"
    
    2. **AMPLIFY PAIN (3-12s)**:
       - Press the wound. Use specific "Pain Points".
       - Make them feel stupid for doing it the old way.
    
    3. **PIVOT SHOCK (12-18s)**:
       - Sudden shift. "But wait...".
       - The "Revelation" that there is a way out (your solution).
    
    4. **EVIDENCE BOMB (18-35s)**:
       - Brutal facts, numbers, or logic that proves your point.
    
    5. **DOMINATE CLOSE (35-End)**:
       - Scarcity + High Status CTA.
       - "Comment X or stay poor."

    --- AUDIENCE CALIBRATION LOGIC ---
    Adjust your 'Diksi' (Word Choice) and 'Pain Trigger' based on the implied audience of the TOPIC:
    
    A. IF TARGET = IBU-IBU / MOMS:
       - Call them: "Bunda", "Moms".
       - Pain: Anak kalah saing, Suami selingkuh/bosen, Duit belanja kurang.
       - Tone: Emotional Guilt tripping.
    
    B. IF TARGET = GEN Z / MAHASISWA:
       - Call them: "Bro", "Lu", "Bestie".
       - Pain: FOMO, Gengsi (HP jelek), Temen lebih sukses, Kelihatan cupu.
       - Tone: Sarkas, Kasar, "Goblok" (use softly or implied).
    
    C. IF TARGET = PEBISNIS / KARYAWAN:
       - Call them: "Bro", "Bang", "Om".
       - Pain: Karir mentok, Cicilan numpuk, Cashflow macet, "Bapak Gagal".
       - Tone: Logical, Money-oriented, Harsh Truth.

    --- THE 7 NUCLEAR WEAPONS (INJECT AT LEAST ONE) ---
    1. **Guillotine Loop**: Cut the sentence at the very end. (e.g., "You will regret it because—" [Black Screen]).
    2. **False Ending**: Make it seem over, then scream "WAIT!".
    3. **Enemy Creation**: "Your friends are laughing at you right now."
    4. **Future Pacing Nightmare**: "Imagine 5 years from now, you are still stuck here."

    --- OUTPUT FORMAT ---
    - **Script Content**: ONLY spoken words. Short, punchy sentences.
    - **Visual Storyboard**: MUST BE CHAOTIC. 
      - Use terms like: [ZOOM BRUTAL], [LAYAR HITAM], [TEKS MERAH], [DISTORTION], [FLASH].
      - Change scenes every 2-3 seconds max (Fast pacing).
    `;

    promptContent = `
    TOPIC: ${topic}
    PLATFORM: ${PLATFORM_LABELS[platform]}
    DURATION: ${duration}
    ${audienceContext}
    
    EXECUTE THE R.A.P.E.D FRAMEWORK NOW.
    `;

  } 
  
  // 2. STRATEGY: CONTRARIAN (BRUTAL TRUTH)
  // Tetap pakai Database Hook, tapi body text-nya "Menampar".
  else if (options.strategy === 'contrarian') {
    
    let hookInstruction = specificHook 
      ? `FORCE HOOK: Use exactly "${specificHook}"` 
      : `SELECT HOOK: Choose the most PAINFUL/EMOTIONAL hook from the HOOK DATABASE provided below.`;

    systemInstruction = `
    ROLE: You are a "Contrarian Content Strategist".
    Style: SHARP, BRUTAL TRUTH, REALITY-SLAPPING.
    
    STRATEGY:
    1. HOOK: Use the database hook, but deliver it with intensity.
    2. BODY: Attack the "Excuse". Use "Brutal Truth". Explain why their old mindset is keeping them poor/stuck.
    3. SOLUTION: Offer "Obat Keras" (Hard Pill to Swallow).

    MANDATORY:
    - ${hookInstruction}
    - NO Visual cues in 'scriptContent'.
    - Fill 'visualStoryboard' with scenes (~4s each).
    - Duration: ${duration}.
    
    HOOK DATABASE:
    ${HOOK_DATABASE}
    `;

    promptContent = `
    TOPIC: ${topic}
    PLATFORM: ${PLATFORM_LABELS[platform]}
    DURATION: ${duration}
    AUDIENCE: ${options.audience}
    TONE: Tegas, Otoritatif, Menampar.
    `;

  } 
  
  // 3. STRATEGY: FASTERAPI (STANDARD)
  // Mode Default: Pakai Database Hook, Alur Filmic, Sopan/Standar.
  else {
    
    let hookInstruction = specificHook 
      ? `FORCE HOOK: Use exactly "${specificHook}"` 
      : `SELECT HOOK: Choose the best hook from the HOOK DATABASE provided below.`;

    systemInstruction = `
    ROLE: Expert Scriptwriter using "MASTER FORMULA FASTERAPI".
    
    STRATEGY:
    1. Inti Ide Tunggal.
    2. Garis PAS (Problem-Agitation-Solution).
    3. Filmic Flow (Hypnotic).

    MANDATORY:
    - ${hookInstruction}
    - NO Visual cues in 'scriptContent'.
    - Fill 'visualStoryboard' with scenes (~4s each).
    - Duration: ${duration}.

    HOOK DATABASE:
    ${HOOK_DATABASE}
    `;

    promptContent = `
    TOPIC: ${topic}
    PLATFORM: ${PLATFORM_LABELS[platform]}
    DURATION: ${duration}
    AUDIENCE: ${options.audience}
    TONE: ${options.tone}
    GOAL: ${options.goal}
    `;
  }

  // --- COMMON INSTRUCTIONS ---
  // JSON Schema enforcement for all strategies
  systemInstruction += `
  
  OUTPUT FORMAT (JSON ONLY):
  {
    "coverTitle": "Clickbait Title",
    "hookUsed": "The hook sentence used (or created)",
    "alternativeHooks": ["Alt 1", "Alt 2", "Alt 3"], 
    "scriptContent": "Full spoken narration string.",
    "visualStoryboard": [
      { "sceneNumber": 1, "color": "blue", "narration": "..." }
    ],
    "caption": "Post caption",
    "hashtags": ["tag1", "tag2"]
  }
  `;

  // --- EXECUTE API CALL ---
  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: [{ role: 'user', parts: [{ text: promptContent }] }],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: 'application/json'
      }
    });

    if (!response.text) {
      throw new Error("No response generated from Gemini.");
    }

    const jsonResponse = JSON.parse(response.text) as GeneratedScript;
    return jsonResponse;

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes('403') || error.message?.includes('API_KEY_INVALID')) {
        throw new Error("API Key tidak valid. Cek kembali key Anda.");
    }
    throw error;
  }
};