#!/bin/bash

# Build script for Quarto portfolio site

echo "Building Quarto portfolio site..."

# Check if Quarto is installed
if ! command -v quarto &> /dev/null; then
    echo "Error: Quarto is not installed. Please install Quarto first:"
    echo "https://quarto.org/docs/get-started/"
    exit 1
fi

# Build the site
echo "Rendering site..."
quarto render

if [ $? -eq 0 ]; then
    echo "✅ Site built successfully!"
    echo "📁 Output directory: _site/"
    echo ""
    echo "To preview the site locally, run:"
    echo "  quarto preview"
    echo ""
    echo "To deploy, upload the contents of _site/ to your hosting service."
else
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi
