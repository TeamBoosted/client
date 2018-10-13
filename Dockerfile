FROM node:8.11.3

# install dependencies
WORKDIR /data
# COPY package.json package-lock.json* ./
# RUN npm install

# copy app source image ***AFTER*** npm install so that
# application code changes don't bust the docker cache of npm install step
COPY . .

ENTRYPOINT /usr/bin/tail -f /dev/null

CMD ["npm", "run", "build"]