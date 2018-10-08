if [ "$1" == "nocontainer" ]; then
  echo "Starting new container.."
else
  echo "Restarting container.."
  docker stop teamboosted-client && docker rm teamboosted-client
fi
docker build -t teamboosted-client . && docker run --name teamboosted-client -v /var/www/:/TeamBoosted/src/app/client/dist/ -d teamboosted-client