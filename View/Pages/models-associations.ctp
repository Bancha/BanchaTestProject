
<h1>Bancha Pro: Model Associations</h1>

<p class="description">
    Defining relations between different objects in your application should be a natural process. For example an article belongs to a user. Defining the way these relations work allows you to access your data in an intuitive and powerful way. Bancha automatically exposes all model associations defined in CakePHP and you access associated data directly through Ext JS and Sencha Touch.
</p>

<h2>hasMany associations</h2>

<p class="description">
    This example shows how <em>hasMany</em> associations can be used. We have a <a href="http://docs.sencha.com/extjs/4.2.0/#!/api/Ext.form.field.ComboBox" target="_blank">ComboBox</a> in which you select a user. Every time the value is changed to a different user, the store (collection of all posts) of the ComboBox below will be changed and the data is loaded from the server.

<pre class="align-left">
// get the articles store from the association
var store = userRecord.articles();

// load data for the new store
store.load();

// use this store in the combo below
articleCombo.bindStore(store);</pre>
<div id="has-many-combo"></div>

<br />
<h2>belongsTo associations</h2>

<p class="description">
    <i>Note: Since all examples share the same data, it's possible that sometimes there is no name or no association available. The data is reset every 15 minutes.</i><br/>
</p>
<pre class="align-left">articleRecord.getUser({
    callback: function(user) { /* your code here */ }
});</pre>
<div id="belongs-to-grid"></div>


<br />
<h2>hasAndBelongsToMany associations</h2>

<p class="description">
    The following example shows how an article can get multiple tags assigned, using the Ext JS combobox with multiselect set to true.
</p>
<pre class="align-left">articleRecord.articlesTags()</pre>
<div id="has-and-belongs-to-many-form"></div>

<div class="panel-description">
    The code full code: <a href="http://banchaproject.org/documentation-pro-models-cakephp.html#augment-existing-controllers" target="_blank">cakephp default controller augmentation</a>, <a href="https://github.com/Bancha/BanchaTestProject/blob/master/webroot/js/models-associations.js#L28" target="_blank">javascript code</a>.<br>
	For any questions <a href="http://bancha.io/forum/category/1.html" target="_blank">post in the forum</a>.
</p>
