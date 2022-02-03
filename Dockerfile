FROM node:12.20.1-alpine
WORKDIR /app
COPY package.json /app
RUN npm install --production
COPY . /app  
EXPOSE 8080
CMD node server.js
