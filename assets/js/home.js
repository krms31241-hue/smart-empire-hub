document.addEventListener('DOMContentLoaded', async () => {
  await loadPopularTools();
  setupSearch();
});

async function loadPopularTools() {
  const container = document.getElementById('popular-tools');
  if (!container) return;

  try {
    const response = await fetch('/tools-index.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    if (!data || !Array.isArray(data.tools)) throw new Error('Invalid data format');

    const tools = data.tools.slice(0, 6);
    container.innerHTML = tools.map(tool => `
      <a href="/tools/${tool.slug}/" class="tool-card">
        <div class="tool-icon">🔧</div>
        <h3>${escapeHtml(tool.name)}</h3>
        <p>${escapeHtml(tool.description)}</p>
        <span class="use-btn">Use Now →</span>
      </a>
    `).join('');
  } catch (error) {
    console.error('Failed to load tools:', error);
    container.innerHTML = `
      <div class="error-state">
        <p>⚠️ Could not load tools. <a href="/categories/">Browse all tools</a></p>
      </div>
    `;
  }
}

function setupSearch() {
  const searchInput = document.getElementById('hero-search');
  const searchBtn = document.getElementById('hero-search-btn');
  if (!searchInput || !searchBtn) return;

  const go = () => {
    const q = searchInput.value.trim();
    if (q) window.location.href = `/search?q=${encodeURIComponent(q)}`;
  };

  searchBtn.addEventListener('click', go);
  searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
}

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
