<!DOCTYPE html>
<html lang="es-ES">
    <head>
        <title>JRH+ <?=$this->section('title')?></title>

        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="">
        <meta name="author" content="ink, cookbook, recipes">
        <meta name="HandheldFriendly" content="True">
        <meta name="MobileOptimized" content="320">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

        <!-- Place favicon.ico and apple-touch-icon(s) here  -->
        <link rel="shortcut icon" href="/jph/img/favicon.ico" />
        <link rel="apple-touch-icon" href="/jph/img/touch-icon-iphone.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/jph/img/touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/jph/img/touch-icon-iphone-retina.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/jph/img/touch-icon-ipad-retina.png" />
        <link rel="apple-touch-startup-image" href="/jph/img/splash.320x460.png" media="screen and (min-device-width: 200px) and (max-device-width: 320px) and (orientation:portrait)" />
        <link rel="apple-touch-startup-image" href="/jph/img/splash.768x1004.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)" />
        <link rel="apple-touch-startup-image" href="/jph/img/splash.1024x748.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)" />

        <!-- CSS -->
	<?php $this->insert('section/link') ?>
        
    </head>
    <body>
        <!--
        <?php //print_r($_SESSION); ?>
        -->
        <?php $this->insert('section/header') ?>
        <main id="contenedor" class="jph-scroll">
            <div class="column-group">
                <div id="columnaPrincipal" class="columnaPrincipal all-100 ink-grid">
                    <div class="jph-loading"></div>
                    
                </div>
            </div>
            <div class="all-100 ink-grid">
                <?=$this->section('content')?>
            </div>
            
            <div class="push"></div>
        </main>
        <?php $this->insert('section/footer') ?>
        <?php $this->insert('section/extraDiv') ?>
        
    </body>
    <!-- javascript files -->
    <?php $this->insert('section/script') ?>
    <!-- javascript extra -->
    <?=$this->section('addJs')?>
</html>