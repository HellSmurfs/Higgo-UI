// Include your views
include( 'Javascript/Views/MainView.js' );
include( 'Javascript/Views/InfoView.js' );

// Init application with view config
MAF.application.init( {
	views: [
		{ id: 'view-MainView', viewClass: MainView },
		{ id: 'view-InfoView', viewClass: InfoView },
		{ id: 'view-About', viewClass: MAF.views.AboutBox } // Use standard About view
	],
	defaultViewId: 'view-MainView', // Declare what view to be loaded when opening the app
	settingsViewId: 'view-About' // Declare what view is opened when a used loads the settings
} );