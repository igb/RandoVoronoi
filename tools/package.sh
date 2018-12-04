rm ./dist/randovoronoi.tgz 
tar --exclude="*\#" --exclude="dist/*" --exclude=".*" --exclude="*~" --exclude="my_node_modules/*" --exclude="node_modules/*" -czvf ./dist/randovoronoi.tgz  ./* 


packer add_version --cluster=smf1 ibrown randovoronoi dist/randovoronoi.tgz
