<?php
$breadcrumb=(object)array('actual'=>'Autos','titulo'=>'Vista de integrada de gestion de Autos','ruta'=>'Autos')?>
<?php $this->layout('base',['usuario'=>$usuario,'breadcrumb'=>$breadcrumb])?>
<?php $this->push('addCss')?>
<?php $this->end()?>
<?php $this->push('title') ?>
 Gestionar de la vista Autos
<?php $this->end()?>
<div class="row">
    <!-- left column -->
    <div class="col-md-7">
        <!-- general form elements -->
        <?php $this->insert('view::vistas/testAutos/autos/listado') ?>
    </div>
        <div class="col-md-5">
        <?php $this->insert('view::vistas/testAutos/autos/form') ?>
    </div>
</div>
<?php $this->push('addJs') ?>
<script>
    // Definicion los campos del DataTable de esta vista
    var Config = {};
    Config.colums = [
        { "data": "id_persona" },
        { "data": "marca" },
        { "data": "modelo" },
        { "data": "anio" },
    ];

    // Configuracion de visual del DataTable
    Config.show = {
        "display":10,
        "search":true,
        "pagina":true,
        "rowid": "id"
    }

    Core.Vista.Util = {
        priListaLoad: function (){ 
        },
        priListaClick: function (dataJson){ }, 
        priClickProcesarForm: function(){ } 
    };
    $(function () {
        Core.main();
        Core.Vista.main('Autos',Config);
    })

</script>
<?php $this->end() ?> 
