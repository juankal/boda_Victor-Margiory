# 💍 Boda Víctor & Margiory — Suite Nupcial Web Interactiva

Invitación web nupcial de alta gama diseñada con estética **Dusty Blue (Azul Pizarra)**, tipografía editorial y formato vertical continuo optimizado para dispositivos móviles y de escritorio.

🌐 **Demo en vivo:** [https://juankal.github.io/boda_Victor-Margiory/](https://juankal.github.io/boda_Victor-Margiory/)

---

## ✨ Características Principales

* **🎵 Música Romántica de Fondo:**
  * Pista de audio local optimizada con reproducción en bucle.
  * Botón flotante interactivo con indicador visual animado de ondas de audio (ecualizador).
  * Control de inicio/pausa adaptado a las políticas de reproducción automática de navegadores móviles.

* **💌 Sistema de Pases Personalizado por URL:**
  * Lectura de parámetros dinámicos en la URL (`?p=2` o `?pases=2`).
  * Asignación automática del número de pases en la sección informativa y en el modal de confirmación.

* **📲 Confirmación de Asistencia (RSVP) por WhatsApp:**
  * Enlaces directos a los teléfonos del novio y la novia.
  * Mensajes pre-estructurados con el nombre del invitado y la cantidad de pases confirmados.

* **⏳ Contador Regresivo en Tiempo Real:**
  * Cuenta regresiva precisa para el evento: **Lunes 19 de Octubre de 2026, 5:00 PM (Hora de Perú UTC-5)**.
  * Desglose visual en días, horas, minutos y segundos.

* **📸 Galería de Pareja con Efecto Rasgado y Lightbox:**
  * Carrusel continuo con transición suave entre fotografías reales de la sesión preboda.
  * Bordes decorativos orgánicos superiores e inferiores simulando papel rasgado artesanal (*deckle edge*).
  * Modal Lightbox a pantalla completa al hacer clic en cualquier imagen.

* **📍 Ubicación y Navegación:**
  * Dirección del evento: *Salón de Eventos Los Tulipanes (Pasaje San Hilarión Nro 350, Tacna)*.
  * Botón directo con enlace a Google Maps / GPS.

* **📅 Agendar en Calendario:**
  * Enlace con evento preconfigurado para Google Calendar y exportación a calendarios iCal/Outlook.

* **📋 Secciones Informativas Completas:**
  * Itinerario de actividades con línea de tiempo vertical (Ceremonia, Civil, Cóctel, Cena, Fiesta).
  * Código de vestimenta (*Elegante / Traje formal y vestido largo*).
  * Mesa de regalos y lluvia de sobres con número de cuenta y titular.
  * Recomendaciones nupciales (asistencia puntual y evento sin niños).

* **🔗 Metadatos Open Graph (Social Sharing):**
  * Vista previa enriquecida para enlaces compartidos por WhatsApp, Telegram y redes sociales (con imagen de portada, título nupcial y resumen del evento).

---

## 📁 Estructura del Proyecto

```text
boda_Victor-Margiory/
├── assets/
│   ├── audio/
│   │   └── cancion.mp3              # Pista musical de fondo
│   └── images/
│       ├── boda_foto_1.jpg ... 9    # Fotografías de los novios
│       ├── dusty_top_floral.png     # Arreglo floral superior
│       ├── dusty_side_left.png      # Flor lateral izquierda
│       ├── dusty_side_right.png     # Flor lateral derecha
│       ├── torn_paper_top.svg       # Borde rasgado superior
│       └── torn_paper_bot.svg       # Borde rasgado inferior
├── css/
│   └── styles.css                   # Estilos, sistema de diseño y paleta Dusty Blue
├── js/
│   └── main.js                      # Lógica interactiva (música, contador, carrusel, URL params)
├── index.html                       # Estructura semántica principal
└── README.md                        # Documentación técnica del proyecto
```

---

## 🛠️ Personalización y Configuración

### 1. Parámetros de Enlace para Invitados (Pases)
Para enviar invitaciones personalizadas con cupos específicos, añade el parámetro `?p=N` al final de la URL:
- Individual: `https://juankal.github.io/boda_Victor-Margiory/?p=1`
- Pareja: `https://juankal.github.io/boda_Victor-Margiory/?p=2`
- Familia (4 pases): `https://juankal.github.io/boda_Victor-Margiory/?p=4`

### 2. Números de WhatsApp para RSVP
Configurados en `js/main.js`:
```javascript
const PHONE_NOVIO = "51917775048";
const PHONE_NOVIA = "51952940791";
```

### 3. Fecha del Contador Regresivo
Definida en `js/main.js`:
```javascript
// Año, Mes (0-11: 9 = Octubre), Día, Hora, Minutos, Segundos
const eventDate = new Date(2026, 9, 19, 17, 0, 0).getTime();
```

---

## 🚀 Despliegue

El proyecto está preparado para ejecutarse como un sitio estático en cualquier servidor web o servicio de alojamiento Jamstack:
- **GitHub Pages:** Rama `main`, desplegado desde la raíz `/`.
- **Vercel / Netlify / Cloudflare Pages:** Sin paso de compilación necesario (`output directory: .`).

---

## 📄 Licencia

Proyecto privado desarrollado para la boda de Víctor & Margiory (Tacna, Perú).
