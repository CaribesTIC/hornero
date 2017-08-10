<?php
namespace JPH\Complement\Database;
use JPH\Core\Configuration;
use JPH\Commun\Constant;

/**
 * Clase encargada de regenerar la conexion a base de datos permite multiple
 * @author: Gregorio Bolívar <elalconxvii@gmail.com>
 * @author: Blog: <http://gbbolivar.wordpress.com>
 * @Creation Date: 5/08/2017
 * @version: 2.1
 */

trait GenerateConexion  {

    public function constructConexion()
    {
        // Construimos automaticamente el archivo ConfigDatabaseTMP.php
        $this->constructConfigDataBase();
        // Validamos que el archivo temporal creado anteriormente sea el 
        // mismo de la conexion de lo contrario procedemos a copiar el tmp
        $this->validateFileIdentico();
        $file = __DIR__.DIRECTORY_SEPARATOR.'ConfigDatabase.php';
        
    }

    private function constructConfigDataBase(){
        $file = Configuration::fileConfigApp();
        $file = $file['db'];
        if (file_exists($file)) {
          $config = parse_ini_file($file, true);
          $ar = fopen(__DIR__.DIRECTORY_SEPARATOR."ConfigDatabaseTmp.php", "w+") or die("Problemas en la creaci&oacute;n del archivo  " . $file);
            // Inicio la escritura en el activo
          fputs($ar, '<?php');
          fputs($ar, "\n");
          fputs($ar, 'namespace JPH\Complement\Database;');
          fputs($ar, "\n");
          fputs($ar, '/**');
          fputs($ar, "\n");
          fputs($ar, ' * Configuracion de las conexiones bb '.Constant::FW.' '.Constant::VERSION.'');
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

        // capturador del get que esta pasando por parametro
          fputs($ar, 'trait ConfigDatabase');
          fputs($ar, "\n");
          fputs($ar, "{");
          fputs($ar, "\n");
          fputs($ar, '  public $motor;');
          fputs($ar, "\n");
          fputs($ar, '  public $host;');
          fputs($ar, "\n");
          fputs($ar, '  public $port;');
          fputs($ar, "\n");
          fputs($ar, '  public $db;');
          fputs($ar, "\n");        
          fputs($ar, '  public $user;');
          fputs($ar, "\n");
          fputs($ar, '  public $pass;');
          fputs($ar, "\n");        
          fputs($ar, '  public $encoding;');
          fputs($ar, "\n");
          fputs($ar, "\n");
          fputs($ar, '  function __construct()');
          fputs($ar, "\n");
          fputs($ar, "  {");
          fputs($ar, "\n");
          fputs($ar, '   $this->motor;');
          fputs($ar, "\n");
          fputs($ar, '   $this->host;');
          fputs($ar, "\n");
          fputs($ar, '   $this->port;');
          fputs($ar, "\n");
          fputs($ar, '   $this->db;');
          fputs($ar, "\n");        
          fputs($ar, '   $this->user;');
          fputs($ar, "\n");
          fputs($ar, '   $this->pass;');
          fputs($ar, "\n");        
          fputs($ar, '   $this->encoding;');
          fputs($ar, "\n");
          fputs($ar, ' }');
          fputs($ar, "\n");
          foreach ($config as $key => $value):
            fputs($ar, "\n");
            fputs($ar, '  /** Inicio  del method  de ' . $key . '  */');
            fputs($ar, "\n");
            fputs($ar, '  public function '.$key.'()');
            fputs($ar, "\n");
            fputs($ar, "  {");
            fputs($ar, "\n");
            fputs($ar, "   // Driver de Conexion con la de base de datos");
            fputs($ar, "\n");
            //self::validateDriverConexion($value['motor']);
            fputs($ar, '   $this->motor = \''.$value['motor'].'\';');
            fputs($ar, "\n");
            fputs($ar, "   // IP o HOST de comunicacion con el servidor de base de datos");
            fputs($ar, "\n");
            fputs($ar, '    $this->host = \''.$value['host'].'\';');
            fputs($ar, "\n");
            fputs($ar, "   // Puerto de comunicacion con el servidor de base de datos");
            fputs($ar, "\n");
            fputs($ar, '   $this->port = \''.$value['port'].'\';');
            fputs($ar, "\n");
            fputs($ar, "   // Nombre base de datos");
            fputs($ar, "\n");
            fputs($ar, '   $this->db = \''.$value['db'].'\';');
            fputs($ar, "\n");
            fputs($ar, "   // Usuario de acceso a la base de datos");
            fputs($ar, "\n");
            fputs($ar, '   $this->user = \''.$value['user'].'\';');
            fputs($ar, "\n");
            fputs($ar, "   // Clave de acceso a la base de datos");
            fputs($ar, "\n");
            fputs($ar, '   $this->pass = \''.$value['pass'].'\';');
            fputs($ar, "\n");
            fputs($ar, "   // Codificacion de la base de datos");
            fputs($ar, "\n");
            fputs($ar, '   $this->encoding = \''.$value['encoding'].'\';');
            fputs($ar, "\n");
            fputs($ar, '   return $this;');
            fputs($ar, "\n");
            fputs($ar, '  }');
            fputs($ar, "\n");
            fputs($ar, '  /** Fin del caso del method de ' . $key . ' */');
            fputs($ar, "\n");
        endforeach;
        fputs($ar, "}");
        fputs($ar, "\n");
        fputs($ar, "?>");
         // Cierro el archivo y la escritura
        fclose($ar);
    }else {
        throw new Exceptions('El archivo <b>ConfigDatabase.php</b> se esta construyendo.');
    }
    return true;
}

/**
 * Permite validar que los archivos sean identico basado en el contenido de MD5
 * @access private
 * @return boolean 
 */
private function validateFileIdentico(){
  $fileCofNol = __DIR__.'/ConfigDatabase.php';
  $fileTmpNol = __DIR__.'/ConfigDatabaseTmp.php';
  $fileCofMd5 = md5(@file_get_contents($fileCofNol));
  $fileTmpMd5 = md5(file_get_contents($fileTmpNol));
  if($fileCofMd5 != $fileTmpMd5){
    copy($fileTmpNol, $fileCofNol);
}
return true;
}

private function validateDriverConexion($driv){
  $drivers = PDO::getAvailableDrivers();
  if (!in_array($driv, $drivers,true)) {
    throw new Exception('El archivo <b>databases.ini</b> solicitaron el driver <b>'.$driver.'</b> por PDO que no esta soportado por el servidor.');
}
}

}

?>
