 <?php
 use JPH\Router\RouterGenerator;
/**
 * @propiedad: PROPIETARIO DEL CODIGO
 * @Autor: Gregorio Bolivar * @email: elalconxvii@gmail.com
 * @Fecha de Creacion: 25/08/2017
 * @Auditado por: Gregorio J Bolívar B
 * @Descripción: Generado por el generador de codigo de router de webStores * @package: datosClass
 * @version: 1.0
 */

$request = $_SERVER;

/** Inicio  del Bloque de instancia al proceso de /  */
$datos0 = array('request'=>$request, 'name'=>"/", 'apps'=>"Admin", 'controller'=>"home",'method'=>'runIndex');
$process0 = RouterGenerator::getty($datos0);
/** Fin del caso de / */
/** Inicio  del Bloque de instancia al proceso de /preConfig  */
$datos1 = array('request'=>$request, 'name'=>"/preConfig", 'apps'=>"Admin", 'controller'=>"home",'method'=>'runPreConfig');
$process1 = RouterGenerator::getty($datos1);
/** Fin del caso de /preConfig */
/** Inicio  del Bloque de instancia al proceso de /setEntidadesProcesar  */
$datos2 = array('request'=>$request, 'name'=>"/setEntidadesProcesar", 'apps'=>"Admin", 'controller'=>"home",'method'=>'runSetEntidadesProcesar');
$process2 = RouterGenerator::postty($datos2);
/** Fin del caso de /setEntidadesProcesar */
/** Inicio  del Bloque de instancia al proceso de /configCampos  */
$datos3 = array('request'=>$request, 'name'=>"/configCampos", 'apps'=>"Admin", 'controller'=>"home",'method'=>'runConfigCampos');
$process3 = RouterGenerator::getty($datos3);
/** Fin del caso de /configCampos */
/** Inicio  del Bloque de instancia al proceso de /createTablas  */
$datos4 = array('request'=>$request, 'name'=>"/createTablas", 'apps'=>"Admin", 'controller'=>"home",'method'=>'runCreateTablas');
$process4 = RouterGenerator::getty($datos4);
/** Fin del caso de /createTablas */
/** Inicio  del Bloque de instancia al proceso de /procesarForms  */
$datos5 = array('request'=>$request, 'name'=>"/procesarForms", 'apps'=>"Admin", 'controller'=>"home",'method'=>'runProcesarForms');
$process5 = RouterGenerator::postty($datos5);
/** Fin del caso de /procesarForms */
 
?>