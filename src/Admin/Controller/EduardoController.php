<?php
namespace APP\Admin\Controller;
use JPH\Core\Commun\Security;
use APP\Admin\Model AS Model;

/**
 * Generador de codigo de Controller de Hornero 1.0
 * @propiedad: Hornero 1.0
 * @utor: Gregorio Bolivar <elalconxvii@gmail.com>
 * @created: 17/10/2017
 * @version: 2.0
 */ 

class EduardoController extends Controller
{
   use Security;
   public $model;
   public $session;

   // Variables de Seguridad asociado a los roles
   private $apps;
   private $entidad;
   private $vista;
   private $permisos;
   public $comps;

   public function __construct()
   {
       parent::__construct();
       $this->session = $this->authenticated();
       $this->hoEduardoModel = new Model\EduardoModel();
       $this->valSegPerfils = new Model\SegUsuariosPerfilModel();
       $this->apps = $this->pathApps(__DIR__);
       $this->entidad = $this->hoEduardoModel->tabla;
       $this->vista = $this->pathVista();
       $this->comps = $this->apps .' - '. $this->entidad .' - '. $this->vista;
   }

    /**
    * Listar registros de Eduardo
    * @param: GET $resquest
    */ 
   public function runEduardoIndex($request)
   {
     $this->permisos = 'CONSULTA|CONTROL TOTAL';
     $this->validatePermisos($this->valSegPerfils->valSegPerfilRelacionUser($this->comps,$this->permisos));
     $this->tpl->addIni();
     $listado = $this->hoEduardoModel->getEduardoListar($request);
     $this->tpl->add('usuario', $this->getSession('usuario'));
     $this->tpl->renders('view::vistas/eduardo/'.$this->pathVista().'/index');
   }

    /**
    * Listar registros de Eduardo
    * @param: POST $resquest
    * @return: JSON $result
    */ 
   public function runEduardoListar($request)
   {
      $this->permisos = 'CONSULTA|CONTROL TOTAL';
      $this->validatePermisos($this->valSegPerfils->valSegPerfilRelacionUser($this->comps,$this->permisos),true);
      $result = $this->hoEduardoModel->getEduardoListar($request);
      $this->json($result);
   }

    /**
    * Crear registros de Eduardo
    * @param: POST $resquest
    * @return: JSON $result
    */ 
   public function runEduardoCreate($request)
   {
      $this->permisos = 'ALTA|CONTROL TOTAL';
      $this->validatePermisos($this->valSegPerfils->valSegPerfilRelacionUser($this->comps,$this->permisos),true);
      $result = $this->hoEduardoModel->setEduardoCreate($request);
      if(is_null($result)){
        $dataJson['error']='1';
        $dataJson['msj']='Error en procesar el registro';
      }else{;
        $dataJson['error']='0';
        $dataJson['msj'] = 'Registro efectuado exitosamente';
      }
      $this->json($dataJson);
   }

    /**
    * Ver registros de Eduardo
    * @param: POST $resquest
    * @return: JSON $result
    */ 
   public function runEduardoShow($request)
   {
      $this->permisos = 'CONSULTA|CONTROL TOTAL';
      $this->validatePermisos($this->valSegPerfils->valSegPerfilRelacionUser($this->comps,$this->permisos),true);
      $result = $this->hoEduardoModel->getEduardoShow($request);
      $this->json($result);
   }

    /**
    * Eliminar registros de Eduardo
    * @param: POST $resquest
    * @return: JSON $result
    */ 
   public function runEduardoDelete($request)
   {
      $this->permisos = 'BAJA|CONTROL TOTAL';
      $this->validatePermisos($this->valSegPerfils->valSegPerfilRelacionUser($this->comps,$this->permisos),true);
      $result = $this->hoEduardoModel->remEduardoDelete($request);
      if(is_null($result)){
        $dataJson['error']='0';
        $dataJson['msj']='Registro eliminado exitosamente';
      }else{
        $dataJson['error']='1';
        $dataJson['msj'] = 'Error en procesar la actualizacion';
      }
      $this->json($dataJson);
   }

    /**
    * Actualizar registros de Eduardo
    * @param: POST $resquest
    * @return: JSON $result
    */ 
   public function runEduardoUpdate($request)
   {
      $this->permisos = 'MODIFICACION|CONTROL TOTAL';
      $this->validatePermisos($this->valSegPerfils->valSegPerfilRelacionUser($this->comps,$this->permisos),true);
      $result = $this->hoEduardoModel->setEduardoUpdate($request);
      if(is_null($result)){
        $dataJson['error']='0';
        $dataJson['msj']='Actualizacion efectuado exitosamente';
      }else{
        $dataJson['error']='1';
        $dataJson['msj'] = 'Error en procesar la actualizacion';
      }
        $this->json($dataJson);
   }
}
?>
