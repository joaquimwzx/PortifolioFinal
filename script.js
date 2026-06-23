document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Ano no rodapé ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Dark / Light mode ---------- */
  const body = document.body;
  const themeToggle = document.getElementById('themeToggle');
  const STORAGE_KEY = 'ja-portfolio-theme';

  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { /* sem acesso a storage, ignora */ }
  }

  (function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignora */ }
    if (saved === 'light' || saved === 'dark') {
      applyTheme(saved);
    } else {
      applyTheme('dark'); // padrão pedido no desafio
    }
  })();

  themeToggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  /* ---------- Menu mobile ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Terminal animado (hero) ---------- */
  const terminalBody = document.getElementById('terminalBody');
  if (terminalBody && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const lines = [
      { type: 'cmd', text: 'whoami' },
      { type: 'out', text: 'joaquim-alves — desenvolvedor web' },
      { type: 'cmd', text: 'cat servicos.txt' },
      { type: 'out', text: '> landing pages\n> sites institucionais\n> lojas virtuais' },
      { type: 'cmd', text: './deploy.sh meu-proximo-projeto' },
      { type: 'out', text: '✓ build concluído\n✓ site no ar' },
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentLineEl = null;

    function typeNext() {
      if (lineIndex >= lines.length) {
        setTimeout(() => {
          terminalBody.innerHTML = '';
          lineIndex = 0;
          charIndex = 0;
          typeNext();
        }, 2200);
        return;
      }

      const line = lines[lineIndex];

      if (charIndex === 0) {
        currentLineEl = document.createElement('div');
        if (line.type === 'cmd') {
          const prompt = document.createElement('span');
          prompt.className = 'prompt';
          prompt.textContent = '❯ ';
          currentLineEl.appendChild(prompt);
        } else {
          currentLineEl.className = 'out';
        }
        terminalBody.appendChild(currentLineEl);
      }

      if (charIndex < line.text.length) {
        currentLineEl.appendChild(document.createTextNode(line.text[charIndex]));
        charIndex++;
        setTimeout(typeNext, line.type === 'cmd' ? 38 : 14);
      } else {
        lineIndex++;
        charIndex = 0;
        setTimeout(typeNext, line.type === 'cmd' ? 280 : 500);
      }
    }

    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    terminalBody.appendChild(cursor);

    setTimeout(typeNext, 500);
  } else if (terminalBody) {
    // Respeita prefers-reduced-motion: mostra estado final estático
    terminalBody.innerHTML =
      '<div><span class="prompt">❯ </span>whoami</div>' +
      '<div class="out">joaquim-alves — desenvolvedor web</div>';
  }

});
