<?php
namespace JPH\Commun;
/**
 * Commun permite terner un conjunto de funcionalidades muy utiles para el sistema 
 * que pueden ser usada en cualquier momento
 * @author: Gregorio Jose Bolivar Bolivar <elalconxvii@gmail.com>
 * @Creation Date: 09/01/2014
 * @Audited by: Gregorio J Bolívar B
 * @Modified Date: 09/04/2016
 * @package: CommunController.php
 * @version: 3.3
 */

class Commun
{   
    public $resp;

    /**
     * Permite procesar un nombre de la clase basado en el namespace que se encuentra
     * ejemplo:JPH\Complement\Console\App, busca solo el nombre de la clase
     * @return string $name, devuelve el nombre de la clase activa.
     */
    static function onlyClassActive($classNamespace)
    {
        $obj = explode('\\', $classNamespace);
        $name = end($obj);
        return $name;
    }

    /**
     * Permite crear un directorios
     * @param string $ruta, ruta donde procesara la creacion del directorio 
     * @return boolean
     */
    static function mkddir($ruta)
    {
        if (!file_exists($ruta)) 
        {
            mkdir($ruta, 0777, true);
            $resp = true;
        }else{
            $resp = false;
        }
        return $resp;
    }

    /**
     * Permite imprimir objetos, arreglos, y valores enviados mostrado ordenadamente y parando el proceso
     * @param array $dataArray, parametro de entrada para ser impreso 
     * @return imprimir valores
     */
    static function pp($dataArray)
    {
        echo "<pre>"; print_r($dataArray); die();
    }

    /**
     * Permite poner en modo desarrollador al sistema
     * @return configuracion del sistema activar errores
     */
    static function modDevelopment()
    {
        error_reporting(E_ALL); 
        ini_set("display_errors", 1); 
    }

    /**
     * Permite cambiar tu texto de entrada en formato came case
     * @param string $texto, lo que deseas cambiar de formato
     * @return string $came, texto formateado
     */
    static function cameCase($texto)
    {
        $tmp = explode(' ',$texto);
        $res = '';
        if(count($tmp)==0)
        {
            $res = ucfirst($texto);
        }
        else
        {
             foreach ($tmp as $key => $value) 
             {
                if($key==0)
                {
                    $res.=strtolower(self::sanear_string($value));
                }
                else
                {
                    $res.=ucfirst(self::sanear_string($value));
                }
            }
        }
        return $res;
    }

    /**
     * Permite cambiar tu texto de extrada en formato upper case
     * @param string $texto, lo que deseas cambiar de formato
     * @return string $valor;
     */
    static function upperCase($texto)
    {
        $tmp = explode(' ',$texto);
        $res = '';
        if(count($tmp)==0)
        {
            $res = ucfirst($texto);
        }
         else
        {
             foreach ($tmp as $key => $value) {
                 $res.=ucfirst(self::sanear_string($value));
             }
        }
        return $res;
    }

   /**
    * 
    */
   static function headerJson()
   {
    header('Content-Type: application/json');
}

   /**
    * 
    */
   static function compressResponse($html)
    {
        $search = array('/\>[^\S ]+/s','/[^\S ]+\</s','/(\s)+/s','[\n|\r|\n\r|\t|\0|\x0B]');
        $replace = array('>','<','\\1');
        return preg_replace($search, $replace, trim(trim($html)));
    }

   /**
    * 
    */
   static function sanear_string($string)
   {
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

    /**
     * Unifica los eqiquetas con el valor pasado en el arreglo
     * @param string $string, Cadena de texto que vamos a parcear
     * @param array $options, Valores del arreglo a cambiar
     * @return string $result, cadena de texto con los datos reales 
     */
    static function  mergeTaps($string,$option)
    {
       
        $tmp = array(); 
        // Creamos las reglas en lote
        foreach ($option as $key => $b)
        { 
            $tmp[]='/{'.$key.'}/'; 
        } 
        $result = preg_replace($tmp, $option, $string); 

        return  $result;
    } 
}

?>