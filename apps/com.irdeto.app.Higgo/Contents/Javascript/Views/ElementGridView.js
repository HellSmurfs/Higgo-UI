var ElementGridView = new MAF.Class( {
  ClassName: 'ElementGridView',
  Extends: MAF.system.SidebarView,

  createView: function() {

    var backButton = new MAF.control.BackButton( {
      label: $_('BACK')
    } ).appendTo( this );

    // In the ControlGridView.js example there is a guid, when guid is not needed
    // but the element needs to be accessed outside the create view function
    // you can reference elements in the view.elements object
    var elementGrid = this.elements.elementGrid = new MAF.element.Grid( {
      rows: 2,
      columns: 2,
      styles: {
        width: this.width,
        height: this.height - backButton.outerHeight,
        vOffset: backButton.outerHeight
      },
      cellCreator: function() {
        var cell = new MAF.element.GridCell( {
          styles: this.getCellDimensions(),
          events:{
            onSelect: function() {
              log( 'onSelect function GridCell', this.getCellIndex() );
              MAF.application.loadView('view-MapView', {
          		myData: [1, 2, 3]
        		});
            },
            onFocus: function() {
              var cellIndex = this.getCellIndex();

              if ( 1 === cellIndex || 2 === cellIndex ) {
                this.animate( {
                  backgroundImage: 'Images/focus.png',
                  backgroundRepeat: 'repeat-x',
                  backgroundColor: 'blue',
                  duration: 0.3,
                  scale: 1.2
                } );
              } else {
                this.animate( {
                  backgroundColor: 'white',
                  duration: 0.3,
                  scale: 1.2
                } );

                this.title.animate( {
                  duration: 0.3,
                  color: 'black'
                } );
              }
            },
            onBlur: function () {
              var cellIndex = this.getCellIndex();

              if ( 1 === cellIndex || 2 === cellIndex ) {
                this.animate( {
                  backgroundImage: null,
                  duration: 0.3,
                  scale: 1.0
                } );
              } else {
                this.animate( {
                  backgroundColor: null,
                  duration: 0.3,
                  scale: 1.0
                } );
                this.title.animate( {
                  duration: 0.3,
                  color: 'white'
                });
              }
            }
          }
        } );

        cell.title = new MAF.element.Text( {
          styles: {
            width: cell.width,
            height: cell.height,
            color: 'white',
            fontSize: 30,
            anchorStyle: 'center',
            wrap: true
          }
        } ).appendTo( cell );

        return cell;
      },
      cellUpdater: function( cell, data ) {
        cell.title.setText( data.title );
      }
    } ).appendTo( this );
  },

  updateView: function() {
    this.elements.elementGrid.changeDataset( [
      { title: $_('Eminem') },
      { title: $_('HellCats') },
      { title: $_('Lady Gaga') },
      { title: $_('Linkin Park') }
    ], true );
  }
} );