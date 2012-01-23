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
