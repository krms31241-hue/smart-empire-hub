const translations = {
  en: {
    title: "Smart Empire Hub",
    hero_title: "All The Tools You Need",
    hero_subtitle: "In One Place",
    search_placeholder: "Search tools (e.g. password, qr, json...)"
  },
  ar: {
    title: "سمارت امباير هب",
    hero_title: "كل الأدوات اللي محتاجها",
    hero_subtitle: "في مكان واحد",
    search_placeholder: "ابحث عن أدوات (مثل: كلمة سر، QR، JSON...)"
  }
};

function setLanguage(lang) {
  localStorage.setItem('preferred_lang', lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  
  // Apply translations
  const t = translations[lang];
  document.title = t.title;
  
  const heroH1 = document.querySelector('.hero h1');
  if (heroH1) {
    heroH1.innerHTML = `${t.hero_title}<br><span>${t.hero_subtitle}</span>`;
  }
  
  const searchInput = document.querySelector('.search-input');
  if (searchInput) searchInput.placeholder = t.search_placeholder;
}

// Load saved language or default to English
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('preferred_lang') || 'en';
  setLanguage(savedLang);
});
