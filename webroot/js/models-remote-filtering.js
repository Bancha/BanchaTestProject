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
        // load the grid
        'Ext.grid.*',
        // load Bancha Article model
        'Bancha.model.Article'
    ],

    launch: function() {

        // create a store which remotelly filters for published articles only
        var store = Ext.create('Ext.data.Store', {
            model: Bancha.getModel('Article'),
            remoteFilter: true
        });
        store.filter('published', true);
        store.load();

        // display a grid of the data
        Ext.create('Ext.grid.Panel', {
            title: 'Display all published articles',

            // grid configs
            store: store,
            columns: [
                {
                    flex: 1,
                    xtype: 'gridcolumn',
                    text: 'Title',
                    dataIndex: 'title',
                    field: {
                        xtype: 'textfield',
                        name: 'title'
                    }
                }, {
                    flex: 1,
                    xtype: 'datecolumn',
                    text: 'Date',
                    dataIndex: 'date',
                    field: {
                        xtype: 'datefield',
                        name: 'date'
                    }
                }, {
                    flex: 1,
                    xtype: 'gridcolumn',
                    text: 'Body',
                    dataIndex: 'body',
                    field: {
                        xtype: 'textfield',
                        name: 'body'
                    }
                }, {
                    flex: 1,
                    xtype: 'booleancolumn',
                    text: 'Published',
                    dataIndex: 'published',
                    field: {
                        uncheckedValue: false,
                        xtype: 'checkboxfield',
                        name: 'published'
                    }
                }
            ],

            // some additional styles
            height: 350,
            width: 650,
            frame: true,
            renderTo: 'published-articles'
        });

        // example 2
        // create a store which remotelly filters for articles with Title 'Title 01'
        var store2 = Ext.create('Ext.data.Store', {
            model: Bancha.getModel('Article'),
            remoteFilter: true
        });
        store2.filter('title', 'Titel 01');
        store2.load();

        // display a grid of the data
        Ext.create('Ext.grid.Panel', {
            title: 'Display all articles with title equals "Titel 01"',

            // grid configs
            store: store2,
            columns: [
                {
                    flex: 1,
                    xtype: 'gridcolumn',
                    text: 'Title',
                    dataIndex: 'title',
                    field: {
                        xtype: 'textfield',
                        name: 'title'
                    }
                }, {
                    flex: 1,
                    xtype: 'datecolumn',
                    text: 'Date',
                    dataIndex: 'date',
                    field: {
                        xtype: 'datefield',
                        name: 'date'
                    }
                }, {
                    flex: 1,
                    xtype: 'gridcolumn',
                    text: 'Body',
                    dataIndex: 'body',
                    field: {
                        xtype: 'textfield',
                        name: 'body'
                    }
                }, {
                    flex: 1,
                    xtype: 'booleancolumn',
                    text: 'Published',
                    dataIndex: 'published',
                    field: {
                        uncheckedValue: false,
                        xtype: 'checkboxfield',
                        name: 'published'
                    }
                }
            ],

            // some additional styles
            height: 350,
            width: 650,
            frame: true,
            renderTo: 'title-01-articles'
        });
    }
});
