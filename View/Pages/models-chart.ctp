
<h1>Bancha Pro: Standard Ext JS code with a Bancha model</h1>

<p class="description">
    For any other Ext JS or Sencha Touch code where you are not leveraging Bancha Scaffold you can simply
    use the Bancha model like any other model. Here for example we use the Bancha User model to create a
    store and then use this store for displaying a Ext JS chart.
</p>
<pre class="align-left">var store = Ext.create('Ext.data.Store', {
    model: 'Bancha.model.User',
    autoLoad: true
});</pre>
<div id="chart"></div>

<div class="panel-description">
    The code full code: <a href="http://bancha.io/documentation-pro-models-cakephp.html#augment-existing-controllers" target="_blank">cakephp default controller augmentation</a>, <a href="https://github.com/Bancha/BanchaTestProject/blob/master/webroot/js/models-chart.js#L42" target="_blank">javascript code</a>.<br>
    For any questions <a href="http://bancha.io/forum/category/1.html" target="_blank">post in the forum</a>.
</p>

