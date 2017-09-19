var MapView = new MAF.Class({
    ClassName: 'MapView',
    Extends: MAF.system.SidebarView,

    initialize: function () {
        this.parent();
    },

    createView: function() {
        //this.genetateImage();
        var mapImage = new MAF.element.Image();
        mapImage.setSources({
        source: 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyCyw0t8OLuv1gUat9Pn-nzsGthSg3NlMVk',
        //src: 'Images/map.png',
        missingSrc: 'Images/hs.png'
        }).appendTo( this );
    },

    genetateImage: function() {
      var requestMap = new XMLHttpRequest();
      requestMap.open('GET', "https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284 &key=AIzaSyCBGus-75SBKKW3HTCWh7OvRHiMZPt6Vkw",
                      true);

      requestMap.responseType = "arraybuffer";
      requestMap.onload = function(oEvent) {

      };
      requestMap.send();
  }
} );
