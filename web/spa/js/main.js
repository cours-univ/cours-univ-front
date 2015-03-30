/**
 * Created by palra on 30/03/15.
 */

requirejs.config({
  baseUrl: 'spa/js',
  paths: {
    jquery: '/components/jquery/dist/jquery.min'
  }
});

require([
  'jquery'
], function ($) {
  $.noConflict();
});


require([
  'jquery'
], function ($) {
  $('#container').html('<h1>Hello world !</h1>');
});