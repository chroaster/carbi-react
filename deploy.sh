#!/bin/bash

set -e  # Exit on error

IMAGE_NAME="carbi-react"
# Use git commit hash or timestamp for versioning (better than 'latest')
IMAGE_TAG="${IMAGE_TAG:-$(git rev-parse --short HEAD 2>/dev/null || date +%Y%m%d-%H%M%S)}"
FULL_IMAGE_NAME="${IMAGE_NAME}:${IMAGE_TAG}"
SERVER_USER="tron"
SERVER_HOST="172.233.86.205"
CONTAINER_NAME="carbi-react"
NETWORK_NAME="web"  # Common network name for reverse proxy setup
# Map container port 80 to localhost:8081 for host nginx to connect
LOCAL_PORT="8081"

echo "Building production Docker image..."
docker build -t $FULL_IMAGE_NAME .
# Also tag as latest for convenience
docker tag $FULL_IMAGE_NAME ${IMAGE_NAME}:latest

echo "Saving Docker image to tar file..."
IMAGE_TAR="/tmp/${IMAGE_NAME}-${IMAGE_TAG}.tar"
docker save $FULL_IMAGE_NAME -o $IMAGE_TAR
trap "rm -f $IMAGE_TAR" EXIT

echo "Transferring image to production server..."
scp $IMAGE_TAR ${SERVER_USER}@${SERVER_HOST}:/tmp/

echo "Deploying container on production server..."
ssh ${SERVER_USER}@${SERVER_HOST} << EOF
  set -e
  
  echo "Loading Docker image..."
  docker load -i /tmp/${IMAGE_NAME}-${IMAGE_TAG}.tar
  rm -f /tmp/${IMAGE_NAME}-${IMAGE_TAG}.tar
  
  # Ensure network exists (create if it doesn't)
  docker network inspect $NETWORK_NAME >/dev/null 2>&1 || docker network create $NETWORK_NAME
  
  echo "Stopping and removing old container (if exists)..."
  docker stop $CONTAINER_NAME 2>/dev/null || true
  docker rm $CONTAINER_NAME 2>/dev/null || true
  
  echo "Starting new container with production best practices..."
  docker run -d \
    --name $CONTAINER_NAME \
    --network $NETWORK_NAME \
    -p 127.0.0.1:${LOCAL_PORT}:80 \
    --restart unless-stopped \
    --memory="256m" \
    --memory-swap="512m" \
    --cpus="1.0" \
    --health-cmd="wget --quiet --tries=1 --spider http://localhost:80 || exit 1" \
    --health-interval=30s \
    --health-timeout=10s \
    --health-retries=3 \
    --health-start-period=10s \
    --label "app=carbi-react" \
    --label "version=${IMAGE_TAG}" \
    --label "managed-by=deploy-script" \
    --log-driver json-file \
    --log-opt max-size=10m \
    --log-opt max-file=3 \
    $FULL_IMAGE_NAME
  
  echo ""
  echo "Container information:"
  echo "  Name: $CONTAINER_NAME"
  echo "  Image: $FULL_IMAGE_NAME"
  echo "  Network: $NETWORK_NAME"
  echo "  IP Address: \$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $CONTAINER_NAME)"
  echo "  Local access: http://127.0.0.1:${LOCAL_PORT} (for host nginx)"
  echo "  Container accessible at: http://$CONTAINER_NAME:80 (from other containers on $NETWORK_NAME network)"
  echo ""
  echo "Container deployed successfully!"
  docker ps --filter "name=$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
EOF

echo ""
echo "Finished deploying to production!"
echo "Note: Configure your nginx reverse proxy to proxy_pass to: http://127.0.0.1:${LOCAL_PORT}"
