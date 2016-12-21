/**
 * ImagePositionSelector widget module
 *
 * @param {H5P.jQuery} $
 */
H5PEditor.widgets.colorSelector = H5PEditor.ColorSelector = (function ($) {

  /**
   * Creates an image position selector.
   *
   * @class H5PEditor.ColorSelector
   * @param {Object} parent
   * @param {Object} field
   * @param {Object} params
   * @param {function} setValue
   */
  function ColorSelector(parent, field, params, setValue) {
    this.parent = parent;
    this.field = field;
    this.params = params;
    this.setValue = setValue;
  }

  /**
   * Append the field to the wrapper.
   * @public
   * @param {H5P.jQuery} $wrapper
   */
  ColorSelector.prototype.appendTo = function ($wrapper) {
    var self = this;

    var label = H5PEditor.createLabel(this.field);
    var description = H5PEditor.createDescription(this.field.description);
    var $field = H5PEditor.$(H5PEditor.createItem('text h5p-color-selector', label + description));

    // Create input field
    self.$colorPicker = $('<input>', {
      'type': 'text',
      'class': 'h5p-color-picker',
      appendTo: $field
    });

    self.config = {
      preferredFormat: 'hex',
      color: self.getColor(),
      change: function (color) {
        self.setColor(color);
      },
      hide: function (color) {
        // Need this to get color if cancel is clicked
        self.setColor(color);
      }
    };

    // Make it possible to set spectrum config
    if (self.field.spectrum !== undefined) {
      self.config = $.extend(self.config, self.field.spectrum);
    }

    // Create color picker widget
    self.$colorPicker.spectrum(self.config);

    $field.appendTo($wrapper);
  };

  /**
   * Return colorcode in "css" format
   *
   * @method colorToString
   * @param  {Object}      color
   * @return {String}
   */
  ColorSelector.prototype.colorToString = function (color) {
    switch (this.config.preferredFormat) {
      case 'rgb': return color.toRgbString();
      case 'hsv': return color.toHsvString();
      case 'hsl': return color.toHslString();
      default: return color.toHexString();
    }
  };

  /**
   * Hide color selector
   * @method hide
   */
  ColorSelector.prototype.hide = function () {
    this.$colorPicker.spectrum('hide');
  };
  /**
   * Save the color
   *
   * @param {Object} color The
   */
  ColorSelector.prototype.setColor = function (color) {
    // Save the value, allow null
    this.params = (color === null ? null : this.colorToString(color));
    this.setValue(this.field, this.params);
  };

  ColorSelector.prototype.getColor = function () {
    var isEmpty = (this.params === null || this.params === "");
    return isEmpty ? null : this.params;
  };

  /**
   * Validate the current values.
   */
  ColorSelector.prototype.validate = function () {
    this.hide();
    return (this.params.length !== 0);
  };

  ColorSelector.prototype.remove = function () {};

  return ColorSelector;
})(H5P.jQuery);
