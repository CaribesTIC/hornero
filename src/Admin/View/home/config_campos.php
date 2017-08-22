<?php 
$this->layout('base') ?> 

<?php $this->push('title') ?>
    Home del Sistema Hornero
<?php $this->end() ?>

<div class="ink-grid">
  <div class="column-group">
        <div class="all-100">
            <form class="ink-form" id="procesarForms" method="POST" action="/procesarForms" novalidate>
                <div class="ink-tabs left" data-prevent-url-change="true">
                    <!-- If you're using 'bottom' positioning, put this div AFTER the content. -->
                    <ul class="tabs-nav">
                        <?php foreach ($schema as $key => $value) { ?>
                            <li class=''>
                                <a class='tabs-tab large-100' href='#<?=$key?>' id='tab_<?=$key?>'>
                                    <font class='large'><?=$key?></font>
                                </a>
                            </li>
                        <?php } ?>
                    </ul>
                    <!-- Now just place your content -->
                    <?php 
                    foreach ($schema as $key => $value): ?>
                        <div id="<?=$key?>" class="tabs-content">
                          <?php $this->insert('view::home/tabsCampos',['tabla'=>$key,'campos'=>$value]) ?>
                        </div>
                    <?php
                    endforeach;
                    ?>
                </div>
                <div>
                    <input type="submit" name="sub" value="Submit" class="ink-button success" />
                </div>
            </form>
        </div>
    </div>
</div>

<?php $this->push('addJs') ?>
    <script type="text/javascript" src="/jph/js/module/config_campos.js"></script>
<?php $this->end() ?>