<?php
$breadcrumb=(object)array('actual'=>'Usuarios','titulo'=>'Vista de integrada de gestion de Usuarios','ruta'=>'Usuarios')?>
<?php $this->layout('base',['usuario'=>$usuario,'breadcrumb'=>$breadcrumb])?>
<?php $this->push('addCss')?>

<?php $this->end()?>
<?php $this->push('title') ?>
 Gestionar de la vista Usuarios
<?php $this->end()?>
<div class="row">
<!-- left column -->
<div class="col-md-7">
    <!-- general form elements -->
    <?php $this->insert('view::seguridad/segUsuarios/usuarios/listado') ?>
</div>
<div class="col-md-5">
   <?php $this->insert('view::seguridad/segUsuarios/usuarios/form',['roles'=>$roles]) ?>
</div>
<?php $this->push('addJs') ?>


<script>
     // Variable de configuracion
    var Config = {};
    // Columnas para el datatable
    Config.colums = [
        { "data": "id" },
        { "data": "apellidos" },
        { "data": "nombres" },
        { "data": "usuario" },
        { "data": "correo" },
    ];
    // Configuracion de visualizacion del Datatable
    Config.show = {
        'display':10,
        'search':false,
        'pagina':false,
        'rowid': "id"
    }

    Core.Vista.Util = {
        priListaLoad: function () {

        },
        priListaClick: function (dataJson) {
            /* Funcionalidad adicional para la vista en la parte de listar*/
            if(typeof dataJson.perfiles != "undefined"){
                var perfil = dataJson.perfiles.length;
                if(perfil > 0){
                    $.each(dataJson.perfiles,function (key, valor) {
                        $("#roles option[value='"+valor.seg_perfil_id+"']").prop("selected",true);
                    });
                }else{
                    $("#roles option").prop("selected",false);
                }
            }
        },
        priClickProcesarForm:function () {

        }

    };
    $(function () {
        Core.main();
        Core.Vista.main('Usuarios',Config);
    })

</script>
<?php $this->end() ?> 
