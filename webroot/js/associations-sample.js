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
/*global Ext, Bancha */

// include Bancha
Ext.Loader.setConfig('enabled', true);
Ext.Loader.setPath('Bancha','/Bancha/js');
Ext.syncRequire('Bancha.Initializer');


Ext.application({
    name: 'BanchaExample',
    requires: [
        // load the grid
        'Ext.grid.*',
        // load Bancha Article and User models
        'Bancha.model.Article',
        'Bancha.model.User'
    ],

    launch: function() {

        /**
         * Example 1 - Load all hasMany associations
         */

        // display a grid of articles
        Ext.create('Ext.form.Panel', {
            title: 'Select a user to load all his articles',

            // The fields
            defaultType: 'combobox',
            items: [{
                fieldLabel: 'User',
                name: 'user',
                store: {
                    xtype: 'Ext.data.Store',
                    model: 'Bancha.model.User',
                    autoLoad: true
                },
                displayField: 'name',
                valueField: 'id',
                listeners: {
                    change: function(field, newValue) {
                        var articleCombo = field.up('form').down('[name=article]'),
                            // get the selected user record
                            userRecord = field.getStore().getById(newValue);

                        // activate the field below, if a user is selected
                        articleCombo.setDisabled(!userRecord);

                        // clear old selection
                        articleCombo.setValue('');

                        if(!userRecord) {
                            return; // no user selected
                        }

                        // get the articles store from the association
                        var store = userRecord.articles();

                        // load data for the new store
                        store.load();

                        // use this store in the combo below
                        articleCombo.bindStore(store);
                    }
                }
            },{
                fieldLabel: 'User\'s Article',
                name: 'article',
                displayField: 'title',
                valueField: 'id',
                disabled: true, // activate after something is selected above
                listeners: {
                    change: function(field, newValue) {
                        var article = field.getStore().getById(newValue);

                        if(article) {
                            Ext.Msg.alert('Selected Article', [
                                'You have selected the article <em>'+
                                article.get('title'),
                                '</em>, written on ',
                                Ext.Date.format(article.get('date'),'m/d/Y'),
                                '.'
                            ].join(''));
                        }
                    }
                }
            }],

            // some additional styles
            layout: 'anchor',
            defaults: {
                anchor: '100%',
                queryMode: 'local',
                padding: 10
            },
            padding: 10,
            height: 150,
            width: 650,
            frame: true,
            renderTo: 'has-many-combo'
        });



        /**
         * Example 2 - Load all belongsTo associations
         */

        // Since all examples share the same data, it's possible that
        // a NotFoundExceptions get thrown because a user record got
        // deleted in the crud examples. In this case show another msg
        Ext.direct.Manager.on('exception', function() {
            Ext.Msg.alert('Loaded belongsTo user record', [
                'The Article doesn\'t belong to any user.<br /><br />',
                'This can happen since we are using the same data in all examples.'
            ].join(''));
        });

        // display a grid of articles
        var articles = Ext.create('Ext.data.Store', {
            model: 'Bancha.model.Article',
            autoLoad: true
        });
        Ext.create('Ext.grid.Panel', {
            title: 'Click on a article to load the belongsTo user',

            // grid configs
            store: articles,
            columns: [{
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
            }],

            // some additional styles
            height: 350,
            width: 650,
            frame: true,
            renderTo: 'belongs-to-grid',

            listeners: {
                selectionchange: function(selectionModel, selected) {

                    // load the user of the selected article
                    selected[0].getUser({
                        callback: function(user, operation) {
                            Ext.Msg.alert('Loaded belongsTo user record', [
                                'The Article '+selected[0].get('title'),
                                ' belongs to the user ',
                                user.get('name') || '<i>No name defined</i>'
                            ].join(''));
                        }
                    });
                } //eo selectionchanged
            }
        });
    }
}); //eo application
