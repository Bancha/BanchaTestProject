/*!
 *
 * Bancha Project : Combining Ext JS and CakePHP (http://banchaproject.org)
 * Copyright 2011-2012 Roland Schuetz, Kung Wong, Andreas Kern, Florian Eckerstorfer
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @package       Bancha
 * @copyright     Copyright 2011-2012 Roland Schuetz, Kung Wong, Andreas Kern, Florian Eckerstorfer
 * @link          http://banchaproject.org Bancha Project
 * @since         Bancha v 0.0.2
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 * @version       Bancha v PRECOMPILER_ADD_RELEASE_VERSION
 *
 * For more information go to http://banchaproject.org 
 */
/*jslint browser: true, vars: false, plusplus: true, white: true, sloppy: true */
/*global Ext, Bancha */

// catch every debug exception thrown from either ExtJS or Bancha
Ext.Error.handle = function(err) {
    Ext.Msg.alert('Error', err.msg);
};

// catch server-side errors
Ext.direct.Manager.on('exception', function(err){
	if(err.code==="parse") {
		// parse error
		Ext.Msg.alert('Bancha: Server-Response can not be decoded',err.data.msg);
	} else {
		// exception from server
		Ext.Msg.alert('Bancha: Exception from Server',
			"<br/><b>"+(err.exceptionType || "Exception")+": "+err.message+"</b><br /><br />"+
			((err.where) ? err.where+"<br /><br />Trace:<br />"+err.trace : "<i>Turn on the debug mode in cakephp to see the trace.</i>"));
	}
});

// eof
