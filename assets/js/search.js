let allTools = [];
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('search-results');

// Load tools on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadTools();
    
    // Get query from URL
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
        searchInput.value = query;
        performSearch(query);
    }
    
    // Setup event listeners
    searchBtn.addEventListener('click', () => performSearch(searchInput.value));
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch(searchInput.value);
    });
    
    // Real-time search
    searchInput.addEventListener('input', debounce((e) => {
        if (e.target.value.length > 2) {
            performSearch(e.target.value);
        }
    }, 300));
});

async function loadTools() {
    try {
        const response = await fetch('/tools-index.json');
        allTools = await response.json();
        allTools = allTools.tools || [];
    } catch (error) {
        console.error('Failed to load tools:', error);
    }
}

function performSearch(query) {
    if (!query || query.length < 2) {
        resultsContainer.innerHTML = '<p class="no-results">Enter at least 2 characters to search...</p>';
        return;
    }
    
    query = query.toLowerCase();
    
    const filtered = allTools.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query) ||
        (tool.keywords && tool.keywords.toLowerCase().includes(query))
    );
    
    displayResults(filtered, query);
}

function displayResults(tools, query) {
    if (tools.length === 0) {
        resultsContainer.innerHTML = `
            <p class="no-results">
                No tools found for "<strong>${query}</strong>"<br>
                Try different keywords or browse categories
            </p>
        `;
        return;
    }
    
    resultsContainer.innerHTML = `
        <div class="results-count">Found ${tools.length} tool${tools.length !== 1 ? 's' : ''}</div>
        <div class="tools-list">
            ${tools.map(tool => `
                <a href="/tools/${tool.slug}/" class="tool-result">
                    <div class="tool-result-icon">🔧</div>
                    <div class="tool-result-info">
                        <h3>${highlightMatch(tool.name, query)}</h3>
                        <p>${highlightMatch(tool.description, query)}</p>
                    </div>
                </a>
            `).join('')}
        </div>
    `;
}

function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background: rgba(251,191,36,0.3); color: #fff; padding: 0 4px; border-radius: 2px;">$1</mark>');
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
