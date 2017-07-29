<?php
namespace JPH\Cache;
use JPH\Commun\Exceptions;
/**
 * Clase encargada de gestionar todas las variables de cache intermedia entre el sistema y cacheLite
 * las acciones externa con el interior del sistema
 * @Author: Gregorio Bolívar <elalconxvii@gmail.com>
 * @Author: Blog: <http://gbbolivar.wordpress.com>
 * @Creation Date: 25/07/2017
 * @version: 0.7
 */
class Cache extends Exceptions
{
	private $cacheDir;// = 'cache';
	private $expiryInterval;// = 2592000; //30*24*60*60;

	public function __construct() {
            $this->cacheDir = __DIR__.'/../../src/'.ucfirst(APP).'/Cache/';
            $this->expiryInterval = 2592000;
     }
 
	public function setCacheDir($val) {  $this->cacheDir = $val; }
	public function setExpiryInterval($val) {  $this->expiryInterval = $val; }
 
	public function exists($key)
	{
		$filename_cache = $this->cacheDir . '/' . $key . '.cache'; //Cache filename
		$filename_info = $this->cacheDir . '/' . $key . '.info'; //Cache info
 
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
 
 
	public function get($key)
	{
		$filename_cache = $this->cacheDir . '/' . $key . '.cache'; //Cache filename
		$filename_info = $this->cacheDir . '/' . $key . '.info'; //Cache info
 
		if (file_exists($filename_cache) && file_exists($filename_info))
		{
			$cache_time = file_get_contents ($filename_info) + (int)$this->expiryInterval; //Last update time of the cache file
			$time = time(); //Current Time
 
			$expiry_time = (int)$time; //Expiry time for the cache
 
			if ((int)$cache_time >= (int)$expiry_time) //Compare last updated and current time
			{
				return file_get_contents ($filename_cache);   //Get contents from file
			}
		}
 
		return null;
	}
 
 
	public function set($key, $content)
	{
		$time = time(); //Current Time
 
		if (! file_exists($this->cacheDir))
			mkdir($this->cacheDir);
 
		$filename_cache = $this->cacheDir . '/' . $key . '.cache'; //Cache filename
		$filename_info = $this->cacheDir . '/' . $key . '.info'; //Cache info
 
		file_put_contents ($filename_cache ,  $content); // save the content
		file_put_contents ($filename_info , $time); // save the time of last cache update
	}
 
}