<?php
namespace JPH\Core;

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

    var $get, $url, $mod, $app, $met, $obj, $class, $file;

    public function __construct($datos) {
        $this->get = $datos['request']; // EL VALOR CAPTURADO POR EL METHOD GET
        $this->url = $datos['name'];    // EL VALOR PASADO POR PARAMETRO PARA HACER LA COMPARACION
        $this->mod = $datos['controller'];  // LA PAGINA A DONDE SERA REDIRECCIONADA
        $this->app = $datos['apps'];    // NOMBRE DE LA APLICACION
        $this->met = $datos['method'];  // METHOD A INSTANCIAR

        $this->obj = NULL;
        $this->class = NULL;
        $this->file = NULL;
        /**  Caso general para todas las paginas */
        //print_r('url:'.$this->url);
        $p=explode('/',@$_SERVER['PATH_INFO']);
        switch ($this->get) {
            case $this->url :
                $this->class = ucfirst($this->mod) . 'Controller'; 
                $this->file = __DIR__.'/../../src/' . ucfirst($this->app) . '/Controller/' . ucfirst($this->mod) . 'Controller.php';
                $mthod= $this->met;
                if (!file_exists($this->file)) {
                    die("Problem loading the controller action:<b> ".ucfirst($this->mod)."</b>, intenta cargar el archivo:<b>".$this->file."</b>" );                  
                }

                include_once $this->file;
                $obj = new $this->class;
                $obj->$mthod($_REQUEST);
                break;
        }
    }

    public function __destruct() {}

}

?>