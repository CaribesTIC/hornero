<?php
namespace JPH\Core;
/**
 * @Property: tucan.com
 * @Author: Gregorio Bolívar
 * @email: elalconxvii@gmail.com
 * @Creation Date: 16/02/2013
 * @Audited by: Gregorio J Bolívar B
 * @Modified Date: 10/03/2017
 * @Description: The code that manages the extraction route.
 * @package: Router.class.php
 * @version: 1.7
 * @Blog: http://gbbolivar.wordpress.com/
 */

class Route 
{

    protected $routes = array();

    function __construct($application, $config) {
        try{
            foreach ($config as $route) {
                $this->routes[] = array('objeto' => array('name' => $route->name, 'controller' => $route->controller, 'method' => $route->method));
            }
            self::constructRules($application, $this->routes);
            self::getAction($application);
        }catch(Exception $e){
            header('Content-Type: text/html; charset=utf-8');
            echo( "Excepción capturada: " . $e->getMessage());
            die();
        }
    }
    public function constructRules($application, $routes){
        // Construimos automaticamente el archivo ConfigDatabaseTMP.php
        self::constructConfigRules($application, $routes);
        // Validamos que el archivo temporal creado anteriormente sea el mismo de la conexion de lo contrario procedemos a copiar el tmp
        self::validateFileIdentico($application);
    }
    static public function getAction($application) {
        // Crar un archivo de cache donde tiene las rutas y permitir validar el mismo si existe
        $app = ucfirst($application);
        if (file_exists($file = DIR_SRC . $app . "/Cache/" . $app . 'Router.class.php')) {
            include_once $file;
        } 
    }    
    static public function constructConfigRules($application, $option){
    $app = ucfirst($application);
    $ar = fopen(DIR_SRC . $app . "/Cache/" . $app . "Router.classTMP.php", "w+") or die("Problemas en la creaci&oacute;n del router del apps " . $application);
            // Inicio la escritura en el activo
    fputs($ar, '
        <?php
        /**
 * @propiedad: PROPIETARIO DEL CODIGO
 * @Autor: Gregorio Bolivar
 * @email: elalconxvii@gmail.com
 * @Fecha de Creacion: ' . date('d/m/Y') . '
 * @Auditado por: Gregorio J Bolívar B
 * @Descripción: Generado por el generador de codigo de router de webStores
 * @package: datosClass
 * @version: 1.0
 */ 

        ');
            // capturador del get que esta pasando por parametro
    fputs($ar, '@$solicitud = explode(\'/\',$_SERVER[\'PATH_INFO\']);');
    fputs($ar, "\n");
    fputs($ar, '$request = @$solicitud[1];');
    fputs($ar, "\n");
    fputs($ar, "\n");

    foreach ($option AS $cont => $routes):
        foreach ($routes AS $route):
            fputs($ar, '/** Inicio  del Bloque de instancia al proceso de ' . $route['name'] . '  */');
            fputs($ar, "\n");
            fputs($ar, '$datos' . $cont . ' = array(\'request\'=>$request, \'name\'=>"' . $route['name'] . '", \'apps\'=>"' . $app . '", \'controller\'=>"' . $route['controller'] . '",\'method\'=>\'' . $route['method'] . '\');');
            fputs($ar, "\n");
            fputs($ar, '$process' . $cont . ' = new RouterGeneratorPrimium($datos' . $cont . ');');
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

    public function validateFileIdentico($application){
      $app = ucfirst($application);
      $fileCofNol = DIR_SRC . $app . "/Cache/" . $app . "Router.class.php";
      $fileTmpNol = DIR_SRC . $app . "/Cache/" . $app . "Router.classTMP.php";
      $fileCofMd5 = md5(@file_get_contents($fileCofNol));
      $fileTmpMd5 = md5(file_get_contents($fileTmpNol));
      if($fileCofMd5 != $fileTmpMd5){
        copy($fileTmpNol, $fileCofNol);
    }
    return true;
}

public function __destruct() {

}

}

?>
