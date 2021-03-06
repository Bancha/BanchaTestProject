
<h1>Bancha Pro: TreeBevaviors and TreeStores</h1>

<p class="description">
    Bancha automatically recognizes when a model uses the CakePHP TreeBehavior and correctly transforms the data for a Sencha Touch and Ext JS Ext.data.TreeStore. Everything is already pre-configured, so you only need to use the Bancha model. 

<?php if($extjs5): ?>
</p>
<p class="description error">
    Because of the this <a href="http://www.sencha.com/forum/showthread.php?289269" target="_blank">Ext JS 5 bug</a> synchronising currently doesn't work in Ext JS 5. Trees currently can be loaded and we expect the Ext JS bug for saving to be fixed soon by the Sencha team.
</p>
<pre class="align-left">var store = Ext.create('Ext.data.TreeStore', {
    model: 'Bancha.model.Task',
    autoLoad: true,

    /**
     * Another Ext JS 5 bug fix:
     * http://www.sencha.com/forum/showthread.php?287930
     */
    listeners: {
        beforeload: function (store, operation, eOpts) {
            if(store.isLoading()) {
                return false;
            }
        }
    }
});
</pre>
<?php else: ?>
    To automatically save changes to the 'done' field and re-ordering of the tree we set <i>autoSync</i> to true.
</p>
<pre class="align-left">var store = Ext.create('Ext.data.TreeStore', {
    model: 'Bancha.model.Task',
    autoSync: true
});
</pre>
<p class="description">
    The example below loads a tree from the database, it allows changing of the done state and automatically saves changes back to the server (try reloading). To really show the tree features it also allows to reorder the tree and saves the changes back to the server.
</p>
<?php endif; ?>

<div id="treepanel"></div>

<div class="panel-description">
    The full code: <a href="https://github.com/Bancha/BanchaTestProject/blob/master/Controller/TasksController.php#L18" target="_blank">cakephp controller code</a>, <a href="https://github.com/Bancha/BanchaTestProject/blob/master/webroot/js/models-tree-support.js#L31" target="_blank">javascript code</a>.<br>
    For any questions <a href="http://bancha.io/forum/category/1.html" target="_blank">post in the forum</a>.
</p>
