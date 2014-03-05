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
    plusplus: false, quotmark: single, undef: true, unused: false, strict: false, 
    trailing: true */
/*global Ext */

// include Bancha
Ext.Loader.setConfig('enabled', true);
Ext.Loader.setPath('Bancha','/Bancha/js');
Ext.syncRequire('Bancha.Initializer');

Ext.application({
    name: 'BanchaExample',
    requires: [
        // Simply require server-side models from the Bancha model namespace
        'Bancha.model.Article',
        'Bancha.model.User',
        // Also require Bancha Scaffold
        'Bancha.scaffold.form.override.Panel',
        'Bancha.scaffold.grid.override.Panel'
    ],
    launch: function() {

        /**
         * A form panel allows loading and sending, including file upload.
         */
        Ext.create('Ext.form.Panel', {
            title: 'Demonstration of a file upload panel',

            // use scaffolding
            scaffold: {

                // define the model
                target: 'Bancha.model.User',

                // simply add you own buttons
                buttons: [
                    '->',
                    {
                        text: 'Load Sample Record',
                        iconCls: 'icon-edit',
                        handler: function() {
                            var panel = this.getPanel(), // scopeButtonHandler enables this
                                form = this.getForm(); // scopeButtonHandler enables this

                            // load the form
                            panel.load({
                                params: {
                                    data: { data: { id:1 } }
                                },
                                success: function(form, action) {
                                    // update the images when a new record is loaded
                                    panel.down('#avatar-display-field').update(action.result.data || {});
                                }
                            });

                            // change the header title
                            panel.setTitle('Demonstration of a scaffolded Form - Change Record 1');
                        },
                        scope: 'scaffold-scope-me'
                    },
                    'reset',
                    'save'
                ],

                // add an avatar preview component
                afterBuild: function (formConfig, model, config, initialPanelConfig) {
                    
                    // add an component after the avatar upload field
                    formConfig.items.splice(6, 0, {
                        xtype: 'component',
                        id: 'avatar-display-field',
                        data: {},
                        tpl: [
                            '<tpl if="avatar"><span class="uploaded-image">',
                            '<image src="/{avatar}" style="max-width: 400px; height:100px;" title="most recently uploaded image">',
                            '</span></tpl>'
                        ].join('')
                    });

                    return formConfig;
                },

                // update the avatar preview after a save operation
                onSaved: function(me, success, action) {
                    if(success) {
                        // update image value
                        this.getPanel().down('#avatar-display-field').update(action.result.data || {});
                    }
                },
                // update the avatar preview when the reset button is clicked
                onReset: function () {
                    this.getForm().reset();
                    this.getPanel().down('#avatar-display-field').update({});
                }
            }, // eo scaffold


            // some additional styles
            width: 650,
            frame: true,
            id: 'form',
            bodyStyle:'padding:5px 5px 0',
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 75
            },
            defaults: {
                anchor: '100%'
            },
            renderTo: 'formpanel'
        });
    }
});
