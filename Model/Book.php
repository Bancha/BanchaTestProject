<?php
App::uses('AppModel', 'Model');
/**
 * Book Model
 *
 */
class Book extends AppModel {
/**
 * Use table
 *
 * @var mixed False or table name
 */
	public $useTable = 'book'; // change to plural
/**
 * Display field
 *
 * @var string
 */
	public $displayField = 'name';
}
