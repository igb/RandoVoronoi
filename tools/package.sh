rm ./dist/randovoronoi.tgz 
tar --exclude="*\#" --exclude=".*" --exclude="*~"  -czvf ./dist/randovoronoi.tgz  ./deps/ ./ebin/ ./src/


