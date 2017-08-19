<?php $this->layout('base')?>

<?php $this->push('title') ?>
Home del Sistema Hornero
<?php $this->end() ?>

<div class="ink-grid">
  	<div class="column-group ">
	    <div class="all-50"><br>
                <div class="note bottom-space">
                   <h2>Bienvenido al Generador.</h2>
        	       Esta es una aplicación<p class="ink-tooltip"
                        data-tip-where="up"
                        data-tip-text="Ingeniería de Software Asistida por Computadora">
                        <span class="ink-badge black label">CASE</span>
                    </p> desarrolada sobre<p class="ink-tooltip"
                        data-tip-where="up"
                        data-tip-text="Estructura de desarrollo optmizada para aplicaciones dinamicas patrocinada por JPHLions.com">
                        <span class="ink-badge black label">Hornero</span>
                    </p>  que le permite generar código automático luego de registrar las configuraciones de los campos de cada table posteriormente se te habilita una opción para ejecutar el generador final te va a generar los  <span class="ink-badge black">modelos</span> , <span class="ink-badge black">vistas</span> y los <span class="ink-badge black">controladores</span> de tu base de dato configurada.
                 </div> 

	    </div>
	    <div class="all-50"><br>
                <div class="note bottom-space">
                    <h2>Información adicionals.</h2>
                    

                        <h3 id="thing-1-fast">Paso 1</h3>
                        <p>Debes seleccionar la base de datos que deseas que se use para generar codigo</p>


                        <h3 id="thing-2-fast">Paso 2</h3>
                        <p>Thing 2 fast!</p>

                	
                </div>
			
            </div>

            <div class="all-100 small-100 push-right">
                    <a href="/preConfig">
                        <button class="ink-button black push-right" >Siguiente</button>
                    </a>
            </div>
        </div>
</div>


<?php $this->push('addJs') ?>

<?php $this->end() ?>