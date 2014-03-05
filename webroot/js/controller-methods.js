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

Ext.application({
    name: 'BanchaExample',
    requires: [
        // Simply require server-side models from the Bancha model namespace
        'Bancha.model.Article',
        'Bancha.model.User',
        // other dependencies
        'Ext.data.*',
        'Ext.form.field.Text',
        'Ext.button.Button'
    ],

    launch: function() {

        // panel
        var box = Ext.create('Ext.Component', {
            html: ''
        });

        // write console helper
        var log = function(msg) {
                var date = new Date();
                date = (date.getHours()<10 ? ' '+date.getHours() : date.getHours())+':'+
                       (date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes());
                box.getTargetEl().insertHtml(
                    'beforeEnd',
                    date + ': ' + msg + '<br>'
                );
            };

        // create a input textfield
        var textfield = Ext.create('Ext.form.field.Text', {
            title: 'First Name:',
            allowBlank: false
        });

        // create the button
        var button = Ext.create('Ext.button.Button', {
            text : 'Get Greetings',
            handler: function() {
                if(textfield.isValid()) {
                    // send the request to the server
                    var unixTimestamp = (Date.now()/1000).toString();
                    Bancha.getStub('Hello').getGreeting(unixTimestamp, textfield.getValue(),function(result) {
                        // this is the result callback
                        if(result.success) {
                            log(result.data);
                        } else {
                            log('The server does not want to talk to you.');
                        }
                    });
                } else {
                    Ext.Msg.show({
                        animationTarget: button.getEl(),
                        title: 'Name not defined',
                        msg: 'Please write your name before asking for a greeting.',
                        icon: Ext.window.MessageBox.ERROR,
                        buttons: Ext.Msg.OK,
                        fn: function() {
                            textfield.focus();
                        }
                    });
                }
            } //eo handler
        }); //eo button


        // create the container and render
        Ext.create('Ext.Panel', {
            title: 'Log',
            items: [box],
            fbar: ['Enter your firstname here:', textfield, button],

            // styling
            cls: 'log-text',
            frame: true,
            width: 650,
            height: 300,
            renderTo: 'log'
        });
    }
});
