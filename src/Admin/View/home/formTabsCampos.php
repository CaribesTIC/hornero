 <div class="column-group horizontal-gutters">
 	<input type="hidden" name="field" value="">
 	<!-- Prepend button -->
 	<div class="control-group all-100 small-100 tiny-100 quarter-space">
 		<div class="control prepend-button" role="Etiqueta">
 			<input type="submit" value="Etiqueta" class="ink-button">
 			<span><input type="text" name="label['<?=$tabla?>]['<?=$campo?>]" id="lab-<?=$tabla?>-<?=$campo?>" placeholder="Escribir la etiqueta del campo" class="required valor"></span>
 		</div>
 	</div>
 	<!-- Prepend button -->
 	<div class="control-group all-100 small-100 tiny-100 quarter-space">
 		<div class="control prepend-button" role="fieldType">
    		<input type="submit" value="Tipo de campo" class="ink-button">
    		<span>
    			<select name="type[<?=$tabla?>][<?=$campo?>]"  class="required valor" id="typ-<?=$tabla?>-<?=$campo?>">
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

 	<!-- Prepend button -->
 	<div class="control-group all-100 small-100 tiny-100 quarter-space">
 		<div class="control prepend-button" role="Field type">
 			<input type="submit" value="Place Holder" class="ink-button">
 			<span>
 				<input type="text" name="placeholder[<?=$tabla?>][<?=$campo?>]" placeholder="Escribir el comentario que quiere que aparezca en el campo" class="required valor" id="pla-<?=$tabla?>-<?=$campo?>">
 			</span>
 		</div>
 	</div>

 	<!-- Prepend button -->
 	<div class="control-group all-100 small-100 tiny-100 quarter-space">
 		<div class="control prepend-button" role="fieldRequerido">
 			<input type="submit" value="Requerido" class="ink-button">
 			<span>
 				<select name="requerido[<?=$tabla?>][<?=$campo?>]" class="required valor" id="req-<?=$tabla?>-<?=$campo?>">
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
 				<select name="hidden_form[<?=$tabla?>][<?=$campo?>]" class="required valor" id="hif-<?=$tabla?>-<?=$campo?>">
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
    			<select name="hidden_list[<?=$tabla?>][<?=$campo?>]" class="required valor" id="hil-<?=$tabla?>-<?=$campo?>">
    				<option value=''><- Selecionar -></option>
    				<option value='SI'>SI</option>
    				<option value='NO'>NO</option>
    			</select>
 			</span>
 		</div>
 	</div>
 </div>