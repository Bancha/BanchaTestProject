<?php
/**
 * Bancha : Seamlessly integrates CakePHP with Ext JS and Sencha Touch (http://bancha.io)
 * Copyright 2011-2014 codeQ e.U.
 *
 * Licensed under The MIT License
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright 2011-2014 codeQ e.U.
 * @link          http://bancha.io Bancha
 * @since         Bancha v1.0
 * @license       MIT License (http://www.opensource.org/licenses/mit-license.php)
 * @author        Florian Eckerstorfer <f.eckerstorfer@gmail.com>
 * @author        Andreas Kern <andreas.kern@gmail.com>
 * @author        Roland Schuetz <mail@rolandschuetz.at>
 * @author        Kung Wong <kung.wong@gmail.com>
 */


/**
 * ExceptionsTestController
 * This throws a exception and simulates an error; call it with localhost/ExceptionsTests
 *
 * @author Kung Wong
 */

/**
 * ExceptionsTest Controller
 *
 */
class ExceptionsTestsController extends AppController {
	
	public function index() {
		$this->action();
	}
	
	public function action() {
		throw new Exception('TestException: ');
	}
}
