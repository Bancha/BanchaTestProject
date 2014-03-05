
<h1>Bancha Pro: Models</h1>

<p class="description">
    Bancha provides fully configured models, which are loaded after simply requiring it in Ext JS/Sencha Touch syntax. All fields, validation rules and associations are taken from the CakePHP model. To start up Ext JS we use <a href="docs.sencha.com/extjs/4.2.0/#!/api/Ext.app.Application">Ext.application</a>. We also require the Bancha Scaffold overrides to easily create scaffolded grids and forms.
</p>
<pre class="align-left">Ext.application({
    name: 'BanchaExample',
    requires: [
        // require server-side models from Bancha's model namespace
        'Bancha.model.Article',
        'Bancha.model.User',
        // also require Bancha Scaffold
        'Bancha.scaffold.form.override.Panel',
        'Bancha.scaffold.grid.override.Panel'
    ],
    launch: function() {
        ...
</pre>

<p class="description">
    Now is the place for your actual code, see the examples for ideas.
</p>
