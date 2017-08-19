<?php
namespace APP\Admin\Controller;
use JPH\Template\Plate;
use JPH\Commun\Commun;
use APP\Admin\Model AS Model;

/**
 * Generador de codigo de Controller de Hornero 0.8
 * @propiedad: Hornero 0.8
 * @utor: Gregorio Bolivar <elalconxvii@gmail.com>
 * @created: 04/08/2017
 * @version: 1.0
 */ 
class HomeController  { 
 public $tpl; 

 public function __construct() 
 { 
   $this->home = new Model\HomeModel();
   $this->tpl = new Plate(); 
 } 
 /**
  * Method encargado de mostrar la pantalla de inicio del sistema
  * @param request $request
  * @return html $view  
  */
 public function runIndex($request){
    $this->tpl->renders('view::home/home'); 
 }

 /**
  * Ejecuta la precunfiguracion de la base de datos donde extrae los datos del sistema y la base de datos
  * @param request $request, todo lo que se enviea por el request definido en el router
  * @return html en la vista
  */
 public function runPreConfig($request){
    $schema=$this->home->extraerTodasLasEntidades();
    $this->tpl->addIni();
    $this->tpl->add('tablas',$schema);
    $this->tpl->renders('view::home/preConfig');
 }

 public function runSetEntidadesProcesar($request)
 {
     $this->home->registrarEntidadesConfig($request);

 }

 public function runProcesarForms($request){
    Commun::pp($request); 
 }

 public function runConfigCampos($request) 
 { 
  $schema=$this->home->extraerLasEntidades();

  $item = array();
  foreach ($schema as $key => $value) {
    $item[$value->entidad] = $this->home->extraerDescribe($value->entidad);
  }
  $this->tpl->addIni();
  $this->tpl->add('schema',$item);
  $this->tpl->renders('view::home/config_campos');
}

} 
?>