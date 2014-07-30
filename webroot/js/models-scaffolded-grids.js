/*!
 *
 * Bancha : Seamlessly integrates CakePHP with Ext JS and Sencha Touch (http://bancha.io)
 * Copyright 2011-2014 codeQ e.U.
 *
 * @package       Bancha
 * @copyright     Copyright 2011-2014 codeQ e.U.
 * @link          http://bancha.io Bancha
 * @since         Bancha v 2.3.0
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 * @version       Bancha v PRECOMPILER_ADD_RELEASE_VERSION
 *
 * For more information go to http://bancha.io
 */
/*jslint 
    browser: true, vars: true, undef: true, nomen: true, eqeq: false, plusplus: true, 
    bitwise: true, regexp: true, newcap: true, sloppy: true, white: true */
/*jshint 
    bitwise: true, camelcase: false, curly: true, eqeqeq: true, es3: true, forin:true,
    immed:true, indent: 4, latedef: true, newcap: true, noarg: true, noempty: true, 
    plusplus: false, quotmark: single, undef: true, unused: vars, strict: false, 
    trailing: true */
/*global Ext */

// include Bancha
Ext.Loader.setConfig('enabled', true);
Ext.Loader.setPath('Bancha','/Bancha/js');
Ext.syncRequire('Bancha.Initializer');

Ext.application({
    name: 'BanchaExample',
    requires: [
        // Simply require server-side models from the Bancha model namespace
        'Bancha.model.Article',
        'Bancha.model.User',
        // Also require Bancha Scaffold
        'Bancha.scaffold.form.override.Panel',
        'Bancha.scaffold.grid.override.Panel'
    ],
    launch: function() {

        /**
         * Example 1
         * Create a grid panel which provides full CRUD support
         */

        Ext.create('Ext.grid.Panel', {
            title: 'User Grid with full CRUD support',

            // determin columns, etc. from model
            scaffold: 'Bancha.model.User',

            // some additional styles
            height: 370,
            width: 650,
            frame: true,
            renderTo: 'gridpanel'
        });

        /**
         * Example 2
         * A Bancha Store which provides paging and remote sorting
         */

        Ext.create('Ext.grid.Panel', {
            title: 'Grid with serverside Paging and remote sorting, loaded with Bancha',

            // use config object
            scaffold: {

                // determin columns, etc. from model
                target: 'Bancha.model.Article',

                // use a different store in every example
                oneStorePerModel: false,

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
                        emptyMsg: 'No entires to display'
                    });
                    return config;
                }, //eo afterBuild

                // don't provide edit features
                editable: false,
                deletable: false,
                buttons: false
            },

            // add some styling
            height: (Ext.versions.extjs.major === 4) ? 300 : 357,
            width: 650,
            frame: true,
            renderTo: 'paginated-gridpanel'
        });
    }
});
