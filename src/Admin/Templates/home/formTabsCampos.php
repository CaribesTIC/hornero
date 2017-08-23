 <div class="column-group horizontal-gutters">
 	<input type="hidden" name="field" value="">
 	<!-- Prepend button -->
 	<div class="control-group all-100 small-100 tiny-100 quarter-space">
 		<div class="control prepend-button" role="Etiqueta">
 			<input type="submit" value="Etiqueta" class="ink-button">
 			<span><input type="text" name="label['<?=$tabla?>]['<?=$campo->Field?>]" id="lab-<?=$tabla?>-<?=$campo->Field?>" placeholder="Escribir la etiqueta del campo" class="required valor"></span>
 		</div>
 	</div>
 	<!-- Prepend button -->
 	<div class="control-group all-100 small-100 tiny-100 quarter-space">
 		<div class="control prepend-button" role="fieldType">
    		<input type="submit" value="Tipo de campo" class="ink-button">
    		<span>
    			<select name="type[<?=$tabla?>][<?=$campo->Field?>]"  class="required valor" id="typ-<?=$tabla?>-<?=$campo->Field?>">
                    <option value="default">Default Input</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="textarea">Textarea</option>
                    <option value="wysiwyg">WYSIWYG</option>
                    <option value="file">File</option>
                    <option value="date">Date</option>
                    <option value="enum_values" >Enum data set</option>
                    <option value="related" >Related table: one => one</option>
                    <option value="many_related" disabled="disabled">Related table: one => many</option>
			    </select>
    		</span>
 		</div>
 	</div>
     <div class="control-group all-50 small-50 tiny-50 typ-<?=$tabla?>-<?=$campo->Field?>">
         <div class="control prepend-button quarter-space" role="fieldType">
             <span class="ink-tooltip ink-label black "
                   data-tip-text="Clave foranea actual"
                   data-tip-color="black ">
                     <span class="ink-badge label">Related ID</span>
             </span>

             <select name="related_id">dd
                 <?php foreach ($select AS $entidad => $campos){ \JPH\Commun\Commun::pp($select ); ?>
                     <option value="<?=$entidad?>|<?=$campos->Field?>"><?=$entidad?> ->; <?=$campos->Field?></option>
                 <?php } ?>
             </select>
         </div>
     </div>
     <div class="control-group all-50 small-50 tiny-50 typ-<?=$tabla?>-<?=$campo->Field?>">
         <div class="control prepend-button quarter-space" role="fieldType">
             <span class="ink-tooltip ink-label black "
                   data-tip-text="Entidad referencial "
                   data-tip-color="black ">
                     <span class="ink-badge label">Field</span>
             </span>
             <select name="related_name">
                 <option value="test_abm|id">test_abm -&gt; id</option>
                 <option value="test_abm|name">test_abm -&gt; name</option>
                 <option value="test_abm|last_name">test_abm -&gt; last_name</option>
                 <option value="test_abm|address">test_abm -&gt; address</option>
                 <option value="test_abm|telephone">test_abm -&gt; telephone</option>
                 <option value="test_autos|id_persona">test_autos -&gt; id_persona</option>
                 <option value="test_autos|id">test_autos -&gt; id</option>
                 <option value="test_autos|marca">test_autos -&gt; marca</option>
                 <option value="test_autos|modelo">test_autos -&gt; modelo</option>
                 <option value="test_autos|anio">test_autos -&gt; anio</option>
             </select>
         </div>
     </div>

 	<!-- Prepend button -->
 	<div class="control-group all-100 small-100 tiny-100 quarter-space">
 		<div class="control prepend-button" role="Field type">
 			<input type="submit" value="Place Holder" class="ink-button">
 			<span>
 				<input type="text" name="placeholder[<?=$tabla?>][<?=$campo->Field?>]" placeholder="Escribir el comentario que quiere que aparezca en el campo" class="required valor" id="pla-<?=$tabla?>-<?=$campo->Field?>">
 			</span>
 		</div>
 	</div>

 	<!-- Prepend button -->
 	<div class="control-group all-100 small-100 tiny-100 quarter-space">
 		<div class="control prepend-button" role="fieldRequerido">
 			<input type="submit" value="Requerido" class="ink-button">
 			<span>
 				<select name="requerido[<?=$tabla?>][<?=$campo->Field?>]" class="required valor" id="req-<?=$tabla?>-<?=$campo->Field?>">
 					<option value=''><- Selecionar -></option>
 					<option value='SI'>SI</option>
 					<option value='NO'>NO</option>
 				</select>
 			</span>
 		</div>
 	</div>

 	<!-- Prepend button -->
 	<div class="control-group all-100 small-100 tiny-100 quarter-space">
 		<div class="control prepend-button" role="fieldHiddenForm">
 			<input type="submit" value="Ocultar en el formulario" class="ink-button">
 			<span>
 				<select name="hidden_form[<?=$tabla?>][<?=$campo->Field?>]" class="required valor" id="hif-<?=$tabla?>-<?=$campo->Field?>">
 					<option value=''><- Selecionar -></option>
 					<option value='SI'>SI</option>
 					<option value='NO'>NO</option>
 				</select>
 			</span>
 		</div>
 	</div>
 	<!-- Prepend button -->
 	<div class="control-group all-100 small-100 tiny-100 quarter-space">
 		<div class="control prepend-button" role="fieldHiddenList">
 			<input type="hidden" name="order" value="order">
 			<input type="submit" value="Ocultar en el listado" class="ink-button">
 			<span>
    			<select name="hidden_list[<?=$tabla?>][<?=$campo->Field?>]" class="required valor" id="hil-<?=$tabla?>-<?=$campo->Field?>">
    				<option value=''><- Selecionar -></option>
    				<option value='SI'>SI</option>
    				<option value='NO'>NO</option>
    			</select>
 			</span>
 		</div>
 	</div>
 </div>