#!/bin/bash

npx prisma db push --force-reset
npx ts-node ./prisma/seed-dev
ps -ef | grep prisma | grep -v grep | awk '{print $2}' | xargs kill