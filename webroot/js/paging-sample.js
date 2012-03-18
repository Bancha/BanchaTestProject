/*!
 *
 * Bancha Project : Combining Ext JS and CakePHP (http://banchaproject.org)
 * Copyright 2011-2012 Roland Schuetz, Kung Wong, Andreas Kern, Florian Eckerstorfer
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @package       Bancha
 * @copyright     Copyright 2011-2012 Roland Schuetz, Kung Wong, Andreas Kern, Florian Eckerstorfer
 * @link          http://banchaproject.org Bancha Project
 * @since         Bancha v 0.9.2
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 * @version       Bancha v PRECOMPILER_ADD_RELEASE_VERSION
 *
 * For more information go to http://banchaproject.org 
 */
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

    // create a store using Bancha with paging
    var store = Ext.create('Ext.data.Store',{
        model: Bancha.getModel('Article'),
        autoLoad: true,
        pageSize: 10,
        remoteSort: true
    });
    
    // Everything below is just normal ExtJS code
    // Create a simple grid which demostrates the Bancha 
    // support for serverside paging and remote sorting
    Ext.create('Ext.grid.Panel', {
        
        // use the store from above
        store: store,
        
        // normal column definitions
        columns: [{
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
        }, {
            flex: 1,
            xtype: "numbercolumn",
            format: "0",
            text: "User",
            dataIndex: "user_id",
            field: {
                xtype: "numberfield",
                allowDecimals: false,
                name: "user_id"
            }
        }, {
            xtype: "actioncolumn",
            width: 50,
            items: [{
                icon: "/img/icons/delete.png",
                tooltip: "Delete",
                handler: null
            }]
        }],

        // add a paging bar
        bbar: Ext.create('Ext.PagingToolbar', {
            store: store,
            displayInfo: true,
            displayMsg: 'Displaying entry {0} - {1} of {2}',
            emptyMsg: "No entires to display"
        }),
        
        // add some styling
        height: 300,
        width: 650,
        frame: true,
        title: 'Grid with serverside Paging and remote sorting, loaded with Bancha',
        renderTo: 'gridpanel'
    });

});

// eof
