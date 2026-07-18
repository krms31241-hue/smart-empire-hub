// Add Structured Data for Search Engines
const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Smart Empire Hub",
  "url": "https://smartempirehub.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://smartempirehub.com/search/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(schemaData);
document.head.appendChild(script);
