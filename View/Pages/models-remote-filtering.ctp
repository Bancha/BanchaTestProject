
<h1>Bancha Pro: Remote Filtering</h1>

<p class="description">
    Ext JS and Sencha Touch stores can easily be remotely filtered, just set the <a href="http://docs.sencha.com/extjs/4.2.0/#!/api/Ext.data.Store-cfg-remoteFilter" target="_blank"><i>remoteFilter</i></a> config to <i>true</i> and filter, 
    e.g. with <i>store.filter('published',true);</i>. Bancha transforms this into a Bancha request and sends it to the server, 
    there it configures the PaginationComponent and filters without any work by the developer.<br/>
</p>

<pre class="align-left">var store = Ext.create('Ext.data.Store', {
    model: Bancha.getModel('Article'),
    remoteFilter: true // activate remote filering
});
store.filter('published', true); // just use any remote filtering
store.load();
</pre>
<div id="published-articles"></div>
<br /><br />
<pre class="align-left">var store = Ext.create('Ext.data.Store', {
    model: 'Bancha.model.Article',
    remoteFilter: true // activate remote filering
});
store.filter('title', 'Titel 01'); // just use any remote filtering
store.load();
</pre>
<div id="title-01-articles"></div>

<div class="panel-description">
    The code full code: <a href="http://banchaproject.org/documentation-pro-models-cakephp.html#augment-existing-controllers" target="_blank">cakephp default controller augmentation</a>, <a href="https://github.com/Bancha/BanchaTestProject/blob/master/webroot/js/models-remote-filtering.js#L28" target="_blank">javascript code</a>.<br>
	For any questions <a href="http://bancha.io/forum/category/1.html" target="_blank">post in the forum</a>.
</p>
