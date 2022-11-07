#!/bin/bash

cd ./src/main/webapp

echo "Clean dist folder.."
rm -fr ./js

echo "Compile res-en..."
tsc --noEmitHelpers --declaration --project ./ts/res-en/tsconfig.json
echo "Compile res-it..."
tsc --noEmitHelpers --declaration --project ./ts/res-it/tsconfig.json
echo "Compile res-fr..."
tsc --noEmitHelpers --declaration --project ./ts/res-fr/tsconfig.json
echo "Compile res-es..."
tsc --noEmitHelpers --declaration --project ./ts/res-es/tsconfig.json
echo "Compile common..."
tsc --noEmitHelpers --declaration --project ./ts/common/tsconfig.json
echo "Compile dossier..."
tsc --noEmitHelpers --declaration --project ./ts/dossier/tsconfig.json

echo "Minify..."

# Install first https://www.npmjs.com/package/minifier
minify ./js/res-en.js
minify ./js/res-it.js
minify ./js/res-fr.js
minify ./js/res-es.js
minify ./js/common.js
minify ./js/dossier.js

# Install first https://www.npmjs.com/package/uglify-js
# Usage: uglifyjs input_file -c (compress) -o (output_file) output_file
# uglifyjs ./js/res-en.js -c -o ./js/res-en.min.js
# uglifyjs ./js/res-it.js -c -o ./js/res-it.min.js
# uglifyjs ./js/res-fr.js -c -o ./js/res-fr.min.js
# uglifyjs ./js/res-es.js -c -o ./js/res-es.min.js
# uglifyjs ./js/common.js -c -o ./js/common.min.js
# uglifyjs ./js/dossier.js -c -o ./js/dossier.min.js

