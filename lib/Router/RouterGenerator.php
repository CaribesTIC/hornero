<?php
namespace JPH\Router;
use JPH\Commun\Commun;
use JPH\Commun\Constant;
use APP;
/**
 * @Property: tucan.com
 * @Author: Gregorio Bolívar
 * @email: elalconxvii@gmail.com
 * @Creation Date: 23/02/2013
 * @Audited by: Gregorio J Bolívar B
 * @Modified Date: 09/04/2016
 * @Description: generate the code of the main rules for controllers.
 * @package: RouterGeneratorPrimium.class.php
 * @version: 2.1
 * @Blog: http://gbbolivar.wordpress.com/
 */

class RouterGenerator
{

    public $req, $url, $mod, $app, $met, $obj, $class, $file;

    public function __construct($datos) 
    {
        
    }

    static public function get($datos)
    {
        // Request del valor Session
        $req = (object)$datos['request'];
        // Nombre del router a procesar 
        $url = $datos['name'];    
        // Clase del Controlador donde procesara los datos
        $mod = $datos['controller'];
        // Aplicacion donde buscara el controlador  
        $app = $datos['apps'];
        // Method de la clase que va a instanciar
        $met = $datos['method']; 

        $obj = NULL;
        $class = NULL;
        $file = NULL;
        /**  Caso general para todas las paginas */
        //print_r('url:'.$this->url);
        $requestUrl = isset($req->PATH_INFO) ? $req->PATH_INFO : '/';

        $requestMethod = isset($req->REQUEST_METHOD) ? $req->REQUEST_METHOD : 'GET';
        
        $p=explode('/',$requestUrl);

        //Commun::pp($requestUrl); //die();


        switch ($requestUrl) {
            case $url :

                $class = Commun::upperCase($mod) . 'Controller'; 
                $file = Constant::DIR_SRC.'/' . Commun::upperCase($app) . '/Controller/' . Commun::upperCase($mod) . 'Controller.php';
                $mthod = $met;
                if (!file_exists($file)) {
                    die("Problem loading the controller action:<b> ".Commun::upperCase($mod)."</b>, intenta cargar el archivo:<b>".$file."</b>" );                  
                }

                //include_once $file;
                $temp = '\APP\\'.$app.'\Controller\\'.$class;
                $obj = new $temp;
                // Meter todo lo que necesita el cliente basado en objeto
                $responce = '';
                $obj->$mthod((object)$_GET);
            break;
        }
        
    }

    static public function post($datos){
        
    }


}

?>