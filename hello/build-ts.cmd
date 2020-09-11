@echo off

cd .\src\main\webapp

echo Clean js folder..
del /Q .\js\*.*

echo Compile WUX...
call tsc --declaration --project ./ts/wux/tsconfig.json
echo Compile hello...
call tsc --noEmitHelpers --declaration --project ./ts/tsconfig.json

rem Install first https://www.npmjs.com/package/minifier
echo Minify...
call minify ./js/wux.js
call minify ./js/hello.js

rem Install first https://www.npmjs.com/package/uglify-js
rem uglifyjs -c -o ./wux/js/wux.min.js -m -- ./wux/js/wux.js
