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
 * @version       Bancha v PRECOMPILER_ADD_RELEASE_VERSION
 *
 * For more information go to http://banchaproject.org
 */
/*jslint browser: true, vars: true, undef: true, nomen: true, eqeq: false, plusplus: true, bitwise: true, regexp: true, newcap: true, sloppy: true, white: true */
/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, regexp:true, undef:true, trailing:false */
/*global Ext, Example:true, Bancha */

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
        name = name.substr(0,12)==='Bancha.model' ? name.substr(13) : name;

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
            if (rec && rec.modified) {
                rec.reject();
            }
            if(rec && rec.phantom) {
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
            fieldLabel: "Name",
            minLength: 3,
            maxLength: 64
        }, {
            xtype: "textfield",
            name: "login",
            fieldLabel: "Login",
            minLength: 3,
            maxLength: 64
        }, {
            xtype: "datefield",
            name: "created",
            fieldLabel: "Created on",
            format: 'Y-m-d H:i:s'
        }, {
            xtype: "textfield",
            name: "email",
            fieldLabel: "Email",
            vtype: 'email',
            allowBlank: false
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
            fieldLabel: "Weight",
            minValue: 40
        }, {
            xtype: "numberfield",
            allowBlank: false,
            allowDecimals: false,
            name: "height",
            fieldLabel: "Height",
            minValue: 100,
            maxValue: 250
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
                maxValue: 250
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

/**
 * Add a new form field validation rule for the user form with a file upload
 */

Ext.require([
    'Ext.form.field.VTypes'
    ], function() {
        
    var filenameHasExtension = function(filename,validExtensions) {
        if(!filename) {
            return true; // no file defined (emtpy string or undefined)
        }
        if(!Ext.isDefined(validExtensions)) {
            return true;
        }
        var ext = filename.split('.').pop();
        return Ext.Array.contains(validExtensions,ext);
    };
    /**
     * @class Ext.form.field.VTypes
     * @author Roland Schuetz <mail@rolandschuetz.at>
     * @docauthor Roland Schuetz <mail@rolandschuetz.at>
     */
    Ext.apply(Ext.form.field.VTypes, {
        /**
         * @method
         * Validates that the file extension is of one of field.validExtensions
         * Also true if field.validExtensions is undefined or if val is an empty string
         */
        fileExtension: function(val, field) {
            return filenameHasExtension(val,field.validExtensions);
        },
        /**
         * @property
         * The error text to display when the file extension validation function returns false. Defaults to: 'This file type is not allowed.'
         */
        fileExtensionText: 'This file type is not allowed.',
        /**
         * @property
         * The keystroke filter mask to be applied on alpha input. Defaults to: /[\^\r\n]/
         */
        fileExtensionMask: /[\^\r\n]/ // alow everything except new lines
    });
});
