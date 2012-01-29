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
 * @since         Bancha v 0.0.2
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
    'Ext.form.*',
    'Ext.grid.*'
]);


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

});

// eof
