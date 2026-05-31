
// ─── Navbar scroll effect ───
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ─── Mobile navigation toggle ───
mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ─── Scroll reveal animation ───
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1,
}
);

revealElements.forEach(el => revealObserver.observe(el));

// ─── Contact form handler ───
function handleSubmit(event) {
    event.preventDefault();
    const btn = event.target.querySelector('.btn-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Message Sent!';
    btn.style.borderColor = '#5a8a5a';
    btn.style.color = '#8cc08c';
    btn.disabled = true;

    // Reset after delay
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.borderColor = '';
        btn.style.color = '';
        btn.disabled = false;
        event.target.reset();
    }, 2500);
}

// ─── Smooth parallax for hero decorative circles ───
window.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;

    const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;

    const pseudoBefore = hero.querySelector('::before');
    // Apply subtle movement via CSS custom properties on the hero
    hero.style.setProperty('--mx', x * 15 + 'px');
    hero.style.setProperty('--my', y * 15 + 'px');
});

// Set initial custom properties
document.querySelector('.hero')?.style.setProperty('--mx', '0px');
document.querySelector('.hero')?.style.setProperty('--my', '0px');

// Update hero pseudo-elements with the custom properties
const heroStyle = document.createElement('style');
heroStyle.textContent = `
                .hero::before {
                    transform: translate(var(--mx, 0px), var(--my, 0px));
                    transition: transform 1.5s cubic-bezier(0.25, 0, 0, 1);
                }
                .hero::after {
                    transform: translate(calc(var(--mx, 0px) * -0.6), calc(var(--my, 0px) * -0.6));
                    transition: transform 2s cubic-bezier(0.25, 0, 0, 1);
                }
            `;
document.head.appendChild(heroStyle);

console.log('%c[ Portfolio Ready ]%c Industrial Tech Minimalist v1.0',
    'color: #c49b6c; font-family: monospace; font-weight: bold;',
    'color: #8a8a8a; font-family: monospace;');
console.log('%cReplace placeholder images and update contact details.',
    'color: #5c5c5c; font-family: monospace; font-size: 0.8em;');
