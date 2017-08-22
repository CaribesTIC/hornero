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