
<h1>Bancha Pro: Consistent transactions</h2>
<p class="description">
    One of the main challenges with asynchronous applications is to keep the requests both on the client and the server consistent. There are a number of cases, all of which Bancha can handle:
</p>
<ul class="description">
    <li>Lost requests because of bad network</li>
    <li>Duplicated requests because of bad latency</li>
    <li>Race conditions because the slow a application</li>
</ul>
<p class="description">
    The example below allows you to create race conditions and see how Bancha allways ensure the correct order.
</p>
<pre class="align-left">Bancha.model.User.setForceConsistency(true);</pre>
<div id="form"></div>
<div id="console" style="border:1px solid black; width:650; height:150px; overflow-y:scroll; margin:10px auto 0 auto; text-align:left;"></div>


<div class="panel-description">
    The code full code: <a href="http://bancha.io/documentation-pro-models-cakephp.html#augment-existing-controllers" target="_blank">cakephp default controller augmentation</a>, <a href="https://github.com/Bancha/BanchaTestProject/blob/master/webroot/js/models-consistent-transactions.js#L28" target="_blank">javascript code</a>.<br>
	For any questions <a href="http://bancha.io/forum/category/1.html" target="_blank">post in the forum</a>.
</p>
