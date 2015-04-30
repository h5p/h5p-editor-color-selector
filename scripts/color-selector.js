var H5PEditor = H5PEditor || {};

/**
 * ImagePositionSelector widget module
 *
 * @param {jQuery} $
 */
H5PEditor.widgets.colorSelector = H5PEditor.ColorSelector = (function ($) {

  /**
   * Creates a image position selector.
   *
   * @param {mixed} parent
   * @param {object} field
   * @param {mixed} params
   * @param {function} setValue
   * @returns {C}
   */
  function C(parent, field, params, setValue) {
    this.parent = parent;
    this.field = field;
    this.params = params;
    this.setValue = setValue;
  }

  /**
   * Append the field to the wrapper.
   *
   * @param {jQuery} $wrapper
   * @returns {undefined}
   */
  C.prototype.appendTo = function ($wrapper) {
    var self = this;

    self.$container = $('<div>', {
      'class': 'field text h5p-color-selector'
    });

    // Add header:
    $('<span>', {
      'class': 'h5peditor-label',
      html: self.field.label
    }).appendTo(self.$container);

    // Create input field
    self.$colorPicker = $('<input>', {
      'type': 'text',
      'class': 'h5p-color-picker'
    }).appendTo(self.$container);

    // Create color picker widget
    self.$colorPicker.spectrum({
      preferredFormat: 'hex',
      color: self.getColor(),
      change: function (color) {
        self.setColor(color);
      }
    });

    // Add description:
    $('<span>', {
      'class': 'h5peditor-field-description',
      html: self.field.description
    }).appendTo(self.$container)

    self.$container.appendTo($wrapper);
  };

  C.prototype.setColor = function (color) {
    // Save the value
    this.params = color.toHex();
    this.setValue(this.field, this.params);
  };

  C.prototype.getColor = function () {
    return '#' + this.params;
  };

  /**
   * Validate the current values.
   */
  C.prototype.validate = function () {
    return (this.params.length === 6);
  };

  C.prototype.remove = function () {};

  return C;
})(H5P.jQuery);
