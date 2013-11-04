/*!
 *
 * Bancha Project : Combining Ext JS and CakePHP (http://banchaproject.org)
 * Copyright 2011-2013 codeQ e.U.
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @package       Bancha
 * @copyright     Copyright 2011-2013 codeQ e.U.
 * @link          http://banchaproject.org Bancha Project
 * @since         Bancha v 0.9.2
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 * @version       Bancha v 1.1.0
 *
 * For more information go to http://banchaproject.org
 */
/*jslint browser: true, vars: true, undef: true, nomen: true, eqeq: false, plusplus: true, bitwise: true, regexp: true, newcap: true, sloppy: true, white: true */
/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, regexp:true, undef:true, trailing:false */
/*global Ext, Example:true, Bancha */

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
            columns: Ext.clone(Example.Article.gridColumns),

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
            columns: Ext.clone(Example.Article.gridColumns),

            // some additional styles
            height: 350,
            width: 650,
            frame: true,
            renderTo: 'title-01-articles'
        });
}
}); //eo application







/**
 * This object provides some basic ExtJS code
 * to make the sample above cleaner and more
 * focused on the important parts
 */
var Example = {};
/**
 * columsn for the article model
 */
Example.Article = {};
Example.Article.gridColumns = [
    {
        flex: 1,
        xtype: "gridcolumn",
        text: "Title",
        dataIndex: "title",
        field: {
            xtype: "textfield",
            name: "title"
        }
    }, {
        flex: 1,
        xtype: "datecolumn",
        text: "Date",
        dataIndex: "date",
        field: {
            xtype: "datefield",
            name: "date"
        }
     }, {
        flex: 1,
        xtype: "gridcolumn",
        text: "Body",
        dataIndex: "body",
        field: {
            xtype: "textfield",
            name: "body"
        }
     }, {
        flex: 1,
        xtype: "booleancolumn",
        text: "Published",
        dataIndex: "published",
        field: {
            uncheckedValue: false,
            xtype: "checkboxfield",
            name: "published"
        }
    }
];


// eof
