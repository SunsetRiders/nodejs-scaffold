# nodejs-scaffold

A Node.js scaffolding for a web client with Express.js.
We hope you write a good README file for your project ;-)

## How to run this application

Please check that you have Node.js installed with npm. If you don't know where to start check https://nodejs.org/.

The ".env" file must exist to configure a server-side session with browsers (Please check [express-session](https://github.com/expressjs/session) module.
You can start with our example:

```shell
cp .env.example .env
```

Then run what a usual Node.js application needs:

```shell
npm install
npm run build
```

You can run the tests with:

```shell
npm test
```

Finally, run our application:

```shell
node server.js
```

## Information to start developing from this code

What modules are we using, mainly?

- [Express](http://expressjs.com/);
- [Pug](https://github.com/pugjs/pug);
- [Mocha](https://mochajs.org/);
- [Gulp](http://gulpjs.com/), and;
- [Sass](http://sass-lang.com/) related modules.

This code is following development rules and styles with [jshint](http://jshint.com/) and [ESLint](http://eslint.org).
Check commented code to enable integration with Mongo DB via [mongoose](http://mongoosejs.com/).

## Using Docker

If you want to run this project with Docker:

```shell
cp .env.example .env
docker-compose build
docker-compose up
```

It will setup docker and run the application on http://localhost:3000.

You can run tests with:

```shell
docker-compose run web npm test
```
