<?php
namespace APP\Admin\Model;
use JPH\Complements\Database\Main;
use JPH\Core\Commun\All;
/**
 * Generador de codigo del Modelo de la App Admin
 * @propiedad: Hornero 1.0
 * @utor: Gregorio Bolivar <elalconxvii@gmail.com>
 * @created: 27/09/2017
 * @version: 1.0
 */ 
class SegUsuariosPerfilModel extends Main
{
   public function __construct()
   {
       $this->tabla = 'seg_usuarios_perfil';
       $this->campoid = array('seg_perfil_id','seg_usuarios_id');
       $this->campos = array();
       parent::__construct();
   }

    /**
     * Permitir hacer registro de las relaciones de seg_usuarios con el seg_perfil en la entidad seg_usuarios_perfil
     * @param $roles roles asociados al perfil
     * @param $usuarioId usuarioId que esta relacionado
     * @return array $tablas
     */
    public function getSegPerfilRelacionUserCreate($roles,$usuarioId)
    {
        $items=explode(',',$roles);
        foreach ($items AS $key=>$value){
            $sql = "INSERT INTO ".$this->tabla." (seg_perfil_id,seg_usuarios_id) VALUES($value,$usuarioId)";
            $this->execute($sql);
        }
        return true;
    }


    /**
     * Permitir hacer registro de las relaciones de seg_usuarios con el seg_perfil en la entidad seg_usuarios_perfil
     * @param $roles roles asociados al perfil
     * @param $usuarioId usuarioId que esta relacionado
     * @return array $tablas
     */
    public function setSegPerfilRelacionUserUpdate($roles,$usuarioId)
    {
        self::remSegPerfilRelacionUserDelete($usuarioId);
        $items=explode(',',$roles);
        foreach ($items AS $key=>$value){
            $sql = "INSERT INTO ".$this->tabla." (seg_perfil_id,seg_usuarios_id) VALUES($value,$usuarioId)";
            $this->execute($sql);
        }
        return true;
    }

    /**
     * Eliminar registros de SegUsuarios
     * @param: string $id
     * @return array $tablas
     */
    public function remSegPerfilRelacionUserDelete($valor)
    {
        $sql = "DELETE FROM ".$this->tabla." WHERE seg_usuarios_id=".$valor;
        $this->execute($sql);
        return true;
    }
}
?>
