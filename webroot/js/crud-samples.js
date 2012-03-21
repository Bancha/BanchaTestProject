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
/*jslint browser: true, vars: true, plusplus: true, white: true, sloppy: true */
/*global Ext, Example, Bancha */

// API and Bancha is already included,
// now load sample dependencies
Ext.require([
    'Ext.grid.*'
]);


// when Bancha is ready, the model meta data is loaded
// from the server and the model is created....
Bancha.onModelReady(['Article','User'], function() {



    /**
     * Example 1
     * A Bancha Store which provides full CRUD support
     */
     
    var store = Ext.create('Ext.data.Store', {
        model: Bancha.getModel('User'), // yes, that's all you have to do 
        autoLoad: true                  // (proxy, fields. etc. is already configured)
    });
    
    
    // create a full featured users grid (just normal ExtJS code)
    var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
        clicksToEdit: 2
    });
    Ext.create('Ext.grid.Panel', {
        title: 'User Grid with full CRUD support',
      
        // grid configs
        store: store,
        columns: Ext.clone(Example.User.gridColumnsWithCrud),
        
        // enable editing
        selType: 'cellmodel',
        plugins: [cellEditing],
        
        // add buttons
        dockedItems: [{
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: [
                '->',
                {
                    iconCls: 'icon-add',
                    text: 'Create',
                    scope: {
                        cellEditing: cellEditing,
                        store      : store
                    },
                    handler: Example.Grid.onCreate
                }, {
                    iconCls: 'icon-reset',
                    text: 'Reset',
                    scope: store,
                    handler: Example.Grid.onReset
                }, {
                    iconCls: 'icon-save',
                    text: 'Save',
                    formBind: true,
                    scope: store,
                    handler: Example.Grid.onSave
                }
            ]
        }],
        
        
        // some additional styles
        height: 350,
        width: 650,
        frame: true,
        renderTo: 'gridpanel'
    });


     
     
     


    /**
     * Example 2
     * A Bancha Store which provides paging and remote sorting
     */
     
    var pagingStore = Ext.create('Ext.data.Store',{
        model: Bancha.getModel('Article'),
        autoLoad: true,
        pageSize: 10,
        remoteSort: true
    });
    
    
    // Everything below is just normal ExtJS code
    Ext.create('Ext.grid.Panel', {
        title: 'Grid with serverside Paging and remote sorting, loaded with Bancha',
        
        // grid config
        store: pagingStore,
        columns: Ext.clone(Example.Article.gridColumns),

        // add a paging bar
        bbar: Ext.create('Ext.PagingToolbar', {
            store: pagingStore,
            displayInfo: true,
            displayMsg: 'Displaying entry {0} - {1} of {2}',
            emptyMsg: "No entires to display"
        }),
        
        // add some styling
        height: 300,
        width: 650,
        frame: true,
        renderTo: 'paginated-gridpanel'
    });





    /**
     * Example 3
     * Bancha also provides support for form submits and file uploads
     */

    Ext.create('Ext.form.Panel', { 
        title: 'Form Submit with File Upload - Create a new User',
        
        // configure Bancha
        api: {
            load: Bancha.RemoteStubs.User.read,     // <-- use Bancha's standard CRUD methods for forms
            submit: Bancha.RemoteStubs.User.submit
        },
        paramOrder: ['data'],
        
        // enable file uploads
        fileUpload: true,
        
        // configure form
        items: Ext.clone(Example.User.formItems),
        
        
        // add load and submit buttons
        id: 'form',
        buttons: [{
            text: 'Load Record 1',
            iconCls: 'icon-edit-user',
            handler: function() {
                var panel = Ext.ComponentManager.get('form');
                
                // load the form (Bancha requires this structure)
                panel.load({
                    params: {
                        data: { data: { id:1 } }
                    },
                    success: function(form, action) {
                        // build a record
                        console.info(action.result.data);
                        rec = Ext.create(Bancha.getModel('User'),action.result.data);
                        form.loadRecord(rec);
                        
                        // update the image
                        panel.down('#avatar-display-field').update(action.result.data);
                    }
                });
                
                // change the header title
                panel.setTitle('Form Submit with File Upload - Change Record 1');
            }
        }, {
            iconCls: "icon-save",
            text: "Save",
            formBind: true,
            handler: function() {
                var panel = Ext.ComponentManager.get('form'),
                    form  = panel.getForm();
                
                if(form.isValid()){
                    form.submit({
                        waitMsg: 'Saving data..',
                        success: function(form, action) {
                            var rec;
                            Ext.MessageBox.alert('Success', action.result.msg || 'Successfully saved data.');
                            
                            // if we just created a new record on the server, create it here as well
                            if(!form.getRecord()) {
                                rec = Ext.create(Bancha.getModel('User'),action.result.data);
                                form.loadRecord(rec);
                            } else {
                                // save changes
                                rec = form.getRecord();
                                Ext.Object.each(action.result.data,function(key,value) {
                                    rec.set(key,value);
                                });
                            }
                            
                            // update image
                           panel.down('#avatar-display-field').update(rec.data);
                        },
                        failure: function(form, action) {
                            Ext.MessageBox.alert('Failed', action.result.msg || 'Could not save data, unknown error.');
                            
                            // update image
                            panel.down('#avatar-display-field').update({});
                        }
                    });
                }
            } //eo handler
        }], //eo buttons
        
        
        // some additional styles
        width: 650,
        frame:true,
        renderTo: 'formpanel',
        bodyStyle:'padding:5px 5px 0',
        fieldDefaults: {
            msgTarget: 'side',
            labelWidth: 75
        },
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        }
    }); // eo create
    
    
    

    /**
     * Example 4
     * Just a different usage of a standard Bancha Store
     */

    // ... and some standard extjs charting
    // yes, there's nothing you have to do bancha-specific, just normal ext ;-)
    Ext.create("Ext.panel.Panel", {
        title: 'Column Chart',
        renderTo: 'chart',
        layout: 'fit',
        width: 650,
        height: 350,
        items: {
            xtype: 'chart',
            style: 'background:#fff',
            animate: true,
            shadow: true,
            store: store, // <-- the store from above
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
     
     
     
});


/**
 * This object provides some basic ExtJS code
 * to make the sample above cleaner and more 
 * focused on the important parts
 */
var Example = {};

Example.Grid = {
    onCreate: function() { // scope is a config object
        var edit = this.cellEditing,
            grid = edit.grid,
            store = this.store,
            model = store.getProxy().getModel(),
            rec;
        
        // Cancel any active editing.
        edit.cancelEdit();
         
        // create new entry
        rec = Ext.create(Ext.ClassManager.getName(model),{});

        // add entry
        store.insert(0, rec);
        
        // start editing
        edit.startEditByPosition({
            row: 0,
            column: 0
        });
    },
    onSave: function() { // scope is the store
        var valid = true,
            msg = "",
            name,
            store = this;
        
        // check if all changes are valid
        store.each(function(el) {
            if(!el.isValid()) {
                valid = false;
                name = el.get('name') || el.get('title') || (el.phantom ? "New entry" : el.getId());
                msg += "<br><br><b>"+name+":</b>";
                el.validate().each(function(error) {
                    msg += "<br>&nbsp;&nbsp;&nbsp;"+error.field+" "+error.message;
                });
            }
        });
        
        if(!valid) {
            Ext.MessageBox.show({
                title: 'Invalid Data',
                msg: '<div style="text-align:left; padding-left:50px;">There are errors in your data:'+msg+"</div>",
                icon: Ext.MessageBox.ERROR,
                buttons: Ext.Msg.OK
            });
        } else {
            // commit create and update
            store.sync();
        }
    },
    onDelete: function (grid, rowIndex, colIndex) {
        var store = grid.getStore(),
        rec = store.getAt(rowIndex),
        name = Ext.getClassName(rec);

        // instantly remove vom ui
        store.remove(rec);

        // sync to server
        // for before-ExtJS 4.1 the callbacks will be ignored, 
        // since they were added in 4.1
        store.sync({
            success: function(record,operation) {

                Ext.MessageBox.show({
                    title: name + ' record deleted',
                    msg: name + ' record was successfully deleted.',
                    icon: Ext.MessageBox.INFO,
                    buttons: Ext.Msg.OK
                });
            },
            failure: function(record,operation) {

                // since it couldn't be deleted, add again
                store.add(rec);

                // inform user
                Ext.MessageBox.show({
                    title: name + ' record could not be deleted',
                    msg: operation.getError() || (name + ' record could not be deleted.'),
                    icon: Ext.MessageBox.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        }); //eo store sync
    },
    onReset: function() { // scope is the store
        // reject all changes
        var store = this;
        store.each(function(rec) {
            if (rec.modified) {
                rec.reject();
            }
            if(rec.phantom) {
                store.remove(rec);
            }
        });
    }
};



// for the user model
Example.User = {
    formItems: [
        {
            xtype: "hiddenfield",
            allowDecimals: false,
            name: "id",
            fieldLabel: "Id"
        }, {
            xtype: "textfield",
            name: "name",
            fieldLabel: "Name"
        }, {
            xtype: "textfield",
            name: "login",
            fieldLabel: "Login"
        }, {
            xtype: "textfield",
            name: "email",
            fieldLabel: "Email",
            vtype: 'email'
        }, {
            xtype: 'fileuploadfield',
            name: "avatar",
            fieldLabel: "Avatar",
            
            buttonText: '',
            buttonConfig: {
                iconCls: 'icon-upload'
            },
            vtype: 'fileExtension',
            validExtensions: ['gif', 'jpeg', 'png', 'jpg'],
            emptyText: 'Select an file'
        }, {
            xtype: 'component', 
            id: 'avatar-display-field',
            data: {},
            tpl: '<tpl if="avatar"><span class="uploaded-image">most recently uploaded image: {avatar}<image src="{avatar}" style="max-width: 400px; height:100px;" title="most recently uploaded image"></span></tpl>'
        }, {
            xtype: "numberfield",
            allowBlank: false,
            name: "weight",
            fieldLabel: "Weight"
        }, {
            xtype: "numberfield",
            allowBlank: false,
            allowDecimals: false,
            name: "height",
            fieldLabel: "Height"
        }
    ],
    gridColumns: [
        {
            flex: 1,
            xtype: "gridcolumn",
            text: "Name",
            dataIndex: "name",
            field: {
                xtype: "textfield",
                name: "name",
                minLength: 3,
                maxLength: 64
            }
        }, {
            flex: 1,
            xtype: "gridcolumn",
            text: "Login",
            dataIndex: "login",
            field: {
                xtype: "textfield",
                name: "login",
                minLength: 3,
                maxLength: 64
            }
        }, {
            flex: 1,
            xtype: "datecolumn",
            text: "Created",
            dataIndex: "created",
            field: {
                xtype: "datefield",
                name: "created"
            }
        }, {
            flex: 1,
            xtype: "gridcolumn",
            text: "Email",
            dataIndex: "email",
            field: {
                xtype: "textfield",
                name: "email",
                vtype: "email",
                allowBlank: false
            }
        }, {
            flex: 1,
            xtype: "numbercolumn",
            text: "Weight",
            dataIndex: "weight",
            field: {
                xtype: "numberfield",
                name: "weight",
                minValue: 40
            }
        }, {
            flex: 1,
            xtype: "numbercolumn",
            format: "0",
            text: "Height",
            dataIndex: "height",
            field: {
                xtype: "numberfield",
                allowDecimals: false,
                name: "height",
                minValue: 100,
                maxValue: 500
        }
        }
    ]
};

Example.User.gridColumnsWithCrud = Ext.clone(Example.User.gridColumns);
Example.User.gridColumnsWithCrud.push({
    xtype: "actioncolumn",
    width: 50,
    items: [{
        icon: "/img/icons/delete.png",
        tooltip: "Delete",
        handler: Example.Grid.onDelete
    }]
});

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
