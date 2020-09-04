@echo off

echo Delete previous..
del .\js\hello.*

echo Compile hello...
call tsc --noEmitHelpers --declaration --project ./ts/tsconfig.json

rem Install first https://www.npmjs.com/package/minifier
echo Minify...
call minify ./js/hello.js

rem Install first https://www.npmjs.com/package/uglify-js
rem uglifyjs -c -o ./wux/js/wux.min.js -m -- ./wux/js/wux.js
