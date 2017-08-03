<?php
namespace JPH\Complement\Console;
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
			$link = Configuration::fileConfigApp();
			print_r($link);
        	die($app);
        }

}