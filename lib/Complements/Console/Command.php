<?php
namespace JPH\Complements\Console;
use JPH\Complements\Console\Integrate;

/**
 * Permite recibir los comandos ingresado por los usuarios del sistema
 * @Author: Gregorio Bolívar <elalconxvii@gmail.com>
 * @Author: Blog: <http://gbbolivar.wordpress.com>
 * @Creation Date: 22/08/2017
 * @version: 4.1
 */

class Command extends Integrate
{
	public $term;

	/**
     * Permite inicializar el proceso para la consola
	 */
	public function run()
	{	
        	$this->term = $_SERVER['argv'];
        	$obj = new Integrate();
            $obj->arguments($this->term);
	}
}