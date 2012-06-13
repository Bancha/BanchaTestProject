<div class="articlesTags view">
<h2><?php  echo __('Articles Tag');?></h2>
	<dl>
		<dt><?php echo __('Article'); ?></dt>
		<dd>
			<?php echo $this->Html->link($articlesTag['Article']['title'], array('controller' => 'articles', 'action' => 'view', $articlesTag['Article']['id'])); ?>
			&nbsp;
		</dd>
		<dt><?php echo __('Tag'); ?></dt>
		<dd>
			<?php echo $this->Html->link($articlesTag['Tag']['id'], array('controller' => 'tags', 'action' => 'view', $articlesTag['Tag']['id'])); ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php echo __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Articles Tag'), array('action' => 'edit', $articlesTag['ArticlesTag']['id'])); ?> </li>
		<li><?php echo $this->Form->postLink(__('Delete Articles Tag'), array('action' => 'delete', $articlesTag['ArticlesTag']['id']), null, __('Are you sure you want to delete # %s?', $articlesTag['ArticlesTag']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Articles Tags'), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Articles Tag'), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Articles'), array('controller' => 'articles', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Article'), array('controller' => 'articles', 'action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Tags'), array('controller' => 'tags', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Tag'), array('controller' => 'tags', 'action' => 'add')); ?> </li>
	</ul>
</div>
