import { projects } from './data';
import './style.css';

const grid = document.querySelector<HTMLElement>('#projectGrid');
if (grid) {
  grid.innerHTML = projects
    .map(
      (p) => `
    <article class="skill-card">
      <h3>${p.title}</h3>
      <p class="skill-blurb">${p.description}</p>
      <div class="tech-tags">${p.tech.map((t) => `<span>${t}</span>`).join('')}</div>
      ${p.link ? `<p class="project-link"><a href="${p.link}" target="_blank" rel="noopener"><i class="fab fa-github"></i> View project</a></p>` : ''}
    </article>`,
    )
    .join('');
}

document.querySelector('#year')!.textContent = String(new Date().getFullYear());

// Minimal nav toggle (same pattern as main.ts, no CV code).
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-menu');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  menu?.classList.toggle('active');
});
