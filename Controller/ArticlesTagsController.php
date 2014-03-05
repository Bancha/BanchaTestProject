<?php
/**
 * ArticlesTags Controller
 *
 */
class ArticlesTagsController extends AppController {


/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->ArticlesTag->recursive = 0;
		$this->set('articlesTags', $this->paginate());
	}

/**
 * view method
 *
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		$this->ArticlesTag->id = $id;
		if (!$this->ArticlesTag->exists()) {
			throw new NotFoundException(__('Invalid articles tag'));
		}
		$this->set('articlesTag', $this->ArticlesTag->read(null, $id));
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->ArticlesTag->create();

			if(isset($this->request->params['isBancha']) && $this->request->params['isBancha']) return $this->ArticlesTag->saveFieldsAndReturn($this->request->data);	 // added

			if ($this->ArticlesTag->save($this->request->data)) {
				$this->Session->setFlash(__('The articles tag has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The articles tag could not be saved. Please, try again.'));
			}
		}
		$articles = $this->ArticlesTag->Article->find('list');
		$tags = $this->ArticlesTag->Tag->find('list');
		$this->set(compact('articles', 'tags'));
	}

/**
 * edit method
 *
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		$this->ArticlesTag->id = $id;
		if (!$this->ArticlesTag->exists()) {
			throw new NotFoundException(__('Invalid articles tag'));
		}

		if(isset($this->request->params['isBancha']) && $this->request->params['isBancha']) return $this->ArticlesTag->saveFieldsAndReturn($this->request->data);	 // added

		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->ArticlesTag->save($this->request->data)) {
				$this->Session->setFlash(__('The articles tag has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The articles tag could not be saved. Please, try again.'));
			}
		} else {
			$this->request->data = $this->ArticlesTag->read(null, $id);
		}
		$articles = $this->ArticlesTag->Article->find('list');
		$tags = $this->ArticlesTag->Tag->find('list');
		$this->set(compact('articles', 'tags'));
	}

/**
 * delete method
 *
 * @param string $id
 * @return void
 */
	public function delete($id = null) {
		if (!$this->request->is('post')) {
			throw new MethodNotAllowedException();
		}
		$this->ArticlesTag->id = $id;
		if (!$this->ArticlesTag->exists()) {
			throw new NotFoundException(__('Invalid articles tag'));
		}

		if(isset($this->request->params['isBancha']) && $this->request->params['isBancha']) return $this->ArticlesTag->deleteAndReturn();	 // added

		if ($this->ArticlesTag->delete()) {
			$this->Session->setFlash(__('Articles tag deleted'));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Articles tag was not deleted'));
		$this->redirect(array('action' => 'index'));
	}
}
