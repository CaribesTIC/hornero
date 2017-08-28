<?php
namespace APP\Asistencia\Router;
use JPH\Router\Route;
/**
 * Generado por el generador de codigo de router de Hornero 1.0
 * @propiedad: Hornero 1.0
 * @utor: Gregorio Bolivar <elalconxvii@gmail.com>
 * @created: 25/08/2017
 * @version: 1.0
 */ 
class AsistenciaConfiguration 
{ 
    public function initApp($application,$folder) 
    { 
      $config_file = $folder.'Router.xml'; 
      $config = simplexml_load_file($config_file); 
      new Route($application,$config); 
    } 
} 
?>