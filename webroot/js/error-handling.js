/*!
 *
 * Bancha Project : Combining Ext JS and CakePHP (http://banchaproject.org)
 * Copyright 2011-2013 codeQ e.U.
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @package       Bancha
 * @copyright     Copyright 2011-2013 codeQ e.U.
 * @link          http://banchaproject.org Bancha Project
 * @since         Bancha v 0.9.2
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 * @version       Bancha v 1.2.0
 *
 * For more information go to http://banchaproject.org
 */
/*jslint browser: true, vars: true, undef: true, nomen: true, eqeq: false, plusplus: true, bitwise: true, regexp: true, newcap: true, sloppy: true, white: true */
/*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true, latedef:true, newcap:true, noarg:true, noempty:true, regexp:true, undef:true, trailing:false */
/*global Ext, Bancha, alert */

(function() {
    
    var handler = function(err) {
        var msg = (err.message || err.msg || err),
            errorString = "",
            name;
        
        
        // ext not present
        if(!window.Ext || !Ext.Msg || typeof Ext.Msg.alert !== 'function') {
            alert('The Ext JS library is not present. Please check installation instructions for further inforamtion.');
            return;
        }
        
        // try to encode whole object
        try {
            errorString = Ext.encode(err);
        } catch(e) {
            try {
                if((e.message || e.msg) === "Maximum call stack size exceeded") {
                    errorString = "{";
                    for (name in err) {
                        if (err.hasOwnProperty(name)) {
                            if(typeof err[name] === 'function') {
                                errorString += name + ': function(), ';
                            } else {
                                errorString += name + ': '+err[name] + ', ';
                            }
                        }
                    }
                    errorString = errorString+"}";
                } else {
                    errorString = "We could not encode the error object."+e.message;
                }
            } catch(e2) {
                errorString = "An error in the error handler. Great^^ We could not encode the error object. (2)";
            }
        }
        
        // output error
        msg = '<br/><span style="font-size:12px;">Gratulation, you just found an error ;-)<br /><br />'+
              'Please report the error including following '+
              'information on our <a href="https://github.com/Bancha/Bancha/issues">issue tracker</a>.<br/><br/>'+
              'About the error: <br />'+msg+'<br />'+errorString+'<br /><br />';
        try {
            // display error
            Ext.Msg.alert('Bancha: Unknown Error',msg);
        } catch(e3) {
            alert(msg);
        }
    };
    
    // overwrite error-handler.js error handling
    Ext.Error.handle = handler;
    
    // overwrite browser error handler
    window.onerror = handler;
}());

// eof
