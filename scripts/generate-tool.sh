#!/bin/bash

# Tool Generator - AutoTools Engine
# Usage: ./generate-tool.sh "Tool Name" "category" "description"

TOOL_NAME="$1"
CATEGORY="$2"
DESCRIPTION="$3"

if [ -z "$TOOL_NAME" ] || [ -z "$CATEGORY" ]; then
    echo "❌ Usage: ./generate-tool.sh \"Tool Name\" \"category\" \"description\""
    exit 1
fi

# Create slug (URL-friendly name)
SLUG=$(echo "$TOOL_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

echo "🔧 Creating tool: $TOOL_NAME"
echo " Slug: $SLUG"
echo "📂 Category: $CATEGORY"

# Create tool directory
mkdir -p "tools/$SLUG"

# Create tool data file
cat > "tools/$SLUG/data.json" << TOOLDATA
{
  "name": "$TOOL_NAME",
  "slug": "$SLUG",
  "category": "$CATEGORY",
  "description": "$DESCRIPTION",
  "keywords": "$TOOL_NAME, online tool, $CATEGORY, free",
  "version": "1.0.0",
  "status": "active",
  "featured": false,
  "premium": false
}
TOOLDATA

# Create tool HTML page
cp templates/tool-template.html "tools/$SLUG/index.html"

# Create tool JavaScript app
cat > "tools/$SLUG/app.js" << 'TOOLJS'
// Tool Application - Auto Generated
// This file will be customized for each tool

class ToolApp {
    constructor() {
        this.init();
    }

    init() {
        console.log('Tool initialized');
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Override in specific tool
    }

    render() {
        // Override in specific tool
        const container = document.getElementById('tool-app');
        if (container) {
            container.innerHTML = '<div class="tool-placeholder">Tool Interface Loading...</div>';
        }
    }
}

// Initialize tool when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.toolApp = new ToolApp();
});
TOOLJS

# Update categories data
echo "📝 Updating category: $CATEGORY"
mkdir -p "categories/$CATEGORY"
echo "$SLUG" >> "categories/$CATEGORY/tools.txt"

echo "✅ Tool created successfully!"
echo "📍 Location: tools/$SLUG/"
echo "🔗 URL: /tools/$SLUG/"
