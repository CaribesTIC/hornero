<?php
namespace JPH\Complement\Console;
use JPH\Complement\Console\App;

Class Integrate
{
        public $labmenu;


        protected function arguments($argv) 
        {       
                echo $v = count($argv);
                print_r($argv);
                // Optiones del menu con todos los valores
                $inpre = new Interprete();
                if($v==1 AND $argv[0]=='hornero'){
                    $inpre->getConfigJson($argv[0],'all');
                }elseif ($v==3 AND $argv[1]=='app' AND !empty($argv[2])) {
                    $app = new App();
                    $app->createStructura($argv[2]);
                }
                $inpre->showOptions();
        }

/*        protected function options($item){
             $elemento = file_get_contents(__DIR__.'/doc/es/hornero.json');
             $obj = json_decode($elemento);
             $valor = base64_encode($obj->hornero->$item);
             self::setValor($valor);
        }

        *
         * Permite mostrar el resultado en la consola del mensaje mediante terminal
         * @return sting imprimir menu en terminal
         
        private function mostrarMenu(){
                $fwv=Constant::FW.' '.Constant::VERSION;
                $fwv.="\n \n";
               die($fwv.base64_decode($this->labmenu));
        }

        public function setValor($valor){
                $this->labmenu = $valor;
        }

        private function getValor(){
                return $this->labmenu;
        }*/


}