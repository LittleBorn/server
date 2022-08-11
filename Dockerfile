FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 80 443
CMD [ "npm", "run", "production" ]

# Building the Application 
# docker build . -t <username>/littleborn-api
# docker images -> <username>/littleborn-api
# run the image with: docker run -p <port>:443 -d <username>/littleborn-api
# docker ps -> <username>/littleborn-api & container id
# check outpunt with: docker logs <containerid>
# enter docker container: docker exec -it <container id> /bin/bash
# mount volume docker run -v volume:/usr/src/app