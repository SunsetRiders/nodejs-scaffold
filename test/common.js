global.chai = require('chai');
global.assert = chai.assert;
global.expect = chai.expect;
global.request = require('supertest');
global.server = require('../server');
global.Browser = require('zombie');
chai.config.includeStack = true;

Browser.localhost('localhost', 3000);

process.env.NODE_ENV = 'test';
