FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm config set registry https://registry.npm.taobao.org && yarn install

# Bundle app source
COPY . /usr/src/app

EXPOSE 4000
CMD [ "npm", "start" ]
