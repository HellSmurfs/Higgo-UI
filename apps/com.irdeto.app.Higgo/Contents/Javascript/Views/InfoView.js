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

                var backgroundImage = new MAF.element.Image();
                var urLBase = 'https://maps.googleapis.com/maps/api/staticmap?center=';
                var locationText = 'Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&';
                var coordinateInfo = 'markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyCyw0t8OLuv1gUat9Pn-nzsGthSg3NlMVk';
                var imageStr = urLBase + locationText + coordinateInfo;
                backgroundImage.setSources({
                    //source: 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyCyw0t8OLuv1gUat9Pn-nzsGthSg3NlMVk',
                    source: imageStr,
                    //src: 'Images/map.png',
                    missingSrc: 'Images/hs.png'
                });

                cell.title = new MAF.element.Text({
                    styles: {
                        width: cell.width,
                        height: cell.height,
                        color: 'white',
                        fontSize: 30,
                        anchorStyle: 'center',
                        wrap: true,
                        backgroundImage: backgroundImage
                    },

                }).appendTo(cell);

                return cell;
            },
            cellUpdater: function (cell, data) {
                cell.title.setText(data.title);
                if (1 === cell.getCellIndex() ) {
                  var backgroundImage = new MAF.element.Image();
                  backgroundImage.setSources({
                      source: 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyCyw0t8OLuv1gUat9Pn-nzsGthSg3NlMVk',
                      missingSrc: 'Images/hs.png'
                  }).appendTo(cell);
                  cell.animate(
                      {
                          backgroundImage: backgroundImage,
                      }
                  )
                }
            }
        }).appendTo(this);
    },

    updateView: function () {
        this.elements.elementGrid.changeDataset([
            {title: $_('Artist')},
            {title: $_('Map')},
            {title: $_('Information')}
        ], true);
    }
});