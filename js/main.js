// Project filtering
const filterBtns = document.querySelectorAll('.toc-filter');
const projects = document.querySelectorAll('.proj');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const isAlreadyActive = btn.classList.contains('active');

    // Reset all active states
    filterBtns.forEach(b => b.classList.remove('active'));

    if (btn.dataset.filter === 'all' || isAlreadyActive) {
      // Show all
      document.querySelector('.toc-all').classList.add('active');
      projects.forEach(p => p.removeAttribute('data-hidden'));
      return;
    }

    btn.classList.add('active');
    const { group, value } = btn.dataset;

    projects.forEach(p => {
      const tags = (p.dataset[group] || '').split(' ');
      if (tags.includes(value)) {
        p.removeAttribute('data-hidden');
      } else {
        p.setAttribute('data-hidden', '');
      }
    });
  });
});

// Theme toggle
const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeBtn.textContent = savedTheme === 'light' ? '☾' : '☀';

themeBtn.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeBtn.textContent = next === 'light' ? '☾' : '☀';
});

// Nav shadow on scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.proj, .skill-col, .kpi').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
