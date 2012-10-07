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
 * @version       Bancha v 1.1.0
 *
 * For more information go to http://banchaproject.org
 */
/*jslint browser: true, vars: true, undef: true, nomen: true, eqeq: false, plusplus: true, bitwise: true, regexp: true, newcap: true, sloppy: true, white: true */
/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, regexp:true, undef:true, trailing:false */
/*global Ext, Example:true, Bancha */

// API and Bancha is already included,
// now load sample dependencies
Ext.require([
    'Ext.grid.*'
]);








// when Bancha is ready, the model meta data is loaded
// from the server and the model is created....
Bancha.onModelReady(['Article','User'], function() {

    // ExtJS requires us to instanciate the associated model before we can use it
    Bancha.getModel('Article'); // this instanciates the model if it doesn't yet exist

    // load the user with the id 1
    Bancha.getModel('User').load(1, {
        callback: function(record, operation) {


            // the user is loaded, get all associated articles
            var store = record.articles();
            store.load();


            // display a grid of the data
            Ext.create('Ext.grid.Panel', {
                title: 'Display all to user 1 associated articles',
              
                // grid configs
                store: store,
                columns: Ext.clone(Example.Article.gridColumns),
                
                // some additional styles
                height: 350,
                width: 650,
                frame: true,
                renderTo: 'content'
            });
        }
    });
    
}); //eo onmodelready


















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
