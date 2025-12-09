// STATE MANAGEMENT
const app = {
    apiKey: null,
    currentPlatform: 'general',
    history: [],
    
    init: () => {
        // Load API Key
        app.apiKey = localStorage.getItem('gemini_api_key_v1');
        if (!app.apiKey) {
            document.getElementById('apiKeyModal').classList.remove('hidden');
            document.getElementById('mainContent').classList.add('blur-sm', 'pointer-events-none');
        } else {
            app.loadSession();
        }

        // Event Listeners for API Key Form
        document.getElementById('apiKeyForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const key = document.getElementById('inputApiKey').value.trim();
            if (key.startsWith('AIza')) {
                localStorage.setItem('gemini_api_key_v1', key);
                app.apiKey = key;
                document.getElementById('apiKeyModal').classList.add('hidden');
                document.getElementById('mainContent').classList.remove('blur-sm', 'pointer-events-none');
                app.showToast('Selamat Datang!', 'success');
            } else {
                alert('Format API Key salah. Harus diawali "AIza"');
            }
        });

        // Load History
        app.history = JSON.parse(localStorage.getItem('saved_scripts_v1') || '[]');
        app.setPlatform('general');
    },

    setPlatform: (platform) => {
        app.currentPlatform = platform;
        
        // Update UI Colors
        const container = document.getElementById('inputForm');
        container.className = `bg-gray-900 border-2 rounded-2xl p-6 shadow-2xl transition-colors duration-300 theme-${platform}`;
        
        // Update styling variables
        let color = 'indigo-500';
        if (platform === 'tiktok') color = '#FE2C55';
        if (platform === 'youtube_shorts') color = '#FF0000';
        if (platform === 'instagram_reels') color = '#E1306C';
        
        document.documentElement.style.setProperty('--main-theme', color);
        
        // Highlight active sidebar
        document.querySelectorAll('.nav-btn').forEach(btn => {
            if(btn.dataset.platform === platform) {
                btn.classList.add('bg-gray-800', 'text-white');
                btn.classList.remove('text-gray-300');
            } else {
                btn.classList.remove('bg-gray-800', 'text-white');
                btn.classList.add('text-gray-300');
            }
        });

        app.resetView();
    },

    resetView: () => {
        document.getElementById('generatorView').classList.remove('hidden');
        document.getElementById('historyView').classList.add('hidden');
        document.getElementById('resultContainer').classList.add('hidden');
        document.getElementById('topicInput').value = '';
    },

    showHistory: () => {
        document.getElementById('generatorView').classList.add('hidden');
        document.getElementById('historyView').classList.remove('hidden');
        const list = document.getElementById('historyList');
        list.innerHTML = '';

        app.history.forEach((script, idx) => {
            const card = document.createElement('div');
            card.className = 'bg-gray-900 border border-gray-800 p-4 rounded-xl hover:border-indigo-500 cursor-pointer relative group';
            card.innerHTML = `
                <div class="text-xs font-bold text-gray-500 mb-2">${script.platform} • ${new Date(script.createdAt).toLocaleDateString()}</div>
                <h3 class="font-bold text-white mb-2 line-clamp-2">${script.coverTitle}</h3>
                <p class="text-xs text-gray-400 italic line-clamp-1">"${script.hookUsed}"</p>
                <button onclick="event.stopPropagation(); app.deleteHistory(${idx})" class="absolute top-2 right-2 text-gray-600 hover:text-red-500">🗑️</button>
            `;
            card.onclick = () => app.loadScript(script);
            list.appendChild(card);
        });
    },

    loadScript: (script) => {
        app.setPlatform(script.platform);
        document.getElementById('topicInput').value = script.topic || '';
        app.renderResult(script);
        document.getElementById('generatorView').classList.remove('hidden');
        document.getElementById('historyView').classList.add('hidden');
    },

    deleteHistory: (index) => {
        if(confirm('Hapus skrip ini?')) {
            app.history.splice(index, 1);
            localStorage.setItem('saved_scripts_v1', JSON.stringify(app.history));
            app.showHistory();
        }
    },

    resetApiKey: () => {
        if(confirm('Reset API Key?')) {
            localStorage.removeItem('gemini_api_key_v1');
            location.reload();
        }
    },

    showToast: (msg, type = 'success') => {
        const toast = document.getElementById('toast');
        const msgEl = document.getElementById('toastMessage');
        msgEl.innerText = msg;
        toast.classList.remove('hidden');
        toast.className = `fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full shadow-2xl transition-all duration-300 ${type === 'success' ? 'bg-emerald-900 text-emerald-100' : 'bg-red-900 text-red-100'}`;
        setTimeout(() => toast.classList.add('hidden'), 3000);
    },

    // --- GENERATION LOGIC ---

    generate: async (specificHook = null) => {
        const topic = document.getElementById('topicInput').value;
        const btn = document.getElementById('generateBtn');
        const strategy = document.querySelector('input[name="strategy"]:checked').value;
        const audience = document.getElementById('audienceInput').value;
        const duration = document.getElementById('durationInput').value;

        if (!topic) return alert('Isi topik dulu!');

        btn.disabled = true;
        btn.innerText = 'MERACIK SKRIP...';

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    apiKey: app.apiKey,
                    topic,
                    platform: app.currentPlatform,
                    duration,
                    strategy,
                    audience,
                    specificHook
                })
            });

            const data = await res.json();
            
            if (data.error) throw new Error(data.error);

            // Add metadata for saving
            data.topic = topic;
            data.platform = app.currentPlatform;
            data.createdAt = Date.now();
            data.strategy = strategy;

            app.renderResult(data);
            
            // Save to history
            if (!specificHook) { // Don't duplicate history on hook variant
                app.history.unshift(data);
                localStorage.setItem('saved_scripts_v1', JSON.stringify(app.history));
            }

        } catch (err) {
            app.showToast(err.message, 'error');
        } finally {
            btn.disabled = false;
            btn.innerText = 'GENERATE SEKARANG ✨';
        }
    },

    renderResult: (data) => {
        document.getElementById('resultContainer').classList.remove('hidden');
        
        // Fill Text
        document.getElementById('resTitle').innerText = data.coverTitle;
        document.getElementById('resHook').innerText = `"${data.hookUsed}"`;
        document.getElementById('resContent').innerText = data.scriptContent;
        document.getElementById('resCaption').innerText = data.caption;
        
        // Hashtags
        const tagsDiv = document.getElementById('resHashtags');
        tagsDiv.innerHTML = data.hashtags.map(t => `<span class="text-xs bg-gray-900 px-2 py-1 rounded text-indigo-400">#${t.replace('#','')}</span>`).join('');

        // Magic Hooks
        const hookList = document.getElementById('magicHooksList');
        const hookCont = document.getElementById('magicHooksContainer');
        if (data.alternativeHooks && data.alternativeHooks.length > 0) {
            hookCont.classList.remove('hidden');
            hookList.innerHTML = data.alternativeHooks.map((hook, i) => `
                <button onclick="app.generate('${hook.replace(/'/g, "\\'")}')" class="w-full text-left p-2 rounded hover:bg-gray-800 text-sm text-gray-300 hover:text-white border border-transparent hover:border-indigo-500 transition-all">
                    <span class="font-bold text-indigo-500 mr-2">${i+1}.</span> "${hook}"
                </button>
            `).join('');
        } else {
            hookCont.classList.add('hidden');
        }

        // Storyboard
        const storyList = document.getElementById('storyboardList');
        storyList.innerHTML = data.visualStoryboard.map(s => {
            const colorMap = {
                blue: { border: 'border-blue-500', icon: '🟦' },
                green: { border: 'border-emerald-500', icon: '🟩' },
                orange: { border: 'border-orange-500', icon: '🟧' },
                red: { border: 'border-red-500', icon: '🟥' },
                purple: { border: 'border-purple-500', icon: '🟪' },
                black: { border: 'border-gray-500', icon: '⬛' }
            };
            const c = colorMap[s.color] || colorMap.blue;
            return `
                <div class="bg-gray-900 border-l-4 ${c.border} rounded-r-lg p-3">
                    <div class="text-xs font-bold mb-1 uppercase tracking-wider text-gray-500">${c.icon} SCENE ${s.sceneNumber}</div>
                    <p class="text-sm text-gray-300">"${s.narration}"</p>
                </div>
            `;
        }).join('');

        // Scroll to result
        document.getElementById('resultContainer').scrollIntoView({ behavior: 'smooth' });
    },

    copyScript: () => {
        const text = document.getElementById('resContent').innerText;
        navigator.clipboard.writeText(text);
        app.showToast('Naskah disalin!');
    },

    copyStoryboard: () => {
        const nodes = document.querySelectorAll('#storyboardList div');
        let text = "";
        nodes.forEach(n => {
            text += n.innerText + "\n\n";
        });
        navigator.clipboard.writeText(text);
        app.showToast('Storyboard disalin!');
    },

    // Session Persistence Helpers
    saveSession: () => { /* Logic simplified for vanilla */ },
    loadSession: () => { /* Logic simplified for vanilla */ }
};

// Initialize App
document.addEventListener('DOMContentLoaded', app.init);