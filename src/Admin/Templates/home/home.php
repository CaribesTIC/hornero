

<?php $breadcrumb=(object)array('actual'=>'Inicio','titulo'=>'Pantalla de Bienvenida del Sistema','ruta'=>'')?>
<?php $this->layout('base',['usuario'=>$usuario,'breadcrumb'=>$breadcrumb])?>

<?php $this->push('title') ?>
Home del Sistema Hornero
<?php $this->end() ?>
<!--  li class="dropdown">
    <a href="#" class="dropdown-toggle " data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-address-card" aria-hidden="true"></i> Seguridad <span class="caret"></span></a>
    <ul class="dropdown-menu">
        <li class="dropdown">
            <a href="/usuariosIndex">USUARIOS</a>
        </li>
        <li class="dropdown">
            <a href="/perfilIndex">Perfiles</a>
        </li>
        <li class="dropdown">
            <a href="/rolesIndex">Roles</a>
        </li>
        <li class="dropdown">
            <a href="/asignarRolesPerfil" >Asignar roles a perfil</a>
        </li>
    </ul>
</li-->


<?php $this->push('addCss')?>
<?php $this->end()?>

<!-- Small boxes (Stat box) -->
<div class="row">
<div class="col-lg-12 col-xs-6">
	<div class="row">
    	<!--svg viewBox="0 0 960 300">
            <symbol id="s-text">
        		<text text-anchor="middle" x="50%" y="80%">JphLions </text>
        	</symbol>
    
        	<g class = "g-ants">
        		<use xlink:href="#s-text" class="text-copy"></use>
        		<use xlink:href="#s-text" class="text-copy"></use>
        		<use xlink:href="#s-text" class="text-copy"></use>
        		<use xlink:href="#s-text" class="text-copy"></use>
        		<use xlink:href="#s-text" class="text-copy"></use>
        	</g>
    	</svg-->
    	
	</div>
    <div class="row">
        <!--h1 id="animaText" class="text-right">El lider en
            <span
                    class="txt-rotate"
                    data-period="2000"
                    data-rotate='[  "Desarrollos de Sistemas.", "Desarrollos Móviles.", "Desarrollo de Arquitecturas.", "Automatización de procesos empresariales e Industriales!" ]'>
               </span>
        </h1-->
    </div>
</div>
</div>

<?php $this->push('addJs')?>
<!-- Notificciones toastr -->
<script src="/admin/dist/js/core.js"></script>
<script type="text/javascript">
    informar('Bienvenido al Sistema','Bienvenido');
</script>
<?php $this->end()?>
