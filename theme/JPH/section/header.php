<header>
            <div class="top-menu">
                <div id="principal" class="navigation">
                    <ul class="menu horizontal black" id="menuNavegacion">
                        <?php //include_once('tpl/menu.tpl'); ?>
                    </ul>
                </div>
                <nav id="usuario" class="ink-navigation push-right">
                    <ul class="menu horizontal black">
                        <li id="iconFiltro"><a href="#"><i class="fa fa-filter ink-tooltip"  data-tip-forever="true" data-tip-where="left" data-tip-text="Filtro" data-tip-color="orange"></i></a></li>
                        <!--<li><a href="#"><i class="flaticon-pie-chart"></i></a></li>
                        <li><a href="#"><i class="flaticon-warning"></i></a></li>
                        <li><a href="#"><i class="flaticon-envelope"></i></a></li>-->

                        <li>
                            <a href="#"><i class="flaticon-people"><div id="usuarioLogeado" class="usuarioLogeado push-left"><?php //echo $usuarioLogeado ?></div></i></a>
                            <ul id="config_user" class="submenu usuario flyout links">
                                
                            </ul>
                        </li>
                        <li id="acciones" class="acciones"><a href="#"><i class="fa fa-cogs"></i></a></li>
                        <li class="salir"><a href="logout.php"><i class="flaticon-power-button"></i></a></li>
                    </ul>
                </nav>
            </div>
            <nav class="ink-navigation column-group titulonavegacion">
                <div class="all-70">
                    <ul class="breadcrumbs grey" id="paginaActual">
                        <li><a href="#"></a></li>

                    </ul>
                </div>
                <div class="all-30 align-right">
                    <div class="iconomodulo"></div><h5>GENERADOR</h5>
                </div>
            </nav>
        </header>