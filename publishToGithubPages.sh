#!/bin/bash

N='[0m'
G='[01;32m'

# En ./
echo -e " ${V}Inicializando directorio para gitpages.${N}"
rm -r -f subrepo_gh_pages
git clone git@github.com:hugoruscitti/huayra-ritmos subrepo_gh_pages > /dev/null
cd subrepo_gh_pages/

echo " ${V}Limpiando el directorio gitpages.${N}"
# En subrepo_gh_pages
#git branch -D gh-pages
#git push origin --delete gh-pages
git checkout -b gh-pages
git pull origin gh-pages
git checkout -f
cd ..

echo " ${V}Compilando el proyecto.${N}"
# En ./
ember build --environment production --output-path dist_ghpages
#git rm -rf app addon config tests
#git rm -rf Brocfile.js bower.json package.json testem.json
#git rm -rf .bowerrc .editorconfig .jshintrc .travis.yml
cp -r dist_ghpages/* subrepo_gh_pages/
rm -rf dist_ghpages
#git add .
#git commit -m "Publishing to github pages"
#git push origin gh-pages
#git checkout master

echo " ${V}Realizando deploy.${N}"
cd subrepo_gh_pages
git add .
git commit -m "realizando deploy."
git push origin gh-pages
cd ..
echo " "
echo " ${V}Listo, el proyecto se puede vistar en:${N}"
echo " "
echo "                ${V}http://hugoruscitti.github.io/huayra-ritmos${N}"
echo " "

