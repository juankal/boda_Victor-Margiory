/**
 * BODA VÍCTOR & MARGIORY — INTERACTIVIDAD Y DETALLES PREMIUM
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initCalendarLink();
  initMusicPlayer();
  initRSVPForm();
  initScrollAnimations();
  initPetals();
});

/* ================= 1. CONTADOR REGRESIVO ================= */
function initCountdown() {
  // Fecha: 19 de Octubre 2026, 17:00:00 (Tacna, Perú - UTC-5)
  // Formato: Año 2026, Mes 9 (Octubre es índice 9 en JS Date), Día 19, Hora 17, Minuto 0
  const eventDate = new Date(2026, 9, 19, 17, 0, 0).getTime();

  const daysEl = document.getElementById('cd-days');
  const hoursEl = document.getElementById('cd-hours');
  const minsEl = document.getElementById('cd-minutes');
  const secsEl = document.getElementById('cd-seconds');

  function update() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance <= 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minsEl) minsEl.textContent = '00';
      if (secsEl) secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ================= 2. ENLACE GOOGLE CALENDAR ================= */
function initCalendarLink() {
  const calBtn = document.getElementById('btn-add-calendar');
  if (!calBtn) return;

  // 19 de Octubre de 2026 de 17:00 a 03:00 (+51 Perú = UTC-5)
  // En UTC: 2026-10-19T22:00:00Z hasta 2026-10-20T08:00:00Z
  const title = encodeURIComponent("Boda de Víctor & Margiory 💍");
  const details = encodeURIComponent("¡Acompáñanos a celebrar nuestra unión matrimonial!\nRecepción: 5:00 PM.\nLugar: Salón de Eventos Los Tulipanes, Pasaje San Hilarión Nro 350, Tacna.");
  const location = encodeURIComponent("Salón de Eventos Los Tulipanes, Pasaje San Hilarión 350, Tacna, Perú");
  const dates = "20261019T220000Z/20261020T080000Z";

  calBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

/* ================= 3. REPRODUCTOR DE MÚSICA & WEBAUDIO SYNTH ================= */
let isMusicPlaying = false;
let audioContext = null;
let synthTimer = null;
let currentStep = 0;
let playbackSeconds = 0;
let progressInterval = null;

// Melodía romántica dulce (Arpegios Canon / Balada acústica en D Mayor)
const romanticNotes = [
  // Acorde D: D4, F#4, A4, D5
  293.66, 369.99, 440.00, 587.33,
  // Acorde A: A3, C#4, E4, A4
  220.00, 277.18, 329.63, 440.00,
  // Acorde Bm: B3, D4, F#4, B4
  246.94, 293.66, 369.99, 493.88,
  // Acorde F#m: F#3, A3, C#4, F#4
  185.00, 220.00, 277.18, 369.99,
  // Acorde G: G3, B3, D4, G4
  196.00, 246.94, 293.66, 392.00,
  // Acorde D: D3, F#3, A3, D4
  146.83, 185.00, 220.00, 293.66,
  // Acorde G: G3, B3, D4, G4
  196.00, 246.94, 293.66, 392.00,
  // Acorde A: A3, C#4, E4, A4
  220.00, 277.18, 329.63, 440.00
];

function playSynthNote(freq, time) {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  // Tipo de onda suave estilo Rhodes / Campana
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, time);

  // Envolvente de volumen suave
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.linearRampToValueAtTime(0.12, time + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.95);

  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.start(time);
  osc.stop(time + 1.0);
}

function startRomanticSynth() {
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      audioContext = new AudioCtx();
    }
  }

  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }

  if (synthTimer) clearInterval(synthTimer);

  currentStep = 0;
  synthTimer = setInterval(() => {
    if (!isMusicPlaying || !audioContext) return;
    const now = audioContext.currentTime;
    const freq = romanticNotes[currentStep % romanticNotes.length];
    playSynthNote(freq, now);
    currentStep++;
  }, 380);
}

function stopRomanticSynth() {
  if (synthTimer) {
    clearInterval(synthTimer);
    synthTimer = null;
  }
}

function initMusicPlayer() {
  const playBtn = document.getElementById('play-toggle-btn');
  const floatBtn = document.getElementById('floating-audio-btn');
  const playIcon = document.getElementById('main-play-icon');
  const progressBar = document.getElementById('player-progress-bar');
  const timerDisplay = document.getElementById('player-timer');
  const audioElement = document.getElementById('bg-audio');

  const totalDuration = 195; // 3 min 15 seg

  function togglePlay() {
    isMusicPlaying = !isMusicPlaying;

    if (isMusicPlaying) {
      // Intentar reproducir elemento audio nativo
      if (audioElement && audioElement.src && audioElement.src.length > 5) {
        audioElement.play().catch(() => {
          // Si no hay archivo real mp3, usar el sintetizador web audio
          startRomanticSynth();
        });
      } else {
        startRomanticSynth();
      }

      // Actualizar UI
      if (playIcon) {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
      }
      if (floatBtn) floatBtn.classList.add('playing');

      // Temporizador de barra
      if (progressInterval) clearInterval(progressInterval);
      progressInterval = setInterval(() => {
        playbackSeconds = (playbackSeconds + 1) % totalDuration;
        const percent = (playbackSeconds / totalDuration) * 100;
        if (progressBar) progressBar.style.width = percent + '%';

        const curMin = Math.floor(playbackSeconds / 60);
        const curSec = String(playbackSeconds % 60).padStart(2, '0');
        if (timerDisplay) timerDisplay.textContent = `${curMin}:${curSec} / 3:15`;
      }, 1000);

    } else {
      if (audioElement) audioElement.pause();
      stopRomanticSynth();

      if (playIcon) {
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
      }
      if (floatBtn) floatBtn.classList.remove('playing');

      if (progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
    }
  }

  if (playBtn) playBtn.addEventListener('click', togglePlay);
  if (floatBtn) floatBtn.addEventListener('click', togglePlay);
}

/* ================= 4. COPIAR DATOS AL PORTAPAPELES ================= */
window.copyText = function(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("¡Número copiado con éxito!");
    if (btnElement) {
      const origHtml = btnElement.innerHTML;
      btnElement.innerHTML = `<i class="fa-solid fa-check"></i> <span>¡Listo!</span>`;
      btnElement.style.background = "#55758f";
      btnElement.style.color = "#ffffff";
      setTimeout(() => {
        btnElement.innerHTML = origHtml;
        btnElement.style.background = "";
        btnElement.style.color = "";
      }, 2000);
    }
  }).catch(() => {
    // Fallback
    const input = document.createElement('textarea');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast("¡Número copiado!");
  });
};

function showToast(msg) {
  const toast = document.getElementById('toast-alert');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

/* ================= 5. FORMULARIO RSVP WHATSAPP ================= */
function initRSVPForm() {
  const form = document.getElementById('wedding-rsvp-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('rsvp-name').value.trim();
    const status = document.getElementById('rsvp-status').value;
    const guests = document.getElementById('rsvp-guests').value;
    const recipient = document.querySelector('input[name="rsvp-recipient"]:checked')?.value || 'novio';

    // Teléfonos configurables (actualizables por los novios)
    const phoneNovio = "51952000000";
    const phoneNovia = "51952000000";
    const targetPhone = recipient === 'novio' ? phoneNovio : phoneNovia;
    const targetName = recipient === 'novio' ? 'Víctor' : 'Margiory';

    const message = 
`💍 *CONFIRMACIÓN DE ASISTENCIA — BODA VÍCTOR & MARGIORY*

¡Hola ${targetName}! Les escribo para confirmar mi asistencia a su boda:

👤 *Invitado(a):* ${name}
💌 *Respuesta:* ${status}
👥 *Pases:* ${guests}

¡Muchas felicidades y bendiciones! ✨`;

    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  });
}

/* ================= 6. ANIMACIONES DE SCROLL ================= */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  elements.forEach(el => observer.observe(el));
}

/* ================= 7. PÉTALOS FLOTANTES DECORATIVOS ================= */
function initPetals() {
  const container = document.getElementById('petals-canvas');
  if (!container) return;

  const totalPetals = 12;

  for (let i = 0; i < totalPetals; i++) {
    createPetal(container, i);
  }
}

function createPetal(container, index) {
  const petal = document.createElement('div');
  petal.className = 'petal';

  const size = Math.random() * 9 + 8; // 8px a 17px
  petal.style.width = `${size}px`;
  petal.style.height = `${size * 1.3}px`;
  petal.style.left = `${Math.random() * 100}vw`;

  const duration = Math.random() * 10 + 9; // 9s a 19s
  petal.style.animationDuration = `${duration}s`;
  petal.style.animationDelay = `${(index * 1.2) + Math.random() * 2}s`;

  container.appendChild(petal);

  petal.addEventListener('animationiteration', () => {
    petal.style.left = `${Math.random() * 100}vw`;
  });
}
