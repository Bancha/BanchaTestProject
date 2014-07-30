
<h1>Bancha Pro: Scaffolded Form Panels</h1>

<p class="description">
    Forms are a great choice in cases you want to edit only one record or when want to upload files.
    Using Bancha Scaffold our basic form panel configuration looks like this:
</p>
<pre class="align-left">Ext.create('Ext.form.Panel', {
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
                    var panel = this.getPanel(); // scopeButtonHandler enables this

                    // load the form
                    panel.load({
                        params: {
                            data: { data: { id:1 } }
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
    }, // eo scaffold
});</pre>


<p class="description">
    To add an avatar preview component blow the avatar upload field, we add the following to the scaffold config:
</p>
<pre class="align-left">
        // add an avatar preview component
        afterBuild: function (formConfig, model, config, initialPanelConfig) {

            // add an component after the avatar upload field
            formConfig.items.splice(6, 0, {
                xtype: 'component',
                id: 'avatar-display-field',
                data: {},
                tpl: [
                    '&lt;tpl if="avatar"&gt;&lt;span class="uploaded-image"&gt;',
                    '&lt;image src="/{avatar}" style="max-width: 400px; height:100px;" title="most recently uploaded image"&gt;',
                    '&lt;/span&gt;&lt;/tpl&gt;'
                ].join('')
            });

            return formConfig;
        },
</pre>

<p class="description">
    Finally to update the avatar image after an successfull upload we also add this to the scaffold config:
</p>
<pre class="align-left">
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
</pre>

<p class="description">
    Try adding a new user in the example form and click the save button - a new user is created. To now update the user record change something and click save again. You can click reset to create another new user and you can load an existing user and edit this one.
</p>
<div id="formpanel"></div>

<div class="panel-description">
    The code full code: <a href="http://bancha.io/documentation-pro-models-cakephp.html#augment-existing-controllers" target="_blank">cakephp default controller augmentation</a>, <a href="https://github.com/Bancha/BanchaTestProject/blob/master/webroot/js/models-scaffolded-forms.js#L28" target="_blank">javascript code</a>.<br>
	For any questions <a href="http://bancha.io/forum/category/1.html" target="_blank">post in the forum</a>.
</p>
