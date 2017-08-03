<?php
namespace APP\Admin\Router;
use JPH\Router\Route;
/**
 * Generado por el generador de codigo de router de Hornero 0.8
 * @propiedad: Hornero 0.8
 * @utor: Gregorio Bolivar <elalconxvii@gmail.com>
 * @created: 02/08/2017
 * @version: 1.0
 */ 
class AdminConfiguration 
{ 
    public function initApp($application,$folder) 
    { 
      $config_file = $folder.'Router.xml'; 
      $config = simplexml_load_file($config_file); 
      new Route($application,$config); 
    } 
} 
?>