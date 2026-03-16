#!/bin/bash
# Create a new blog post (markdown+LaTeX or Jupyter notebook)

set -e

AUTHOR="Shamanth Kuthpadi S."
POSTS_DIR="posts"

# --- Usage ---
usage() {
    echo "Usage: ./new-post.sh <type> <slug> [options]"
    echo ""
    echo "Types:"
    echo "  md       Markdown + LaTeX post (index.qmd)"
    echo "  nb       Jupyter notebook post (index.ipynb)"
    echo ""
    echo "Options:"
    echo "  -t, --title        Post title (default: derived from slug)"
    echo "  -c, --categories   Comma-separated categories (default: none)"
    echo "  -d, --date         Date in YYYY-MM-DD (default: today)"
    echo "  -p, --publish      Set draft: false (default: draft: true)"
    echo ""
    echo "Examples:"
    echo "  ./new-post.sh md attention-mechanisms -t 'Attention Mechanisms' -c 'machine learning,transformers'"
    echo "  ./new-post.sh nb rl-basics -t 'RL Basics' -c 'reinforcement learning' -p"
    exit 1
}

# --- Parse args ---
[[ $# -lt 2 ]] && usage

TYPE="$1"; shift
SLUG="$1"; shift

TITLE=""
CATEGORIES=""
DATE=$(date +%Y-%m-%d)
DRAFT="true"

while [[ $# -gt 0 ]]; do
    case "$1" in
        -t|--title)      TITLE="$2"; shift 2 ;;
        -c|--categories) CATEGORIES="$2"; shift 2 ;;
        -d|--date)       DATE="$2"; shift 2 ;;
        -p|--publish)    DRAFT="false"; shift ;;
        *)               echo "Unknown option: $1"; usage ;;
    esac
done

# Default title from slug
if [[ -z "$TITLE" ]]; then
    TITLE=$(echo "$SLUG" | sed 's/-/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) substr($i,2)}1')
fi

# Format categories as YAML list
if [[ -n "$CATEGORIES" ]]; then
    CAT_YAML="[$(echo "$CATEGORIES" | sed 's/,/, /g')]"
else
    CAT_YAML="[]"
fi

DIR="${POSTS_DIR}/${DATE}-${SLUG}"

if [[ -d "$DIR" ]]; then
    echo "Error: Directory $DIR already exists."
    exit 1
fi

mkdir -p "$DIR"

# --- Create post ---
if [[ "$TYPE" == "md" ]]; then
    cat > "$DIR/index.qmd" <<EOF
---
title: "${TITLE}"
author: "${AUTHOR}"
date: "${DATE}"
categories: ${CAT_YAML}
image: ""
draft: ${DRAFT}
---

EOF
    echo "Created markdown post: $DIR/index.qmd"

elif [[ "$TYPE" == "nb" ]]; then
    python3 -c "
import json, sys

title = sys.argv[1]
author = sys.argv[2]
date = sys.argv[3]
categories = sys.argv[4]
draft = sys.argv[5]

frontmatter = '---\n'
frontmatter += f'title: \"{title}\"\n'
frontmatter += f'author: \"{author}\"\n'
frontmatter += f'date: \"{date}\"\n'
frontmatter += f'categories: {categories}\n'
frontmatter += 'image: \"\"\n'
frontmatter += f'draft: {draft}\n'
frontmatter += 'format:\n'
frontmatter += '    html:\n'
frontmatter += '        code-fold: false\n'
frontmatter += '---'

nb = {
    'cells': [
        {'cell_type': 'raw', 'metadata': {}, 'source': [line + '\n' if i < len(frontmatter.splitlines()) - 1 else line for i, line in enumerate(frontmatter.splitlines())]},
        {'cell_type': 'markdown', 'metadata': {}, 'source': [f'# {title}']},
        {'cell_type': 'code', 'execution_count': None, 'metadata': {}, 'outputs': [], 'source': []}
    ],
    'metadata': {
        'kernelspec': {'display_name': 'Python 3', 'language': 'python', 'name': 'python3'},
        'language_info': {'name': 'python', 'version': '3.11.0'}
    },
    'nbformat': 4,
    'nbformat_minor': 5
}

with open(sys.argv[6], 'w') as f:
    json.dump(nb, f, indent=1)
" "$TITLE" "$AUTHOR" "$DATE" "$CAT_YAML" "$DRAFT" "$DIR/index.ipynb"
    echo "Created notebook post: $DIR/index.ipynb"

else
    echo "Error: Type must be 'md' or 'nb'."
    rm -r "$DIR"
    usage
fi

echo "Done! Next steps:"
echo "  1. Add an image to $DIR/ and update the 'image' field"
echo "  2. Edit your post"
echo "  3. Run 'quarto preview' to see it locally"
