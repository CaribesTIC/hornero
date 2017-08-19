<?php
namespace JPH\Router;
use JPH\Commun\Commun;
use JPH\Commun\Constant;
use JPH\Commun\Exceptions;
use APP;
/**
 * generate the code of the main rules for controllers
 * @Property: hornero
 * @Author: Gregorio Bolívar <elalconxvii@gmail.com> <http://gbbolivar.wordpress.com/>
 * @package: RouterGenerator.php
 * @version: 4.1
 */

class RouterGenerator
{

    public $req, $url, $mod, $app, $met, $obj, $class, $file;



    static public function getty($datos)
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
        if(isset($req->REQUEST_METHOD))
        {
           // var_dump($req->REQUEST_METHOD);
            if($req->REQUEST_METHOD=='GET'){
                // Procesar y limpiar el request
                //echo "POST";
            }else{
                //$data = new Exceptions();
               // $data->error('Resquest','405-2');
            }
        }

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

    static public function postty($datos){
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
        $requestUrl = isset($req->PATH_INFO) ? $req->PATH_INFO : '/';

        if(isset($req->REQUEST_METHOD))
        {
            if($req->REQUEST_METHOD=='POST'){
                // Procesar y limpiar el request
                //echo "POST";
            }else{
                //$data = new Exceptions();
               // $data->error('Resquest','405-1');
            }
        }

        
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
                $obj->$mthod((object)$_POST);
            break;
        }
        
    }


}

?>