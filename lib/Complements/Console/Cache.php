<?php
namespace JPH\Complements\Console;
use JPH\Commun\Exceptions;
use JPH\Commun\Constant;
use JPH\Commun\Commun;

class Cache extends Exceptions
{
    public $pathapp;
    public $msj;
    public $active;

    // Constante de la clase
    const SUBITEM = __CLASS__;

    public function __construct(){
        $this->pathapp = Constant::DIR_SRC;
        $this->active = Commun::onlyClassActive(App::SUBITEM);
    }

    /**
     * Permite borrar el cache a las aplicaciones que se encuentran creadas en e sistema
     */
    public function cleanCacheApps()
    {
        $Commun = new  Commun();
        $tmp = $this->pathapp;
        $list = array_diff(scandir($tmp), array('..', '.'));
        $msj=Interprete::getMsjConsole('Cache','cache-clean');
        $item = array();

        if(count($list)==1){
            $ruta = $tmp.$list.DIRECTORY_SEPARATOR.'Cache'.DIRECTORY_SEPARATOR.'System';
            $Commun->eliminarDir($ruta);
            $item=base64_encode(Commun::mergeTaps($msj,array('name'=>end($list))));
        }else{
            foreach ($list as $value) {
                $ruta = $tmp.$value.DIRECTORY_SEPARATOR.'Cache'.DIRECTORY_SEPARATOR.'System';
                $Commun->eliminarDir($ruta);
                $tmp=base64_encode(Commun::mergeTaps($msj,array('name'=>$value)));
                $item[] =$tmp;
            }
        }
        return $item;
    }
}