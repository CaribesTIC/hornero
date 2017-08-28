<div class="column-group drop-zone button-toolbar" id="demo-dragdrop-2">
        <div class='all-100 tiny-100 drag-item quarter-space accordion' id="<?=$tabla?>_registro">
            <div class="ink-button all-100 ">
                <i class='fa fa-arrows-alt drag-handle push-left iconMove'></i>
                <span class="push-left">&nbsp;Configuración de la entidad <b><?php echo $tabla?></b></span>
                <i id="iconOpen" class='fa fa-plus drag-handle push-right iconOpen'></i>
            </div>
            <div class="panel quarter-space" id="div_<?=$tabla?>_registro" style=" display: none;">
                <div class="column-group horizontal-gutters"  >
                    <div class="control-group all-100 small-100 tiny-100 quarter-space">
                        <div class="control prepend-button" role="Etiqueta">
                            <input type="submit" value="Etiqueta" class="ink-button">
                            <span><input type="text" name="label" maxlength="60" id="lab" placeholder="Escribir la etiqueta del campo que vamos mostrar" class="required valor"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <?php $html = ''; foreach ($campos as $key => $value) { if($value->Field!='id'){?>
            <div class='all-100 tiny-100 drag-item quarter-space accordion' id="<?=$tabla?>_<?=$value->Field?>">
                    <div class="ink-button all-100 ">
                           <i class='fa fa-arrows-alt drag-handle push-left iconMove'></i>
                           <span class="push-left">&nbsp;<?=$value->Field?></span>
                           <i id="iconOpen" class='fa fa-plus drag-handle push-right iconOpen'></i>
                    </div>
                    <div class="panel quarter-space" id="div_<?=$tabla?>_<?=$value->Field?>"  style=" display: none;">
                    <?php $this->insert('view::fields/formTabsCampos',['tabla'=>$tabla,'campo'=>$value,'select'=>$select]) ?>
                    </div>
            </div>
        <?php  }} ?>
</div>


