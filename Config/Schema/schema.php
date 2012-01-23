<?php 
/* App schema generated on: 2011-05-30 19:42:00 : 1306777320*/
class AppSchema extends CakeSchema {
	function before($event = array()) {
		return true;
	}

	function after($event = array()) {
	}

	var $articles = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'collate' => NULL, 'key' => 'primary', 'collate' => NULL, 'comment' => ''),
		'title' => array('type' => 'string', 'null' => true, 'default' => NULL,'collate' => NULL,  'length' => 64, 'comment' => ''),
		'date' => array('type' => 'datetime', 'null' => true, 'default' => NULL, 'collate' => NULL, 'comment' => ''),
		'body' => array('type' => 'text', 'null' => true, 'default' => NULL,'collate' => NULL,  'comment' => ''),
		'published' => array('type' => 'boolean', 'null' => true, 'default' => false,'collate' => NULL,  'comment' => ''),
		'user_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'collate' => NULL, 'comment' => ''),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1)),
		'tableParameters' => array('charset' => 'utf8', 'collate' => 'utf8_general_ci', 'engine' => 'InnoDB')
	);
	var $articles_tags = array(
		'article_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'collate' => NULL, 'comment' => ''),
		'tag_id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'collate' => NULL, 'comment' => ''),
		'indexes' => array(),
		'tableParameters' => array('charset' => 'utf8', 'collate' => 'utf8_general_ci', 'engine' => 'InnoDB')
	);
	var $tags = array(
		'id' => array('type' => 'integer', 'null' => false, 'default' => NULL, 'key' => 'primary', 'collate' => NULL, 'comment' => ''),
		'string' => array('type' => 'string', 'null' => false, 'default' => NULL, 'length' => 64, 'collate' => NULL, 'comment' => ''),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1)),
		'tableParameters' => array('charset' => 'utf8', 'collate' => 'utf8_general_ci', 'engine' => 'InnoDB')
	);
	var $users = array(
		'id' => array('type' => 'integer', 'null' => true, 'default' => NULL, 'key' => 'primary', 'collate' => NULL, 'comment' => ''),
		'name' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 64, 'collate' => NULL, 'comment' => ''),
		'login' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 64, 'collate' => NULL, 'comment' => ''),
		'created' => array('type' => 'datetime', 'null' => true, 'default' => NULL, 'collate' => NULL, 'comment' => ''),
		'email' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 64, 'collate' => NULL, 'comment' => ''),
		//'avatar' => array('type' => 'string', 'null' => true, 'default' => NULL, 'length' => 64, 'collate' => NULL, 'comment' => ''),
		'weight' => array('type' => 'float', 'null' => true, 'default' => NULL, 'collate' => NULL, 'comment' => ''),
		'height' => array('type' => 'integer', 'null' => true, 'default' => NULL, 'collate' => NULL, 'comment' => ''),
		'indexes' => array('PRIMARY' => array('column' => 'id', 'unique' => 1)),
		'tableParameters' => array('charset' => 'utf8', 'collate' => 'utf8_general_ci', 'engine' => 'InnoDB')
	);
}
?>
