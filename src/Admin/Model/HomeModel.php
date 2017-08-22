<?php
namespace APP\Admin\Model;
use JPH\Complements\Database\Main;
use JPH\Commun\Commun;
/**
 * @propiedad: PROPIETARIO DEL CODIGO
 * @author Gregorio José Bolívar <elalconxvii@gmail.com>
 * @Fecha de Creacion: 20/02/2017
 * @Auditado por: Gregorio J Bolívar B
 * @Descripción: Generado por el generador de codigo del core.php de webStores
 * @package: RolesTable.class.php
 * @version: 3.0
 */
class HomeModel extends Main
{
        public $hcon;
        public $valor;
        public function __construct()
        {
            /*$this->tabla = 'campos';
            $this->campoid = array('sf_id');
            $this->campos = array('sf_table', 'sf_field', 'sf_type', 'sf_related', 'sf_label');*/
            $this->hcon = array('ho_campos','ho_relacion','ho_entidad','ho_campos_type');
            $this->valor;
            parent::__construct();
        }

        public function extraerLasEntidades()
        {
            // Permite extraer las entidades de la conexion actual desde la informacion schema
            $sql = "SELECT name as entidad from ho_entidad WHERE name NOT IN( SELECT TABLE_NAME from INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME IN('ho_campos','ho_relacion','ho_entidad', 'ho_campos_type'))";
            $tablas=$this->executeQuery($sql);
            return $tablas;
        }

        /**
         * Permite extraer todas la informacion para las entidades que son requerida para la vista de pre configuracion
         * @return array $tmp, informacion de los diferentes datos, disponible, faltante y registrado
         */
        public function extraerTodasLasEntidades()
        {
            // Verificar las entidades de config
            //$this->constructTablesConfigs(); die();
            // Permite extraer las entidades de la conexion actual desde la informacion schema
            $tablas = $this->informationschema();
            // Definir un arreglo
            $data = array();
            $item = array();
            // Recorrer las entidades de la conexion para crear un arreglo de una una dimension
            foreach($tablas AS $key => $value)
            {
                array_push($data,$value->TABLE_NAME);
            }
            // Permite extraer las entidades registradas en del sistema que no sea la del sistema
            $sql = "SELECT name as entidad from ho_entidad WHERE name NOT IN( SELECT TABLE_NAME from INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME IN('ho_campos','ho_relacion','ho_entidad', 'ho_campos_type'))";
            $valor=$this->executeQuery($sql);
            // Verificar que exista el arreglo
            if(isset($valor)) {
                foreach ($valor as $value) {
                        $item[] = $value->entidad;
                }
            }
            // Verificar las diferencia de los arreglos y me permite quedarme con las entidades disponibles
            $tmp['disponibles']=array_diff($data,$this->hcon);

            // Permite extraer las entidades que faltan de la configuracion
            $tmp['falta']=array_diff($this->hcon,$data);

            // Recorrer los datos restante para comparar si existe
            foreach($tmp['disponibles'] AS $key => $value)
            {
                $data=in_array($value,$item);
                if($data)
                {
                    $tmp['existente'][]=$value;
                }else{
                    $tmp['existente']=array();
                }
            }
            $a = $tmp['existente'];
            $b = $tmp['disponibles'];
            // Extaer los registros de los datos que no sea el que esta registrado en la como entidad
            $tmp['disponibles']=array_diff($b,$a);
            return $tmp;
        }

        public function extraerDescribe($table)
        {
           //$sql = ' select * from ho_entidad WHERE name NOT IN( SELECT TABLE_NAME from INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME IN(\'ho_campos\',\'ho_relacion\',\'ho_entidad\', \'ho_campos_type\'))'
            //$t=$this->excecuteQuery('select * from sf_config');
            //$t=$this->executeQuery('select * from campos');

            $t = $this->showColumns($table);//('entidad');
            return $t;
        }
        public function eliminarEntidadesConfig($entidad)
        {
            $sql = "DELETE FROM ho_entidad WHERE name='".trim($entidad)."'";
            $this->execute($sql);
            return true;
        }

        public function registrarEntidadesConfig($entidad)
        {
            $sql = "INSERT INTO ho_entidad (crud,name) VALUES('true' ,'".trim($entidad)."')";
            $this->execute($sql);
            return true;
        }
}
?>