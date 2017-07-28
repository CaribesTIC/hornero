<?php
namespace JPH\Commun;

/**
 * Clase encargada de gestionar todas las variables de cache intermedia entre el sistema y cacheLite
 * las acciones externa con el interior del sistema
 * @Author: Gregorio Bolívar <elalconxvii@gmail.com>
 * @Author: Blog: <http://gbbolivar.wordpress.com>
 * @Creation Date: 25/07/2017
 * @version: 0.7
 */

class Constant 
{

    const DIR_APP = __DIR__. '/..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'app' . DIRECTORY_SEPARATOR;
    const DIR_SRC = __DIR__ . DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'app' . DIRECTORY_SEPARATOR;
    const DIR_CONFIG = __DIR__."/../..".DIRECTORY_SEPARATOR."config" . DIRECTORY_SEPARATOR;
    const VERSION = "0.8";
    const FW = "Hornero";
        
        /*public function __construct() {
                defined('DIR_APP') != 1 ? define("DIR_APP", dirname(__FILE__) . DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'app' . DIRECTORY_SEPARATOR) : NULL;

                defined('DIR_SRC') != 1 ? define("DIR_SRC", dirname(__FILE__) . DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'src' . DIRECTORY_SEPARATOR) : NULL;

                defined('DIR_CONFIG') != 1 ? define("DIR_CONFIG", __DIR__."/../..".DIRECTORY_SEPARATOR."config" . DIRECTORY_SEPARATOR) : NULL;
        
        }*/

}

?>
