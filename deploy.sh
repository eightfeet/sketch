#!/bin/bash

set -e

rm -rf ./build
npm run build:uat
scp -r ./build/* www@192.168.103.107:~/web/byhealth-training
