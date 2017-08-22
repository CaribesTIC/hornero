<div class="column-group drop-zone button-toolbar" id="demo-dragdrop-2">
    <div class='all-100 tiny-100 drag-item quarter-space accordion' id="<?=$tabla?>_registro">
        <div class="ink-button all-100 ">
            <i class='fa fa-arrows-alt drag-handle push-left iconMove'></i>
            <span class="push-left">&nbsp;_registro_registro_registro</span>
            <i id="iconOpen" class='fa fa-plus drag-handle push-right iconOpen'></i>
        </div>
        <div class="panel quarter-space" id="div_<?=$tabla?>_registro">
        </div>
    </div>
        <?php $html = ''; foreach ($campos as $key => $value) { ?>
        <div class='all-100 tiny-100 drag-item quarter-space accordion' id="<?=$tabla?>_<?=$value->Field?>">
                <div class="ink-button all-100 ">
                       <i class='fa fa-arrows-alt drag-handle push-left iconMove'></i>
                       <span class="push-left">&nbsp;<?=$value->Field?></span>
                       <i id="iconOpen" class='fa fa-plus drag-handle push-right iconOpen'></i>
                </div>
                <div class="panel quarter-space" id="div_<?=$tabla?>_<?=$value->Field?>">
                <?php $this->insert('view::home/formTabsCampos',['tabla'=>$tabla,'campo'=>$value->Field]) ?>

                </div>
        </div>

        <?php  } ?>

</div>


