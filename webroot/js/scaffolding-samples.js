/*!
 *
 * Bancha Project : Seamlessly integrates CakePHP with Ext JS and Sencha Touch (http://banchaproject.org)
 * Copyright 2011-2013 codeQ e.U.
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @package       Bancha
 * @copyright     Copyright 2011-2013 codeQ e.U.
 * @link          http://banchaproject.org Bancha Project
 * @since         Bancha v 0.2.0
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 * @version       Bancha v PRECOMPILER_ADD_RELEASE_VERSION
 *
 * For more information go to http://banchaproject.org
 */
/*jslint browser: true, vars: true, undef: true, nomen: true, eqeq: false, plusplus: true, bitwise: true, regexp: true, newcap: true, sloppy: true, white: true */
/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, regexp:true, undef:true, trailing:false */
/*global Ext, Bancha */

// API and Bancha is already included,
// now load sample dependencies
Ext.require([
    'Ext.form.*',
    'Ext.grid.*'
]);

Ext.define('Bancha.model.Article', {
        "idProperty":"id",
        "fields":[{
            name:"id",
            "type":"int"
        },{
            "name":"title",
            "type":"string"
        },{
            "name":"date",
            "type":"date",
            "dateFormat":"Y-m-d H:i:s"
        },{
            "name":"body",
            "type":"string"
        },{
            "name":"published",
            "type":"boolean"
        },{
            "name":"user_id",
            "type":"int"
        }],
        "validations":[{
            "type":"presence",
            "field":"title"
        },{
            "type":"numberformat",
            "field":"user_id"
        }],
        associations:[{
            "type":"belongsTo",
            "model":"User",
            "name":"users"
        }]
});
Ext.define('Bancha.model.Article', {
    "idProperty":"id","fields":[{"name":"id","type":"int"},{"name":"name","type":"string"},
    {"name":"login","type":"string"},{"name":"created","type":"date","dateFormat":"Y-m-d H:i:s"},
    {"name":"email","type":"string"},{"name":"avatar","type":"string"},{"name":"weight","type":"float"},
    {"name":"height","type":"int"}],"validations":[{"type":"numberformat","field":"id","precision":0},
    {"type":"presence","field":"name"},{"type":"length","field":"name","min":3,"max":64},
    {"type":"presence","field":"login"},{"type":"length","field":"login","min":3,"max":64},
    {"type":"format","field":"login","matcher":"banchaAlphanum"},{"type":"presence","field":"email"},
    {"type":"format","field":"email","matcher":"banchaEmail"},{"type":"numberformat","field":"weight","precision":2},
    {"type":"numberformat","field":"height","precision":0},{"type":"numberformat","field":"height","min":50,"max":300},
    {"type":"file","field":"avatar","extension":["gif","jpeg","png","jpg"]}],"associations":
    [{"type":"hasMany","model":"Article","name":"articles"}]
});



// when Bancha is ready, the model meta data is loaded
// from the server and the model is created....
Bancha.onModelReady('User', function(userModel) {

    // ... create a full featured users grid
    Ext.create('Ext.grid.Panel', {
        scaffold: 'User', // model name
        
        // basic scaffold configs con be set directly
        enableCreate : true,
        enableUpdate : true,
        enableDestroy: true,
        enableReset  : true,
        
        // some additional styles
        height: 350,
        width: 650,
        frame: true,
        title: 'User Grid with full CRUD support',
        renderTo: 'gridpanel'
    });

    // and a form panel
    Ext.create('Ext.form.Panel', {
        
        // basic scaffold configs con be set directly
        banchaLoadRecord: false,
        enableReset: true,
        
        // model name and advanced configs can be set here
        scaffold: {
            // model name
            target: 'User',
            
            // we're using the after interceptor for more complex changes
            afterBuild: function(formConfig) {
                
                // add another button
                formConfig.buttons.unshift({
                    text: 'Load Record 1',
                    iconCls: 'icon-edit-user',
                    handler: function() {
                        var panel = this.getPanel(), // scopeButtonHandler enables this
                            form = this.getForm(); // scopeButtonHandler enables this
                        
                        // load the form
                        panel.load({
                            params: {
                                data: { data: { id:1 } }
                            }
                        });
                        
                        // change the header title
                        panel.setTitle('Form with upload field - Change Record 1');
                    },
                    scope: this.buildButtonScope(formConfig.id) // this is currently not very elegant, we will solve this in future releases
                });
                
                return formConfig;
            } //eo afterBuild
        }, // eo scaffoldConfig
        
        
        // some additional styles
        width: 650,
        frame:true,
        title: 'Form with upload field - Create a new User',
        renderTo: 'formpanel',
        id: 'form',
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
            store: Ext.create("Ext.data.Store",{
                model: 'User',
                autoLoad: true
            }),
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




    // ... create a simple grid showing paging support
    Ext.create('Ext.grid.Panel', {
        
        // we don't need an editable grid for this example
        enableCreate: false,
        enableUpdate: false,
        enableDestroy: false,
        
        // configure scaffolding
        scaffold: {
            // model name
            target: 'Article',
    
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
                    emptyMsg: "No entires to display"
                });
                return config;
            } //eo afterBuild
        },
        
        // add some styling
        height: 300,
        width: 650,
        frame: true,
        title: 'Grid with serverside Paging, data is loaded with Bancha',
        renderTo: 'gridpanel'
    });

});

// eof
