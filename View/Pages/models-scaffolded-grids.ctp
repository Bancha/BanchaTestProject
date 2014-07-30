
<h1>Bancha Pro: Scaffolded Grid Panels</h1>

<p class="description">
    The first example simply uses Bancha Scaffold to create a grid from the Bancha model configuration.
</p>
<pre class="align-left">Ext.create('Ext.grid.Panel', {
    title: 'User Grid with full CRUD support',

    // determin columns, etc. from model
    scaffold: 'Bancha.model.User',

    // some additional styles
    height: 370,
    width: 715,
    frame: true,
    renderTo: 'gridpanel'
});</pre>
<div id="gridpanel"></div>

<h2>Grid Panel with Remote Sorting and Pagination</h2>
<p class="description">
    Application data can sometimes grow rapidly. And so displaying a reasonable number of records per page has always been a critical part of every application and used to cause many headaches for developers. Bancha eases the burden on the developer by providing a quick, easy way to paginate data. Bancha models support remote sorting, filtering and pagination out of the box.
</p>
<pre class="align-left">
Ext.create('Ext.grid.Panel', {
    title: 'Grid with server-side Paging and remote sorting',

    // use config object
    scaffold: {

        // determin columns, etc. from model
        target: 'Bancha.model.Article',

        // use a different store in every example
        oneStorePerModel: false,

        // configure paging
        storeDefaults: {
            autoLoad: true,
            pageSize: 10,
            remoteSort: true
        },

        // add a paging bar
        afterBuild: function(config) {
            // paging bar on the bottom
            config.bbar = Ext.create('Ext.PagingToolbar', {
                store: config.store,
                displayInfo: true,
                displayMsg: 'Displaying entry {0} - {1} of {2}',
                emptyMsg: 'No entires to display'
            });
            return config;
        }, //eo afterBuild

        // don't provide edit features
        editable: false,
        deletable: false,
        buttons: false
    },

    // add some styling
    height: 400,
    width: 715,
    frame: true,
    renderTo: 'paginated-gridpanel'
});</pre>
<div id="paginated-gridpanel"></div>

<div class="panel-description">
    The code full code: <a href="http://bancha.io/documentation-pro-models-cakephp.html#augment-existing-controllers" target="_blank">cakephp default controller augmentation</a>, <a href="https://github.com/Bancha/BanchaTestProject/blob/master/webroot/js/models-scaffolded-grids.js#L28" target="_blank">javascript code</a>.<br>
    For any questions <a href="http://bancha.io/forum/category/1.html" target="_blank">post in the forum</a>.
</p>

