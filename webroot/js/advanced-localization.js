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
    trailing: true, maxlen: 200 */
/*global Ext */

// include Bancha
Ext.Loader.setConfig('enabled', true);
Ext.Loader.setPath('Bancha','/Bancha/js');
Ext.syncRequire('Bancha.Initializer');

Ext.application({
    name: 'BanchaExample',
    requires: [
        'Ext.button.Button',
        'Ext.panel.Panel'
    ],

    launch: function() {

        // every time a button is clicked just translate the text below
        var translate = function(lang) {
            Bancha.Localizer.setCurrentLanguage(lang);

            // This is the only translation-specific
            var text = Bancha.t('Inside JavaScript Bancha.t(str) will translate the text in the correct language.')+'<br /><br/>';
            text += Bancha.t('With the usage of following console tool you can collect all translation-ready strings:');
            text += '<br /><code style="margin-top: 10px; width:100%;">./Console/cake bancha.jsi18n</code><br /><br />';
            text += Bancha.t('Bancha translations are handled like normal CakePHP translations, so just translate cakes pot files and you\'re ready to go.');
            text += '<br /><br />';
            text += Bancha.t('Enjoy!');

            // update component text
            Ext.getCmp('translations-panel').update(text);
        };

        // create a new panel
        Ext.create('Ext.Panel', {
            title: 'Bancha Localization',
            renderTo: 'translation',
            id: 'translations-panel',
            width: 650,
            height: 300,

            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    xtype: 'label',
                    text: 'Choose your language: '
                }, {
                    xtype: 'button',
                    text: 'English',
                    iconCls: 'icon-eng',
                    handler: Ext.Function.pass(translate, 'eng')
                }, {
                    xtype: 'button',
                    text: 'German',
                    iconCls: 'icon-deu',
                    handler: Ext.Function.pass(translate, 'deu')
                }, {
                    xtype: 'button',
                    text: 'French',
                    iconCls: 'icon-fre',
                    handler: Ext.Function.pass(translate, 'fre')
                }]
            }],
            html: [ // this will always be in english
                'Bancha provides already build in support for localizing your frontend.<br />',
                'For a demo click on of the buttons above'
            ].join('')
        });
    }
});
