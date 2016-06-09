FROM node:6.2

RUN mkdir /app
WORKDIR /app
ADD package.json /app/package.json
RUN npm install
ADD . /app
