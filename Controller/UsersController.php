<?php
/**
 * Users Controller
 *
 */
class UsersController extends AppController {


/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->User->recursive = 0;
		$this->Paginator->setAllowedFilters('all');
		$users = $this->paginate();														// added
		$this->set('users', $users);													// modified
		return array_merge($this->request['paging']['User'],array('records'=>$users)); 	// added
    }
	
/**
 * view method
 *
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		$this->User->id = $id;
		if (!$this->User->exists()) {
			throw new NotFoundException(__('Invalid user'));
		}
		$this->set('user', $this->User->read(null, $id));
		return $this->User->data;															// added
	}



/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->User->create();
			
			// handle avatar field uploads
			$result = $this->handleUpload('avatar');
			if(is_string($result)) {
				return $result; // this is an error message
			}
			
			if(isset($this->request->params['isBancha']) && $this->request->params['isBancha']) return $this->User->saveFieldsAndReturn($this->request->data); // added
			
			if ($this->User->save($this->request->data)) {
				$this->Session->setFlash(__('The user has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The user could not be saved. Please, try again.'));
			}
		}
	}

/**
 * edit method
 *
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		$this->User->id = $id;
		if (!$this->User->exists()) {
			throw new NotFoundException(__('Invalid user'));
		}
		
		// this feature is used in the consistency example
		if(!empty($this->request->data['User']['login']) && substr($this->request->data['User']['login'], 0, 12) === 'delayRequest') {
			$sleepTime = intval(substr($this->request->data['User']['login'], 12)); // get users slep time
			sleep(min(array($sleepTime, 20))); // slep max 20 seconds
			unset($this->request->data['User']['login']);
		}

		if(isset($this->request->params['isBancha']) && $this->request->params['isBancha']) {
			// handle avatar field uploads
			$result = $this->handleUpload('avatar');
			if(is_string($result)) {
				return $result; // this is an error message
			}

			// save record and return
			return $this->User->saveFieldsAndReturn($this->request->data);
		}

		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->User->save($this->request->data)) {
				$this->Session->setFlash(__('The user has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The user could not be saved. Please, try again.'));
			}
		} else {
			$this->request->data = $this->User->read(null, $id);
		}
	}

/**
 * delete method
 *
 * @param string $id
 * @return void
 */
	public function delete($id = null) {
		
		// for the samples don't allow to 
		if($id == 1) {
			if(isset($this->request->params['isBancha']) && $this->request->params['isBancha']) {
				return array('success'=>false,'message'=>__('It is forbidden to delete record 1, since it\'s used in the form example below.'));
			} else {
				throw new NotFoundException(__('It is forbidden to delete record 1, since it\'s used in the form example below.'));
			}
		}
		if (!$this->request->is('post')) {
			throw new MethodNotAllowedException();
		}
		$this->User->id = $id;
		if (!$this->User->exists()) {
			throw new NotFoundException(__('Invalid user'));
		}
		
		if(isset($this->request->params['isBancha']) && $this->request->params['isBancha']) return $this->User->deleteAndReturn();	 // added
		
		if ($this->User->delete()) {
			$this->Session->setFlash(__('User deleted'));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('User was not deleted'));
		$this->redirect(array('action' => 'index'));
	}

	/**
	 * 
	 * @return true if successfull, otherwise an error msg
	 */
	function handleUpload($fieldName) {
		
		// only upload files when the record validates
		$this->User->set($this->request->data);
		if($this->User->validates()) {
			/*
			 * Currently Bancha saves files at a different place then 
			 * CakePHP standard forms, this should be improved
			 */
			$file = false;
			if(isset($this->request->params['isBancha']) && $this->request->params['isBancha'] && isset($_FILES[$fieldName])) {
				$file = $_FILES[$fieldName];
			} elseif(isset($this->request->data[$fieldName])) {
				$file = $this->request->data[$fieldName];
			}
			
			if($file) {
				// a file was uploaded, save it
				$result = $this->uploadFiles('img/user-avatars', array($file)); // this function is implemented in the App Controller
				
				// error handling
				if(isset($result['errors']) || isset($result['nofiles'])) {
					$error = isset($result['errors'][0]) ? $result['errors'][0] : $result['nofiles'];
					if(!$this->request->params['isBancha']) {
						$this->Session->setFlash($error);
					}
					return $error;
				}
			
				// success case
				$this->request->data['User']['avatar'] = $result['urls'][0];
				return true;
			}
		}
	}


// This should become a consistancy example, not yet used
/**
 * fancy method needs long to answer (for consistency tests)
 * @return Integer
 */
//    public function fancyCalculation() {
//        sleep(5);
//        return 2+3;
//    }
/**
 * fast method answer very fast (for consistency tests)
 * @return Integer
 */
//    public function fastCalculation() {
//        return 2+3;
//    }
}
