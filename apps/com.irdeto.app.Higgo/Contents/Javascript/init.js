// Include your views
include( 'Javascript/Views/MyView.js' );
<<<<<<< HEAD
=======
include( 'Javascript/Views/MainView.js' );
include( 'Javascript/Views/MapView.js' );
include( 'Javascript/Views/ElementGridView.js' );
>>>>>>> ui

// Init application with view config
MAF.application.init( {
	views: [
<<<<<<< HEAD
		{ id: 'MyView', viewClass: MyView },
		{ id: 'About', viewClass: MAF.views.AboutBox } // Use standard About view
	],
	defaultViewId: 'MyView', // Declare what view to be loaded when opening the app
	settingsViewId: 'About' // Declare what view is opened when a used loads the settings
} );
=======
		{ id: 'view-MainView', viewClass: MainView },
		{ id: 'view-ElementGridView', viewClass: ElementGridView },
		{ id: 'view-MapView', viewClass: MapView },
		{ id: 'view-MyView', viewClass: MyView },
		{ id: 'view-About', viewClass: MAF.views.AboutBox } // Use standard About view
	],
	defaultViewId: 'view-MainView', // Declare what view to be loaded when opening the app
	settingsViewId: 'view-About' // Declare what view is opened when a used loads the settings
} );

>>>>>>> ui
