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
	 * Greets two people by name.
	 * @banchaRemotable
	 * @param String $name the first person
	 * @param String $name2 the second person
	 * @return String the greeting
	 */
	public function helloyou($name, $name2) {
		return array('data' => sprintf('Hello %s and %s!', $name, $name2));
	}

}
