/**
 * Created by palra on 30/03/15.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */
define([
  'backbone',
  'editor/main',
  'spa'
], function(Backbone, EditorView, spa) {
  var AppRouter = Backbone.Router.extend({
    routes: {
      "editor": "editor", // matches http://example.com/#editor
      "*daoda": "editor"  // fallback method, if any of above failed
    },

    editor: function() {
      var editor = new EditorView({ el: spa.$el })
    }
  });

  return new AppRouter();
});