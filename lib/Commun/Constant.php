<?php
namespace JPH\Commun;

/**
 * Clase encargada de gestionar todas las contantes de toda la estructura del sistema
 * @Author: Gregorio Bolívar <elalconxvii@gmail.com>
 * @Author: Blog: <http://gbbolivar.wordpress.com>
 * @Creation Date: 25/07/2017
 * @version: 0.7
 */

interface Constant 
{

    const DIR_SRC = __DIR__ . DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'src' . DIRECTORY_SEPARATOR;
    const DIR_CONFIG = __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR."config" . DIRECTORY_SEPARATOR;
    const DIR_THEME = __DIR__.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'theme'.DIRECTORY_SEPARATOR;

    const VERSION = "0.8";
    const FW = "Hornero";

    // Constant necesaria para la generación de la aplicaciones
    const APP_CACHE = DIRECTORY_SEPARATOR.'Cache'; // Cache
    const APP_ROUTE = DIRECTORY_SEPARATOR.'Router'; // Cache
    const APP_MODEL = DIRECTORY_SEPARATOR.'Model'; // Model
    const APP_CONTR = DIRECTORY_SEPARATOR.'Controller'; // Constrolador
    const APP_VIEWS = DIRECTORY_SEPARATOR.'View'; // Responce
    const APP_VHOME = DIRECTORY_SEPARATOR.'View/home'; // Responce

    // Request Methods
    const METHOD_GET     = 'GET';
    const METHOD_POST    = 'POST';

}

?>
