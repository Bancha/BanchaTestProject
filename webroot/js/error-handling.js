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
 * @since         Bancha v 0.9.0
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 * @version       Bancha v PRECOMPILER_ADD_RELEASE_VERSION
 *
 * For more information go to http://banchaproject.org
 */
/*jslint browser: true, vars: true, undef: true, nomen: true, eqeq: false, plusplus: true, bitwise: true, regexp: true, newcap: true, sloppy: true, white: true */
/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, regexp:true, undef:true, trailing:false */
/*global Ext, Bancha */

// catch every debug exception thrown from either ExtJS or Bancha
Ext.Error.handle = function(err) {
    Ext.Msg.alert('Error', err.msg);
};

// catch server-side errors
Ext.direct.Manager.on('exception', function(err){
	// normalize ExtJS and Sencha Touch
	var data = (typeof err.getCode === 'function') ? {
		code: err.getCode(),
		message: err.getMessage(),
		data: {
			msg: err.getData()
		},

		// bancha-specific
		exceptionType: err.config.exceptionType,
		where: err.config.where,
		trace: err.config.trace
	} : err;
	
	// handle error
	if(data.code==="parse") {
		// parse error
		Ext.Msg.alert('Bancha: Server-Response can not be decoded',data.data.msg);
	} else {
		// exception from server
		Ext.Msg.alert('Bancha: Exception from Server',
			"<br/><b>"+(data.exceptionType || "Exception")+": "+data.message+"</b><br /><br />"+
			((data.where) ? data.where+"<br /><br />Trace:<br />"+data.trace : "<i>Turn on the debug mode in cakephp to see the trace.</i>"));
	}
});

// eof
