FROM node:6.2

RUN mkdir /app
ADD . /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install

EXPOSE 3000
ENV NODE_ENV="production"
CMD ["npm", "start"]
