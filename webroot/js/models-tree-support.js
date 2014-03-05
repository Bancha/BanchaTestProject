/*!
 *
 * Bancha Project : Seamlessly integrates CakePHP with Ext JS and Sencha Touch (http://bancha.io)
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

// define the tree panel
Ext.define('Bancha.view.tree.TreeGrid', {
    extend: 'Ext.tree.Panel',
    
    requires: [
        'Ext.data.*',
        'Ext.grid.*',
        'Ext.tree.*',
        'Ext.ux.CheckColumn',
        'Bancha.model.Task'
    ],
    
    // configure tree panel
    useArrows: true,
    rootVisible: false,
    multiSelect: false,
    
    initComponent: function() {
        
        Ext.apply(this, {
            store: new Ext.data.TreeStore({
                model: 'Bancha.model.Task',
                autoLoad: true,
                /**
                 * Automatically save changes to the 'done' field and re-ordering.
                 * 
                 * In Ext JS 5 this currently doesn't work because of the following bug:
                 * http://www.sencha.com/forum/showthread.php?289269
                 */
                autoSync: Ext.versions.extjs.major===4,

                /**
                 * Bug fix for the following Ext JS 5 bug:
                 * http://www.sencha.com/forum/showthread.php?287930
                 */
                listeners: {
                    beforeload: function (store, operation, eOpts) {
                        if(Ext.versions.extjs.major===5 && store.isLoading()) {
                            return false;
                        }
                    }
                }
            }),
            viewConfig: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    containerScroll: true, // auto-scroll when dragging down/up
                    appendOnly: true, // only support droping on a folder, since tree is sorted
                    displayField: 'name' // display the name while dragging
                }
            },
            columns: [{
                xtype: 'treecolumn', //this is so we know which column will show the tree
                text: 'Task',
                flex: 2,
                sortable: true,
                dataIndex: 'name'
            },{
                //we must use the templatecolumn component so we can use a custom tpl
                xtype: 'templatecolumn',
                text: 'Duration',
                flex: 1,
                sortable: true,
                dataIndex: 'duration',
                align: 'center',
                //add in the custom tpl for the rows
                tpl: Ext.create('Ext.XTemplate', '{duration:this.formatHours}', {
                    formatHours: function(v) {
                        if (v < 1) {
                            return Math.round(v * 60) + ' mins';
                        } else if (Math.floor(v) !== v) {
                            var min = v - Math.floor(v);
                            return Math.floor(v) + 'h ' + Math.round(min * 60) + 'm';
                        } else {
                            return v + ' hour' + (v === 1 ? '' : 's');
                        }
                    }
                })
            },{
                text: 'Assigned To',
                flex: 1,
                dataIndex: 'user',
                sortable: true
            }, {
                xtype: 'checkcolumn',
                header: 'Done',
                dataIndex: 'done',
                width: 55,
                stopSelection: false,
                menuDisabled: true
            }]
        });
        this.callParent();
    },

    // some additional styles
    title: 'Core Team Projects',
    height: 370,
    width: 650,
    frame: true
});

Ext.application({
    name: 'BanchaExample',
    requires: [
        // Simply require server-side models from the Bancha model namespace
        'Bancha.model.Article',
        'Bancha.model.User'
    ],
    launch: function() {
        Ext.create('Bancha.view.tree.TreeGrid', {
            renderTo: 'treepanel'
        });
    }
});
