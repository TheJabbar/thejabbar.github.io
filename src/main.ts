import { experiences, skillGroups, profile } from './data';
import './style.css';

const $ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document): T | null =>
  root.querySelector<T>(sel);

function levelWidth(level: string): number {
  return level === 'Core' ? 100 : level === 'Proficient' ? 70 : 40;
}

function renderSkills(filter = 'all'): void {
  const grid = $('#skillsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const groups = filter === 'all' ? skillGroups : skillGroups.filter((g) => g.id === filter);

  for (const group of groups) {
    const card = document.createElement('article');
    card.className = 'skill-card';
    card.innerHTML = `
      <div class="skill-icon"><i class="${group.icon}"></i></div>
      <h3>${group.label}</h3>
      <p class="skill-blurb">${group.blurb}</p>
      <ul class="skill-list">
        ${group.skills
          .map(
            (s) => `
          <li>
            <div class="skill-row"><span>${s.name}</span><span class="level level-${s.level.toLowerCase()}">${s.level}</span></div>
            <div class="bar"><span style="width:${levelWidth(s.level)}%"></span></div>
          </li>`,
          )
          .join('')}
      </ul>`;
    grid.appendChild(card);
  }
}

function renderFilters(): void {
  const wrap = $('#skillFilters');
  if (!wrap) return;
  const buttons = [
    { id: 'all', label: 'All' },
    ...skillGroups.map((g) => ({ id: g.id, label: g.label })),
  ];
  wrap.innerHTML = buttons
    .map(
      (b, i) =>
        `<button class="pill${i === 0 ? ' active' : ''}" data-filter="${b.id}" type="button">${b.label}</button>`,
    )
    .join('');
  wrap.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-filter]');
    if (!btn) return;
    wrap.querySelectorAll('.pill').forEach((p) => p.classList.remove('active'));
    btn.classList.add('active');
    renderSkills(btn.dataset.filter ?? 'all');
  });
}

function renderExperience(): void {
  const timeline = $('#timeline');
  if (!timeline) return;
  timeline.innerHTML = experiences
    .map(
      (x) => `
    <div class="timeline-item${x.current ? ' current' : ''}">
      <div class="timeline-icon"><i class="fas fa-building"></i></div>
      <div class="timeline-content">
        ${x.current ? '<span class="badge">Current</span>' : ''}
        <h3>${x.role}</h3>
        <span class="company">${x.company} — ${x.location}</span>
        <span class="duration">${x.start} – ${x.end}</span>
        <p>${x.summary}</p>
        <ul>${x.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>
        <div class="tech-tags">${x.tech.map((t) => `<span>${t}</span>`).join('')}</div>
      </div>
    </div>`,
    )
    .join('');
}

function renderProfile(): void {
  document.title = `${profile.name} — ${profile.title}`;
  const heroTitle = $('#heroTitle');
  if (heroTitle) heroTitle.textContent = profile.name;
}

// Nav: hamburger, active link, back-to-top, contact mailto fallback.
function initChrome(): void {
  const hamburger = $('.hamburger');
  const menu = $('.nav-menu');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu?.classList.toggle('active');
  });
  menu?.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) {
      hamburger?.classList.remove('active');
      menu.classList.remove('active');
    }
  });

  const toTop = $('#backToTop');
  window.addEventListener('scroll', () => toTop?.classList.toggle('show', window.scrollY > 600), {
    passive: true,
  });
  toTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  $('#year') && ($('#year')!.textContent = String(new Date().getFullYear()));

  // No backend: open the visitor's mail client with a prefilled message.
  $('#contactForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const get = (id: string): string =>
      (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null)?.value.trim() ?? '';
    const subject = encodeURIComponent(get('subject') || `Hello from ${get('name') || 'your site'}`);
    const body = encodeURIComponent(`${get('message')}\n\n— ${get('name')} (${get('email')})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  });

  // Scroll-reveal, one observer for the whole page.
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.isIntersecting && en.target.classList.add('visible')),
    { threshold: 0.12 },
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

renderProfile();
renderFilters();
renderSkills();
renderExperience();
initChrome();
