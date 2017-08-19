<?php
namespace JPH\Complements\Console;
use JPH\Commun\Exceptions;
use JPH\Commun\Constant;
use JPH\Commun\Commun;
use JPH\Core\Configuration;


class Symbolico extends Exceptions
{
		public $paththeme;
		public function __construct(){
            $this->paththeme = Constant::DIR_THEME;
        }

        /**
         * Methodo encargado de publicar los elementos publicos del sistema JS, CSS, IMG  
         * @param string $name nombre de la aplicacion que se desea crear en el momento
         * @return string mensaje de respuesta
         */
        public function filesWebPublic($name) 
        {
        	$app = Commun::upperCase($name);

        	// Extraer el archivo de configuracion
			$link = Configuration::fileConfigApp();

        	$this->createSymbolicoWeb($app, $link);
        }

        public function createSymbolicoWeb($name, $link){
        	// Leer archivo de configuracion donde deben estar los parametros necesarios
			file_exists($link['app']) ? $objFopen = parse_ini_file($link['app'], true) : die("<strong>Uff:</strong> Se encontro el siguiente error:<ul><li> Clase: ".__CLASS__.'.<br> En el Method: '.__METHOD__.'.<br/> En la Linea: '.__LINE__.'<br/> El achivo: <b>' . $strFileName.'</b>.<br>Nota: <b>Problema de ruta del Archivo no se encuentra.</b></li><ul>');

			
        	if(isset($objFopen[$name]['dir_theme'])){

        		$dir = Constant::DIR_THEME.''.$objFopen[$name]['dir_theme'].Constant::APP_TKEYS;
        		$objetivo = Constant::DIR_WEB.''.$objFopen[$name]['dir_theme'].DIRECTORY_SEPARATOR;

        		if ($gestor = opendir($dir)) {
				    while (false !== ($entrada = readdir($gestor))) {
				        if ($entrada != "." && $entrada != "..") {
				        	$origen  = $dir.DIRECTORY_SEPARATOR.$entrada; 
				        	$destino = $objetivo.''.$entrada;   
				        	symlink($origen, $destino);
				        	link($origen, $destino);
				        }
				    }
				    closedir($gestor);
				}
        		
        		
        	}
        
        }

}