FROM node:boron

ENV DBHOST="127.0.0.1" DBPORT=6379

# Create app directory
RUN mkdir -p /usr/src/nodeapp
WORKDIR /usr/src/nodeapp

# Install app dependencies
#COPY package.json /usr/src/hello21-pac-server/

# Bundle app source
COPY . /usr/src/nodeapp
RUN yarn install

EXPOSE 3000
CMD [ "npm", "start" ]
