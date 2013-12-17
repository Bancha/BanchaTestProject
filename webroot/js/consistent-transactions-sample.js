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
/*global Ext, Bancha */

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
        Bancha.getModel('User').setForceConsistency(true);

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
                    title: 'Change the user name, each action takes 3 seconds on the server.',
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

// eof
