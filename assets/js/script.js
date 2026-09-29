const weddingDate = new Date('2026-12-20T08:00:00+07:00');

function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

function populatePetals() {
    const container = document.getElementById('petals-container');
    if (!container) return;

    for (let i = 0; i < 22; i++) {
        const petal = document.createElement('span');
        petal.className = 'petal';
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.top = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${6 + Math.random() * 12}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        petal.style.transform = `scale(${0.6 + Math.random() * 1.2})`;
        container.appendChild(petal);
    }
}

function setGuestNameFromURL() {
    const params = new URLSearchParams(window.location.search);
    const guestName = params.get('to') || params.get('nama') || params.get('guest');
    const target = document.getElementById('nama-tamu');

    if (target) {
        if (guestName) {
            const decoded = decodeURIComponent(guestName).replace(/\+/g, ' ');
            target.textContent = decoded;
        } else {
            target.textContent = 'Nama Tamu';
        }
    }
}

function bukaUndangan() {
    const target = document.getElementById('mempelai');
    if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const audio = document.getElementById('bg-music');
    const button = document.getElementById('audio-btn');
    if (audio && button) {
        button.classList.remove('d-none');
        audio.play().catch(() => {});
    }
}

function toggleMusic() {
    const audio = document.getElementById('bg-music');
    const icon = document.querySelector('#audio-btn i');

    if (!audio || !icon) return;

    if (audio.paused) {
        audio.play().catch(() => {});
        icon.className = 'bi bi-music-note-beamed';
    } else {
        audio.pause();
        icon.className = 'bi bi-volume-mute-fill';
    }
}

function renderWishes() {
    const list = document.getElementById('wishes-list');
    if (!list) return;

    const defaultWishes = [
        { name: 'Aisyah', status: 'Hadir', message: 'Selamat menempuh hidup baru, semoga selalu diberi kelancaran dan keberkahan.' },
        { name: 'Rizky', status: 'Hadir', message: 'Semoga rumah tangga kalian dipenuhi cinta, sakinah, mawadah, warahmah.' },
        { name: 'Lina', status: 'Tidak Hadir', message: 'Maaf belum bisa hadir, semoga acara berjalan lancar dan penuh kebahagiaan.' },
        { name: 'Dian', status: 'Ragu-ragu', message: 'Doa terbaik untuk kalian, semoga senantiasa bahagia dan kuat dalam menjalani hidup bersama.' },
        { name: 'Fajar', status: 'Hadir', message: 'Semoga kalian menjadi pasangan yang saling melengkapi, menjaga hati, dan selalu dalam ridho-Nya.' }
    ];

    const stored = JSON.parse(localStorage.getItem('wedding_wishes') || 'null');
    const wishes = stored && stored.length ? stored : defaultWishes;

    list.innerHTML = wishes.map((item) => {
        const statusClass = item.status.toLowerCase().replace(/\s+/g, '-');
        return `
            <div class="wish-item">
                <div class="wish-name">${item.name}</div>
                <span class="wish-status ${statusClass}">${item.status}</span>
                <div class="wish-message">${item.message}</div>
            </div>
        `;
    }).join('');
}

function kirimUcapan(event) {
    event.preventDefault();

    const nama = document.getElementById('input-nama').value.trim();
    const status = document.getElementById('input-status').value;
    const pesan = document.getElementById('input-pesan').value.trim();

    if (!nama || !status || !pesan) return;

    const newWish = { name: nama, status, message: pesan };
    const current = JSON.parse(localStorage.getItem('wedding_wishes') || '[]');
    const updated = [newWish, ...current];
    localStorage.setItem('wedding_wishes', JSON.stringify(updated));

    document.getElementById('rsvp-form').reset();
    renderWishes();
    alert('Ucapan Anda telah terkirim. Terima kasih atas doa dan restunya!');
}

window.addEventListener('DOMContentLoaded', () => {
    setGuestNameFromURL();
    populatePetals();
    updateCountdown();
    renderWishes();
    setInterval(updateCountdown, 1000);

    setTimeout(() => {
        const button = document.getElementById('audio-btn');
        if (button) button.classList.remove('d-none');
    }, 1000);
});
