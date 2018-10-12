if [ "$1" == "nocontainer" ]; then
  echo "Starting new container.."
else
  echo "Restarting container.."
  docker stop teamboosted-client && docker rm -v teamboosted-client
fi
docker pull danielkang674/teamboosted-client && docker run -v /data --name teamboosted-client -d danielkang674/teamboosted-client -f /dev/null
