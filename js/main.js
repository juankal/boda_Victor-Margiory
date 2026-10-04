/**
 * BODA VÍCTOR & MARGIORY — INVITACIÓN DUSTY BLUE
 * Lógica interactiva para papelería digital de alta gama
 */

// Teléfonos reales para WhatsApp
const PHONE_NOVIO = "51917775048";
const PHONE_NOVIA = "51952940791";

document.addEventListener('DOMContentLoaded', () => {
  initURLParams();
  initCountdown();
  initCalendarLink();
  initMusicPlayer();
  initPhotoCarousel();
  initLightbox();
});

/* ================= 1. PERSONALIZACIÓN POR PARÁMETROS URL ================= */
function initURLParams() {
  const params = new URLSearchParams(window.location.search);
  const guestName = params.get('invitado') || params.get('n');
  const modalName = document.getElementById('modal-guest-name');

  if (guestName && modalName) {
    modalName.value = guestName;
  }
}

/* ================= 2. CONTADOR REGRESIVO ================= */
function initCountdown() {
  // Lunes 19 de Octubre 2026, 17:00:00 (Hora Perú UTC-5)
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

/* ================= 3. AGENDAR EN GOOGLE CALENDAR ================= */
function initCalendarLink() {
  const calBtn = document.getElementById('btn-add-calendar');
  if (!calBtn) return;

  const title = encodeURIComponent("Boda de Víctor & Margiory 💍");
  const details = encodeURIComponent("¡Acompáñanos a celebrar nuestra boda!\nCeremonia y Recepción: 5:00 PM.\nLugar: Salón de Eventos Los Tulipanes, Pasaje San Hilarión Nro 350, Tacna.");
  const location = encodeURIComponent("Salón de Eventos Los Tulipanes, Pasaje San Hilarión 350, Tacna, Perú");
  // 19 de Octubre 2026, 17:00 a 03:00 (Perú UTC-5 -> 22:00 UTC)
  const dates = "20261019T220000Z/20261020T080000Z";

  calBtn.href = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

/* ================= 4. REPRODUCTOR DE MÚSICA ROMÁNTICA ================= */
function initMusicPlayer() {
  const floatBtn = document.getElementById('floating-audio-btn');
  const audio = document.getElementById('bg-audio');

  if (!audio || !floatBtn) return;

  function togglePlay() {
    if (audio.paused) {
      audio.play().then(() => {
        floatBtn.classList.add('playing');
      }).catch(err => {
        console.warn("Reproducción bloqueada por el navegador:", err);
      });
    } else {
      audio.pause();
      floatBtn.classList.remove('playing');
    }
  }

  floatBtn.addEventListener('click', togglePlay);

  // Primer toque en la pantalla inicia música suave si el navegador lo permite
  const startAudioOnFirstTouch = () => {
    if (audio.paused) {
      audio.play().then(() => {
        floatBtn.classList.add('playing');
      }).catch(() => {});
    }
    document.removeEventListener('click', startAudioOnFirstTouch);
    document.removeEventListener('touchstart', startAudioOnFirstTouch);
  };

  document.addEventListener('click', startAudioOnFirstTouch, { once: true });
  document.addEventListener('touchstart', startAudioOnFirstTouch, { once: true });
}

/* ================= 5. CARRUSEL SUAVE DE FOTOS CON BORDE RASGADO ================= */
let carouselInterval = null;
let currentSlideIndex = 0;

function initPhotoCarousel() {
  const container = document.getElementById('hero-photo-carousel');
  if (!container) return;

  const slides = container.querySelectorAll('.carousel-slide');
  if (slides.length <= 1) return;

  function showSlide(index) {
    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === index);
    });
    currentSlideIndex = index;
  }

  function nextSlide() {
    const next = (currentSlideIndex + 1) % slides.length;
    showSlide(next);
  }

  function startAutoplay() {
    stopAutoplay();
    carouselInterval = setInterval(nextSlide, 3800);
  }

  function stopAutoplay() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }
  }

  startAutoplay();

  // Pausar en interacción
  container.addEventListener('mouseenter', stopAutoplay);
  container.addEventListener('mouseleave', startAutoplay);
  container.addEventListener('touchstart', stopAutoplay, { passive: true });
  container.addEventListener('touchend', () => setTimeout(startAutoplay, 3000), { passive: true });
}

/* ================= 6. COPIAR CUENTAS AL PORTAPAPELES ================= */
window.copyText = function(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast("¡Número copiado con éxito!");
    if (btnElement) {
      const origHtml = btnElement.innerHTML;
      btnElement.innerHTML = `<i class="fa-solid fa-check"></i> Copiado`;
      btnElement.style.background = "#527560";
      setTimeout(() => {
        btnElement.innerHTML = origHtml;
        btnElement.style.background = "";
      }, 2000);
    }
  }).catch(() => {
    // Fallback
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast("¡Número copiado!");
  });
};

function showToast(message) {
  const toast = document.getElementById('toast-alert');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

/* ================= 7. ENLACES DIRECTOS A WHATSAPP ================= */
window.openWhatsAppContact = function(target) {
  const phone = target === 'novia' ? PHONE_NOVIA : PHONE_NOVIO;
  const name = target === 'novia' ? 'Margiory' : 'Víctor';

  const message = `💍 *BODA VÍCTOR & MARGIORY*
  
¡Hola ${name}! Te escribo para confirmar mi asistencia a su boda el 19 de Octubre. ¡Muchas felicidades! ✨`;

  // Se usa api.whatsapp.com directo: la redirección de wa.me corrompe los emojis (llegan como �)
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};

/* ================= 8. MODAL RSVP PERSONALIZADO ================= */
window.toggleRSVPModal = function() {
  const modal = document.getElementById('rsvp-modal');
  if (!modal) return;
  modal.classList.toggle('active');
};

window.handleModalOverlayClick = function(event) {
  if (event.target.id === 'rsvp-modal') {
    toggleRSVPModal();
  }
};

window.handleModalRSVPSubmit = function(event) {
  event.preventDefault();

  const name = document.getElementById('modal-guest-name').value.trim();
  const status = document.getElementById('modal-guest-status').value;
  const target = document.querySelector('input[name="modal-target"]:checked')?.value || 'novio';

  const phone = target === 'novia' ? PHONE_NOVIA : PHONE_NOVIO;
  const targetName = target === 'novia' ? 'Margiory' : 'Víctor';

  const message = 
`💍 *CONFIRMACIÓN DE ASISTENCIA — BODA VÍCTOR & MARGIORY*

¡Hola ${targetName}! Les escribo para confirmar nuestra asistencia a su boda:

👤 *Invitado(a):* ${name}
💌 *Respuesta:* ${status}

¡Nos vemos el 19 de Octubre en Los Tulipanes! ✨`;

  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
  toggleRSVPModal();
};

/* ================= 9. LIGHTBOX DE FOTOGRAFÍAS ================= */
const galleryPhotos = [
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

let curLbIndex = 0;

function initLightbox() {
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('lightbox-modal');
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
  });
}

window.openLightbox = function(index) {
  curLbIndex = index;
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  if (!modal || !img) return;

  img.src = galleryPhotos[curLbIndex];
  modal.classList.add('active');
};

window.closeLightbox = function(e) {
  if (e) e.stopPropagation();
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.remove('active');
};

window.handleLightboxClick = function(e) {
  if (e.target.id === 'lightbox-modal') {
    closeLightbox();
  }
};

window.navLightbox = function(dir, e) {
  if (e) e.stopPropagation();
  curLbIndex = (curLbIndex + dir + galleryPhotos.length) % galleryPhotos.length;
  const img = document.getElementById('lightbox-img');
  if (img) img.src = galleryPhotos[curLbIndex];
};
