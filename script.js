// ===== CONFIGURACIÓN PRINCIPAL =====
const WEDDING_DATE = '2027-04-18T16:30:00-05:00';
const WHATSAPP_NUMBER = '51999999999'; // Reemplaza por el número real, con código de país y sin +

// Cuenta regresiva
const target = new Date(WEDDING_DATE).getTime();
const ids = ['days','hours','minutes','seconds'];
function updateCountdown(){
  let diff = Math.max(0, target - Date.now());
  const values = [
    Math.floor(diff / 86400000),
    Math.floor((diff % 86400000) / 3600000),
    Math.floor((diff % 3600000) / 60000),
    Math.floor((diff % 60000) / 1000)
  ];
  ids.forEach((id,i)=>document.getElementById(id).textContent=values[i]);
}
updateCountdown();
setInterval(updateCountdown,1000);

// Animación suave al aparecer
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('visible'); });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// RSVP por WhatsApp
const form = document.getElementById('rsvpForm');
const status = document.getElementById('formStatus');
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const attendance = String(data.get('attendance') || '').trim();
  const message = String(data.get('message') || '').trim();
  if(!name || !attendance){ status.textContent='Completa tu nombre y confirma si asistirás.'; return; }
  const text = `Hola, soy ${name}.%0AConfirmación: ${attendance}.%0A${message ? 'Mensaje: '+encodeURIComponent(message) : ''}`;
  status.textContent='Abriendo WhatsApp…';
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`,'_blank','noopener');
});
