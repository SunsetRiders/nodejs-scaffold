FROM node:6.2

RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH
