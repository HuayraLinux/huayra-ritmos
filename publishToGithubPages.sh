#!/bin/bash

# En ./
rm -r -f subrepo_gh_pages
git clone git@github.com:hugoruscitti/huayra-ritmos subrepo_gh_pages
cd subrepo_gh_pages/

# En subrepo_gh_pages
git branch -D gh-pages
git push origin --delete gh-pages
git checkout -b gh-pages
cd ..

# En ./
ember build --environment ghpages --output-path dist_ghpages
#git rm -rf app addon config tests
#git rm -rf Brocfile.js bower.json package.json testem.json
#git rm -rf .bowerrc .editorconfig .jshintrc .travis.yml
mv dist_ghpages/* subrepo_gh_pages
rm -rf dist_ghpages
#git add .
#git commit -m "Publishing to github pages"
#git push origin gh-pages
#git checkout master

cd subrepo_gh_pages
git add .
git commit -m "realizando deploy."
git push origin gh-pages
