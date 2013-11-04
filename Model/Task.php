<?php
/**
 * Task Model
 *
 */
class Task extends AppModel {
	/**
	 * Bancha and Tree behaviour
	 */
	public $actsAs = array('Bancha.BanchaRemotable', 'Tree');
}
