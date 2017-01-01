'use strict'
const fs = require('fs');
const path = require('path');
const koa = require('koa');
const serve = require('koa-static');
const Promise = require('promise');
const renderer = require('./koa-vue-server-renderer');

let server = koa();
server.use(serve("./assets"));

global.Vue = require('vue');
let client = require('./assets/app')();
let layout = fs.readFileSync('./index.html', 'utf8');

server.use(function*() {
  let ctx = this;
  try {
    let html = yield renderer.renderToString(client);
    ctx.body = layout.replace('<div id="app"></div>', html);
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit("error", err, this);
  }
});

server.listen(3000);
console.log(`server is now listening on port 3000`);

process.on("SIGINT", function exit() {
  process.exit();
});
