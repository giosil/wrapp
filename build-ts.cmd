@echo off

cd .\src\main\webapp

echo Clean js folder..
del /Q .\wux\js\*.*

echo Compile WUX...
call tsc --declaration --project ./ts/wux/tsconfig.json

rem Install first https://www.npmjs.com/package/minifier
echo Minify...
call minify ./wux/js/wux.js

rem Install first https://www.npmjs.com/package/uglify-js
rem uglifyjs -c -o ./wux/js/wux.min.js -m -- ./wux/js/wux.js
