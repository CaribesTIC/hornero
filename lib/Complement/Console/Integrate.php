<?php
namespace JPH\Complement\Console;
use JPH\Complement\Console\App;

/**
 * Permite integrar un conjunto de funcionalidades del console de sistema 
 * @Author: Gregorio Bolívar <elalconxvii@gmail.com>
 * @Author: Blog: <http://gbbolivar.wordpress.com>
 * @Creation Date: 02/08/2017
 * @version: 0.1
 */

Class Integrate
{

        /**
         * Argumentos integrador del console de sistema
         * @param string $argv, argumentos del terminal 
         */
        protected function arguments($argv) 
        {       
                $v = count($argv);
                print_r($argv);
                // Optiones del menu con todos los valores
                $inpre = new Interprete();
                if($v==1 AND $argv[0]=='hornero'){
                    $vist = $inpre->getConfigJson($argv[0],'all');
                    $inpre->setValor(base64_encode($vist));
                }elseif ($v==3 AND $argv[1]=='app' AND !empty($argv[2])) {
                    $app = new App();
                    //$app->createStructura($argv[2]);
                    $vist = $app->createStructura($argv[2]);
                    $inpre->setValor(base64_encode($vist));
                }elseif ($v==4 AND $argv[1]=='app' AND !empty($argv[2]) AND $argv[3]=='public'){
                    $link = new Symbolico();
                    $link->filesWebPublic($argv[2]);
                    die('kkkkk');
                }else{
                    $a = $inpre->getLogoAscii();
                    $inpre->setValor(base64_encode($a));
                }
                $inpre->showOptions();
        }
}