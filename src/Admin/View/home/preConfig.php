    <?php $this->layout('base')?>

    <?php $this->push('title') ?>
    Home del Sistema Hornero
    <?php $this->end() ?>

    <?php $this->push('addCss') ?>
    <style>
        #div1, #div2 {
            border: 1px solid black;
            height: 220px;

        }
        .item{
            border: 1px solid black;
            margin-bottom: 3px;
            overflow: inherit;
        }
        .redondo{
            border-radius: 10px 10px 10px 10px;
            -moz-border-radius: 10px 10px 10px 10px;
            -webkit-border-radius: 10px 10px 10px 10px;
            border: 0px solid #000000;
        }

    </style>
    <?php $this->end() ?>

    <div class="ink-grid">
        <div class="column-group">
            <div class="all-50 column-group push-center">
                <h3>Entidades sin configurar</h3>
                <p>Debes seleccionar la base de datos que deseas que se genere código.</p>

                <div id="div1" class="all-100 redondo"  ondrop="drop(event)" ondragover="allowDrop(event)">

                    <?php foreach ($tablas['disponibles'] as $key => $value): ?>
                        <div class="all-50  medium-33 small-50 tiny-100 item redondo" draggable="true"  ondragstart="drag(event)" id="<?=$value?>">
                            <h5><i class="fa fa-arrows drag-handle"></i> <?=$value?></h5>
                        </div>
                    <?php endforeach ?>
                </div>
            </div>
            <div class="all-50 column-group push-center">
                <h3>Entidades ya seleccionadas</h3>


                <p>Debes agregar o soltar la entidad que deseas procesar.</p>
                <div id="div2" class="all-100 redondo"  ondrop="drop(event)" ondragover="allowDrop(event)">
                    <?php if(isset($tablas['existente'])){ foreach ($tablas['existente'] as $key => $value): ?>
                        <div class="all-50  medium-33 small-50 tiny-100 item redondo" draggable="true"  ondragstart="drag(event)" id="<?=$value?>">
                            <h5><i class="fa fa-arrows drag-handle"></i> <?=$value?></h5>
                        </div>
                    <?php endforeach; }?>
                </div>
            </div>

            <div id="submit" class="all-100 space top-space column-group push-right">
                <input id="enviarDatos"  class="ink-button black" value="Procesar">
            </div>
        </div>
    </div>



    <?php $this->push('addJs') ?>
    <script>
        showSubmit()
        function allowDrop(ev) {
            ev.preventDefault();
        }

        function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
            showSubmit()

        }

        function drop(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            ev.target.appendChild(document.getElementById(data));
            showSubmit()
            eliminarEntidad(data)
        }
        function showSubmit(){
            var elem = $$('#div2 .item').length;

            if(elem>0){
                $$('#submit').show()
            }else{
                $$('#submit').hide()
            }
        }
        /* Funcion que permite eliminar las entidades */
        function  eliminarEntidad(data) {
            var elem = $$('#div1 .item#'+data);
            alert(elem.length);
        }
        $$('#enviarDatos').addEvent('click',function (e) {
            var elem = $$('#div2 .item');
            var temp = [];
            for (i = 0; i < elem.length; i++) {
                Id = elem[i].getProperty('id');
                temp.push(Id);
            }

            // create a new Class instance
            var myRequest = new Request.JSON({
                url: '/setEntidadesProcesar',
                method: 'POST',
                data: {'entidades' : temp},
                onSuccess: function(dataJson){
                    //myElement.set('text', responseText);
                }
            }).send();
        });
    </script>
    <?php $this->end() ?>