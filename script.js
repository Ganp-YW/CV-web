// Efecto de Escritura (Typing Effect)
const typedTextSpan = document.getElementById("typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["Estudiante de Ing. de Sistemas", "Desarrollador Web", "Entusiasta de la Mecatrónica", "Profesor Particular"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay entre textos actuales y siguientes
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // En la carga del DOM, iniciar el efecto
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});

// Scroll Suave (Smooth Scrolling) para los links del navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animación de aparición al hacer scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
});

// Lógica para Generar PDF
document.getElementById('download-pdf').addEventListener('click', function() {
    // Escondemos temporalmente elementos que no queremos en el PDF (navbar, botones)
    const navbar = document.querySelector('.navbar');
    const heroActions = document.querySelector('.hero-actions');
    const socialLinks = document.querySelectorAll('.social-links');
    
    // Guardamos los estilos originales
    const navDisplay = navbar.style.display;
    const actionsDisplay = heroActions.style.display;
    
    navbar.style.display = 'none';
    heroActions.style.display = 'none';
    socialLinks.forEach(link => link.style.display = 'none');

    // Cambiamos un poco el body para que quepa bien en el PDF (opcional)
    const element = document.body;
    
    // Opciones para el PDF
    const opt = {
      margin:       0,
      filename:     'CV_Gerardo_Wateyma.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, backgroundColor: '#0B0C10', windowWidth: 1200 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Generar el PDF
    html2pdf().set(opt).from(element).save().then(() => {
        // Restaurar elementos escondidos
        navbar.style.display = navDisplay;
        heroActions.style.display = actionsDisplay;
        socialLinks.forEach(link => link.style.display = 'flex');
    });
});
