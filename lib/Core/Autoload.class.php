<?php
/*
class autoloader {

    public static $loader;

    public static function init() {
        if (self::$loader == NULL)
            self::$loader = new self();

        return self::$loader;
    }

    public function __construct() {
      $this->con = 0;
       spl_autoload_register(array($this, 'all'));
    }

    public function all($class) {
        /**
         * Costante Relacionadas al proceso de carga de las variables
         
        defined('CORE') != 1 ? define('CORE', dirname(__FILE__) . DIRECTORY_SEPARATOR) : NULL;
        defined('LIB') != 1 ? define('LIB', dirname(__FILE__) .DIRECTORY_SEPARATOR. '..'.DIRECTORY_SEPARATOR.'Complements' . DIRECTORY_SEPARATOR) : NULL;
        defined('ORM') != 1 ? define('ORM', LIB . 'ORM'.DIRECTORY_SEPARATOR.'Core' . DIRECTORY_SEPARATOR) : NULL;
        //defined('DriverDB') != 1 ? define('DriverDB', LIB . 'DriverDB'.DIRECTORY_SEPARATOR) : NULL;
        defined('CACHELITE') != 1 ? define('CACHELITE', LIB . 'CacheLite' . DIRECTORY_SEPARATOR) : NULL;
        defined('COMMON') != 1 ? define('COMMON', LIB . 'Common' . DIRECTORY_SEPARATOR) : NULL;

        defined('TWIG') != 1 ? define('TWIG', LIB . 'Twig-1.12.1' . DIRECTORY_SEPARATOR) : NULL;
        defined('DIR_APP') != 1 ? define("DIR_APP", dirname(__FILE__) . DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'app' . DIRECTORY_SEPARATOR) : NULL;
        defined('DIR_SRC') != 1 ? define("DIR_SRC", dirname(__FILE__) . DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'src' . DIRECTORY_SEPARATOR) : NULL;
        defined('DIR_CONFIG') != 1 ? define("DIR_CONFIG", __DIR__."/../..".DIRECTORY_SEPARATOR."config" . DIRECTORY_SEPARATOR) : NULL;
        defined('MODEL') != 1 ? define("MODEL", CORE . "..".DIRECTORY_SEPARATOR."Model" . DIRECTORY_SEPARATOR) : NULL;
        defined('PHPMAILER') != 1 ? define('PHPMAILER', LIB . 'PHPMailer' . DIRECTORY_SEPARATOR) : NULL;

        require_once(CORE . 'Configuration.class.php');
        require_once(CORE . 'SetVarAll.class.php');
        require_once(CORE . 'Router.class.php');
        require_once(CORE . 'RouterGeneratorPrimium.class.php');
        require_once(CACHELITE . 'Cache.php');
        require_once(COMMON.'Complements.class.php');
        require_once(CORE . 'Security.php');
        require_once(CORE . 'CommunController.php');
        require_once(PHPMAILER.'PHPMailerAutoload.php');
        require_once(CORE . 'SendMail.class.php');
        require_once(LIB . 'Capchat/Captcha.php');



        // include the necessary libraries to process twig templates.
        require_once (TWIG . DIRECTORY_SEPARATOR.'lib'.DIRECTORY_SEPARATOR.'Twig'.DIRECTORY_SEPARATOR.'Autoloader.php');
        require_once (ORM . 'ConfigDatabase.php');
        require_once (ORM . 'Orm.php');
    }

}
*/
?>
