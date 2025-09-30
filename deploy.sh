#!/bin/bash

echo "Building..."
yarn build
echo "rsyncing to /srv/carbi.coolbeans.lol/"
rsync -truv --delete --delete-excluded ./build/* chroaster@173.255.246.169:/srv/carbi.coolbeans.lol/

echo "Finished uploading /srv/carbi.coolbeans.lol/"
