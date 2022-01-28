#!/bin/sh

find . -name 'dist' -exec rm -rf '{}' +
find . -name 'node_modules' -exec rm -rf '{}' +
find . -name '.turbo' -exec rm -rf '{}' +