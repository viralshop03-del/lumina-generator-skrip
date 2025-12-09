
// DATABASE HOOK (Hardcoded for single-file efficiency)
const HOOK_DATABASE = `
1. "Pernahkah kamu merasa _______? Aku juga! Tapi setelah _______ semuanya berubah."
2. "Jika kamu sedang mencari cara untuk _______ tanpa harus ________, coba cara ini!"
3. "Aku dulu juga merasa _______ sampai akhirnya menemukan _______ yang benar-benar mengubah segalanya."
4. "Kamu mungkin sudah mencoba banyak cara untuk _______ tapi hasilnya tetap _______. Ini yang seharusnya kamu coba!"
5. "Tidak perlu lagi merasa _______ atau _______! Karena kamu bisa _______ dengan cara yang lebih mudah."
6. "Ada satu kesalahan besar yang sering dilakukan orang saat _______. Jangan lakukan ini jika kamu ingin _______!"
7. "Saya tahu kamu pasti ingin _______ tanpa harus _______. Begini caranya!"
8. "Tidak percaya bisa _______ dalam waktu singkat? Ini dia buktinya!"
9. "Apa yang terjadi jika kamu mulai _______ setiap hari? Hasilnya mungkin akan mengejutkanmu!"
10. "Jika kamu ingin _______ tapi merasa _______, ini cara yang bisa kamu coba untuk mengubahnya."
11. "Mungkin kamu sudah merasa _______ karena _______. Tapi ternyata ada cara yang jauh lebih mudah untuk _______!"
12. "Kamu tahu nggak kalau _______ bisa jadi alasan utama kenapa _______ nggak berhasil?"
13. "Ini adalah kesalahan yang sering orang lakukan saat _______ dan inilah cara menghindarinya agar kamu bisa _______!"
14. "Jangan tunggu sampai _______ terjadi, mulai sekarang juga untuk _______!"
15. "Kamu pasti berpikir _______ itu susah, tapi lihat orang-orang yang sudah _______ dengan cara ini!"
16. "Kenapa kamu harus mulai _______ sekarang juga? Karena dengan cara ini, kamu bisa _______ dalam waktu singkat!"
17. "Apakah kamu tahu cara _______ yang benar? Kalau belum, kamu akan ketinggalan kesempatan untuk _______!"
18. "Bukan masalah seberapa banyak waktu yang kamu punya, tapi bagaimana cara kamu _______ untuk _______!"
19. "Mau tahu rahasia orang sukses dalam _______? Mereka tidak melakukan _______! Ini yang mereka lakukan."
20. "Jika kamu ingin _______ dalam waktu singkat, ini adalah satu hal yang harus kamu mulai hari ini!"
21. "Jika kamu merasa _______ akhir-akhir ini, kamu bukan sendirian. Banyak orang yang mengalami hal yang sama."
22. "Pernahkah kamu berpikir kenapa _______ selalu terjadi padamu? Ini mungkin alasan yang tidak kamu duga!"
23. "Banyak orang merasa _______ karena _______. Tapi tahukah kamu bahwa hal tersebut bisa diatasi dengan hanya _______?"
24. "Salah satu alasan kenapa _______ sering gagal adalah karena kamu _______. Tapi ada cara mudah untuk mengubahnya!"
25. "Jika kamu ingin _______ lebih cepat, jangan lakukan ini! Lakukan _______ sebagai gantinya!"
26. "Kamu merasa _______ karena _______? Ini dia cara cepat untuk _______ tanpa harus _______!"
27. "Pernahkah kamu merasa seperti _______? Jangan khawatir, karena ada cara untuk _______ hanya dalam waktu singkat!"
28. "Mungkin kamu merasa sudah berusaha maksimal, tapi kenapa hasilnya tetap _______? Ini penyebabnya!"
29. "Sudah mencoba segalanya untuk _______ tapi tetap saja gagal? Coba lakukan ini dan lihat perubahannya!"
30. "Kamu merasa terjebak dalam _______? Ini dia langkah pertama yang harus kamu lakukan untuk keluar!"
31. "Kenapa kamu merasa _______ meski sudah melakukan _______? Ini alasan yang sering terlewat!"
32. "Mungkin kamu belum tahu, tapi _______ bisa mengubah cara pandangmu tentang _______ dalam sekejap!"
33. "Jika kamu ingin _______ lebih mudah, jangan lakukan ini! Lakukan _______ untuk hasil yang lebih cepat!"
34. "Apakah kamu merasa _______ saat _______? Jangan khawatir, kamu bisa mengatasi hal ini dengan _______!"
35. "Pernahkah kamu merasa seperti _______ meskipun sudah berusaha? Ini yang bisa kamu lakukan!"
36. "Jika kamu ingin _______ tanpa harus _______, coba lakukan _______ sebagai gantinya!"
37. "Kebanyakan orang merasa _______ karena _______ tanpa menyadari bahwa solusi sebenarnya adalah _______!"
38. "Kamu sudah mencoba _______ tapi tetap merasa _______? Coba langkah ini untuk merubah hasilnya!"
39. "Tahukah kamu bahwa _______ bisa jadi alasan kenapa _______ terjadi pada kamu? Ini cara memperbaikinya!"
40. "Jika kamu merasa _______ sekarang, kamu tidak sendirian. Banyak orang yang merasakan hal yang sama."
41. "Pernahkah kamu merasa _______ saat _______? Ini cara terbaik untuk mengubahnya dengan cepat."
42. "Jangan biarkan _______ menghalangimu untuk _______! Temukan rahasia untuk mengatasi hal itu dengan _______!"
43. "Ternyata, salah satu alasan kenapa kamu merasa _______ adalah karena _______! Begini cara mengatasinya!"
44. "Apakah kamu pernah mencoba _______? Jika belum, ini alasan kenapa kamu harus mencobanya sekarang!"
45. "Jika kamu ingin _______ lebih efektif, hindari melakukan _______ dan lakukan _______ sebagai gantinya!"
46. "Kamu merasa _______ meskipun sudah mencoba _______? Ini cara untuk keluar dari situasi itu dengan mudah!"
47. "Rahasia sukses yang jarang dibicarakan: _______! Ini alasan kenapa hal ini bisa mengubah segalanya!"
48. "Jika kamu merasa _______ dalam _______, coba lakukan ini dan lihat bagaimana hasilnya!"
49. "Apakah kamu tahu cara cepat untuk _______? Ini trik yang tidak banyak orang ketahui!"
50. "Kamu sering merasa _______ karena _______? Ini cara sederhana untuk mengubahnya dalam waktu singkat!"
51. "Apakah kamu merasa _______ saat _______? Ini langkah pertama yang harus kamu coba untuk mengubahnya!"
52. "Jangan biarkan _______ merusak _______! Coba cara ini agar _______ kamu bisa tetap terjaga!"
53. "Ketika kamu merasa _______ karena _______, ini cara tercepat untuk mengatasi perasaan itu!"
54. "Kamu pernah berpikir untuk _______? Coba ini, dan rasakan perbedaannya dalam waktu singkat!"
55. "Apakah kamu tahu cara untuk _______ lebih mudah? Ini trik yang tidak banyak orang ketahui!"
56. "Pernahkah kamu merasa _______ meskipun sudah berusaha keras? Ini alasan kenapa dan cara mengatasinya!"
57. "Jika kamu ingin _______ lebih cepat, coba hindari kesalahan ini yang banyak dilakukan orang!"
58. "Bosan dengan _______? Ini cara kreatif yang bisa mengubah segalanya dalam waktu singkat!"
59. "Kamu tidak perlu merasa _______ lagi! Ini trik mudah untuk mengubahnya dalam hitungan menit!"
60. "Ada cara baru untuk _______ yang lebih efektif dan cepat! Temukan rahasianya di sini!"
`;

// CLOUDFLARE WORKER ENTRY POINT
export async function onRequest(context) {
    // 1. Handle CORS (Allow all)
    if (context.request.method === "OPTIONS") {
        return new Response(null, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    }

    if (context.request.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
    }

    try {
        const { apiKey, topic, platform, duration, strategy, audience, specificHook } = await context.request.json();

        if (!apiKey || !topic) {
            return new Response(JSON.stringify({ error: "API Key and Topic are required" }), { status: 400 });
        }

        // --- PROMPT LOGIC ---
        let systemInstruction = "";
        let promptContent = "";

        if (strategy === 'disruptive') {
             // STRATEGY: R.A.P.E.D (Addictive Viral)
            const audienceContext = audience 
                ? `TARGET AUDIENCE: ${audience}` 
                : "TARGET: Analyze topic to match audience.";

            systemInstruction = `
            ROLE: You are the "ADDICTIVE VIDEO SCRIPT WRITER". Growth Hacker personality. Arrogant, Sharp, Genius.
            GOAL: Stop the scroll, spark emotion (Rage/Fear/Greed), drive retention.

            *** STRICT RULE: DO NOT USE THE STANDARD 'HOOK DATABASE'. CREATE YOUR OWN 'RAGE HOOK'. ***

            FRAMEWORK: R.A.P.E.D
            1. RAGE HOOK (0-3s): Attack excuses. Polarizing. NO "Hello guys".
            2. AMPLIFY PAIN (3-12s): Press the wound. Make them feel stupid for old ways.
            3. PIVOT SHOCK (12-18s): The Revelation.
            4. EVIDENCE BOMB (18-35s): Brutal facts/numbers.
            5. DOMINATE CLOSE (35-End): Scarcity + High Status CTA.

            AUDIENCE CALIBRATION:
            - Moms: "Bunda", Pain: Kids, Husband, Money. Tone: Emotional Guilt.
            - Gen Z: "Bro/Lu", Pain: FOMO, Status. Tone: Sarcastic.
            - Business: "Bang/Om", Pain: Career, Debt. Tone: Logical/Harsh.

            INJECT NUCLEAR WEAPONS (At least 1):
            - Guillotine Loop (Cut sentence at end).
            - False Ending ("Wait!").
            - Enemy Creation.

            OUTPUT FORMAT (JSON):
            {
                "coverTitle": "Clickbait Title",
                "hookUsed": "Rage Hook text",
                "scriptContent": "Spoken words only.",
                "visualStoryboard": [ { "sceneNumber": 1, "color": "red", "narration": "..." } ],
                "caption": "Caption text",
                "hashtags": ["tag1", "tag2"]
            }
            `;
            
            promptContent = `TOPIC: ${topic}. PLATFORM: ${platform}. DURATION: ${duration}. ${audienceContext}. EXECUTE R.A.P.E.D.`;

        } else if (strategy === 'contrarian') {
            // STRATEGY: CONTRARIAN (Brutal Truth)
            const hookInstr = specificHook ? `FORCE HOOK: "${specificHook}"` : `SELECT HOOK from DATABASE.`;
            
            systemInstruction = `
            ROLE: "Contrarian Content Strategist". Style: SHARP, BRUTAL TRUTH.
            1. HOOK: Use database hook, deliver with intensity.
            2. BODY: Attack excuses. Brutal Truth.
            3. SOLUTION: "Obat Keras".

            MANDATORY: ${hookInstr}. NO Visual cues in scriptContent. Fill visualStoryboard (~4s each).
            
            HOOK DATABASE:
            ${HOOK_DATABASE}

            OUTPUT FORMAT (JSON): Same as standard.
            `;
            promptContent = `TOPIC: ${topic}. PLATFORM: ${platform}. AUDIENCE: ${audience}. TONE: Menampar.`;

        } else {
            // STRATEGY: FASTERAPI (Standard)
            const hookInstr = specificHook ? `FORCE HOOK: "${specificHook}"` : `SELECT HOOK from DATABASE.`;

            systemInstruction = `
            ROLE: Expert Scriptwriter "MASTER FORMULA FASTERAPI".
            1. Inti Ide Tunggal.
            2. Garis PAS (Problem-Agitation-Solution).
            3. Filmic Flow.

            MANDATORY: ${hookInstr}. NO Visual cues in scriptContent. Fill visualStoryboard (~4s each).

            HOOK DATABASE:
            ${HOOK_DATABASE}

            OUTPUT FORMAT (JSON):
            {
                "coverTitle": "Title",
                "hookUsed": "Hook text",
                "alternativeHooks": ["Alt1", "Alt2"],
                "scriptContent": "Spoken text",
                "visualStoryboard": [{ "sceneNumber": 1, "color": "blue", "narration": "..." }],
                "caption": "Caption",
                "hashtags": ["tag1"]
            }
            `;
            promptContent = `TOPIC: ${topic}. PLATFORM: ${platform}. DURATION: ${duration}. AUDIENCE: ${audience}.`;
        }

        // --- CALL GOOGLE GEMINI API (REST) ---
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        
        const payload = {
            contents: [{ parts: [{ text: promptContent }] }],
            systemInstruction: { parts: [{ text: systemInstruction }] },
            generationConfig: { responseMimeType: "application/json" }
        };

        const apiResponse = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!apiResponse.ok) {
            const errData = await apiResponse.json();
            throw new Error(errData.error?.message || "Gemini API Error");
        }

        const data = await apiResponse.json();
        const generatedText = data.candidates[0].content.parts[0].text;
        
        return new Response(generatedText, {
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*" 
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { 
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        });
    }
}