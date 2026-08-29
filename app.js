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
        { id: 'V001', name: 'Toyota Avanza 1.5 G', year: 2022, km: 35000, grade: 'A', bpkb: 'Lengkap', stnk: 'Aktif', location: 'Jakarta Utara', img: '🚗', startPrice: 120000000, currentPrice: 135000000, increment: 500000, status: 'live', bidEnd: Date.now() + 3600000, bids: [{ bidder: 'Budi Santoso', amount: 135000000, time: Date.now() - 120000 }] },
        { id: 'V002', name: 'Honda Brio RS', year: 2023, km: 15000, grade: 'A', bpkb: 'Lengkap', stnk: 'Aktif', location: 'Jakarta Selatan', img: '🚙', startPrice: 150000000, currentPrice: 150000000, increment: 500000, status: 'live', bidEnd: Date.now() + 7200000, bids: [] },
        { id: 'V003', name: 'Mitsubishi Xpander Ultimate', year: 2021, km: 52000, grade: 'B', bpkb: 'Lengkap', stnk: 'Aktif', location: 'Tangerang', img: '🚐', startPrice: 180000000, currentPrice: 192500000, increment: 500000, status: 'live', bidEnd: Date.now() + 1800000, bids: [{ bidder: 'Budi Santoso', amount: 190000000, time: Date.now() - 300000 }, { bidder: 'Andi Wijaya', amount: 192500000, time: Date.now() - 60000 }] },
        { id: 'V004', name: 'Suzuki Ertiga GL', year: 2020, km: 68000, grade: 'C', bpkb: 'Proses', stnk: 'Aktif', location: 'Bekasi', img: '🚕', startPrice: 100000000, currentPrice: 108000000, increment: 500000, status: 'live', bidEnd: Date.now() + 900000, bids: [{ bidder: 'Rina Marlina', amount: 108000000, time: Date.now() - 600000 }] },
        { id: 'V005', name: 'Toyota Innova Reborn VRZ', year: 2023, km: 22000, grade: 'A', bpkb: 'Lengkap', stnk: 'Aktif', location: 'Jakarta Pusat', img: '🚌', startPrice: 320000000, currentPrice: 320000000, increment: 1000000, status: 'upcoming', bidEnd: Date.now() + 86400000, bids: [] },
        { id: 'V006', name: 'Daihatsu Terios R', year: 2022, km: 41000, grade: 'B', bpkb: 'Lengkap', stnk: 'Aktif', location: 'Depok', img: '🏎️', startPrice: 170000000, currentPrice: 170000000, increment: 500000, status: 'upcoming', bidEnd: Date.now() + 172800000, bids: [] },
        { id: 'V007', name: 'Honda HR-V Prestige', year: 2021, km: 45000, grade: 'B', bpkb: 'Lengkap', stnk: 'Aktif', location: 'Tangerang Selatan', img: '🚗', startPrice: 250000000, currentPrice: 265000000, increment: 500000, status: 'ended', bidEnd: Date.now() - 3600000, bids: [{ bidder: 'Budi Santoso', amount: 265000000, time: Date.now() - 7200000 }] },
        { id: 'V008', name: 'Wuling Cortez CT', year: 2022, km: 30000, grade: 'A', bpkb: 'Lengkap', stnk: 'Aktif', location: 'Jakarta Barat', img: '🚐', startPrice: 200000000, currentPrice: 200000000, increment: 500000, status: 'upcoming', bidEnd: Date.now() + 259200000, bids: [] }
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
  const icons = { success: '✅', error: '❌', warning: '⚠️' };
  toast.innerHTML = `<span>${icons[type] || ''}</span><span class="toast-msg">${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(40px)'; setTimeout(() => toast.remove(), 300); }, 3500);
}

// ===== FORMAT CURRENCY =====
function formatRp(num) {
  return 'Rp ' + Number(num).toLocaleString('id-ID');
}

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
