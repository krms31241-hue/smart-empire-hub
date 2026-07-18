// Home Page - Load Tools Dynamically

document.addEventListener('DOMContentLoaded', async () => {
    await loadPopularTools();
    setupSearch();
});

async function loadPopularTools() {
    try {
        const response = await fetch('/tools-index.json');
        const data = await response.json();
        
        // Get first 6 tools as popular
        const popularTools = data.tools.slice(0, 6);
        
        const container = document.getElementById('popular-tools');
        if (container) {
            container.innerHTML = popularTools.map(tool => `
                <div class="tool-card">
                    <div class="tool-icon">🔧</div>
                    <h3>${tool.name}</h3>
                    <p>${tool.description}</p>
                    <a href="/tools/${tool.slug}/" class="use-btn">Use Now →</a>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Failed to load tools:', error);
    }
}

function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `/search/?q=${encodeURIComponent(query)}`;
        }
    };
    
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}
