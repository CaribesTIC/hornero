<?php
namespace JPH\Router;
use JPH\Commun\Constant;
use JPH\Commun\Exceptions;
use APP;
/**
 * Clase encargadad de procesar las rutas del sistema
 * @author: Gregorio Bolívar <elalconxvii@gmail.com>
 * @author: Blog: <http://gbbolivar.wordpress.com>
 * @created Date: 31/07/2017
 * @version: 0.9
 */

class Route 
{

    protected $routes = array();

    /**
     * Constructor de la clase que permite obtener los datos del configuracion de la ruta
     * @param string $application, Aplicacion que esta lavantando las rutas
     * @param array $config, arreglo del los campos configurados en el xml  
     * @return type
     */
    function __construct($application, $config) 
    {
        try{
            foreach ($config as $route) {
               
                //[name] => /perso [controller] => home [method] => runIndex [request] => GET|POST
                $this->routes[] = array('objeto' => 
                                            array('name' => $route->name, 
                                                'controller' => $route->controller, 
                                                'method' => $route->method,
                                                'request' => $route->request
                                            )
                                    );
            }
            self::constructRules($application, $this->routes);
            self::getAction($application);
        }catch(Exception $e){
            header('Content-Type: text/html; charset=utf-8');
            echo( "Excepción capturada: " . $e->getMessage());
            die();
        }
    }

    public function constructRules($application, $routes)
    {
        // Construimos automaticamente el archivo ConfigDatabaseTMP.php
        self::constructConfigRules($application, $routes);
        // Validamos que el archivo temporal creado anteriormente sea el mismo de la conexion de lo contrario procedemos a copiar el tmp
        self::validateFileIdentico($application);
    }
    static public function getAction($application) 
    {
        // Crar un archivo de cache donde tiene las rutas y permitir validar el mismo si existe
        $app = ucfirst($application);
        $file = Constant::DIR_SRC . $app . "/".Constant::APP_CACHE."/" . $app . 'Router.class.php';
        if (file_exists($file)) {
            include_once $file;
        } 
    }    
    static public function constructConfigRules($application, $option)
    {
        
        $app = ucfirst($application);
        $ar = fopen(Constant::DIR_SRC . $app . "/".Constant::APP_CACHE."/" . $app . "Router.classTMP.php", "w+") or die("Problemas en la creaci&oacute;n del router del apps " . $application);
            // Inicio la escritura en el activo
        fputs($ar, ' <?php');
        fputs($ar, "\n");
        fputs($ar, ' use JPH\\Router\\RouterGenerator;');
        fputs($ar, "\n");
        fputs($ar, '/**');
        fputs($ar, "\n");
        fputs($ar, ' * @propiedad: PROPIETARIO DEL CODIGO');
        fputs($ar, "\n");
        fputs($ar, ' * @Autor: Gregorio Bolivar');
        fputs($ar, ' * @email: elalconxvii@gmail.com');
        fputs($ar, "\n");
        fputs($ar, ' * @Fecha de Creacion: ' . date('d/m/Y') . '');
        fputs($ar, "\n");
        fputs($ar, ' * @Auditado por: Gregorio J Bolívar B');
        fputs($ar, "\n");
        fputs($ar, ' * @Descripción: Generado por el generador de codigo de router de webStores');
        fputs($ar, ' * @package: datosClass');
        fputs($ar, "\n");
        fputs($ar, ' * @version: 1.0');
        fputs($ar, "\n");
        fputs($ar, ' */'); 

        fputs($ar, "\n");
        // capturador del get que esta pasando por parametro
        //fputs($ar, '@$solicitud = explode(\'/\',$_SERVER[\'PATH_INFO\']);');
        fputs($ar, "\n");
        fputs($ar, '$request = $_SERVER;');
        fputs($ar, "\n");
        fputs($ar, "\n");

        foreach ($option AS $cont => $routes):
            foreach ($routes AS $route):
                $action = strtolower(self::validarMethods($route['request'])); 
            fputs($ar, '/** Inicio  del Bloque de instancia al proceso de ' . $route['name'] . '  */');
            fputs($ar, "\n");
            fputs($ar, '$datos' . $cont . ' = array(\'request\'=>$request, \'name\'=>"' . $route['name'] . '", \'apps\'=>"' . $app . '", \'controller\'=>"' . $route['controller'] . '",\'method\'=>\'' . $route['method'] . '\');');
            fputs($ar, "\n");
            fputs($ar, '$process' . $cont . ' = RouterGenerator::'.$action.'($datos' . $cont . ');');
            fputs($ar, "\n");
            fputs($ar, '/** Fin del caso de ' . $route['name'] . ' */');
            fputs($ar, "\n");
            endforeach;
            endforeach;

            fputs($ar, " \n");
            fputs($ar, "?>");
        // Cierro el archivo y la escritura
            fclose($ar);

        }

        public function validateFileIdentico($application)
        {
              $app = ucfirst($application);
              $fileCofNol = Constant::DIR_SRC . $app . "/".Constant::APP_CACHE."/" . $app . "Router.class.php";
              $fileTmpNol = Constant::DIR_SRC . $app . "/".Constant::APP_CACHE."/" . $app . "Router.classTMP.php";
              $fileCofMd5 = md5(@file_get_contents($fileCofNol));
              $fileTmpMd5 = md5(file_get_contents($fileTmpNol));
              if($fileCofMd5 != $fileTmpMd5)
              {
                    copy($fileTmpNol, $fileCofNol);
              }
            return true;
        }

        static public function validarMethods($meth){
            $disponible = array(Constant::METHOD_GET, Constant::METHOD_POST);
            if (!in_array($meth, $disponible)) {
                die('Error en el method soolicitado no definido:'.$meth);
            }
            return $meth;
        }

    public function __destruct() {

    }

}

?>