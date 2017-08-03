<?php 
namespace JPH\Template;
use \League\Plates\Engine;
use JPH\Cache\Cache;
use JPH\Commun\Constant;
use JPH\Commun\Commun;

/**
* Clase encargada de procesar la parte de la vista con el sistema
* 
*/
class Plate extends Engine
{
	public $cache;
	function __construct()
	{
		$this->cache = new Cache();
		$tm = Constant::DIR_THEME.$this->cache->get('dir_theme');
		parent::__construct($tm);
		    
		//echo APP;//Constant::APP_VIEWS;
		//$this->cache->get('dir_s_twig')

		//$templates = new \League\Plates\Engine($this->cache->get('dir_d_twig'));
		$this->addFolder('view', Constant::DIR_SRC.APP.Constant::APP_VIEWS, true);
	}
}