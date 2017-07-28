<?php
namespace JPH\Commun;
/**
 * @property: Tucan.com.ve
 * @author: Gregorio Jose Bolivar Bolivar <elalconxvii@gmail.com>
 * @Creation Date: 09/01/2014
 * @Audited by: Gregorio J Bolívar B
 * @Modified Date: 09/04/2016
 * @Description: Code that displays the application's main site.
 * @package: CommunController.php
 * @version: 3.3
 */

class Commun
{
        public $setDateAll;

        public function __construct(){
                $this->setDateAll;
                // Uso para activar buffer para comprimir html
                ob_start();
                ob_end_flush();
                
        }
        /**
         * Inicializar la plantillas twig
         * @param $d1 string Directorio principal del bloque de las plantillas principales
         * @param $d2 string Directorio segundario del bloque de plantillas adicionales
         * @return twig object 
         */
        public function communIniTemplate($d1,$d2) {
                $d1A= __DIR__.'/../'.$d1;
                $d2A= __DIR__.'/../'.$d2;

                $this->load = new Twig_Loader_Filesystem(array($d1A, $d2A));
                $this->twig = new Twig_Environment($this->load, array('debug' => false));
                return $this->twig ;
        }

        /**
         * 
         */
        public function dennyController(){
                header('Access-Control-Allow-Origin: http://localhost');
                header("Access-Control-Allow-Credentials: true");
                header('Access-Control-Allow-Headers: X-Requested-With');
                header('Access-Control-Allow-Headers: Content-Type');
                header('Access-Control-Allow-Methods: POST');
                header('Access-Control-Max-Age: 86400');
        }

        public function validateSlug($slug){
                $valid = htmlentities($slug);
                return $valid;
        }

        public function createSlug($slug){
                $buffer = self::sanear_string(mb_strtolower($slug));
                $tmp = self::urls_friend($buffer);
                return $tmp;
        }

        public function sanear_string($string){
                $string = trim($string);
                $string = str_replace(
                        array('Ã¡', 'Ã ', 'Ã¤', 'Ã¢', 'Âª', 'Ã�', 'Ã€', 'Ã‚', 'Ã„'),
                        array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
                        $string
                        );
                $string = str_replace(
                        array(utf8_decode('Ã¡'), utf8_decode('Ã '), utf8_decode('Ã¤'), utf8_decode('Ã¢'), utf8_decode('Âª'), utf8_decode('Ã�'), utf8_decode('Ã€'), utf8_decode('Ã‚'), utf8_decode('Ã„')),
                        array('a', 'a', 'a', 'a', 'a', 'A', 'A', 'A', 'A'),
                        $string
                        );
                $string = str_replace(
                        array('Ã©', 'Ã¨', 'Ã«', 'Ãª', 'Ã‰', 'Ãˆ', 'ÃŠ', 'Ã‹'),
                        array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
                        $string
                        );
                $string = str_replace(
                        array(utf8_decode('Ã©'), utf8_decode('Ã¨'), utf8_decode('Ã«'), utf8_decode('Ãª'), utf8_decode('Ã‰'), utf8_decode('Ãˆ'), utf8_decode('ÃŠ'), utf8_decode('Ã‹')),
                        array('e', 'e', 'e', 'e', 'E', 'E', 'E', 'E'),
                        $string
                        );
                $string = str_replace(
                        array('Ã­', 'Ã¬', 'Ã¯', 'Ã®', 'Ã�', 'ÃŒ', 'Ã�', 'ÃŽ'),
                        array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
                        $string
                        );
                $string = str_replace(
                        array(utf8_decode('Ã­'), utf8_decode('Ã¬'), utf8_decode('Ã¯'), utf8_decode('Ã®'), utf8_decode('Ã�'), utf8_decode('ÃŒ'), utf8_decode('Ã�'), utf8_decode('ÃŽ')),
                        array('i', 'i', 'i', 'i', 'I', 'I', 'I', 'I'),
                        $string
                        );
                $string = str_replace(
                        array('Ã³', 'Ã²', 'Ã¶', 'Ã´', 'Ã“', 'Ã’', 'Ã–', 'Ã”'),
                        array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
                        $string
                        );
                $string = str_replace(
                        array(utf8_decode('Ã³'), utf8_decode('Ã²'), utf8_decode('Ã¶'), utf8_decode('Ã´'), utf8_decode('Ã“'), utf8_decode('Ã’'), utf8_decode('Ã–'), utf8_decode('Ã”')),
                        array('o', 'o', 'o', 'o', 'O', 'O', 'O', 'O'),
                        $string
                        );
                $string = str_replace(
                        array('Ãº', 'Ã¹', 'Ã¼', 'Ã»', 'Ãš', 'Ã™', 'Ã›', 'Ãœ'),
                        array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
                        $string
                        );
                $string = str_replace(
                        array(utf8_decode('Ãº'), utf8_decode('Ã¹'), utf8_decode('Ã¼'), utf8_decode('Ã»'), utf8_decode('Ãš'), utf8_decode('Ã™'), utf8_decode('Ã›'), utf8_decode('Ãœ')),
                        array('u', 'u', 'u', 'u', 'U', 'U', 'U', 'U'),
                        $string
                        );
                $string = str_replace(
                        array('Ã±', 'Ã‘', 'Ã§', 'Ã‡','<','>'),
                        array('n', 'N', 'c', 'C','',''),
                        $string
                        );
                $string = str_replace(
                        array(utf8_decode('Ã±'), utf8_decode('Ã‘'), utf8_decode('Ã§'), utf8_decode('Ã‡'), utf8_decode('Â°')),
                        array('n', 'N', 'c', 'C',''),
                        $string
                        );
                $string = str_replace(
                        array(utf8_decode('?'), utf8_decode('Â¿'), utf8_decode('Âº')),
                        array('', '', ''),
                        $string
                        );
                $string = str_replace(
                        array("\\", "Â¨", "Âº", "~","Âº",
                                "#", "@", "|", "!", "\"",
                                "Â·", "$", "%", "&", "/",
                                "(", ")", "?","Â¿", "'", "Â¡",
                                "Â¿", "[", "^", "`", "]",
                                "+", "}", "{", "Â¨", "Â´",
                                ">", "< ", ";", ",", ":",
                                "."),
                        '',
                        $string
                        );
                $string = str_replace(" ","-",$string);
                return $string;
        }
        
        public function cifrarHTML($html){
                $buffer=$html;          
                $search = array('/\>[^\S ]+/s','/[^\S ]+\</s','/(\s)+/s');
                $replace = array('>','<','\\1');
                $pre = preg_replace($search, $replace, $buffer);
                return base64_encode($pre);
        }
        /**
         *  Method encargado de gestionar con la api restfull
         *  @dataBasic Encargada de tener la configuracion donde se encuentra el api rest + usuario y clave
         *  @data Encargada de contener un arreglo de los datos que seran enviado al api rest
         */
        public function clientRestBase($dataBasic, $data){
                /*  @$dataBasic
                    [apRest] => http://192.168.0.103:8084/rumberos/register
                    [tocken] => 123456
                    [secret] => 123456
                    [method] => POST
                */

                    $dataJson = '';
                    // Validar si el ApiRest esta activo
                    $connec = self::validateRowsForm('URLACT',$dataBasic['apRest']);
                    if(!$connec){
                        $dataJson['error'] = 1;
                        $dataJson['message'] = 'Error, Unable to Connect establer ApiRest the Clixcreen.';
                        return json_encode($dataJson); 
                    }
                    $handle = curl_init();



                    curl_setopt($handle, CURLOPT_URL, $dataBasic['apRest']);
                    curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
                    curl_setopt($handle, CURLOPT_USERPWD, $dataBasic['tocken'].":".$dataBasic['secret']);
                    curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, false);
                    curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false);

                    switch($dataBasic['method'])
                    {

                        case 'GET':
                        break;

                        case 'POST':
                        curl_setopt($handle, CURLOPT_POST, true);
                        curl_setopt($handle, CURLOPT_POSTFIELDS, http_build_query($data));
                        break;

                        case 'PUT':
                        curl_setopt($handle, CURLOPT_CUSTOMREQUEST, 'PUT');
                        curl_setopt($handle, CURLOPT_POSTFIELDS, http_build_query($data));
                        break;

                        case 'DELETE':
                        curl_setopt($handle, CURLOPT_CUSTOMREQUEST, 'DELETE');
                        break;
                    }

                    $response = curl_exec($handle);
                    curl_close($handle);

                    return $response;
                }

                public function validateRowsForm($type, $data){
                        switch($type)
                        {
                        case 'REQ': // Dato requ
                        $retorno=($data == '')? FALSE: TRUE;
                        break;

                        case 'NUM': // Solo númericos
                        $retorno=(filter_var($data, FILTER_VALIDATE_INT) === FALSE)? FALSE: TRUE;
                        break;

                        case 'LET': // Solo letras
                        $retorno=(filter_var($data, FILTER_VALIDATE_INT) === FALSE)? FALSE: TRUE;

                        break;

                        case 'STR': // Solo String alfanumerico
                        $retorno=(filter_var($data, FILTER_SANITIZE_STRING) === FALSE)? FALSE: TRUE;

                        break;

                        case 'EMA': // Solo correos electrinico
                        $retorno=(filter_var($data, FILTER_VALIDATE_EMAIL) === FALSE)? FALSE: TRUE;
                        break;

                        case 'URL': // Solo direcciones de internet
                        $retorno=(filter_var($data, FILTER_VALIDATE_URL,FILTER_FLAG_QUERY_REQUIRED) === FALSE)? FALSE: TRUE;
                        break;

                        case 'BOO': // Identificar si el registro es booleano
                        $retorno=(filter_var($data, FILTER_VALIDATE_BOOLEAN) === FALSE)? FALSE: TRUE;
                        break;
                        case 'URLACT':
                        $retorno=(@get_headers($data))? TRUE : FALSE;
                        break;
                    }
                    return $retorno;
                }

                public function file_get_contents_curl($url) 
                {
                        $ch = curl_init();
                        curl_setopt($ch, CURLOPT_HEADER, 0);
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                        curl_setopt($ch, CURLOPT_URL, $url);
                        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

                        $data = curl_exec($ch);
                        curl_close($ch);

                        return $data;

                }

                public function get_meta_tags_curl($url){
                        $html = self::file_get_contents_curl($url);

                        //parsing begins here:
                        $doc = new DOMDocument();
                        @$doc->loadHTML($html);
                        $nodes = $doc->getElementsByTagName('title');

                        //get and display what you need:
                        $data["title"] = $nodes->item(0)->nodeValue;

                        $metas = $doc->getElementsByTagName('meta');
                        for ($i = 0; $i < $metas->length; $i++)
                        {
                                $meta = $metas->item($i);
                                if($meta->getAttribute('name') == 'description')
                                        $data["meta"]["description"] = $meta->getAttribute('content');
                                if($meta->getAttribute('name') == 'keywords')
                                        $data["meta"]["keywords"] = $meta->getAttribute('content');
                        }
                        return $data;

                }

                public function urlfacebook(){
                        $state = md5(uniqid(rand(), TRUE));  
                        $_SESSION['state'] = $state;
                        $redirect_uri  = "http://clixcreen.com/develop/web/index.php/facebook_authentication" ;
                        $url = 'https://www.facebook.com/dialog/oauth?client_id=363266147147853&redirect_uri=' .    $redirect_uri  . '&state='.  $state . '&scope=email';
                        return $url;
                }

                public function mailNotification($correos, $html, $other) {

                }
    /**
         * Permite mejorar los enlaces nativos de php a url amigables
         *      (String) $url ejemplo: http://ruta/index.php?id=prueba de sistema
     */
    public function urls_friend($url) {
        $url = strtolower($url);
        $find = array('Á', 'É', 'Í', 'Ó', 'Ú', 'Ñ');
        $repl = array('A', 'E', 'I', 'O', 'U', 'N');
        $url = str_replace ($find, $repl, $url);
        $find = array('á', 'é', 'í', 'ó', 'ú', 'ñ');
        $repl = array('a', 'e', 'i', 'o', 'u', 'n');
        $url = str_replace ($find, $repl, $url);
        $find = array(' ', '&', '\r\n', '\n', '+');
        $url = str_replace ($find, '-', $url);
        $find = array('/[^a-z0-9\-<>]/', '/[\-]+/', '/<[^>]*>/');
        $repl = array('', '-', '');
        $url = preg_replace ($find, $repl, $url);
        return $url;
    }

    public function printAll($data){
        echo "<pre>";print_r($data); die();
    }

    public function getDateAll(){
        $this->setDateAll=date('Y-m-d H:i:s');
        return $this->setDateAll;
    }

                // Cambiar el _id del mongo a un string return.
    public function initSendDataTwig(){
        $this->cache = new SetVarAll();

        $dataSendTwig['namSite'] =  $this->cache->getCache('namSite');
        $dataSendTwig['home'] =  $this->cache->getCache('urlComp');
        $dataSendTwig['url_web'] = $this->cache->getCache('urlWebs');
        $dataSendTwig['csss'] = explode(',',$this->cache->getCache('css'));
        $dataSendTwig['jsss'] = explode(',',$this->cache->getCache('js'));
        $dataSendTwig['srcImg'] = $this->cache->getCache('srcImg');
        $dataSendTwig['srcCss'] = $this->cache->getCache('srcCss');
        $dataSendTwig['srcJs'] = $this->cache->getCache('srcJs');
        $dataSendTwig['logo'] = $this->cache->getCache('imgLogo');
        $dataSendTwig['favicon'] = $this->cache->getCache('favicon');
        $dataSendTwig['selectCero'] = $this->cache->getCache('selectCero');
        $dataSendTwig['dfiscal'] = $this->cache->getCache('dfiscal');

                        // Permite extraer las sessiones y poder usarla en la vista con twig
        if(!empty($_SESSION)){
                foreach ($_SESSION as $key => $value) {
                        $dataSendTwig[$key] =$value;
                }
        }
        return $dataSendTwig;
    }

                // Comprimir codigos html resutl a vista
    public function compressResponce($html)
    {
        $search = array('/\>[^\S ]+/s','/[^\S ]+\</s','/(\s)+/s','[\n|\r|\n\r|\t|\0|\x0B]');
        $replace = array('>','<','\\1');
        return preg_replace($search, $replace, trim(trim($html)));
    }

        /**
        * Convierte a cifrado potenciado MD5 -> Base64 -> sha1 ->
        * @param  $cadena string Cadena que se quiere cifrar
        * @author Oscar Peña  <my.name@example.com>
        * @return cifrado de datos
        */###############CONVIERTE A SHA1 LA CADENA PASADA########################
        public static function sha($cadena){
                $tmp0 = base64_encode($cadena);
                $tmp1 = md5($tmp0);
                $scrp = sha1($tmp1);
                return $scrp;
        }
        /**
         * Permite generar token de cualquier registro
         * @param string $slug Slugan del registro al cual deseas generar el token puede ser null
         * @param integer $minutos Minutos que estara activo el token por defecto es 4 minuto
         * @return string $token 
         */
        public static function generaToken($slug = 0, $minutos = 4){
                $param0 = ($slug==0)?$slug:0;
                $param1 = $minutos;
                $param2 = date('YmdHis').'|'.$param1.'|'.$param0;
                $token = base64_encode(base64_encode(base64_encode($param2)));
                return token;

        }
    /**
        *       Genera una contraseña automatica
        * @return Clave cifrada
        */
        ###################GENERA CONTRASEÑAS SEGURAS############################
        public static function generaPass(){
                $pass = base_convert(rand(0x1D39D3E06400000, 0x41C21CB8E0FFFFFF), 10, 36); 
                return $pass;
        }

        public function obtenerSessionId(){
                if(!empty($_SESSION['usuario'])){
                        $usuario = $_SESSION['usuario']->id;      
                }else{
                        $usuario = 0;
        }
        return $usuario;
        }

        public function validarPermisos($credencial,$dir1,$dir2){
                if($_SESSION['usuario']->credencial==$credencial){
                        $return = TRUE;
                }else{
                        $twig = self::communIniTemplate($dir1,$dir2);
                        $dataSendTwig = self::initSendDataTwig();
                        echo $twig->render('comun/permisoDenegado.twig', $dataSendTwig); die();
                }

        }
    /**
    * Method que permite devolver tados arreglados de un metadados ingredados
    * @param datosString metadatos ejemplo: 1|Papa|Verde,2|Mama|Blanco
    * @version 4.0
    * @return Array datos ordenados en arreglo
    */
    public function extraerDatos($datosString){
        //echo "<pre>";print_r($datosString); die();
        $tmp = explode(',',$datosString);
        foreach ($tmp as $key => $value) {
                $tmp2 = explode('|',$value);
                if($tmp2[0]!='Sin Registro'){
                        $tmp3[$key] = array('id'=>$tmp2[0],'tipo_contacto'=>$tmp2[1],'descripcion'=>$tmp2[2]);
                }else{
                        $tmp3[$key]='';
                }
        }
        return $tmp3;   
    }

    public function redirect($url, $num=301){
        static $http = array (
                100 => "HTTP/1.1 100 Continue",
                101 => "HTTP/1.1 101 Switching Protocols",
                200 => "HTTP/1.1 200 OK",
                201 => "HTTP/1.1 201 Created",
                202 => "HTTP/1.1 202 Accepted",
                203 => "HTTP/1.1 203 Non-Authoritative Information",
                204 => "HTTP/1.1 204 No Content",
                205 => "HTTP/1.1 205 Reset Content",
                206 => "HTTP/1.1 206 Partial Content",
                300 => "HTTP/1.1 300 Multiple Choices",
                301 => "HTTP/1.1 301 Moved Permanently",
                302 => "HTTP/1.1 302 Found",
                303 => "HTTP/1.1 303 See Other",
                304 => "HTTP/1.1 304 Not Modified",
                305 => "HTTP/1.1 305 Use Proxy",
                307 => "HTTP/1.1 307 Temporary Redirect",
                400 => "HTTP/1.1 400 Bad Request",
                401 => "HTTP/1.1 401 Unauthorized",
                402 => "HTTP/1.1 402 Payment Required",
                403 => "HTTP/1.1 403 Forbidden",
                404 => "HTTP/1.1 404 Not Found",
                405 => "HTTP/1.1 405 Method Not Allowed",
                406 => "HTTP/1.1 406 Not Acceptable",
                407 => "HTTP/1.1 407 Proxy Authentication Required",
                408 => "HTTP/1.1 408 Request Time-out",
                409 => "HTTP/1.1 409 Conflict",
                410 => "HTTP/1.1 410 Gone",
                411 => "HTTP/1.1 411 Length Required",
                412 => "HTTP/1.1 412 Precondition Failed",
                413 => "HTTP/1.1 413 Request Entity Too Large",
                414 => "HTTP/1.1 414 Request-URI Too Large",
                415 => "HTTP/1.1 415 Unsupported Media Type",
                416 => "HTTP/1.1 416 Requested range not satisfiable",
                417 => "HTTP/1.1 417 Expectation Failed",
                500 => "HTTP/1.1 500 Internal Server Error",
                501 => "HTTP/1.1 501 Not Implemented",
                502 => "HTTP/1.1 502 Bad Gateway",
                503 => "HTTP/1.1 503 Service Unavailable",
                504 => "HTTP/1.1 504 Gateway Time-out"
                );
                header($http[$num]);
                header ("Location: $url");
        }

        public function headerJson(){
                header('Content-Type: application/json');
        }

        /**
        * Accion encargada de mostrar los botones de actualizar y eliminar del datatable
        * @param $entidad string entidad a la cual se desea hacer busqueda
        * @param $slug string segundo clave para hacer busquedas
        * @return cadena string cadena sql para efectuar botones de actualizar y eliminar
        */
        public function actions($entidad, $slug='a.slug' , $boton='T'){
                if($boton=='T'){ // Todos
                        $botones =', concat(\'<div class="text-center"><a title="Actualizar registro." data-entidad="'.$entidad.'" data-slug="\','.$slug.',\'" class="update2 cursor"> <i class="fa fa-eye fa-lg"></i>A </a> <a title="Eliminar Registro" data-entidad="'.$entidad.'" data-slug="\','.$slug.',\'" class="drop2 cursor" > <i class="fa fa-trash-o fa-lg"></i> E</a></div>\') AS actions';
                }elseif($boton=='E'){ // Eliminar
                        $botones =', concat(\'<div class="text-center"><a title="Eliminar Registro" data-entidad="'.$entidad.'" data-slug="\','.$slug.',\'" class="drop2 cursor" > <i class="fa fa-trash-o fa-lg"></i> E</a></div>\') AS actions';
                }
                return $botones;
        }


        /**
     * Methos encargado de extraer los datos de la session del usuario activa con el fin de
     * usarlo como datos de entrada de las vista para filtrar solo los asociados 
     * @param $return array de la consulta de la entidad del usuario
     * @return $datos array datos necesario para la consulta 
     *
     */
    public function extraerDatosPermisosParaSql($return){
        $temp=$return[0];
        $datos['credencial']=$temp->credencial;

        if($temp->credencial!='certSuperAdministrador'){
            $datos['admin_usuario_id']=$temp->id;
        }
        return $datos;
    }
    /**
         * Eliminar la ultima coma de un string
         * @param $text string, String con datos asociados ejemplo: papa,mama,hijo,
     * @return devuelve un string eliminado el ultimo caracter
     */
    public function deleteEndComa($text){
        $result = substr($text, 0, -1);
        return $result;
    }

}

?>