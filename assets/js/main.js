// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Volunteer form -> WhatsApp
(function(){
  const form = document.getElementById('volunteerForm');
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const fd = new FormData(form);
    const name = fd.get('name') || '';
    const age = fd.get('age') || '';
    const city = fd.get('city') || '';
    const phone = fd.get('phone') || '';
    const skills = fd.get('skills') || '';
    const availability = fd.get('availability') || '';

    const message = encodeURIComponent(
      `Hello, I want to volunteer for ATF.\n\nFull Name: ${name}\nAge: ${age}\nCity: ${city}\nPhone Number: ${phone}\nSkills / Experience: ${skills}\nAvailability: ${availability}`
    );

    const waLink = `https://wa.me/03000000000?text=${message}`;
    window.open(waLink, '_blank');
  });
})();

// Slider with auto-advance, dots, and hover pause
(function(){
  const slidesContainer = document.getElementById('slides');
  const slides = slidesContainer.children;
  const dotsWrap = document.getElementById('dots');
  const slideCount = slides.length;
  let currentIndex = 0;
  const timeout = 5000; // 5s

  // Create dots
  for(let i=0; i<slideCount; i++){
    const dot = document.createElement('div');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.dataset.index = i;
    dot.addEventListener('click', () => { goToSlide(i); resetTimer(); });
    dotsWrap.appendChild(dot);
  }
  const dots = dotsWrap.children;

  function updateSlider(){
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    Array.from(dots).forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
  }

  function goToSlide(i){
    currentIndex = (i + slideCount) % slideCount;
    updateSlider();
  }

  let sliderTimer = setInterval(() => goToSlide(currentIndex + 1), timeout);

  function resetTimer(){
    clearInterval(sliderTimer);
    sliderTimer = setInterval(() => goToSlide(currentIndex + 1), timeout);
  }

  slidesContainer.parentElement.addEventListener('mouseenter', () => clearInterval(sliderTimer));
  slidesContainer.parentElement.addEventListener('mouseleave', resetTimer);
})();

// Hamburger menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('open'); // optional animation
  });
});
// Close hamburger menu when clicking outside
document.addEventListener("click", (e) => {
  const isClickInsideMenu = navMenu.contains(e.target) || hamburger.contains(e.target);
  if (!isClickInsideMenu && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
  }
});


// Back to Top button (appears after first viewport)
(function(){
  const btn = document.getElementById('backToTop');

  if(!btn) return; // exit if button not in HTML

  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > window.innerHeight ? 'block' : 'none';
  });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
document.getElementById('backToTop').addEventListener('click', () => {
  const start = window.pageYOffset;
  const duration = 1200; // make it slower, dramatic
  const startTime = performance.now();

  function animateScroll(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease in out cubic
    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  }

  requestAnimationFrame(animateScroll);
});
const pawBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 150) {
    pawBtn.classList.add('show');
  } else {
    pawBtn.classList.remove('show');
  }
});
const arrowBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  arrowBtn.classList.toggle('show', window.scrollY > 150);
});
arrowBtn.addEventListener('click', () => {
  const start = window.pageYOffset;
  const duration = 1200;
  const startTime = performance.now();

  function animateScroll(time) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const ease = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;

    window.scrollTo(0, start * (1 - ease));
    if (progress < 1) requestAnimationFrame(animateScroll);
  }

  requestAnimationFrame(animateScroll);
});
