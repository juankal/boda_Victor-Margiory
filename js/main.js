/**
 * BODA VÍCTOR & MARGIORY — INTERACTIVIDAD Y DETALLES PREMIUM
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initCalendarLink();
  initMusicPlayer();
  initRSVPForm();
  initGallery();
  initScrollAnimations();
  initPetals();
});

/* ================= 1. CONTADOR REGRESIVO ================= */
function initCountdown() {
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

  const title = encodeURIComponent("Boda de Víctor & Margiory 💍");
  const details = encodeURIComponent("¡Acompáñanos a celebrar nuestra unión matrimonial!\nRecepción: 5:00 PM.\nLugar: Salón de Eventos Los Tulipanes, Pasaje San Hilarión Nro 350, Tacna.");
  const location = encodeURIComponent("Salón de Eventos Los Tulipanes, Pasaje San Hilarión 350, Tacna, Perú");
  const dates = "20261019T220000Z/20261020T080000Z";

  calBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

/* ================= 3. REPRODUCTOR DE MÚSICA REAL ================= */
let isMusicPlaying = false;

function formatAudioTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

function initMusicPlayer() {
  const playBtn = document.getElementById('play-toggle-btn');
  const floatBtn = document.getElementById('floating-audio-btn');
  const playIcon = document.getElementById('main-play-icon');
  const progressBar = document.getElementById('player-progress-bar');
  const trackBar = document.querySelector('.player-track');
  const timerDisplay = document.getElementById('player-timer');
  const audio = document.getElementById('bg-audio');

  if (!audio) return;

  // Actualización de duración inicial cuando cargue la metadata
  audio.addEventListener('loadedmetadata', () => {
    if (timerDisplay) {
      timerDisplay.textContent = `0:00 / ${formatAudioTime(audio.duration)}`;
    }
  });

  // Progreso en tiempo real
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      const percent = (audio.currentTime / audio.duration) * 100;
      if (progressBar) progressBar.style.width = `${percent}%`;
      if (timerDisplay) {
        timerDisplay.textContent = `${formatAudioTime(audio.currentTime)} / ${formatAudioTime(audio.duration)}`;
      }
    }
  });

  // Cuando finaliza la canción
  audio.addEventListener('ended', () => {
    isMusicPlaying = false;
    updatePlayerState(false);
    if (progressBar) progressBar.style.width = '0%';
  });

  function updatePlayerState(playing) {
    if (playing) {
      if (playIcon) {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
      }
      if (floatBtn) floatBtn.classList.add('playing');
    } else {
      if (playIcon) {
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
      }
      if (floatBtn) floatBtn.classList.remove('playing');
    }
  }

  function togglePlay() {
    if (audio.paused) {
      audio.play().then(() => {
        isMusicPlaying = true;
        updatePlayerState(true);
      }).catch(err => {
        console.warn("Reproducción bloqueada por navegador:", err);
      });
    } else {
      audio.pause();
      isMusicPlaying = false;
      updatePlayerState(false);
    }
  }

  // Clic en la barra para adelantar o retroceder
  if (trackBar) {
    trackBar.style.cursor = 'pointer';
    trackBar.addEventListener('click', (e) => {
      if (!audio.duration) return;
      const rect = trackBar.getBoundingClientRect();
      const clickPos = (e.clientX - rect.left) / rect.width;
      audio.currentTime = clickPos * audio.duration;
    });
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

/* ================= 6. GALERÍA DE FOTOS INTERACTIVA & LIGHTBOX ================= */
const galleryImages = [
  "assets/images/boda_foto_1.jpg",
  "assets/images/boda_foto_2.jpg",
  "assets/images/boda_foto_3.jpg",
  "assets/images/boda_foto_4.jpg",
  "assets/images/boda_foto_5.jpg",
  "assets/images/boda_foto_6.jpg",
  "assets/images/boda_foto_7.jpg",
  "assets/images/boda_foto_8.jpg",
  "assets/images/boda_foto_9.jpg",
  "assets/images/boda_foto_10.jpg"
];

let curGalleryIndex = 0;
let curLightboxIndex = 0;

function initGallery() {
  const track = document.getElementById('gallery-track');
  const prevBtn = document.getElementById('gallery-prev-btn');
  const nextBtn = document.getElementById('gallery-next-btn');
  const dotsContainer = document.getElementById('gallery-dots');

  if (!track || !dotsContainer) return;

  dotsContainer.innerHTML = '';
  galleryImages.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = `dot ${idx === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  function updateGalleryUI() {
    track.style.transform = `translateX(-${curGalleryIndex * 100}%)`;
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === curGalleryIndex);
    });
  }

  function goToSlide(idx) {
    curGalleryIndex = (idx + galleryImages.length) % galleryImages.length;
    updateGalleryUI();
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => goToSlide(curGalleryIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => goToSlide(curGalleryIndex + 1));
  }

  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      goToSlide(curGalleryIndex + 1);
    } else if (touchEndX - touchStartX > 50) {
      goToSlide(curGalleryIndex - 1);
    }
  }, { passive: true });
}

/* ================= LIGHTBOX MODAL ================= */
window.openLightbox = function(index) {
  curLightboxIndex = index;
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  if (!modal || !img) return;

  img.src = galleryImages[curLightboxIndex];
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeLightbox = function(e) {
  if (e) e.stopPropagation();
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.handleLightboxClick = function(e) {
  if (e.target.id === 'lightbox-modal') {
    window.closeLightbox();
  }
};

window.navLightbox = function(step, e) {
  if (e) e.stopPropagation();
  curLightboxIndex = (curLightboxIndex + step + galleryImages.length) % galleryImages.length;
  const img = document.getElementById('lightbox-img');
  if (img) {
    img.style.opacity = '0.3';
    setTimeout(() => {
      img.src = galleryImages[curLightboxIndex];
      img.style.opacity = '1';
    }, 150);
  }
};

document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('lightbox-modal');
  if (!modal || !modal.classList.contains('active')) return;

  if (e.key === 'Escape') window.closeLightbox();
  if (e.key === 'ArrowLeft') window.navLightbox(-1);
  if (e.key === 'ArrowRight') window.navLightbox(1);
});

/* ================= 7. ANIMACIONES DE SCROLL ================= */
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

/* ================= 8. PÉTALOS FLOTANTES DECORATIVOS ================= */
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

  const size = Math.random() * 9 + 8;
  petal.style.width = `${size}px`;
  petal.style.height = `${size * 1.3}px`;
  petal.style.left = `${Math.random() * 100}vw`;

  const duration = Math.random() * 10 + 9;
  petal.style.animationDuration = `${duration}s`;
  petal.style.animationDelay = `${(index * 1.2) + Math.random() * 2}s`;

  container.appendChild(petal);

  petal.addEventListener('animationiteration', () => {
    petal.style.left = `${Math.random() * 100}vw`;
  });
}
