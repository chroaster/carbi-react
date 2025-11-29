#!/bin/bash

echo "Yarn installing..."
yarn install
echo "Building..."
yarn build
echo "rsyncing to /srv/carbi.coolbeans.lol/"
rsync -truv --delete --delete-excluded ./build/* tron@172.233.86.205:/srv/carbi.coolbeans.lol/

echo "Finished uploading /srv/carbi.coolbeans.lol/"
