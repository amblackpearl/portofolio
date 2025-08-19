// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
    // Typewriter effect for the heading
    if (document.querySelector('.typewriter-text')) {
        const typed = new Typed('.typewriter-text', {
            strings: [
                'Electronics Engineer',
                'PCB Designer',
                'IoT Enthusiast',
                'Circuit Design & Analyst',
                'PLC Programmer'
            ],
            typeSpeed: 40,
            backSpeed: 30,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            contentType: 'html'
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });

        // Update active nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Back to top functionality
document.querySelector('.back-to-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .project-card');

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;

        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// // Custom cursor
// const cursor = document.querySelector('.cursor');
// const cursorFollower = document.querySelector('.cursor-follower');

// document.addEventListener('mousemove', (e) => {
//     cursor.style.left = e.clientX + 'px';
//     cursor.style.top = e.clientY + 'px';

//     setTimeout(() => {
//         cursorFollower.style.left = e.clientX + 'px';
//         cursorFollower.style.top = e.clientY + 'px';
//     }, 100);
// });

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .skill-item, .project-card, .social-icon');

hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.opacity = '0.5';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.opacity = '1';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// // Form submission
// const contactForm = document.querySelector('.contact-form');
// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     // Get form values
//     const name = contactForm.querySelector('input[type="text"]').value;
//     const email = contactForm.querySelector('input[type="email"]').value;
//     const message = contactForm.querySelector('textarea').value;

//     // Here you would typically send the form data to a server
//     console.log('Form submitted:', { name, email, message });

//     // Show success message
//     alert('Thank you for your message! I will get back to you soon.');

//     // Reset form
//     contactForm.reset();
// });

const canvas = document.getElementById("bubbles");
const ctx = canvas.getContext("2d");
let bubbles = [];

function resize() {
  canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

class Bubble {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * canvas.height;
    this.size = Math.random() * 25 + 10;
    this.speed = Math.random() * 1 + 0.5;
    this.alpha = Math.random() * 0.25 + 0.2;
    this.offset = Math.random() * 100;
  }
  update() {
    this.y -= this.speed;
    this.x += Math.sin((this.y + this.offset) * 0.01) * 0.4;
    if (this.y + this.size < 0) this.reset();
  }
  draw() {
    // Main bubble sphere
    let gradient = ctx.createRadialGradient(this.x, this.y, this.size * 0.2, this.x, this.y, this.size);
    gradient.addColorStop(0, `rgba(255,255,255,${this.alpha * 0.8})`);
    gradient.addColorStop(0.6, `rgba(255,255,255,${this.alpha * 0.25})`);
    gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    // Highlight reflection (top-left)
    ctx.beginPath();
    ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fill();
  }
}

function init() {
  bubbles = [];
  for (let i = 0; i < 50; i++) {
    bubbles.push(new Bubble());
  }
}
init();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bubbles.forEach(b => {
    b.update();
    b.draw();
  });
  requestAnimationFrame(animate);
}
animate();


function openURL() {
      var url = "assets/pdf/my_resume.pdf"; // Replace with your PDF file path

      window.open(url, "_blank");
    }