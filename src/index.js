/**
 * DevOps Pipeline Demo
 * Ana Uygulama Dosyası
 * 
 * Bu dosya Express.js tabanlı basit bir API sunar.
 */

const express = require('express');
const dotenv = require('dotenv');

// Ortam değişkenlerini .env dosyasından yükle
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 1. Ana Endpoint - Modern DevOps Dashboard
/**
 * @api {get} / Ana sayfa - Dashboard UI
 */
app.get('/', (req, res) => {
    // Tarayıcıdan geliyorsa HTML gönder
    if (req.accepts('html')) {
        return res.send(`
            <!DOCTYPE html>
            <html lang="tr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>DevOps Pipeline Demo 10. | Dashboard</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap" rel="stylesheet">
                <style>
                    body { font-family: 'Outfit', sans-serif; background: #0f172a; color: #f8fafc; }
                    .glass { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); }
                    .gradient-text { background: linear-gradient(90deg, #38bdf8, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                    .pulse-green { animation: pulse 2s infinite; }
                    @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
                </style>
            </head>
            <body class="min-h-screen flex items-center justify-center p-6">
                <div class="max-w-4xl w-full">
                    <div class="glass rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                        <div class="absolute top-0 right-0 p-4">
                            <span class="flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wider">
                                <span class="w-2 h-2 bg-green-400 rounded-full pulse-green"></span> Live System
                            </span>
                        </div>
                        
                        <header class="mb-12">
                            <h1 class="text-4xl md:text-5xl font-bold gradient-text mb-4">DevOps Pipeline Demo 10.</h1>
                            <p class="text-slate-400 text-lg">Modern Yazılım Dağıtım Süreçleri ve Konteynerizasyon Test Ortamı</p>
                        </header>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <div class="glass p-6 rounded-2xl border-blue-500/20">
                                <h3 class="text-blue-400 font-semibold mb-2">Build Information</h3>
                                <div class="space-y-2 text-sm">
                                    <p class="flex justify-between"><span class="text-slate-500">Node Environment:</span> <span class="font-mono text-blue-300 uppercase">${process.env.NODE_ENV || 'development'}</span></p>
                                    <p class="flex justify-between"><span class="text-slate-500">API Port:</span> <span class="font-mono text-blue-300">${PORT}</span></p>
                                    <p class="flex justify-between"><span class="text-slate-500">Build Time:</span> <span class="font-mono text-slate-300">2026-04-27</span></p>
                                </div>
                            </div>
                            <div class="glass p-6 rounded-2xl border-purple-500/20">
                                <h3 class="text-purple-400 font-semibold mb-2">Quick Stats</h3>
                                <div class="space-y-2 text-sm">
                                    <p class="flex justify-between"><span class="text-slate-500">Uptime:</span> <span class="text-slate-300">${Math.floor(process.uptime())}s</span></p>
                                    <p class="flex justify-between"><span class="text-slate-500">Health Status:</span> <span class="text-green-400 font-bold">Healty</span></p>
                                    <p class="flex justify-between"><span class="text-slate-500">Platform:</span> <span class="text-slate-300">Docker Optimized</span></p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <h3 class="text-slate-300 font-semibold px-1">Health Check Endpoints</h3>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <a href="/healthz" class="glass hover:bg-slate-800 transition p-4 rounded-xl flex items-center justify-between group">
                                    <span>Liveness Probe (/healthz)</span>
                                    <span class="text-blue-400 group-hover:translate-x-1 transition">→</span>
                                </a>
                                <a href="/readyz" class="glass hover:bg-slate-800 transition p-4 rounded-xl flex items-center justify-between group">
                                    <span>Readiness Probe (/readyz)</span>
                                    <span class="text-blue-400 group-hover:translate-x-1 transition">→</span>
                                </a>
                            </div>
                        </div>

                        <footer class="mt-12 pt-8 border-t border-slate-800 text-slate-500 text-xs flex justify-between items-center">
                            <p>© 2026 DevOps Pipeline Demo - Educational Project</p>
                            <div class="flex gap-4">
                                <span>Docker</span>
                                <span>GitHub Actions</span>
                                <span>CI/CD</span>
                            </div>
                        </footer>
                    </div>
                </div>
            </body>
            </html>
        `);
    }
    
    // API isteği ise JSON döndür
    res.status(200).json({
        message: "DevOps Pipeline Demo çalışıyor",
        status: "success"
    });
});

// 2. Health Check (Sağlık Kontrolü)
/**
 * @api {get} /healthz Uygulamanın sağlıklı olup olmadığını kontrol eder
 */
app.get('/healthz', (req, res) => {
    // Burada veritabanı bağlantısı gibi kontroller yapılabilir
    res.status(200).json({ status: "healthy" });
});

// 3. Readiness Check (Hazır Olma Kontrolü)
/**
 * @api {get} /readyz Uygulamanın trafik almaya hazır olup olmadığını kontrol eder
 */
app.get('/readyz', (req, res) => {
    // Burada bağımlılıkların (DB, Cache vb.) hazır olup olmadığı kontrol edilir
    res.status(200).json({ status: "ready" });
});

// Sunucuyu başlat (Eğer bu dosya direkt çalıştırılıyorsa)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Sunucu ${PORT} portunda çalışıyor...`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
}

// Testler için app nesnesini dışa aktar
module.exports = app;
