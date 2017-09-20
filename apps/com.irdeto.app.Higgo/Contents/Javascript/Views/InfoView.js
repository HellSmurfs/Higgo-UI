var InfoView = new MAF.Class({
    ClassName: 'InfoView',
    Extends: MAF.system.SidebarView,

    createView: function () {

        var backButton = new MAF.control.BackButton({
            label: $_('BACK')
        }).appendTo(this);

        // In the ControlGridView.js example there is a guid, when guid is not needed
        // but the element needs to be accessed outside the create view function
        // you can reference elements in the view.elements object
        var elementGrid = this.elements.elementGrid = new MAF.element.Grid({
            rows: 3,
            columns: 1,
            styles: {
                width: this.width,
                height: this.height - backButton.outerHeight,
                vOffset: backButton.outerHeight
            },
            cellCreator: function () {
                var cell = new MAF.element.GridCell({
                    styles: this.getCellDimensions(),
                });

                cell.title = new MAF.element.Text({
                    styles: {
                        width: cell.width,
                        height: cell.height,
                        color: 'white',
                        fontSize: 30,
                        anchorStyle: 'top-center',
                        wrap: true,
                        //backgroundImage: backgroundImage
                    },

                }).appendTo(cell);

                return cell;
            },
            cellUpdater: function (cell, data) {
                if (1 === cell.getCellIndex() ) {
                    var urlI = 'https://maps.googleapis.com/maps/api/staticmap?center=';
                    var location = cell.getCellDataItem().data.location;
                    var sizeInfo = '&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C';
                    var key = '&key=AIzaSyCyw0t8OLuv1gUat9Pn-nzsGthSg3NlMVk';
                    var lat = cell.getCellDataItem().data.geometry.lat;
                    var lon = cell.getCellDataItem().data.geometry.lon;
                    console.log(lat, "Latitude");
                    var geoStr = urlI + location + sizeInfo + lat + ',' + lon + key;
                    console.log(geoStr, "Url string");
                  var backgroundImage = new MAF.element.Image();
                  backgroundImage.setSources({
                      //source: 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyCyw0t8OLuv1gUat9Pn-nzsGthSg3NlMVk',
                      source: geoStr,
                      missingSrc: 'Images/hs.png'
                  }).appendTo(cell);
                  cell.animate(
                      {
                          backgroundImage: backgroundImage,
                      }
                  )
                } else {
                    cell.title.setText(data.data);
                }
            }
        }).appendTo(this);
    },

    updateView: function () {
        // screen.log(JSON.stringify(data));

    var band = this.persist.dates[0].bandName;
    var tmpband = band;
    console.log(band, "band name");
    var headr = 'Playing at: \n';
    var info = this.persist.dates[0].venue + ' on ' + this.persist.dates[0].date + ' in ' + this.persist.dates[0].location;
    var cood = this.persist.dates[0];
    var i = 1;
    while(i < this.persist.dates.length) {
        if (tmpband === this.persist.dates[i].bandName) {
            info += ', \r\n';
            info += this.persist.dates[i].venue + ' on ' + this.persist.dates[i].date + ' in ' + this.persist.dates[i].location;
            ++i;
        }
    }
    var infoStr = headr + info;
    console.log(infoStr, "band info");
    this.elements.elementGrid.changeDataset([
            {name:'artist', data: band},
            {name: 'coordinates', data: cood },
            {name: 'information', data: infoStr}
        ], true);
    },

    destroyView: function () {
        this.IOTEvents.unsubscribeFrom(MAF.application, 'onIotEvent');
    }

});