document.addEventListener('DOMContentLoaded', loadCategories);

async function loadCategories() {
    const categories = [
        { slug: 'developer', name: 'Developer', icon: '💻', desc: 'Tools for developers and programmers', count: 80 },
        { slug: 'image', name: 'Image', icon: '🖼️', desc: 'Image editing and optimization tools', count: 50 },
        { slug: 'text', name: 'Text', icon: '📝', desc: 'Text manipulation and analysis tools', count: 50 },
        { slug: 'math', name: 'Math', icon: '', desc: 'Mathematical calculators and converters', count: 40 },
        { slug: 'seo', name: 'SEO', icon: '📊', desc: 'SEO analysis and optimization tools', count: 30 },
        { slug: 'converter', name: 'Converter', icon: '🔄', desc: 'Unit and format converters', count: 50 }
    ];

    const container = document.getElementById('categories-grid');
    
    const colors = {
        developer: 'rgba(59, 130, 246, 0.1)',
        image: 'rgba(251, 191, 36, 0.1)',
        text: 'rgba(16, 185, 129, 0.1)',
        math: 'rgba(139, 92, 246, 0.1)',
        seo: 'rgba(236, 72, 153, 0.1)',
        converter: 'rgba(6, 182, 212, 0.1)'
    };

    container.innerHTML = categories.map(cat => `
        <a href="/categories/${cat.slug}/" class="category-card">
            <div class="category-icon" style="background: ${colors[cat.slug]}; color: ${getContrastColor(cat.slug)}">
                ${cat.icon}
            </div>
            <h3>${cat.name}</h3>
            <p>${cat.desc}</p>
            <span class="category-count">${cat.count}+ Tools</span>
        </a>
    `).join('');
}

function getContrastColor(category) {
    const colors = {
        developer: '#3b82f6',
        image: '#fbbf24',
        text: '#10b981',
        math: '#8b5cf6',
        seo: '#ec4899',
        converter: '#06b6d4'
    };
    return colors[category] || '#fff';
}
