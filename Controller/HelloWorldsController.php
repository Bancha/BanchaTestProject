<?php
/**
 * Hello World Controller
 *
 */
class HelloWorldsController extends AppController {

	/**
	 * @banchaRemotable
	 */
	public function hello() {
		return array('data' => 'Hello World');
	}

	/**
	 * @banchaRemotable
	 */
	public function helloyou($name, $name2) {
		return array('data' => sprintf('Hello %s and %s!', $name, $name2));
	}

}
