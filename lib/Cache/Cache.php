<?php
namespace JPH\Cache;
use JPH\Commun\Exceptions;
use JPH\Commun\Constant;
/**
 * Clase encargada de gestionar el cache del sistema y de cualquier elemento que se desee pasar por cache
 * @author: Gregorio Bolívar <elalconxvii@gmail.com>
 * @author: Blog: <http://gbbolivar.wordpress.com>
 * @Creation Date: 31/07/2017
 * @version: 0.1
 */
Class Cache extends Exceptions
{
        public $cacheDir;// = 'cache';
        public $expiryInterval;// = 2592000; //30*24*60*60;
        public $files;

        public  function __construct() {
            $this->cacheDir = Constant::DIR_SRC.ucfirst(APP).'/'.Constant::APP_CACHE.'/System';
            $this->expiryInterval = 2592000;
     }
 
        public function setCacheDir($val) {  $this->cacheDir = $val; }
        public function setExpiryInterval($val) {  $this->expiryInterval = $val; }
 
        public function exists($key)
        {
                $files=$this->pathFiles($key);
                $filename_cache = $files->filename_cache;
                $filename_info = $files->filename_info; //Cache info
 
                if (file_exists($filename_cache) && file_exists($filename_info))
                {
                        $cache_time = file_get_contents ($filename_info) + (int)$this->expiryInterval; //Last update time of the cache file
                        $time = time(); //Current Time
 
                        $expiry_time = (int)$time; //Expiry time for the cache
 
                        if ((int)$cache_time >= (int)$expiry_time) //Compare last updated and current time
                        {
                                return true;
                        }
                }
 
                return false;
        }
 
        /**
         * Permite extraer los valores que se mantienen almacenado en cache
         * @param string $key, valor clave que esta almacenada
         * @return string valor de datos solicitado
         */
        public function get($key)
        {
                $files=$this->pathFiles($key);
                $filename_cache = $files->filename_cache;
                $filename_info = $files->filename_info; //Cache info
 
                if (file_exists($filename_cache) && file_exists($filename_info))
                {
                        $cache_time = file_get_contents ($filename_info) + (int)$this->expiryInterval; //Last update time of the cache file
                        $time = time(); //Current Time
 
                        $expiry_time = (int)$time; //Expiry time for the cache
 
                        if ((int)$cache_time >= (int)$expiry_time) //Compare last updated and current time
                        {
                        	$cont = file_get_contents ($filename_cache);   //Get contents from file
                        	return base64_decode($cont); 
                        }
                }
 
                return null;
        }

		/**
		 * Permite eliminar los valores almacenados en cache pasando la clave de la variable
		 * @param string $key 
		 * @return boolean
		 */
        public function rm($key)
        {
               
                $files=$this->pathFiles($key);
                $filename_cache = $files->filename_cache;
                $filename_info = $files->filename_info; //Cache info
 
                if (file_exists($filename_cache) && file_exists($filename_info))
                {
                        $cache_time = file_get_contents ($filename_info) + (int)$this->expiryInterval; //Last update time of the cache file
                        $time = time(); //Current Time
 
                        $expiry_time = (int)$time; //Expiry time for the cache
 
                        if ((int)$cache_time >= (int)$expiry_time) //Compare last updated and current time
                        {
                                unlink($filename_cache);
                                unlink($filename_info);
                        		
                               return true;   //Get contents from file
                        }
                }
 
                return null;
        }
 
	/**
	 * Description
	 * @param string $key, valor clave para almacenar los datos 
	 * @param string $Contenido del valor clave  
	 * @return boolean
	 */
        public function set($key, $content)
        {
                $time = time(); //Current Time
                if (! file_exists($this->cacheDir))
                        mkdir($this->cacheDir);
                            
                $files=$this->pathFiles($key);
                $filename_cache = $files->filename_cache;
                $filename_info = $files->filename_info; //Cache info
 
                file_put_contents ($filename_cache ,  base64_encode($content)); // save the content
                file_put_contents ($filename_info , $time); // save the time of last cache update
                return true;
        }
        /**
         * Encargadad de extraer la ruta donde se encuentra los archivos del cache
         * @param string $key, valor clave para crear el registro
         * @return object $file, Objeto de los archivos creados
         */
        public  function pathFiles($key){
            $files['filename_cache'] = $this->cacheDir . '/' . md5($key) . '.cache'; //Cache filename
            $files['filename_info'] = $this->cacheDir . '/' . md5($key) . '.info'; //Cache info
            return (object)$files;
        }
 
}