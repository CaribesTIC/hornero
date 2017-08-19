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
<script>
    Ink.requireModules(['Ink.UI.DragDrop_1'], function (DragDrop) {
       new DragDrop('#demo-dragdrop-2');
    });

    $$('div.panel.quarter-space').addEvent('click',function(e){
        e.stop();
    })

    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) 
    {
        acc[i].onclick = function(){
            var id = this.getProperty('id');
            var div = document.getElementById('div_'+id);

	        /* Toggle between adding and removing the "active" class,
	        to highlight the button that controls the panel */
	        div.classList.toggle("active");
	        if (div.style.display === "block") {
                    div.style.display = "none";
	        } else {
                    div.style.display = "block";
	        }
	    }
	}

        $$('.iconMove').addEvent('mouseup',function(){
            $$('.drag').addClass('drag-item');
            console.log('mover + soltar');
        });

        $$('.iconOpen').addEvent('mouseover',function(){
            $$('.drag').removeClass('drag-item');
            console.log('Abrir');
        });

        // Validar el formulario con los datos todo deben enviar registros
        $$('form#procesarForms').addEvent('submit', function(e){
            // Capturar los valores que tienen clases valor
            var inputs = $$('.tabs-content.active .valor');
            inputs.length
            var datosOk = true;
            for (i = 0; i < inputs.length; i++) {
                Id = inputs[i].getProperty('id');
                
                Req = inputs[i].hasClass('required');       // Requerido
                Val = document.getElementById(Id).value; // Valor
                console.log(Id);
                //document.getElementById(Id).focus();
                
                console.log(Val)
                if (Val ==='' && Req===true) {
                    document.getElementById(Id).focus();
                    return false;
                }else{

                    console.log('Fallo');
                }
            }

            e.stop();
        }).send();
</script>
<?php $this->end() ?>