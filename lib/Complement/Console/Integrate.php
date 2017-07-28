<?php
namespace JPH\Complement\Console;
use JPH\Complement\Console\App;
use JPH\Commun\Constant;

Class Integrate
{
        public $labmenu;


        protected function arguments($argv) 
        {       
                $v = count($argv);
                // Optiones del menu con todos los valores
                if($v==1 AND $argv[0]=='hornero'){
                        $this->options('all');
                }
                $this->mostrarMenu();
        }

        protected function options($item){
             $elemento = file_get_contents(__DIR__.'/doc/es/hornero.json');
             $obj = json_decode($elemento);
             $valor = base64_encode($obj->hornero->$item);
             self::setValor($valor);
        }

        private function mostrarMenu(){
               die(base64_decode($this->labmenu));
        }

        public function setValor($valor){
                $this->labmenu = $valor;
        }

        private function getValor(){
                return $this->labmenu;
        }


}