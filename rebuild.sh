if [ "$1" == "nocontainer" ]; then
  echo "Starting new container.."
else
  echo "Restarting container.."
  docker stop teamboosted-client && docker rm -v teamboosted-client
fi
docker pull danielkang674/teamboosted-client:latest && docker run -v /data --name teamboosted-client --env-file .env -d danielkang674/teamboosted-client:latest -f /dev/null
