# GIT_CHEATSHEET — quick commands

## Init & link remote
git init
git remote add origin https://github.com/YourUser/shiroa-music.git
git pull origin main --allow-unrelated-histories

## Basic flow
git add .
git commit -m "chore: add docs"
git push origin main

## Feature branch
git checkout -b feat/some-feature
git add .
git commit -m "feat: implement x"
git push -u origin feat/some-feature

## Sync
git checkout main
git pull origin main
git merge feat/branch
git push origin main

## Useful
git status
git log --oneline
git diff
git revert <commit>

