<?php
namespace JPH\Commun;

/**
 * Clase encargada de gestionar todas las Exceptions del sistema con el objetivo de implementar
 * las acciones de errores pertenecientes a las fallas del sistema y e
 * @author: Gregorio Bolívar <elalconxvii@gmail.com>
 * @author: Blog: <http://gbbolivar.wordpress.com>
 * @created Date: 26/07/2017
 * @version: 0.1
 */

class Exceptions extends \Exception
{	
	public $message;
	public function setMessages($message){
		$this->messages = $message;
	}

	public function getMMessages(){
		return $this->messages;
	}

	public function errorMessage() {
		$errorMsg = 'Error en la línea '
		.$this->getLine().' en el archivo '
		.$this->getFile() .': <b>'
		.$this->getMessage().
		'</b>'.self::getMMessages(); 
		return $errorMsg;
	}

}

?>
