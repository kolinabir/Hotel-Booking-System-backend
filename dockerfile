FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

# RUN npm install
RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000


CMD [ "npm","run","dev" ]