#! /bin/sh

git push origin HEAD && git tag -fa v1 -m "Version 1" && git push origin HEAD --tags --force


