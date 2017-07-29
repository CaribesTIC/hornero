<?php
namespace APP\Admin;
use JPH\Core\Router;
/**
 * Generado por el generador de codigo de router de Hornero 0.8
 * @propiedad: Hornero 0.8
 * @utor: Gregorio Bolivar <elalconxvii@gmail.com>
 * @created: 29/07/2017
 * @version: 1.0
 */ 
Class AdminConfiguration { 
   public function configure($application,$folder) { 
      $config_file = $folder.'Router.xml'; 
      $config = simplexml_load_file($config_file); 
      new Route($application,$config); 
 } 
} 
?>