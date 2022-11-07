#!/bin/bash

cd ./src/main/webapp

echo "Clean dist folder.."
rm -fr ./wux/js

echo "Compile WUX..."
tsc --declaration --project ./ts/wux/tsconfig.json

echo "Minify..."

# Install first https://www.npmjs.com/package/minifier
minify ./wux/js/wux.js

# Install first https://www.npmjs.com/package/uglify-js
# Usage: uglifyjs input_file -c (compress) -o (output_file) output_file
# uglifyjs ./wux/js/wux.js -c -o ./wux/js/wux.min.js

