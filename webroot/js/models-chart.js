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
        'Bancha.model.Article',
        'Bancha.model.User',
        // Also require Bancha Scaffold
        'Bancha.scaffold.form.override.Panel',
        'Bancha.scaffold.grid.override.Panel'
    ],
    launch: function() {

        // Just use the Bancha model for a standard store and
        // the whole model and proxy is correctly configured.
        var chartStore = Ext.create('Ext.data.Store', {
            model: 'Bancha.model.User',
            autoLoad: true
        });

        // ... and some standard extjs charting
        // yes, there's nothing you have to do bancha-specific, just standard Ext JS code ;-)
        Ext.create('Ext.panel.Panel', {
            title: 'Column Chart',
            renderTo: 'chart',
            layout: 'fit',
            width: 650,
            frame: true,
            height: 400,
            padding: '40px 30px 20px 20px',
            items: {
                xtype: 'chart',
                style: 'background:#fff',
                animate: true,
                shadow: true,
                store: chartStore, // <-- the store from above
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
    }
});
