/*!
 *
 * Bancha Project : Seamlessly integrates CakePHP with ExtJS and Sencha Touch (http://banchaproject.org)
 * Copyright 2011-2012 StudioQ OG
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @package       Bancha
 * @copyright     Copyright 2011-2012 StudioQ OG
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
/*global Ext:false, Bancha:false, window:false */

// API and Bancha is already included,
// now load sample dependencies
Ext.require([
    'Ext.panel.Panel'
]);


Ext.onReady(function() {

    // every time a button is clicked just translate the text below
    var translate = function(lang) {
        Bancha.Localizer.setCurrentLanguage(lang);

        // This is the only translation-specific
        var text = Bancha.t('Inside JavaScript Bancha. t(str) will translate the text in the correct language.')+'<br /><br/>';
        text += Bancha.t('With the usage of following console tool you can collect all translation-ready strings:');
        text += '<br /><code style="margin-top: 10px; width:100%;">./Console/cake i18n extract</code><br /><br />';
        text += Bancha.t('Bancha translations are handled like normal CakePHP translations, so just translate cakes pot files and you\'re ready to go.')+'<br /><br />';
        text += Bancha.t('Enjoy!');

        // update component text
        Ext.getCmp('translations-panel').update(text);
    };

    // create a new panel
    Ext.create('Ext.Panel', {
        title: 'Bancha Localization',
        renderTo: 'translation',
        id: 'translations-panel',
        width: 600,
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

});

// eof
