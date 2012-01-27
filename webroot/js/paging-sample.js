/*jslint browser: true, vars: false, plusplus: true, white: true, sloppy: true */
/*global Ext, Bancha */

// API and Bancha is already included,
// now load sample dependencies
Ext.require([
    'Ext.grid.*'
]);


// when Bancha is ready, the model meta data is loaded
// from the server and the model is created....
Bancha.onModelReady('Article', function() {

    // ... create a simple grid showing paging support
    Ext.create('Ext.grid.Panel', {
        
        // we don't need an editable grid for this example
        enableCreate: false,
        enableUpdate: false,
        enableDestroy: false,
        
        // configure scaffolding
        scaffold: {
			// model name
	        target: 'Article',
	
            // configure paging
            storeDefaults: {
                autoLoad: true,
                pageSize: 10,
                remoteSort: true
            },

            // add a paging bar
            afterBuild: function(config) {
                // paging bar on the bottom
                config.bbar = Ext.create('Ext.PagingToolbar', {
                    store: config.store,
                    displayInfo: true,
                    displayMsg: 'Displaying entry {0} - {1} of {2}',
                    emptyMsg: "No entires to display"
                });
                return config;
            } //eo afterBuild
        },
        
        // add some styling
        height: 300,
        width: 650,
        frame: true,
        title: 'Grid with serverside Paging, data is loaded with Bancha',
        renderTo: 'gridpanel'
    });

});

// eof
