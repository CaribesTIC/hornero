<?php
namespace JPH\Core;
use JPH\Commun\Exceptions;
use Cache\Lite;
/**
 * Clase encargada de gestionar todas las variables de cache intermedia entre el sistema y cacheLite
 * las acciones externa con el interior del sistema
 * @Author: Gregorio Bolívar <elalconxvii@gmail.com>
 * @Author: Blog: <http://gbbolivar.wordpress.com>
 * @Creation Date: 25/07/2017
 * @version: 0.7
 */

abstract class SetVarAll extends Exceptions {

    public $cache;
    public $options;
    public $path;

    public function __construct() {
        $this->options = array(
            'cacheDir' => __DIR__.'/../../src/'.ucfirst(APP).'/Cache/',
            'lifeTime' => 3600
        );
        $this->path = __DIR__.'/../../src/'.ucfirst(APP).'/Cache/';
        try {
            $this->cache = new \Cache_Lite($this->options);
            print_r($this->cache); 
                //self::setCache('j','ll');
                //self::getCache('j');
                 self::leerOCrear();
            die();
                // Comprobar si el email es válido
                if(isset($this->cache)) {
                    // Lanza una excepción si el email no es válido
                    //throw new Exceptions()->setMessage('HOLLLLLL');
                    $exp = new Exceptions();
                    $msj = "Error, es necesario tener instalado PEAR para poder continuar. ";
                    $exp->setMessages($msj);
                    throw $exp;
                }
            }
            // Iniciamos el bloque catch
            catch (Exceptions $e) {
                // Muestra el mensaje que hemos customizado en Exceptions:
                echo $e->errorMessage(); 
            }
        
    }

    /**
     * Method encargado de guardar la informacion en cache
     * @param $key String, Clave usada como identificador del cache 
     * @param $value String, Valor que desea guardar en cache
     * @return $this del evento seteado del cache
     */ 
    public function setCache($key, $value) {
        $this->cache->save($key, $value);
        return $this;
    }

    // Method encargado de extraer la informacion en cache
    public function getCache($key) {
        if ($this->cache->isCached($key)) {
            return $this->cache->get($key);
        } else {
            die('Variable (' . $key . '), no se encuentra registrada.');
        }
        return $this;
    }

    // Method encargado de eliminar la informacion en cache
    public function rmCache($key) {
        if ($this->cache->isCached($key)) {
            $this->cache->remove($key);
        } else {
            die('!Error, Variable (' . $key . '), no se encuentra registrada. ');
        }
    }

    public function allCache(){
        return $this->cache->_Cache();
    }

    private function leerOCrear(){
        $nombre_archivo = $this->path."/logs.txt"; 
 
    if(file_exists($nombre_archivo))
    {
        $mensaje = "El Archivo $nombre_archivo se ha modificado";
    }
 
    else
    {
        $mensaje = "El Archivo $nombre_archivo se ha creado";
    }
 
    if($archivo = fopen($nombre_archivo, "a"))
    {
        if(fwrite($archivo, date("d m Y H:m:s"). " ". $mensaje. "\n"))
        {
            echo "Se ha ejecutado correctamente";
        }
        else
        {
            echo "Ha habido un problema al crear el archivo";
        }
 
        fclose($archivo);
    }
    }

    public function __destruct() {

    }

}

?>
