var MainView = new MAF.Class({
  ClassName: 'MainView',
  Extends: MAF.system.SidebarView,

  initialize: function () {
    this.parent();
    MAF.mediaplayer.init();
  },

  iotListener: function (evt) {
    screen.log(evt);
    if (evt.payload.e && evt.payload.e === "higgo") {
      var data = evt.payload.meta.messages[0];
      this.updateView(data);
    }
  },

  createView: function () {
    this.IOTEvents = this.iotListener.subscribeTo(MAF.application, 'onIotEvent',
        this);

    this.elements.ourText = new MAF.element.Text({
      label: $_('Playing near you...'),
      styles: {
        width: this.width,
        height: this.height,
        fontSize: 60,
        anchorStyle: 'center'
      }
    }).appendTo(this);

    // Create a Text element with translated label
    var textButtonLabel = new MAF.element.Text({
      //label: $_('MAF.control.TextButton'),
      styles: {
        height: 40,
        width: 400,
        hOffset: ( this.width - 400 ) / 2
      }
    }).appendTo(this);

    // Create a Text button with a select event
    var textButton = new MAF.control.TextButton({
      label: $_('Load'),
      styles: {
        width: textButtonLabel.width,
        height: 60,
        hOffset: textButtonLabel.hOffset,
        vOffset: textButtonLabel.outerHeight
      },
      textStyles: {anchorStyle: 'center'},
      events: {
        onSelect: function () {
          log('onSelect function TextButton');
          MAF.application.loadView('view-ElementGridView', {
            myData: [1, 2, 3]
          });
        }
      }
    }).appendTo(this);
  },

  updateView: function (data) {
    this.elements.ourText.setText(JSON.stringify(data));
  },

  destroyView: function () {
    this.IOTEvents.unsubscribeFrom(MAF.application, 'onIotEvent');
  }
});