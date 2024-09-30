#!/bin/bash

echo "Building..."
yarn build
echo "rsyncing to /srv/carbi.coolbeans.fyi/"
rsync -truv --delete --delete-excluded ./build/* chroaster@173.255.246.169:/srv/carbi.coolbeans.fyi/

echo "Finished uploading /srv/carbi.coolbeans.fyi/"
