<?php
namespace JPH\Commun;
use JPH\Complements\Console\Interprete;

/**
 * Clase encargada de gestionar todas las Exceptions del sistema con el objetivo de implementar
 * las acciones de errores pertenecientes a las fallas del sistema y e
 * @author: Gregorio Bolívar <elalconxvii@gmail.com>
 * @author: Blog: <http://gbbolivar.wordpress.com>
 * @created Date: 26/07/2017
 * @note http://php.net/manual/es/class.exception.php
 * @version: 0.1
 */

class Exceptions extends \Exception
{
        public $message;


        public function error($capa,$code) {
            $message=self::getMsjException($capa,$code);
                try {
                    try {
                        throw new Exceptions($message);
                    } catch (Exceptions $e) {
                        // relanzarla
                        throw $e;
                    }
                } catch (Exceptions $e) {
                    $msj=$e->getMessage();
                    die($msj);
                }
        }

        public function setMessages($message){
                $this->messages = $message;
        }

        public function getMMessages(){
                return $this->messages;
        }

        public function errorMessage() {
                $errorMsg = 'Error en la línea '
                .$this->getLine().' en el archivo '
                .$this->getFile() .': <b>'
                .$this->getMessage().
                '</b>'.self::getMMessages();
                return $errorMsg;
        }

        /**
         * Se encarga de leer los mensajes de exepciones
         * @param string $index indice del grupo de mensaje
         * @param string $subIndex sub indice del mensaje
         * @return string
         */
        public function getMsjException($index,$subIndex){
                $response=Interprete::getConfigMaster('exepciones',$index);
                return $response->$subIndex;
        }

}

?>
