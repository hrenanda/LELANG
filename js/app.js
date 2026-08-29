// ===== DATA STORE =====
const DB_KEY = 'lelang_multinet_db';

function getDB() {
  const raw = localStorage.getItem(DB_KEY);
  if (!raw) {
    const defaultDB = {
      users: [
        { id: 'ADM001', name: 'Admin Utama', email: 'admin@multinet.co.id', password: 'admin123', role: 'admin', status: 'active', deposit: 0, createdAt: '2026-08-01' },
        { id: 'MBR001', name: 'Budi Santoso', email: 'budi@email.com', password: 'pass123', role: 'member', status: 'verified', deposit: 5000000, ktp: '3201234567890001', npwp: '123456789012345678', phone: '08123456789', createdAt: '2026-08-10' },
        { id: 'MBR002', name: 'Siti Rahayu', email: 'siti@email.com', password: 'pass123', role: 'member', status: 'pending', deposit: 0, ktp: '3201234567890002', npwp: '', phone: '08234567890', createdAt: '2026-08-15' }
      ],
      vehicles: [
        { id: 'V001', name: 'Toyota Avanza 1.5 G', year: 2022, km: 35000, grade: 'A', bpkb: 'Lengkap', stnk: 'Aktif', location: 'Jakarta Utara', img: '🚗', imageUrl: 'https://picsum.photos/seed/avanza/600/400', startPrice: 120000000, currentPrice: 135000000, increment: 500000, status: 'live', bidEnd: Date.now() + 3600000, bids: [{ bidder: 'Budi Santoso', amount: 135000000, time: Date.now() - 120000 }] },
        { id: 'V002', name: 'Honda Brio RS', year: 2023, km: 15000, grade: 'A', bpkb: 'Lengkap', stnk: 'Aktif', location: 'Jakarta Selatan', img: '🚙', imageUrl: 'https://picsum.photos/seed/brio/600/400', startPrice: 150000000, currentPrice: 150000000, increment: 500000, status: 'live', bidEnd: Date.now() + 7200000, bids: [] },
        { id: 'V003', name: 'Mitsubishi Xpander Ultimate', year: 2021, km: 52000, grade: 'B', bpkb: 'Lengkap', stnk: 'Aktif', location: 'Tangerang', img: '🚐', imageUrl: 'https://picsum.photos/seed/xpander/600/400', startPrice: 180000000, currentPrice: 192500000, increment: 500000, status: 'live', bidEnd: Date.now() + 1800000, bids: [{ bidder: 'Budi Santoso', amount: 190000000, time: Date.now() - 300000 }, { bidder: 'Andi Wijaya', amount: 192500000, time: Date.now() - 60000 }] },
        { id: 'V004', name: 'Suzuki Ertiga GL', year: 2020, km: 68000, grade: 'C', bpkb: 'Proses', stnk: 'Aktif', location: 'Bekasi', img: '🚕', imageUrl: 'https://picsum.photos/seed/ertiga/600/400', startPrice: 100000000, currentPrice: 108000000, increment: 500000, status: 'live', bidEnd: Date.now() + 900000, bids: [{ bidder: 'Rina Marlina', amount: 108000000, time: Date.now() - 600000 }] },
        { id: 'V005', name: 'Toyota Innova Reborn VRZ', year: 2023, km: 22000, grade: 'A', bpkb: 'Lengkap', stnk: 'Aktif', location: 'Jakarta Pusat', img: '🚌', imageUrl: 'https://picsum.photos/seed/innova/600/400', startPrice: 320000000, currentPrice: 320000000, increment: 1000000, status: 'upcoming', bidEnd: Date.now() + 86400000, bids: [] },
        { id: 'V006', name: 'Daihatsu Terios R', year: 2022, km: 41000, grade: 'B', bpkb: 'Lengkap', stnk: 'Aktif', location: 'Depok', img: '🏎️', imageUrl: 'https://picsum.photos/seed/terios/600/400', startPrice: 170000000, currentPrice: 170000000, increment: 500000, status: 'upcoming', bidEnd: Date.now() + 172800000, bids: [] },
        { id: 'V007', name: 'Honda HR-V Prestige', year: 2021, km: 45000, grade: 'B', bpkb: 'Lengkap', stnk: 'Aktif', location: 'Tangerang Selatan', img: '🚗', imageUrl: 'https://picsum.photos/seed/hrv/600/400', startPrice: 250000000, currentPrice: 265000000, increment: 500000, status: 'ended', bidEnd: Date.now() - 3600000, bids: [{ bidder: 'Budi Santoso', amount: 265000000, time: Date.now() - 7200000 }] },
        { id: 'V008', name: 'Wuling Cortez CT', year: 2022, km: 30000, grade: 'A', bpkb: 'Lengkap', stnk: 'Aktif', location: 'Jakarta Barat', img: '🚐', imageUrl: 'https://picsum.photos/seed/cortez/600/400', startPrice: 200000000, currentPrice: 200000000, increment: 500000, status: 'upcoming', bidEnd: Date.now() + 259200000, bids: [] }
      ],
      transactions: [
        { id: 'TX001', userId: 'MBR001', vehicleId: 'V007', amount: 265000000, fee: 5000000, tax: 26500000, status: 'paid', createdAt: '2026-08-20' },
        { id: 'TX002', userId: 'MBR001', vehicleId: 'V001', amount: 0, fee: 0, tax: 0, status: 'pending', createdAt: '2026-08-28' }
      ]
    };
    localStorage.setItem(DB_KEY, JSON.stringify(defaultDB));
    return defaultDB;
  }
  return JSON.parse(raw);
}

function saveDB(db) { localStorage.setItem(DB_KEY, JSON.stringify(db)); }

// ===== AUTO-SAVE TRIGGER =====
const AUTO_SAVE_KEY = 'lelang_autosave_enabled';
let autoSaveEnabled = true;
let autoSaveTimeout = null;

// Check auto-save setting
function isAutoSaveEnabled() {
  const setting = localStorage.getItem(AUTO_SAVE_KEY);
  if (setting === null) return true; // default enabled
  return setting === 'true';
}

function setAutoSaveEnabled(enabled) {
  autoSaveEnabled = enabled;
  localStorage.setItem(AUTO_SAVE_KEY, enabled.toString());
}

// Auto-save function - triggered after each data change
function autoSaveDB() {
  // Clear previous timeout to debounce
  if (autoSaveTimeout) clearTimeout(autoSaveTimeout);
  
  // Show saving indicator
  showAutoSaveIndicator('saving');
  
  // Debounce - wait 500ms after last change
  autoSaveTimeout = setTimeout(() => {
    try {
      // Get current data
      const db = getDB();
      const hero = getHeroContent();
      
      // Save to localStorage (already done by saveDB, but ensure)
      localStorage.setItem(DB_KEY, JSON.stringify(db));
      localStorage.setItem(HERO_KEY, JSON.stringify(hero));
      
      // Save auto-save timestamp
      localStorage.setItem('lelang_last_autosave', new Date().toISOString());
      
      // Show success indicator
      showAutoSaveIndicator('saved');
      
      console.log('[AutoSave] Data tersimpan:', new Date().toLocaleTimeString('id-ID'));
    } catch (err) {
      console.error('[AutoSave] Error:', err);
      showAutoSaveIndicator('error');
    }
  }, 500);
}

// Show auto-save indicator
function showAutoSaveIndicator(status) {
  let indicator = document.getElementById('autoSaveIndicator');
  
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'autoSaveIndicator';
    indicator.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 20px;
      padding: 8px 16px;
      border-radius: 50px;
      font-size: .75rem;
      font-weight: 600;
      z-index: 9999;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    `;
    document.body.appendChild(indicator);
  }
  
  const styles = {
    saving: { bg: '#dbeafe', color: '#1e40af', text: '💾 Menyimpan...' },
    saved: { bg: '#d1fae5', color: '#065f46', text: '✅ Tersimpan' },
    error: { bg: '#fee2e2', color: '#991b1b', text: '❌ Gagal menyimpan' }
  };
  
  const s = styles[status] || styles.saved;
  indicator.style.background = s.bg;
  indicator.style.color = s.color;
  indicator.innerHTML = s.text;
  indicator.style.opacity = '1';
  indicator.style.transform = 'translateY(0)';
  
  // Hide after 2 seconds for saved status
  if (status === 'saved') {
    setTimeout(() => {
      indicator.style.opacity = '0';
      indicator.style.transform = 'translateY(20px)';
    }, 2000);
  }
}

// Get last auto-save time
function getLastAutoSaveTime() {
  const time = localStorage.getItem('lelang_last_autosave');
  if (!time) return 'Belum ada auto-save';
  return new Date(time).toLocaleString('id-ID');
}

// Auto-export to file after each change (optional - can be toggled)
function autoExportToFile() {
  if (!isAutoSaveEnabled()) return;
  
  // Only auto-export if there have been significant changes
  // This prevents too many downloads
  const lastExport = localStorage.getItem('lelang_last_autoexport');
  const now = Date.now();
  
  // Minimum 30 seconds between auto-exports
  if (lastExport && (now - parseInt(lastExport)) < 30000) return;
  
  try {
    const db = getDB();
    const hero = getHeroContent();
    const exportData = {
      version: '1.0',
      exportDate: new Date().toISOString(),
      database: db,
      heroContent: hero,
      autoExported: true
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Store as downloadable URL (don't auto-download to avoid spam)
    localStorage.setItem('lelang_last_export_url', url);
    localStorage.setItem('lelang_last_autoexport', now.toString());
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 60000);
  } catch (err) {
    console.error('[AutoExport] Error:', err);
  }
}

// Wrapper function to save and auto-save
function saveAndAutoSave(db) {
  saveDB(db);
  autoSaveDB();
}

// ===== EXPORT/IMPORT DATABASE =====
const DB_BACKUP_KEY = 'lelang_multinet_backup';
const HERO_KEY = 'lelang_hero_content';

// Export database to txt file (JSON format)
function exportDatabase() {
  const db = getDB();
  const hero = getHeroContent();
  const exportData = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    database: db,
    heroContent: hero
  };
  
  const dataStr = JSON.stringify(exportData, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `lelang_backup_${new Date().toISOString().slice(0,10)}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  // Save backup timestamp
  localStorage.setItem(DB_BACKUP_KEY, new Date().toISOString());
  
  return true;
}

// Import database from txt file
function importDatabase(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      try {
        const importData = JSON.parse(e.target.result);
        
        if (!importData.database || !importData.version) {
          reject('Format file tidak valid');
          return;
        }
        
        // Validate structure
        const db = importData.database;
        if (!db.users || !db.vehicles || !db.transactions) {
          reject('Struktur database tidak valid');
          return;
        }
        
        // Save to localStorage
        localStorage.setItem(DB_KEY, JSON.stringify(db));
        
        // Import hero content if exists
        if (importData.heroContent) {
          localStorage.setItem(HERO_KEY, JSON.stringify(importData.heroContent));
        }
        
        // Save import timestamp
        localStorage.setItem(DB_BACKUP_KEY, new Date().toISOString());
        
        resolve({
          users: db.users.length,
          vehicles: db.vehicles.length,
          transactions: db.transactions.length,
          importDate: importData.exportDate
        });
      } catch (err) {
        reject('Gagal membaca file: ' + err.message);
      }
    };
    reader.onerror = function() {
      reject('Gagal membaca file');
    };
    reader.readAsText(file);
  });
}

// Auto-save to backup every 5 minutes
setInterval(() => {
  const db = getDB();
  localStorage.setItem('lelang_autosave', JSON.stringify({
    timestamp: Date.now(),
    data: db
  }));
}, 300000);

// Get last backup time
function getLastBackupTime() {
  const time = localStorage.getItem(DB_BACKUP_KEY);
  if (!time) return 'Belum pernah di-backup';
  return new Date(time).toLocaleString('id-ID');
}

// Reset database to default
function resetDatabase() {
  localStorage.removeItem(DB_KEY);
  localStorage.removeItem(HERO_KEY);
  localStorage.removeItem('lelang_autosave');
  localStorage.removeItem(DB_BACKUP_KEY);
}

function genId(prefix) {
  return prefix + String(Date.now()).slice(-6) + Math.floor(Math.random() * 100);
}

// ===== SESSION =====
function setCurrentUser(user) { sessionStorage.setItem('lelang_user', JSON.stringify(user)); }
function getCurrentUser() { const u = sessionStorage.getItem('lelang_user'); return u ? JSON.parse(u) : null; }
function logout() { sessionStorage.removeItem('lelang_user'); window.location.href = 'index.html'; }

// ===== TOAST =====
function showToast(msg, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: '🔄' };
  toast.innerHTML = `<span>${icons[type] || ''}</span><span class="toast-msg">${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(40px)'; setTimeout(() => toast.remove(), 300); }, 3500);
}

// ===== FORMAT CURRENCY =====
function formatRp(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

// ===== AUTO-SYNC BETWEEN TABS =====
let lastDataHash = '';
function getDataHash() {
  return localStorage.getItem(DB_KEY) || '';
}

function checkForUpdates() {
  const currentHash = getDataHash();
  if (lastDataHash && currentHash !== lastDataHash) {
    // Data changed in another tab!
    showToast('Data baru diperbarui dari panel admin.', 'info');
    setTimeout(() => location.reload(), 800);
  }
  lastDataHash = currentHash;
}

// Listen for storage changes from other tabs
window.addEventListener('storage', function(e) {
  if (e.key === DB_KEY && e.newValue) {
    showToast('Data lelang diperbarui! Memuat ulang...', 'info');
    setTimeout(() => location.reload(), 600);
  }
  if (e.key === HERO_KEY && e.newValue) {
    if (typeof loadHeroContent === 'function') {
      loadHeroContent();
    }
  }
});

// Periodic check every 2 seconds (for same-tab updates)
setInterval(checkForUpdates, 2000);

// Initialize hash on page load
lastDataHash = getDataHash();

// Show sync notification badge
function showSyncBadge() {
  if (document.querySelector('.sync-badge')) return;
  const badge = document.createElement('div');
  badge.className = 'sync-badge';
  badge.innerHTML = '🔄';
  badge.style.cssText = 'position:fixed;bottom:20px;right:20px;width:44px;height:44px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-size:1.2rem;box-shadow:var(--shadow-lg);z-index:9998;cursor:pointer;animation:pulse 2s infinite;';
  badge.title = 'Auto-sync aktif';
  badge.onclick = () => location.reload();
  document.body.appendChild(badge);
}
if (document.readyState === 'complete') showSyncBadge();
else window.addEventListener('load', showSyncBadge);

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 10);
});

// ===== AUTH GUARD =====
function requireAuth() {
  const user = getCurrentUser();
  if (!user) { window.location.href = 'login.html'; return null; }
  return user;
}

function requireAdmin() {
  const user = requireAuth();
  if (user && user.role !== 'admin') { window.location.href = 'dashboard.html'; return null; }
  return user;
}

// ===== TIMER HELPERS =====
function formatTimer(ms) {
  if (ms <= 0) return '00:00:00';
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

// ===== ANIMATE NUMBERS =====
function animateNum(el, target, duration = 800) {
  const start = parseInt(el.textContent.replace(/\D/g, '')) || 0;
  const diff = target - start;
  const startTime = performance.now();
  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatRp(Math.round(start + diff * eased));
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ===== HERO CONTENT MANAGEMENT =====

function getDefaultHero() {
  return {
    badge: 'Lelang Sedang Berlangsung',
    title: 'Platform Lelang <span>Kendaraan</span> Terpercaya',
    description: 'Sistem lelang aset kendaraan yang transparan, cepat, dan efisien. Bergabung sebagai member untuk mengikuti lelang mobil pilihan Anda secara real-time.',
    companyName: 'PT Multinet Perkasa',
    liveCount: '4',
    memberCount: '1,248',
    totalValue: '47jt',
    transCount: '23 Terjual',
    progressPercent: 75
  };
}

function getHeroContent() {
  const raw = localStorage.getItem(HERO_KEY);
  if (!raw) {
    const defaultHero = getDefaultHero();
    localStorage.setItem(HERO_KEY, JSON.stringify(defaultHero));
    return defaultHero;
  }
  return JSON.parse(raw);
}

function saveHeroContent(hero) {
  localStorage.setItem(HERO_KEY, JSON.stringify(hero));
  autoSaveDB(); // Trigger auto-save when hero content changes
}

function loadHeroContent() {
  const hero = getHeroContent();
  const badge = document.getElementById('heroBadgeText');
  const title = document.getElementById('heroTitle');
  const desc = document.getElementById('heroDesc');
  const companyName = document.querySelector('.hero-card h4');
  const liveCount = document.getElementById('heroLiveCount');
  const memberCount = document.getElementById('heroMemberCount');
  const totalValue = document.getElementById('heroTotalValue');
  const transCount = document.getElementById('heroTransCount');
  const progressFill = document.querySelector('.hero-progress .progress-fill');

  if (badge) badge.textContent = hero.badge;
  if (title) title.innerHTML = hero.title;
  if (desc) desc.textContent = hero.description;
  if (companyName) companyName.textContent = hero.companyName;
  if (liveCount) liveCount.textContent = hero.liveCount;
  if (memberCount) memberCount.textContent = hero.memberCount;
  if (totalValue) totalValue.textContent = hero.totalValue;
  if (transCount) transCount.textContent = hero.transCount;
  if (progressFill) progressFill.style.width = hero.progressPercent + '%';
}
