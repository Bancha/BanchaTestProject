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
        // Simply require server-side models from the Bancha model namespace
        'Bancha.model.User'
    ],

    launch: function() {
        var console = Ext.get('console'),
            log;

        log = function(text) {
            console.createChild({
                tag: 'div',
                html: Ext.Date.format(new Date(), 'H:i:s ')+text
            });
        };

        // disable batching for better show case
        Ext.direct.Manager.providers.items[0].enableBuffer = false;

        // activate consistency
        Bancha.model.User.setForceConsistency(true);

        // listen for changes from server
        Ext.direct.Manager.on('event', function(event) {
            if(event.method === 'update') {
                log('Result: Changed user name to '+event.result.data.name);
            }
        });

        // load record to change it
        Bancha.getModel('User').load(3, {
            success: function(record, operation) {

                // record is ready, render form
                Ext.create('Ext.form.Panel', {
                    title: 'Change the user name. by changing the server-processing time you can create race-conditions.',
                    bodyPadding: 10,
                    width: 650,
                    renderTo: 'form',

                    // Fields will be arranged vertically, stretched to full width
                    layout: 'anchor',
                    defaults: {
                        width: '90%',
                        labelWidth: '30%'
                    },

                    // The fields
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'User Name',
                        allowBlank: false,
                        minLength: 3,
                        maxLength: 64
                    }, {
                        xtype: 'numberfield',
                        fieldLabel: 'Server processing time',
                        value: 10,
                        minValue: 0,
                        maxValue: 20
                    }],

                    buttons: [{
                        xtype: 'button',
                        text: 'save',
                        width: '18%',
                        handler: function() {
                            var textfield = Ext.ComponentQuery.query('form textfield')[0];
                            var numberfield = Ext.ComponentQuery.query('form numberfield')[0];
                            record.set('name', textfield.getValue());
                            if(!record.isValid()) {
                                Ext.Msg.alert('Error', 'The name must be between 3 and 64 characters.');
                                return;
                            }
                            if(!record.dirty) {
                                Ext.Msg.alert('Error', 'You need to change the name before sending a change to the server.');
                                return;
                            }
                            log('Sended: Change user name to '+textfield.getValue());
                            record.set('login', 'delayRequest'+numberfield.getValue());
                            textfield.reset();
                            record.save();
                        }
                    }]
                });
            }
        });
    }
});
