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
                                    <span class='large'><?=$key?></span>
                                </a>
                            </li>
                        <?php } ?>
                    </ul>
                    <!-- Now just place your content -->
                    <?php
                    foreach ($schema as $key => $value)
                    {?>
                            <div id="<?=$key?>" class="tabs-content">
                                <?php $this->insert('view::home/tabsCampos',['tabla'=>$key,'campos'=>$value,'select'=>$select]) ?>
                            </div>
                     <?php
                    } ?>
                </div>
                <div class="large-100 space top-space column-group push-right">

                    <button class="ink-button push-right" id="regresar">Regresar</button>

                    <a href="/preConfig" id="submit ">
                        <button class="ink-button blue push-right" >Procesar</button>
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>

<?php $this->push('addJs') ?>
    <script type="text/javascript" src="<?php echo $Cache->get('srcJs')?>module/configCampos.js"></script>
<?php $this->end() ?>