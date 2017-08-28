<?php
namespace APP\Admin\Controller;
use JPH\Template\Plate;
use JPH\Commun\Commun;
/**
 * Generador de codigo de Controller de Hornero 1.0
 * @propiedad: Hornero 1.0
 * @utor: Gregorio Bolivar <elalconxvii@gmail.com>
 * @created: 28/08/2017
 * @version: 1.0
 */ 
class LoginController{ 
   public $tpl; 
   public function __construct() 
   { 
       $this->tpl = new Plate(); 
   } 
   public function runIndex($request) 
   {     echo  $this->tpl->render('view::home/inicio', ['nombre'=>'PRUEBA DE PROCESOSOSOOOS']);   } 
} 
?>