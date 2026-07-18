#!/bin/bash

echo "🗺️ Generating sitemap..."

# Create sitemap.xml
cat > public/sitemap.xml << 'SITEMAP'
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
SITEMAP

# Add homepage
echo "  <url>" >> public/sitemap.xml
echo "    <loc>https://smartempirehub.com/</loc>" >> public/sitemap.xml
echo "    <lastmod>$(date -I)</lastmod>" >> public/sitemap.xml
echo "    <priority>1.0</priority>" >> public/sitemap.xml
echo "  </url>" >> public/sitemap.xml

# Add tools
for tool_dir in tools/*/; do
    if [ -d "$tool_dir" ]; then
        tool_slug=$(basename "$tool_dir")
        if [ -f "$tool_dir/data.json" ]; then
            echo "  <url>" >> public/sitemap.xml
            echo "    <loc>https://smartempirehub.com/tools/$tool_slug/</loc>" >> public/sitemap.xml
            echo "    <lastmod>$(date -I)</lastmod>" >> public/sitemap.xml
            echo "    <priority>0.8</priority>" >> public/sitemap.xml
            echo "  </url>" >> public/sitemap.xml
        fi
    fi
done

echo "</urlset>" >> public/sitemap.xml

echo "✅ Sitemap generated: public/sitemap.xml"
