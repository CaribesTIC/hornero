<?php
namespace APP\Admin\Controller;

use JPH\Core\Commun\Security;
use APP\Admin\Model AS Model;

/**
 * Generador de codigo de Controller de Hornero 1.0
 * @propiedad: Hornero 1.0
 * @utor: Gregorio Bolivar <elalconxvii@gmail.com>
 * @created: 28/08/2017
 * @version: 1.0
 */ 
class LoginController extends Controller
{
    public $model;
    use Security;
    
    public function __construct()
    {
        parent::__construct();
        $this->model = new Model\LoginModel();
    }

    public function runIndex($request)
   {
       $this->tpl->addIni();
       $this->tpl->add('msjError',$this->cache->get('msjError'));
       $this->tpl->renders('view::home/login');
   }

   public function runLogout()
   {
       $this->delSessionAll();
   }

    public function runLockscreen()
    {
        $this->setSession('lockscreen','SI');
        $this->tpl->addIni();
        $this->tpl->add('usuario', $this->getSession('usuario'));
        $this->tpl->renders('view::home/lockscreen');
    }

    public function runIndexPost($request)
    {
        if(isset($request->login))
        {
            $this->model->usuario = $request->login;
            $this->model->password = $request->contra;
            if ($this->model->validarUsuario() == true)
            {
                $tmp = $this->model->obtenerUser();
                $this->setSession('usuario',$tmp);
                $this->setSession('path',getcwd());
                $this->setSession('autenticado','SI');
                self::runLoadRoles();
                $this->delSession('lockscreen');
                $this->redirect($this->cache->get('urlWebs'));
            }else{
                $this->cache->set('msjError',$this->model->msjError);
                $this->redirect($this->cache->get('urlAute'));
            }
        }else{
            $this->redirect($this->cache->get('urlAute'));
        }

    }

    public function runLoadRoles(){
        $this->setSession('roles', $this->model->roles);
    }

}
?>