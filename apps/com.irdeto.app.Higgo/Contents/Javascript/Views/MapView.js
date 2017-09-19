var MapView = new MAF.Class({
  ClassName: 'MapView',
  Extends: MAF.system.FullscreenView,

  createView: function () {
    this.elements.ourText = new MAF.element.Text({
      label: $_('Loading location...'),
      styles: {
        width: this.width,
        height: this.height,
        fontSize: 60,
        anchorStyle: 'center'
      }
    }).appendTo(this);
    console.log(this.persist.dates);
  },

  updateView: function () {

  }
});