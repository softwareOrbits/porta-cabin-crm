#!/bin/bash

echo "🚀 Switching to Node.js 22..."

# Check if nvm is available
if ! command -v nvm &> /dev/null; then
    echo "❌ nvm is not installed or not in PATH"
    echo "Please install nvm first: https://github.com/nvm-sh/nvm"
    exit 1
fi

# Switch to Node.js 22
nvm use 22

# Check if the switch was successful
if [ $? -eq 0 ]; then
    echo "✅ Successfully switched to Node.js $(node -v)"
    echo "🎯 You can now run: npm run dev"
else
    echo "❌ Failed to switch to Node.js 22"
    echo "Please ensure Node.js 22 is installed: nvm install 22"
    exit 1
fi
