FROM node:6.2

RUN mkdir /app
ADD . /app
WORKDIR /app
RUN npm install
RUN gulp build-prod
ENV PATH /app/node_modules/.bin:$PATH

EXPOSE 3000
ENV NODE_ENV="production"
CMD ["node", "server.js"]
