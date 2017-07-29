<?php
namespace JPH\Complement\Console;
use JPH\Commun\Exceptions;
use JPH\Commun\Constant;
use JPH\Commun\Commun;


Class App extends Exceptions
{
        public $pathapp;
        public $msj;
        // Constante de la clase
        const SUBITEM = __CLASS__;

        public function __construct(){
                $this->pathapp = Constant::DIR_SRC;

        }
        /**
         * Methodo encargado de generar la estructura de las aplicacion dentro del sistema
         * @param string $name nombre de la aplicacion que se desea crear en el momento
         * @return string mensaje de respuesta
         */
        public function createStructura($name) 
        {
                $app = ucfirst($name);
                $active = Commun::onlyClassActive(App::SUBITEM);
                $ruta = $this->pathapp.'/'.$app;
                $dir = Commun::mkddir($ruta);
                // Verificar si creo la aplicacion
                if($dir){
                        self::createDirCache($ruta);
                        self::createDirRouter($ruta);
                        self::createFileReadRouter($ruta,$app);
                        self::createFileRouter($ruta,$app);
                        self::createDirController($ruta);
                        self::createDirModelo($ruta);
                        self::createDirResources($ruta);
                        $msj=Interprete::getMsjConsole($active,'app-create');
                }else{
                        $msj=Interprete::getMsjConsole($active,'app-existe');
                }
                var_dump($msj); die();
                /*if (!file_exists($carpeta)) {
                    mkdir($carpeta, 0777, true);
                }*/
                die();
                \Interprete::getConfigJson('mensajes',$name);
                return 'Aplicacion Creada correctamente';
        }

     
        /**
         * Perite crear el directorio donde se almacenara el cache de la aplicacion creada
         * @return boolean
         */
        private function createDirCache($ruta){
                $dir = Commun::mkddir($ruta.Constant::APP_CACHE);
        }
        /**
         * Permite crear el directorio donde se almacenara los controladores de la aplicacion
         * @return boolean
         */
        private function createDirController($ruta){
                $dir = Commun::mkddir($ruta.Constant::APP_CONTR);
        }
        /**
         * Permite crear el directorio del model de la aplicacion que se esta creando 
         * @return boolean
         */
        private function createDirModelo($ruta){
                $dir = Commun::mkddir($ruta.Constant::APP_MODEL);
        }


        /**
         * Permote crear el direcrorio donde se almacenaran las vista de la aplicacion
         * @return boolean
         */
        private function createDirResources($ruta){
                $dir = Commun::mkddir($ruta.Constant::APP_VIEWS);
        }

        /**
         * Permite crear el directorio del model de la aplicacion que se esta creando 
         * @return boolean
         */
        private function createDirRouter($ruta){
                $dir = Commun::mkddir($ruta.Constant::APP_ROUTE);
        }

        /**
         * Description
         * @param type $ruta 
         * @param type $app 
         * @return type
         */
        private function createFileReadRouter($ruta, $app){
                
                $ar = fopen($ruta.Constant::APP_ROUTE.DIRECTORY_SEPARATOR.$app."Configuration.php", "w+") or die("Problemas en la creaci&oacute;n del router del apps " . $app);
                // Inicio la escritura en el activo
                fputs($ar, '<?php');
                fputs($ar, "\n");
                fputs($ar, 'namespace APP\\'.$app.';');
                fputs($ar, "\n");
                fputs($ar, 'use JPH\\Core\\Router;');
                fputs($ar, "\n");
                fputs($ar, '/**');
                fputs($ar, "\n");
                fputs($ar, ' * Generado por el generador de codigo de router de '.Constant::FW.' '.Constant::VERSION.'');
                fputs($ar, "\n");
                fputs($ar, ' * @propiedad: '.Constant::FW.' '.Constant::VERSION.'');
                fputs($ar, "\n");
                fputs($ar, ' * @utor: Gregorio Bolivar <elalconxvii@gmail.com>');
                fputs($ar, "\n");
                fputs($ar, ' * @created: ' .date('d/m/Y') .'');
                fputs($ar, "\n");
                fputs($ar, ' * @version: 1.0');
                fputs($ar, "\n");
                fputs($ar, ' */ ');
                fputs($ar, "\n");
                fputs($ar, 'Class '.$app.'Configuration {');
                fputs($ar, " \n");
                fputs($ar, '   public function configure($application,$folder) {');
                fputs($ar, " \n");
                fputs($ar, '      $config_file = $folder.\'Router.xml\';');
                fputs($ar, " \n");
                fputs($ar, '      $config = simplexml_load_file($config_file);');
                fputs($ar, " \n");
                fputs($ar, '      new Route($application,$config);');
                fputs($ar, " \n");
                fputs($ar, ' }');
                fputs($ar, " \n");
                fputs($ar, '}');
                fputs($ar, " \n");
                fputs($ar, '?>');
                // Cierro el archivo y la escritura
                fclose($ar);
        }

        private function createFileRouter($ruta, $app){
                $ar = fopen($ruta.Constant::APP_ROUTE.DIRECTORY_SEPARATOR."Router.xml", "w+") or die("Problemas en la creaci&oacute;n del router del apps Router.xml");
                // Inicio la escritura en el activo
                fputs($ar, '<?xml version="1.0" encoding="UTF-8"?>');
                fputs($ar, " \n");
                fputs($ar, '<!-- Router configuration system-->');
                fputs($ar, " \n");
                fputs($ar, '<route>');
                fputs($ar, " \n");
                fputs($ar, '    <link>');
                fputs($ar, " \n");
                fputs($ar, '        <name></name>');
                fputs($ar, " \n");
                fputs($ar, '        <controller>home</controller>');
                fputs($ar, " \n");
                fputs($ar, '        <method>runIndex</method>');
                fputs($ar, " \n");
                fputs($ar, '    </link>');
                fputs($ar, " \n");
                fputs($ar, '</route>');
                // Cierro el archivo y la escritura
                fclose($ar);
        }
}
/**
 * 
 * 
    */