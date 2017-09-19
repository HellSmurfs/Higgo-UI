var MainView = new MAF.Class({
  ClassName: 'MainView',
  Extends: MAF.system.SidebarView,

  initialize: function () {
    this.parent();
    MAF.mediaplayer.init();
  },

  iotListener: function (evt) {
    if (evt.payload.e && evt.payload.e === "higgo") {
      var data = JSON.stringify(evt.payload.meta.messages[0]);
      this.updateView(data);
    }
  },

  createView: function () {
    this.IOTEvents = this.iotListener.subscribeTo(MAF.application, 'onIotEvent',
        this);

    var backButton = new MAF.control.BackButton({
      label: $_('BACK')
    }).appendTo(this);

    // In the ControlGridView.js example there is a guid, when guid is not needed
    // but the element needs to be accessed outside the create view function
    // you can reference elements in the view.elements object
    var elementGrid = this.elements.elementGrid = new MAF.element.Grid({
      rows: 2,
      columns: 2,
      styles: {
        width: this.width,
        height: this.height - backButton.outerHeight,
        vOffset: backButton.outerHeight
      },
      cellCreator: function () {
        var cell = new MAF.element.GridCell({
          styles: this.getCellDimensions(),
          events: {
            onSelect: function () {
              log('onSelect function GridCell', this.getCellIndex());
              MAF.application.loadView('view-MapView', {
                dates: this.getCellDataItem().data
              });
            },
            onFocus: function () {
              var cellIndex = this.getCellIndex();

              if (1 === cellIndex || 2 === cellIndex) {
                this.animate({
                  backgroundImage: 'Images/focus.png',
                  backgroundRepeat: 'repeat-x',
                  backgroundColor: 'blue',
                  duration: 0.3,
                  scale: 1.2
                });
              } else {
                this.animate({
                  backgroundColor: 'white',
                  duration: 0.3,
                  scale: 1.2
                });

                this.title.animate({
                  duration: 0.3,
                  color: 'black'
                });
              }
            },
            onBlur: function () {
              var cellIndex = this.getCellIndex();

              if (1 === cellIndex || 2 === cellIndex) {
                this.animate({
                  backgroundImage: null,
                  duration: 0.3,
                  scale: 1.0
                });
              } else {
                this.animate({
                  backgroundColor: null,
                  duration: 0.3,
                  scale: 1.0
                });
                this.title.animate({
                  duration: 0.3,
                  color: 'white'
                });
              }
            }
          }
        });

        cell.title = new MAF.element.Text({
          styles: {
            width: cell.width,
            height: cell.height,
            color: 'white',
            fontSize: 30,
            anchorStyle: 'center',
            wrap: true
          }
        }).appendTo(cell);

        return cell;
      },
      cellUpdater: function (cell, data) {
        cell.title.setText(data.title);
      }
    }).appendTo(this);
  },

  updateView: function (data) {
    screen.log(JSON.stringify(data));

    // var parsed_data = JSON.parse(data);

    var test_data = [
      {
        venue: 'The O2 Arena',
        geometry: {lat: 51.5073509, lon: -0.1277583},
        styles: ['Heavy metal', 'thrash metal'],
        date: '2017-10-22',
        location: 'London, England',
        bandName: 'Metallica'
      },
      {
        venue: 'The O2 Arena',
        geometry: {lat: 51.5073509, lon: -0.1277583},
        styles: ['Heavy metal', 'thrash metal'],
        date: '2017-10-24',
        location: 'London, England',
        bandName: 'Metallica'
      }
    ];
    var parsed_data = test_data;

    screen.log(JSON.stringify(parsed_data));

    var grouped_dates = {
    };

    for (var i=0; i < parsed_data.length; i++) {
      var item = parsed_data[i];
      if (!grouped_dates[item.bandName]) {
        grouped_dates[item.bandName] = [];
      }
      grouped_dates[item.bandName].push(item);
    }

    var grouped_arr = [];

    for(var key in grouped_dates) {
      grouped_arr.push({
        title: key,
        data: grouped_dates[key]
      })
    }

    this.elements.elementGrid.changeDataset(grouped_arr, true);
  },

  destroyView: function () {
    this.IOTEvents.unsubscribeFrom(MAF.application, 'onIotEvent');
  }
});