<?php
namespace JPH\Commun;
/**
 * @property: Tucan.com.ve
 * @author: Gregorio Jose Bolivar Bolivar <elalconxvii@gmail.com>
 * @Creation Date: 09/01/2014
 * @Audited by: Gregorio J Bolívar B
 * @Modified Date: 09/04/2016
 * @Description: Code that displays the application's main site.
 * @package: CommunController.php
 * @version: 3.3
 */

class Commun
{   
    public $resp;
       
    /**
     * Permite procesar un nombre de la clase basado en el namespace que se encuentra
     * ejemplo:JPH\Complement\Console\App, busca solo el nombre de la clase
     * @return string $name, devuelve el nombre de la clase activa.
     */
    static function onlyClassActive($classNamespace)
    {
        $obj = explode('\\', $classNamespace);
        $name = end($obj);
        return $name;
    }

    /**
     * Permite crear un directorios
     * @param string $ruta, ruta donde procesara la creacion del directorio 
     * @return boolean
     */
    static function mkddir($ruta){
        if (!file_exists($ruta)) 
        {
            mkdir($ruta, 0777, true);
            $resp = true;
        }else{
            $resp = false;
        }
        return $resp;
    }


}

?>