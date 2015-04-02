/**
 * Created by palra on 31/03/15.
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
define(function () {
  function ToggleButton(app) {
    this.app = app;
    this.active = !!app.get(this._key, !!this.defaultValue || true);

    this.defaultValue = this.defaultValue || true;

    var that = this;

    this.element.addEventListener('click', function () { // TODO : Erreur -> Uncaught TypeError: Cannot read property 'addEventListener' of null
      that.toggle();
      that.checkState();
    });

    this.checkState();
  }

  ToggleButton.prototype.enable = function() {
    this.app.set(this._key, this.active = true);
  };

  ToggleButton.prototype.disable = function() {
    this.app.set(this._key, this.active = false);
  };

  ToggleButton.prototype.toggle = function() {
    this.app.set(this._key, this.active = !this.active);
    return this.active;
  };

  ToggleButton.prototype.checkState = function() {
    if(this.active) {
      if (this.element.classList.contains("off")) {
        this.element.classList.remove("off");
        this.element.classList.add("on");
      }
    } else {
      if (this.element.classList.contains("on")) {
        this.element.classList.remove("on");
        this.element.classList.add("off");
      }
    }

    return !!this.active;
  };

  return ToggleButton;
});