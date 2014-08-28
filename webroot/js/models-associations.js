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
        // load Bancha Article and User models
        'Bancha.model.Article',
        'Bancha.model.ArticlesTag',
        'Bancha.model.User',
        'Bancha.model.Tag'
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
                            userRecord = field.getStore().getById(newValue),
                            store;

                        // activate the field below, if a user is selected
                        articleCombo.setDisabled(!userRecord);

                        // clear old selection
                        articleCombo.setValue('');

                        if(!userRecord) {
                            return; // no user selected
                        }

                        // Ext JS 5 is buggy and requires a fix here,
                        // see http://www.sencha.com/forum/showthread.php?289532
                        if(Ext.versions.extjs.major === 5) {
                            userRecord.articles = function() {
                                return Ext.create('Ext.data.Store', {
                                    model: 'Bancha.model.Article',
                                    remoteFilter: true,
                                    filters: [{
                                        property: 'user_id',
                                        value: this.getId()
                                    }]
                                });
                            };
                        }

                        // get the articles store from the association
                        store = userRecord.articles();

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
                    // as soon as the data is present show a popup
                    var options = {
                        callback: function(user, operation) {
                            Ext.Msg.alert('Loaded belongsTo user record', [
                                'The Article '+selected[0].get('title'),
                                ' belongs to the user ',
                                user.get('name') || '<i>No name defined</i>'
                            ].join(''));
                        }
                    };

                    // load the user of the selected article
                    if(Ext.versions.extjs.major === 4) {
                        // In Ext JS 4 we can simply call the generated getter function
                        selected[0].getUser(options);
                    } else {
                        // In Ext JS 5 due to the bug already mentioned above we need to load
                        // the user model manually
                        Bancha.model.User.load(selected[0].get('user_id'), options);
                    }
                } //eo selectionchanged
            }
        });


        /**
         * Example 3 - HandAndBelongsToMany
         */
        Ext.create('Ext.form.Panel', {
            title: 'One use case for a hasAndbelongsToMany association, Article hasAndbelongsToMany Tag',

            items: [{
                xtype: 'combobox',
                fieldLabel: 'Select article',
                name: 'article',
                store: {
                    xtype: 'Ext.data.Store',
                    model: 'Bancha.model.Article',
                    autoLoad: true
                },
                queryMode: 'local',
                forceSelection: true,
                displayField: 'title',
                valueField: 'id',
                padding: '10 0 10 3',
                listeners: {
                    change: function(field, newValue) {
                        var form = field.up('form').down('form'),
                            // get the selected user record
                            articleRecord = field.getStore().getById(newValue);

                        // keep track of the record
                        form._record = articleRecord;

                        // show record in panel
                        form.getForm().setValues(articleRecord.data);
                        form.setTitle('Edit Article: '+articleRecord.data.title);
                        form.expand(true);
                        if(Ext.versions.extjs.major === 5) {
                            form.up('form').setHeight(325); // Ext JS 5 forgets to update the height 
                        }

                        // transform tags to combobox format
                        var tags = [];
                        if(Ext.versions.extjs.major === 5) {
                            // Ext JS 5 is buggy and requires to access the raw data
                            // see http://www.sencha.com/forum/showthread.php?289532 
                            Ext.each(articleRecord.data.tags, function(tag) {
                                tags.push(tag.id);
                            });
                        } else {
                            // iterate through the associated store
                            articleRecord.articlesTags().each(function(rec) {
                                tags.push(rec.data.tag_id);
                            });
                        }
                        form.down('combobox').setValue(tags);
                    }
                }
            }, {
                xtype: 'form',
                title: 'Select an article from above first.',
                collapseMode: 'header',
                collapsed: true,

                // fields will be arranged vertically, stretched to full width
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                bodyPadding: 20,

                items: [{
                    xtype: 'textfield',
                    name: 'title',
                    fieldLabel: 'Title',
                    allowBlank: false
                }, {
                    xtype: 'textarea',
                    name: 'body',
                    fieldLabel: 'Body'
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Tags',
                    name: 'tags',
                    store: {
                        xtype: 'Ext.data.Store',
                        model: 'Bancha.model.Tag',
                        autoLoad: true
                    },
                    multiSelect: true,
                    queryMode: 'local',
                    displayField: 'string',
                    valueField: 'id'
                }],

                buttons: [{
                    text: 'Reset',
                    handler: function() {
                        var form = this.up('form');
                        form.getForm().setValues(form._record.data);
                    }
                }, {
                    text: 'Submit',
                    formBind: true, //only enabled when form is valid
                    handler: function() {
                        var form = this.up('form'),
                            rec = form._record;

                        if (!form.isValid()) {
                            return;
                        }
                        form.setLoading(true);

                        // update the record
                        form.getForm().updateRecord(rec);
                        if(rec.isModified()) {
                            form.setLoading(true);
                            rec.save({
                                success: function(rec, result) {
                                    form.setLoading(false);
                                }
                            });
                        }

                        if(Ext.versions.extjs.major === 5) {
                            // Ext JS 5 is buggy and requires a fix here,
                            // see http://www.sencha.com/forum/showthread.php?289532
                            var store = Ext.create('Ext.data.Store', {
                                model: 'Bancha.model.ArticlesTag',
                                remoteFilter: true,
                                filters: [{
                                    property: 'article_id',
                                    value: rec.getId()
                                }]
                            });
                            store.load({
                                scope: this,
                                callback: Ext.Function.bind(this.onStoreLoadedUpdateHandler, this, [store, form, rec])
                            });
                        } else {
                            // simply jump to the method below
                            this.onStoreLoadedUpdateHandler(
                                rec.articlesTags(), // take the already associated data
                                form,
                                rec
                            );
                        }
                    },
                    onStoreLoadedUpdateHandler: function(store, form, rec) {
                        // update hasAndBelongsToMany
                        var tags = form.down('combobox').getValue();

                        // since the combobox saves data in a different format, transform data
                        var records = store.data.items,
                            i = 0;
                        while(i < records.length) { // needs to be a while, because we remove data inside the loop
                            if(tags.indexOf(records[i].data.tag_id) === -1) {
                                // this connection got removed by the user
                                store.remove(records[i]);
                            } else {
                                // connection stays the same
                                // remvoed from to-be-processed tags array
                                tags.splice(tags.indexOf(records[i].data.tag_id), 1);
                                i++;
                            }
                        }
                        Ext.each(tags, function(tagId) {
                            // add newly selected ones
                            store.add({
                                article_id: rec.data.id,
                                tag_id: tagId
                            });
                        });

                        if(!store.getRemovedRecords().length && !store.getNewRecords().length) {
                            // nothing to sync
                            form.setLoading(false);
                            return;
                        }

                        // else sync
                        store.sync({
                            scope: form,
                            callback: function() {
                                this.setLoading(false);
                            }
                        });
                    }
                }]
            }],

            // some additional styles
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            padding: 10,
            width: 650,
            frame: true,
            renderTo: 'has-and-belongs-to-many-form'
        });
    }
});
