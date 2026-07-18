#!/bin/bash

echo " Building tools index..."

# Create index.json
cat > data/tools-index.json << 'INDEXSTART'
{
  "tools": [
INDEXSTART

first=true
for tool_dir in tools/*/; do
    if [ -d "$tool_dir" ] && [ -f "$tool_dir/data.json" ]; then
        if [ "$first" = true ]; then
            first=false
        else
            echo "," >> data/tools-index.json
        fi
        cat "$tool_dir/data.json" >> data/tools-index.json
    fi
done

echo "" >> data/tools-index.json
echo "  ]" >> data/tools-index.json
echo "}" >> data/tools-index.json

# Copy to public
cp data/tools-index.json public/tools-index.json

echo "✅ Index built: public/tools-index.json"
