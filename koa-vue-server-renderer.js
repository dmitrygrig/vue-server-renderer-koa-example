'use strict';

const renderer = require('vue-server-renderer').createRenderer();
/**
 * Promise-wrapper over vue-server-renderer.
 * @param  {Vue}       client      Vue application instance
 * @return {Generator}             Rendered html
 */
function* renderToString(client) {
  return new Promise(function(resolve, reject) {
    renderer.renderToString(
      client,
      // Handle the rendered result
      function(error, html) {
        if (error) {
          return reject(error);
        } else {
          return resolve(html);
        }
      }
    );
  })
}

module.exports.renderToString = renderToString;
