<?php
namespace JPH\Commun;
use JPH\Complements\Console\Interprete;
use JPH\Commun\Commun;

/**
 * Clase encargada de gestionar todas las Exceptions del sistema con el objetivo de implementar
 * las acciones de errores pertenecientes a las fallas del sistema y e
 * @author: Gregorio Bolívar <elalconxvii@gmail.com>
 * @author: Blog: <http://gbbolivar.wordpress.com>
 * @created Date: 26/07/2017
 * @note http://php.net/manual/es/class.exception.php
 * @version: 0.1
 */

class Exceptions extends \Error implements \Throwable
{
    /**
     * Se encarga de leer los mensajes de exepciones
     * @param string $index indice del grupo de mensaje
     * @param string $subIndex sub indice del mensaje
     * @param array %obj, arreglo con los datos que pasa los indice de los tab del mensaje
     * @return string
     */
        public function getMsjException(string $index, string $subIndex, array $obj = array()) : string
        {
            $response=Interprete::getConfigMaster('exepciones',$index);
            $msj = $response->$subIndex;
            return Commun::mergeTaps($msj, $obj);
        }




}

?>
