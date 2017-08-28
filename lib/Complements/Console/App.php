<?php
namespace JPH\Complements\Console;
use JPH\Commun\Exceptions;
use JPH\Commun\Constant;
use JPH\Commun\Commun;

/**
 * Permite integrar un conjunto de funcionalidades de la consola pero en las aplicaciones
 * @Author: Gregorio Bolívar <elalconxvii@gmail.com>
 * @Author: Blog: <http://gbbolivar.wordpress.com>
 * @created Date: 09/08/2017
 * @updated Date: 29/08/2017
 * @version: 4.8
 */


class App extends Exceptions
{
        public $pathapp;
        public $msj;
        public $active;
        // Constante de la clase
        const SUBITEM = __CLASS__;

        public function __construct()
        {
                $this->pathapp = Constant::DIR_SRC;
                $this->active = Commun::onlyClassActive(App::SUBITEM);

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
                $ruta = $this->pathapp.DIRECTORY_SEPARATOR.$app;
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
                        $msj=Interprete::getMsjConsole($this->active,'app-create');
                }else{
                        $msj=Interprete::getMsjConsole($this->active,'app-existe');
                }
                 $msj=Commun::mergeTaps($msj,array('name'=>$name));
                return $msj;
        }


        /**
         * Perite crear el directorio donde se almacenara el cache de la aplicacion creada
         * @return boolean
         */
        private function createDirCache($ruta)
        {
                Commun::mkddir($ruta.Constant::APP_CACHE);
        }
        /**
         * Permite crear el directorio donde se almacenara los controladores de la aplicacion
         * @return boolean
         */
        private function createDirController($ruta)
        {
                Commun::mkddir($ruta.Constant::APP_CONTR);
        }
        /**
         * Permite crear el directorio del model de la aplicacion que se esta creando
         * @return boolean
         */
        private function createDirModelo($ruta)
        {
                Commun::mkddir($ruta.Constant::APP_MODEL);
        }


        /**
         * Permote crear el direcrorio donde se almacenaran las vista de la aplicacion
         * @return boolean
         */
        private function createDirView($ruta)
        {
                Commun::mkddir($ruta.Constant::APP_VIEWS);
                Commun::mkddir($ruta.Constant::APP_VHOME);
        }

        /**
         * Permite crear el directorio del model de la aplicacion que se esta creando
         * @return boolean
         */
        private function createDirRouter($ruta)
        {
                Commun::mkddir($ruta.Constant::APP_ROUTE);
        }

        /**
         * Permite gestionar las clases model del sistema en la aplicacion
         * @param string $app, Aplicacion que deberia estar creada donde se montara el model
         * @param string $modelo, Nombre del model que se generá en el sistema
         */
        public function createStructuraFileModel($app, $modelo)
        {
            $this->app = Commun::upperCase($app);
            $ruta = $this->pathapp.$app.Constant::APP_MODEL;

            // Permite valirar si existe la app donde va el modelo
            if (!file_exists($ruta)) {
                die(sprintf('The application "%s" does not exist.', $this->app));
            }else{
                $modelo = Commun::upperCase($modelo);
                $ruta =  $ruta.DIRECTORY_SEPARATOR.$modelo.'.php';
                if (file_exists($ruta)) {
                    $msj=Interprete::getMsjConsole($this->active,'app:model-existe');
                }else{
                    // Crear elementos
                    self::createFileModel($app,$modelo);
                    $msj=Interprete::getMsjConsole($this->active,'app:model-create');
                }
                $msj=Commun::mergeTaps($msj,array('app'=>$this->app,'modelo'=>$modelo));
            }
            return $msj;
        }

    /**
     * Permite gestionar las clases controller del sistema en la aplicacion
     * @param string $app, Aplicacion que deberia estar creada donde se montara el model
     * @param string $controller, Nombre del controller que se generá en el sistema
     */
    public function createStructuraFileController($app, $controller)
    {
        $this->app = Commun::upperCase($app);
        $ruta = $this->pathapp.$app.Constant::APP_CONTR;

        // Permite valirar si existe la app donde va el controller
        if (!file_exists($ruta)) {
            die(sprintf('The application "%s" does not exist.', $this->app));
        }else{
            $controller = Commun::upperCase($controller);
            $ruta =  $ruta.DIRECTORY_SEPARATOR.$controller.'.php';
            if (file_exists($ruta)) {
                $msj=Interprete::getMsjConsole($this->active,'app:controller-existe');
            }else{
                // Crear elementos
                //createFileReadController($ruta, $app , $controller = 'Home')
                $ruta = $this->pathapp.$app;
                self::createFileReadController($ruta,$app,$controller);
                $msj=Interprete::getMsjConsole($this->active,'app:controller-create');
            }
            $msj=Commun::mergeTaps($msj,array('app'=>$this->app,'controller'=>$controller));
        }
        return $msj;
    }

        /**
         * Permite listar las aplicaciones que se encuentran creadas en e sistema
         */
        public function showApps()
        {
            $tmp = $this->pathapp;
            $list = array_diff(scandir($tmp), array('..', '.'));
            $msj=Interprete::getMsjConsole($this->active,'app:list');
            $item = array();
            
            if(count($list)==1){
                $item=base64_encode(Commun::mergeTaps($msj,array('name'=>end($list))));
            }else{
                foreach ($list as $value) {

                   $tmp=base64_encode(Commun::mergeTaps($msj,array('name'=>$value)));
                   $item[] =$tmp;
                }
            }
            return $item;
        }

        /**
         * Permite crear el el archivo encargado de procesar el router
         * @param string $ruta, ruta donde esta el xml
         * @param string $app, aplicacion que levanta los datos
         */
        private function createFileReadRouter(string $ruta, string $app)
        {
                
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

        private function createFileRouter(string $ruta, string $app)
        {
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
         * @param string $controller, controller que se creara en el momento
         */
        private function createFileReadController(string $ruta, string $app , string $controller = 'Home')
        {

            $ar = fopen($ruta.Constant::APP_CONTR.DIRECTORY_SEPARATOR."".$controller."Controller.php", "w+") or die("Problemas en la creaci&oacute;n del controlador del apps " . $app);
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
            fputs($ar, 'class '.$controller.'Controller');
            fputs($ar, "{");
            fputs($ar, " \n");
            fputs($ar, '   public $tpl;');   
            fputs($ar, " \n");
            fputs($ar, '   public function __construct()');
            fputs($ar, " \n");
            fputs($ar, '   {');
            fputs($ar, " \n");
            fputs($ar, '       $this->tpl = new Plate();');
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

        private function createFileModel($app, $modelo)
        {
            $app = Commun::upperCase($app);
            $ruta = $this->pathapp.$app.Constant::APP_MODEL.DIRECTORY_SEPARATOR.$modelo;

            $ar = fopen($ruta.".php", "w+") or die("Problemas en la add del model del apps". $app);
            // Inicio la escritura en el activo
            fputs($ar, '<?php');
            fputs($ar, "\n");
            fputs($ar, 'namespace APP\\'.$app.'\\Model;');
            fputs($ar, "\n");
            fputs($ar, 'use JPH\\Complements\\Database\\Main;');
            fputs($ar, "\n");                
            fputs($ar, 'use JPH\\Commun\\Commun;');
            fputs($ar, "\n");
            fputs($ar, '/**');
            fputs($ar, "\n");
            fputs($ar, ' * Generador de codigo del Modelo de la App '.$app);
            fputs($ar, "\n");
            fputs($ar, ' * @propiedad: '.Constant::FW.' '.Constant::VERSION.'');
            fputs($ar, "\n");
            fputs($ar, ' * @utor: Gregorio Bolivar <elalconxvii@gmail.com>');
            fputs($ar, "\n");
            fputs($ar, ' * @created: ' .date('d/m/Y') .'');
            fputs($ar, "\n");
            fputs($ar, ' * @version: 2.0');
            fputs($ar, "\n");
            fputs($ar, ' */ ');
            fputs($ar, "\n");
            fputs($ar, "class $modelo extends Main");
            fputs($ar, "{");
            fputs($ar, " \n");
            fputs($ar, '   public function __construct()');
            fputs($ar, " \n");
            fputs($ar, '   {');
            fputs($ar, " \n");
            fputs($ar, '       // $this->tabla = \'nameTable\';');
            fputs($ar, " \n");
            fputs($ar, '       // $this->campoid = array(\'nameId\');');
            fputs($ar, " \n");
            fputs($ar, '       // $this->campos = array(\'campos\');');
            fputs($ar, " \n");
            fputs($ar, '       parent::__construct();');
            fputs($ar, " \n");
            fputs($ar, '   }');
            fputs($ar, " \n");
            fputs($ar, '}');
            fputs($ar, " \n");
            fputs($ar, '?>');
            // Cierro el archivo y la escritura
            fclose($ar);

        }

        private function createFileViewHome($ruta, $app)
        {
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

