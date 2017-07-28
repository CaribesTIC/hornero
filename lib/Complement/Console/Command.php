<?php
namespace JPH\Complement\Console;
use JPH\Complement\Console\Integrate;
class Command extends Integrate
{
	public $term;
	public function run()
	{	
        	$this->term = $_SERVER['argv'];
        	$obj = new Integrate();
            	$obj->arguments($this->term);
	}
}