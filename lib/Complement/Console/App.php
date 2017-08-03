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
                $app = Commun::upperCase($name);
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
                        self::createFileReadController($ruta,$app);
                        self::createDirModelo($ruta);
                        self::createDirView($ruta);
                        self::createFileViewHome($ruta,$app);
                        $msj=Interprete::getMsjConsole($active,'app-create');
                }else{
                        $msj=Interprete::getMsjConsole($active,'app-existe');
                }
                 $msj=Commun::mergeTaps($msj,array('name'=>$name));
                /*if (!file_exists($carpeta)) {
                    mkdir($carpeta, 0777, true);
                }*/
                //die();
                //\Interprete::getConfigJson('mensajes',$name);
                return $msj;//'Aplicacion Creada correctamente';
        }

     
        /**
         * Perite crear el directorio donde se almacenara el cache de la aplicacion creada
         * @return boolean
         */
        private function createDirCache($ruta){
                Commun::mkddir($ruta.Constant::APP_CACHE);
        }
        /**
         * Permite crear el directorio donde se almacenara los controladores de la aplicacion
         * @return boolean
         */
        private function createDirController($ruta){
                Commun::mkddir($ruta.Constant::APP_CONTR);
        }
        /**
         * Permite crear el directorio del model de la aplicacion que se esta creando 
         * @return boolean
         */
        private function createDirModelo($ruta){
                Commun::mkddir($ruta.Constant::APP_MODEL);
        }


        /**
         * Permote crear el direcrorio donde se almacenaran las vista de la aplicacion
         * @return boolean
         */
        private function createDirView($ruta){
                Commun::mkddir($ruta.Constant::APP_VIEWS);
                Commun::mkddir($ruta.Constant::APP_VHOME);
        }

        /**
         * Permite crear el directorio del model de la aplicacion que se esta creando 
         * @return boolean
         */
        private function createDirRouter($ruta){
                Commun::mkddir($ruta.Constant::APP_ROUTE);
        }

        /**
         * Permite crear el el archivo encargado de procesar el router
         * @param string $ruta, ruta donde esta el xml
         * @param string $app, aplicacion que levanta los datos
         */
        private function createFileReadRouter($ruta, $app){
                
                $ar = fopen($ruta.Constant::APP_ROUTE.DIRECTORY_SEPARATOR.$app."Configuration.php", "w+") or die("Problemas en la creaci&oacute;n del router del apps " . $app);
                // Inicio la escritura en el activo
                fputs($ar, '<?php');
                fputs($ar, "\n");
                fputs($ar, 'namespace APP\\'.$app.'\\Router;');
                fputs($ar, "\n");
                fputs($ar, 'use JPH\\Router\\Route;');
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
                fputs($ar, 'class '.$app.'Configuration');
                fputs($ar, " \n");
                fputs($ar, '{');
                fputs($ar, " \n");
                fputs($ar, '    public function initApp($application,$folder)');
                fputs($ar, " \n");
                fputs($ar, "    {");
                fputs($ar, " \n");
                fputs($ar, '      $config_file = $folder.\'Router.xml\';');
                fputs($ar, " \n");
                fputs($ar, '      $config = simplexml_load_file($config_file);');
                fputs($ar, " \n");
                fputs($ar, '      new Route($application,$config);');
                fputs($ar, " \n");
                fputs($ar, '    }');
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
                fputs($ar, '        <name>/home</name>');
                fputs($ar, " \n");
                fputs($ar, '        <controller>home</controller>');
                fputs($ar, " \n");
                fputs($ar, '        <method>runIndex</method>');
                fputs($ar, " \n");
                fputs($ar, '        <request>GET</request>');
                fputs($ar, " \n");
                fputs($ar, '    </link>');
                fputs($ar, " \n");
                fputs($ar, '</route>');
                // Cierro el archivo y la escritura
                fclose($ar);
        }

        /**
         * Permite crear una plantilla archivo encargado de procesar el controller
         * @param string $ruta, ruta donde esta el xml
         * @param string $app, aplicacion que levanta los datos
         */
        private function createFileReadController($ruta, $app){

                $ar = fopen($ruta.Constant::APP_CONTR.DIRECTORY_SEPARATOR."HomeController.php", "w+") or die("Problemas en la creaci&oacute;n del router del apps " . $app);
                // Inicio la escritura en el activo
                fputs($ar, '<?php');
                fputs($ar, "\n");
                fputs($ar, 'namespace APP\\'.$app.'\\Controller;');
                fputs($ar, "\n");
                fputs($ar, 'use JPH\\Template\\Plate;');
                fputs($ar, "\n");                
                fputs($ar, 'use JPH\\Commun\\Commun;');
                fputs($ar, "\n");
                fputs($ar, '/**');
                fputs($ar, "\n");
                fputs($ar, ' * Generador de codigo de Controller de '.Constant::FW.' '.Constant::VERSION.'');
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
                fputs($ar, 'class HomeController');
                fputs($ar, "{");
                fputs($ar, " \n");
                fputs($ar, '   public $tpl;');   
                fputs($ar, " \n");
                fputs($ar, '   public function __construct()');
                fputs($ar, " \n");
                fputs($ar, '   {');
                fputs($ar, " \n");
                fputs($ar, '        $this->tpl = new Plate();');
                fputs($ar, " \n");
                fputs($ar, '   }');
                fputs($ar, " \n");
                fputs($ar, '   public function runIndex($request)');
                fputs($ar, " \n");
                fputs($ar, '   {');
                fputs($ar, '     echo  $this->tpl->render(\'view::home/inicio\', [\'nombre\'=>\'PRUEBA DE PROCESOSOSOOOS\']);');
                fputs($ar, '   }');
                fputs($ar, " \n");
                fputs($ar, '}');
                fputs($ar, " \n");
                fputs($ar, '?>');
                // Cierro el archivo y la escritura
                fclose($ar);

        }

        private function createFileViewHome($ruta, $app){
                $ar = fopen($ruta.Constant::APP_VHOME.DIRECTORY_SEPARATOR."inicio.php", "w+") or die("Problemas en la creaci&oacute;n del view inicio.php");
                // Inicio la escritura en el activo
                fputs($ar, '<?php');
                fputs($ar, " \n");
                fputs($ar, '$this->layout(\'base\', [\'title\' => \'User Profile\']) ?>');
                fputs($ar, " \n");
                fputs($ar, '<h1>User Profile</h1>');
                fputs($ar, " \n");
                fputs($ar, ' <p>Hello, <?=$this->e($nombre)?></p>');
                fclose($ar);
        }





}

