/*!
 *
 * Bancha Project : Combining Ext JS and CakePHP (http://banchaproject.org)
 * Copyright 2011-2012 StudioQ OG
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @package       Bancha
 * @copyright     Copyright 2011-2012 StudioQ OG
 * @link          http://banchaproject.org Bancha Project
 * @since         Bancha v 0.9.2
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 * @version       Bancha v PRECOMPILER_ADD_RELEASE_VERSION
 *
 * For more information go to http://banchaproject.org
 */
/*jslint browser: true, vars: true, undef: true, nomen: true, eqeq: false, plusplus: true, bitwise: true, regexp: true, newcap: true, sloppy: true, white: true */
/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, regexp:true, undef:true, trailing:false */
/*global Ext, Bancha */

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

                // don't show delete icon
                deletable: false
            },

            // add some styling
            height: 350,
            width: 650,
            frame: true,
            renderTo: 'paginated-gridpanel'
        });



        /**
         * Example 4
         * Just a different usage of a standard Bancha Store
         */
        var chartStore = Ext.create('Ext.data.Store', {
            model: Bancha.getModel('User'), // yes, that's all you have to do
            autoLoad: true                  // (proxy, fields. etc. is already configured)
        });

        // ... and some standard extjs charting
        // yes, there's nothing you have to do bancha-specific, just normal ext ;-)
        Ext.create("Ext.panel.Panel", {
            title: 'Column Chart',
            renderTo: 'chart',
            layout: 'fit',
            width: 650,
            frame: true,
            height: 400,
            padding: '40px 30px 20px 20px',
            items: {
                xtype: 'chart',
                style: 'background:#fff',
                animate: true,
                shadow: true,
                store: chartStore, // <-- the store from above
                axes: [{
                    type: 'Numeric',
                    position: 'left',
                    fields: ['height'],
                    label: {
                        renderer: Ext.util.Format.numberRenderer('0,0')
                    },
                    title: 'Persons Height',
                    grid: true,
                    minimum: 0
                }, {
                    type: 'Category',
                    position: 'bottom',
                    fields: ['name'],
                    title: 'User'
                }],
                series: [{
                    type: 'column',
                    axis: 'left',
                    highlight: true,
                    tips: {
                      trackMouse: true,
                      width: 140,
                      height: 28,
                      renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('name') + ': ' + storeItem.get('height') + 'cm');
                      }
                    },
                    label: {
                      display: 'insideEnd',
                      'text-anchor': 'middle',
                        field: 'height',
                        renderer: Ext.util.Format.numberRenderer('0'),
                        orientation: 'vertical',
                        color: '#333'
                    },
                    xField: 'name',
                    yField: 'height'
                }]
            }
        });
    }
});
