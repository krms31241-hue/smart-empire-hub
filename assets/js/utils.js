// Smart Empire Hub - Utility Functions

const Utils = {
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      try {
        const ta = document.createElement('textarea');
        ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
        return true;
      } catch { return false; }
    }
  },

  downloadFile: (content, filename, type = 'text/plain') => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  },

  escapeHtml: (str) => {
    const d = document.createElement('div');
    d.textContent = String(str);
    return d.innerHTML;
  },

  formatDate: (date) => new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  }).format(new Date(date)),

  generateId: () => Math.random().toString(36).substr(2, 9),

  debounce: (func, wait) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => func(...args), wait);
    };
  }
};

window.Utils = Utils;
