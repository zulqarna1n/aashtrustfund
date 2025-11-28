// main.js - Aash's Trust Fund

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('header nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Highlight current section in navbar
  const sections = document.querySelectorAll('section');
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.3 };
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const navLink = document.querySelector(`header nav a[href="#${entry.target.id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        if (navLink) navLink.classList.add('active');
      }
    });
  }, observerOptions);
  
  sections.forEach(section => observer.observe(section));

  // Animated counters for statistics
  const counters = document.querySelectorAll('.card h2');
  counters.forEach(counter => {
    const target = +counter.innerText.replace(/[^0-9]/g, '');
    let count = 0;
    const step = Math.ceil(target / 100);
    const updateCounter = () => {
      count += step;
      if (count >= target) {
        counter.innerText = counter.innerText.includes('PKR') ? `PKR ${target.toLocaleString()}` : target;
      } else {
        counter.innerText = counter.innerText.includes('PKR') ? `PKR ${count.toLocaleString()}` : count;
        requestAnimationFrame(updateCounter);
      }
    };
    updateCounter();
  });

  // Back to Top button
  const backToTop = document.createElement('button');
  backToTop.id = 'backToTop';
  backToTop.textContent = '↑ Top';
  backToTop.style.cssText = `
    position:fixed; bottom:30px; right:30px;
    padding:10px 15px; font-size:16px;
    background:#f39c12; color:#fff; border:none;
    border-radius:5px; cursor:pointer; display:none;
    z-index:1000; box-shadow:0 4px 10px rgba(0,0,0,0.2);
  `;
  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  console.log('Aash Trust Fund JS loaded');
});
