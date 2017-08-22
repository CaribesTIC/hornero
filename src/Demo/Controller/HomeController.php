<?php
namespace APP\Demo\Controller;
use JPH\Template\Plate;
use JPH\Commun\Commun;
/**
 * Generador de codigo de Controller de Hornero 0.8
 * @propiedad: Hornero 0.8
 * @utor: Gregorio Bolivar <elalconxvii@gmail.com>
 * @created: 22/08/2017
 * @version: 1.0
 */ 
class HomeController{ 
   public $tpl; 
   public function __construct() 
   { 
       $this->tpl = new Plate(); 
   } 
   public function runIndex($request) 
   {     echo  $this->tpl->render('view::home/inicio', ['nombre'=>'PRUEBA DE PROCESOSOSOOOS']);   } 
} 
?>