// topics
// by Daniel Rodríguez
// MIT Licensed

define('app', [
  'jquery'
, 'underscore'
, 'backbone'
, 'router'
], function($, _, B, Router) {

  // Initializing the Router
  // and the History API
  function init() {
    var router = new Router
    B.history.start()
  }

  return {
    init      : init
  }

})
