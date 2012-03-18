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
			
			if($this->request->params['isBancha']) return $this->User->saveFieldsAndReturn($this->request->data);	 // added
			
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
	
		if($this->request->params['isBancha']) return $this->User->saveFieldsAndReturn($this->request->data);	 // added
	
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->User->save($this->request->data['0']['data'])) {
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
			if($this->request->params['isBancha']) {
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
		
		if($this->request->params['isBancha']) return $this->User->deleteAndReturn();	 // added
		
		if ($this->User->delete()) {
			$this->Session->setFlash(__('User deleted'));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('User was not deleted'));
		$this->redirect(array('action' => 'index'));
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
