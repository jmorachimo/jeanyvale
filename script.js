// ===== CONFIGURACIÓN PRINCIPAL =====
const WEDDING_DATE = '2027-01-30T15:00:00-05:00';
const WHATSAPP_NUMBER = '51979722223'; // Perú: 51 + número, sin + ni espacios

// ===== CUENTA REGRESIVA =====
const target = new Date(WEDDING_DATE).getTime();
const ids = ['days', 'hours', 'minutes', 'seconds'];

function updateCountdown() {
  let diff = Math.max(0, target - Date.now());

  const values = [
    Math.floor(diff / 86400000),
    Math.floor((diff % 86400000) / 3600000),
    Math.floor((diff % 3600000) / 60000),
    Math.floor((diff % 60000) / 1000)
  ];

  ids.forEach((id, i) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = values[i];
    }
  });
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ===== ANIMACIÓN SUAVE =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.12
});

document.querySelectorAll('.reveal').forEach((el) => {
  observer.observe(el);
});


// ===== RSVP POR WHATSAPP =====
const form = document.getElementById('rsvpForm');
const status = document.getElementById('formStatus');

if (form && status) {

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const name = String(data.get('name') || '').trim();
    const attendance = String(data.get('attendance') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!name || !attendance) {
      status.textContent =
        'Completa tu nombre y confirma si asistirás.';
      return;
    }

    let text =
`Hola 👋

Soy ${name}.

💍 Confirmación de asistencia:
${attendance}`;

    if (message) {
      text += `

💌 Mensaje para los novios:
${message}`;
    }

    text += `

¡Gracias! 🤍`;

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    status.textContent = 'Abriendo WhatsApp…';

    window.open(
      whatsappURL,
      '_blank',
      'noopener,noreferrer'
    );
  });

}