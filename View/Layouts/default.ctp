<html>
<!--
/*!
 *
 * Bancha : Seamlessly integrates CakePHP with Ext JS and Sencha Touch (http://bancha.io)
 * Copyright 2011-2014 codeQ e.U.
 *
 * @package       BanchaTestproject.webroot
 * @copyright     Copyright 2011-2014 codeQ e.U.
 * @link          http://bancha.io Bancha
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 * @version       Bancha v 2.3.1
 *
 * For more information go to http://bancha.io
 */
-->
<head>
<title>Bancha Examples<?php if($title_for_layout) { echo ': '.$title_for_layout; } ?></title>
<?php
    echo $this->Html->charset();
    echo $this->Html->meta('icon');

    echo $this->fetch('meta');
    echo $this->fetch('css');
    echo $this->fetch('script');
?>
<meta http-equiv="Content-Style-Type" content="text/css" />
<meta http-equiv="Content-Script-Type" content="text/javascript" />
<meta name="description" content="Bancha - Seamlessly integrate CakePHP with Sencha Touch and ExtJS" />
<meta name="keywords" content="" />
<?php if($extjs5): ?>
<meta name="robots" content="index,follow" />
<?php else: ?>
<meta name="robots" content="noindex,follow" />
<?php endif; ?>
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:regular,bold|Raleway:400,500">
<link rel="stylesheet" href="http://assets.bancha.io/tl_files/Bancha/layout.css" type="text/css" media="screen" />
<!--[if lt IE 9]><script src="http://assets.bancha.io/assets/html5shiv/3.6.2/html5shiv.js"></script><![endif]-->

<!-- Include Ext JS styles -->
<?php if($extjs5): ?>
<link rel="stylesheet" href="http://cdn.sencha.com/ext/gpl/5.0.0/packages/ext-theme-crisp/build/resources/ext-theme-crisp-all.css">
<?php else: ?>
<link rel="stylesheet" href="http://cdn.sencha.com/ext/gpl/4.2.1/resources/ext-theme-classic/ext-theme-classic-all.css">
<?php endif; ?>

<!-- sample specific css -->
<link rel="stylesheet" href="/css/samples.css" type="text/css">

<?php
    $basePath = $page==='index' ? '/pages/extjs5' : '.';
?>

</head>
<body id="top">

<header id="header">
    <div class="inside">
        <div class="logo block">
            <a href="http://bancha.io">
                <img src="http://files.bancha.io/tl_files/Bancha/images/bancha-logo-horizontal.png" width="155" height="71" alt="Bancha Logo">
            </a>
            <div class="extjs-versions">
                <a href="../extjs4/<?php echo $page; ?>">Ext JS 4</a> | <a href="../extjs5/<?php echo $page; ?>">Ext JS 5</a>
            </div>
        </div>
        <!-- indexer::stop -->
        <nav class="block">
            <a href="#skipNavigation14" class="invisible">Skip navigation</a>
            <ul class="level_1">
                <li>
                    <a href="<?php echo $basePath; ?>/controller-methods">Controller Methods</a>
                </li>
                <li>
                    <a href="<?php echo $basePath; ?>/models">Exposed Models</a>
                    <ul class="level_2">
                        <li><a href="<?php echo $basePath; ?>/models-scaffolded-grids">Scaffolded Grids</a></li>
                        <li><a href="<?php echo $basePath; ?>/models-scaffolded-forms">Scaffolded Forms</a></li>
                        <li><a href="<?php echo $basePath; ?>/models-chart">Chart Example</a></li>
                        <li><a href="<?php echo $basePath; ?>/models-associations">Model Associations</a></li>
                        <li><a href="<?php echo $basePath; ?>/models-remote-filtering">Remote Filtering</a></li>
                        <li><a href="<?php echo $basePath; ?>/models-tree-support">Tree Support</a></li>
                        <li><a href="<?php echo $basePath; ?>/models-consistent-transactions">Consistent Transactions</a></li>
                    </ul>
                </li>
                <li>
                    <a href="<?php echo $basePath; ?>/advanced-localization">Advanced Examples</a>
                    <ul class="level_2">
                        <li><a href="<?php echo $basePath; ?>/advanced-localization">Localization</a></li>
                        <li><a href="/touch/" target="_blank">Sencha Touch</a></li>
                        <li><a href="http://blogapp.banchaproject.org/app.html" target="_blank">Sencha Architect MVC Example</a></li>
                        <li><a href="http://samples.bancha.io/developer-remote-api.html" target="_blank">Example of JavaScript API-Viewer</a></li>
                    </ul>
                </li>
            </ul>
            <a id="skipNavigation14" class="invisible">&nbsp;</a>
        </nav>
        <!-- indexer::continue -->
    </div>
</header>

<!-- fork us on github -->
<a href="https://github.com/Bancha/BanchaTestProject"><img id="fork-us" style="position: fixed; top: 0; right: 0; border: 0; z-index:500;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png" alt="Fork me on GitHub"></a>

<div class="wrapper">

    <?php echo $this->fetch('content'); ?>

    <br>

    <!-- for footer alignment -->
    <div class="push"></div>
</div>
<div class="footer">
    <small>&copy; 2011-2014 codeQ e.U. <a href="http://bancha.io/imprint.html">Imprint</a>. Icons by <a href="http://www.famfamfam.com/lab/icons/silk/" target="_blank">FamFamFam</a>.</small>
</div>


<!-- include Ext JS -->
<?php if($extjs5): ?>
<script src="http://cdn.sencha.com/ext/gpl/5.0.0/build/ext-all.js"></script>
<script src="http://cdn.sencha.com/ext/gpl/5.0.0/packages/ext-theme-crisp/build/ext-theme-crisp.js"></script>
<?php if(strpos($page, 'chart') !== false): ?>
    <script src="http://cdn.sencha.com/ext/gpl/5.0.0/packages/ext-charts/build/ext-charts.js"></script>
<?php endif; ?>
<?php else: ?>
<script src="http://cdn.sencha.com/ext/gpl/4.2.1/ext-all.js"></script>
<script src="http://cdn.sencha.com/ext/gpl/4.2.1/ext-theme-classic.js"></script>
<?php endif; ?>

<!-- include Bancha -->
<?php
/*
 * Normally you should use Sencha Cmd to build your application.
 * But since we here have multiple independent examples and want
 * to keep the code easily readable built on the fly we use a 
 * manual combination of files.
 * Note: this will result in debugging code to be executed, which
 * is intended for our online examples.
 * Also note that not all dependencies are loaded here, just some
 * to speed up the process
 */
if($_SERVER['HTTP_HOST'] == 'samples.bancha.io') {
    Configure::write('MinifyAsset', true);
    echo '<script>Ext.Loader.setConfig("enabled", true);Ext.Loader.setPath("Bancha","/Bancha/js");</script>';
    echo $this->Minify->script(array(
        '../../Plugin/Bancha/webroot/js/data/writer/JsonWithDateTime.js',
        '../../Plugin/Bancha/webroot/js/data/writer/TreeParentIdTransformedJson.js',
        '../../Plugin/Bancha/webroot/js/data/writer/ConsistentJson.js',
        '../../Plugin/Bancha/webroot/js/Remoting.js',
        '../../Plugin/Bancha/webroot/js/data/override/NodeInterface.js',
        '../../Plugin/Bancha/webroot/js/data/override/Validations.js',
        $extjs5 ? '../../Plugin/Bancha/webroot/js/data/validator/File.js' : false,
        '../../Plugin/Bancha/webroot/js/data/Validators.js',
        '../../Plugin/Bancha/webroot/js/Main.js',
        '../../Plugin/Bancha/webroot/js/data/Model.js',
        '../../Plugin/Bancha/webroot/js/loader/Interface.js',
        '../../Plugin/Bancha/webroot/js/Loader.js',
        '../../Plugin/Bancha/webroot/js/Logger.js'
    ));
}
?>

<!-- include sample code -->
<script type="text/javascript" src="/js/<?php echo $page; ?>.js"></script>

<!-- Add a feedback widget -->
<script type="text/javascript">
  var uvOptions = {};
  (function() {
    var uv = document.createElement('script'); uv.type = 'text/javascript'; uv.async = true;
    uv.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'widget.uservoice.com/0UXfPisT7dSYfaE0il292w.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(uv, s);
  })();
</script>

<!-- add some analytics -->
<script type="text/javascript">if(document.location.href.substr(0,16)!=="http://localhost" && document.location.href.substr(0,17)!=="https://localhost") {var _gaq=_gaq||[];_gaq.push(["_setAccount","UA-10118336-4"]);_gaq.push(["_trackPageview"]);(function(){var b=document.createElement("script");b.type="text/javascript";b.async=true;b.src=("https:"==document.location.protocol?"https://ssl":"http://www")+".google-analytics.com/ga.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();}</script>

</body>
</html>
