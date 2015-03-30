/**
 * Created by palra on 30/03/15.
 */

requirejs.config({
  baseUrl: 'spa/',
  paths: {
    jquery:   '/components/jquery/dist/jquery.min',
    backbone: '/components/backbone/backbone',
    lodash: '/components/lodash/lodash.min',
    underscore: '/components/underscore/underscore-min',
    text: '/components/requirejs-text/text'
  }
});

require([
  'jquery'
], function ($) {
  $.noConflict();
});


require([
  'router',
  'backbone'
], function (router, Backbone) {
  Backbone.history.start();
});