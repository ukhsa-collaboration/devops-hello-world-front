#!/usr/bin/env sh
set -eu

VARIABLES=$(env | awk -F= '$1 ~ /^NEXT_PUBLIC/ { print $1 }')

SEARCH_DIRS=""
for dir in /app/public /app/.next; do
    if [ -d "$dir" ]; then
        SEARCH_DIRS="$SEARCH_DIRS $dir"
    fi
done

if [ -z "$SEARCH_DIRS" ]; then
    echo "No asset directories found to patch. This probably means that there was an issue with the image's build process" >&2
    exit 1
fi

if [ -z "$VARIABLES" ]; then
    echo "No NEXT_PUBLIC environment variables detected. Skipping placeholder replacement."
    exit 0
fi

tmp_file=$(mktemp)
cleanup() {
    rm -f "$tmp_file"
}
trap cleanup EXIT INT TERM

# shellcheck disable=SC2086 (intentional word splitting on search dirs)
find $SEARCH_DIRS -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) > "$tmp_file"

if [ ! -s "$tmp_file" ]; then
    echo "No JavaScript or TypeScript files found to patch. This probably means that there was an issue with the image's build process" >&2
    exit 1
fi

echo "Patching files with environment variables..."

REPLACEMENT_COUNT=0
FILE_COUNT=0

while IFS= read -r file; do
    FILE_UPDATED=0
    for VAR in $VARIABLES; do
        PLACEHOLDER="PLACEHOLDER_$VAR"
        if VALUE=$(printenv "$VAR" 2>/dev/null); then
            ESCAPED_VALUE=$(printf '%s\n' "$VALUE" | sed 's/[&/\\]/\\&/g')
            if grep -q "$PLACEHOLDER" "$file"; then
                sed -i "s|$PLACEHOLDER|$ESCAPED_VALUE|g" "$file"
                echo "  Replaced $PLACEHOLDER in $file"
                REPLACEMENT_COUNT=$((REPLACEMENT_COUNT + 1))
                FILE_UPDATED=1
            fi
        fi
    done
    if [ "$FILE_UPDATED" -eq 1 ]; then
        FILE_COUNT=$((FILE_COUNT + 1))
    fi
done < "$tmp_file"

echo "$REPLACEMENT_COUNT replacements in $FILE_COUNT files."