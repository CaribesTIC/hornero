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
        public $item;
        public $html;
        public function __construct()
        {
                $this->cache = new Cache();
                $this->html;
                $tm = Constant::DIR_THEME.$this->cache->get('dir_theme');
                parent::__construct($tm);
                    
                //echo APP;//Constant::APP_VIEWS;
                //$this->cache->get('dir_s_twig')

                //$templates = new \League\Plates\Engine($this->cache->get('dir_d_twig'));
                $this->addFolder('view', Constant::DIR_SRC.APP.Constant::APP_VIEWS, true);
        }
        /**
         * Permite renderizar la vista e imprimir el resultado en html en vista
         * @param array $object, valores de datos que van a la vista
         * @param boolean $cifrar, opcion para permitir cifrar html
         * @return html $html 
         */
        public function renders($vista, $cifrar=false)
        {
        	$object=(array)self::addEnd();
                $this->html=($cifrar)?Commun::compressResponse($this->render($vista, $object)):$this->render($vista, $object);
                echo $this->html;
                self::addIni();
        }

        /**
         * Permite iniciar inicializar un objeto a su
         */
        public function addIni()
        {
                $this->item = null;
        }
        /**
         * Permite agregar datos 
         * @param type $key 
         * @param type $data 
         * @return type
         */
        public function add($key,$data)
        {
                $this->item[$key] = $data;
        }
        /**
         * Permite devolver los datos que fueron seteados por el usuario y estan en lote
         * @return array $return
         */
        public function addEnd()
        {
                $return=(count($this->item)<0)?$object = array():$this->item;
                return $return;
        }

        public function pp($obj){

        }


}