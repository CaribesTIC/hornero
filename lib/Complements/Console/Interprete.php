<?php
namespace JPH\Complements\Console;
use JPH\Complements\Console\App;
use JPH\Commun\Constant;

class Interprete
{
        public $labmenu, $paser, $config;
        function __construct()
        {
                $this->labmenu = null;
                $this->paser = null;
                $this->config = null; 
        }
        /**
         * Methos encargado de extaer el objeto de configuracion de una indice pasado por parametro
         * @param $grupo grupo a que pertenece en la configuracion del json
         * @param $index indice del json principal de la configuracion
         * @return $this->paser array de los datos 
         */
        static public function getConfigMaster($grupo,$index){
        $response = self::getJsonConfig();
        $config = json_decode($response);
        if(empty($config)){ die('Error: Por favor revisar el parser del archivo json, presenta fallos.');}
        foreach ($config->$grupo as $key => $value) {
            if($key==$index){
                //print_r($value); die();
                return  $value;
            }   
        }
        die('No se encontro index['.$index.'] sociado a la configuracion.');    
        }

        static public function getConfigJson($index,$subIndex){
                print $index;
                $response=self::getConfigMaster($index,$subIndex);
                if(isset($response->$subIndex)){
                    foreach ($response->$subIndex as $key => $value) {
                        $resp[][$key]=$value;
                    }
                }else{
                    $resp = $response;
                }
                return $resp;
        }

        /**
         * Se encarga de leer los mensajes de alertas enviados a los usuarios cuando se necesita notificar algo
         * @param string $index indice del grupo de mensaje
         * @param string $subIndex sub indice del mensaje
         * @return string
         */
        static public function getMsjConsole($index,$subIndex){ 
                $response=self::getConfigMaster('mensajes',$index);
                return $response->$subIndex;
        }

        public function options($item)
        {
             $elemento = $this->getJsonConfig();
             $obj = json_decode($elemento);
             $valor = base64_encode($obj->hornero->$item);
             self::setValor($valor);
     }

        /**
         * Permite mostrar el resultado en la consola del mensaje mediante terminal
         * @return sting imprimir menu en terminal
         */
        public function showOptions()
        {
                
                $fwv=Constant::FW.' - '.Constant::VERSION;
                $fwv.="\n \n";
                $item=count($this->labmenu);
                if($item==1){
                    $fwv.=base64_decode($this->labmenu);
                    
                }else{
                   
                    foreach ($this->labmenu as  $value) {
                        $fwv.=base64_decode($value);
                        $fwv.="\n";
                    }
                }
                die($fwv);   
        }


        /**
         * Ruta del Archivo json en el cual hay muchas mensajes que debe devolver al sistema
         * @return string $response toda la informacion del json 
         */
        static public function getJsonConfig()
        {
                $response = file_get_contents(__DIR__.'/doc/es/hornero.json');
                return $response;
        }

        static public function getLogoAscii()
        {
                $response = file_get_contents(__DIR__.'/doc/banner.txt');
                return $response;
        }

        public function setValor($valor)
        {
                $this->labmenu = $valor;
        }

        private function getValor()
        {
                return $this->labmenu;
        }


}