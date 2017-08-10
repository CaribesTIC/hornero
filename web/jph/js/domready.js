    var usuario = {};
    var fnProcesosActivos;
    var fnProcesosNuevos;

    window.addEvent('domready', function () {

        $$('#menuNavegacion .menumodulos li a').each(function (a) {
            $(a).addEvent('click', function (e) {
                $this = this;

                e.stop();

                if (!this.hasClass('inactivo')) {
                    new Request.HTML({
                        "url": "menu.php?complemento=" + $(this).getProperty('data-complemento'),
                        evalScripts: false,
                        onSuccess: function (a, b, c, d) {
                            $('menuNavegacion').setProperty('html', c);
                            $('complemento').value = $this.getProperty('text');

                            abrirPagina('dashboard.php', {});
                            
                            eval(d);
                        }
                    }).send();
                }
            });
        });

        $$('#principal ul li a, #usuario .submenu li a').each(function (a) {
            if ($(a).getProperty('href') != '#') {
                $(a).setData('href', $(a).getProperty('href'));

                var ruta;
                var nombre = $(a).getProperty('text').toLowerCase().trim();

                if ($(a).getParent('.submenu') && !$(a).getParent('.submenu').hasClass('usuario')) {
                    if ($(a).getParent('.submenu').getParent('.submenu')) {
                        ruta = $(a).getParent('.submenu').getParent('.submenu').getData('ref') + ' - ' + $(a).getParent('.submenu').getData('ref') + ' - ' + $(a).getProperty('text');
                    } else {
                        ruta = $(a).getParent('.submenu').getProperty('data-ref') + ' - ' + $(a).getProperty('text');
                    }
                } else {
                    ruta = nombre.toUpperCase();
                }

                $(a).setProperty('href', 'index.php?modulo=' + $(a).getProperty('href').replace('.php', '') + '&ruta=' + $('complemento').value + ' - ' + ruta);
            }

            $(a).addEvent('click', function (e) {
                e.stop();
                if (this.getData('href') && this.getData('href') != "#") {
                    var ruta;
                    var nombre = this.getProperty('text').toLowerCase().trim();
                    var pagina = this.getData('href').trim();

                    $('paginaActual').empty();

                    $li = new Element('li', {'html': '<i class="fa fa-home"></i>'});

                    $('paginaActual').adopt($li);

                    if (this.getParent('.submenu') && !this.getParent('.submenu').hasClass('usuario')) {
                        if (this.getParent('.submenu').getParent('.submenu')) {
                            ruta = this.getParent('.submenu').getParent('.submenu').getProperty('data-ref') + ' - ' + this.getParent('.submenu').getProperty('data-ref') + ' - ' + this.getProperty('text');

                            $li = new Element('li', {
                                'text': this.getParent('.submenu').getParent('.submenu').getProperty('data-ref')
                            });

                            $('paginaActual').adopt($li);

                            $li = new Element('li', {
                                'text': this.getParent('.submenu').getProperty('data-ref')
                            });

                            $('paginaActual').adopt($li);

                            $li = new Element('li', {
                                'text': this.getProperty('text')
                            });

                            $('paginaActual').adopt($li);

                        } else {
                            ruta = this.getParent('.submenu').getProperty('data-ref') + ' - ' + this.getProperty('text');

                            $li = new Element('li', {
                                'text': this.getParent('.submenu').getProperty('data-ref')
                            });

                            $('paginaActual').adopt($li);

                            $li = new Element('li', {
                                'text': this.getProperty('text')
                            });

                            $('paginaActual').adopt($li);
                        }

                        $$('.submenu').removeClass('visible');
                        $$('.submenu').setStyle('display', null);

                    } else {
                        ruta = nombre.toUpperCase();

                        $li = new Element('li', {
                            'text': nombre.toUpperCase()
                        });

                        $('paginaActual').adopt($li);
                    }

                    var datos = {};
                    datos.nombre = nombre;

                    $('botonActivo').setProperty('value', nombre);
                    $('botonActivo').setProperty('data-pag', pagina);
                    $('botonActivo').setProperty('data-ruta', ruta);

                    $$('.botonActivo').removeClass('botonActivo');
                    $$('li.activo').removeClass('activo');
                    this.addClass('botonActivo');
                    $(this).getParent().addClass('activo');
                    
                    $('contenedor').removeClass('jph-scroll-no-reload');

                    abrirPagina(pagina, datos);

                }
            });
        });

        $('menuprincipal').getElements('ul').each(function (ul) {
            var li = ul.getParent('li');
            li.addEvent('mousedown', function (e) {
                if (li.getElement('.submenu')) {
                    if (!li.getElement('.submenu').hasClass('visible')) {

                        if (!li.getParent('.submenu')) {
                            $$('.submenu').removeClass('visible');
                            $$('.submenu').setStyle('display', null);
                        }

                        li.getElement('.submenu').addClass('visible');
                        li.getElement('.submenu').setStyle('display', 'block');
                    } else {
                        if (!e.target.getParent('.submenu')) {
                            $$('.submenu').removeClass('visible');
                            $$('.submenu').setStyle('display', null);
                        }
                    }
                } else {
                    $$('.submenu').removeClass('visible');
                    $$('.submenu').setStyle('display', null);
                }
            });
        });

        if ($('btnAceptarAlert')) {
            $('btnAceptarAlert').addEvent('click', function (e) {
                e.stop();
                var mover = new Fx.Tween('divAlert', {
                    transition: 'sine:in:out',
                    link: 'cancel',
                    property: 'top',
                    unit: 'px'
                });

                var h = (window.getSize().y - $('divConfirm').getSize().y) / 2;
                mover.start(h, -500);
                $('divShade').removeClass('visible');
                $('divShade').setStyle('display', 'none');
            });
        }

        if ($('btnAceptarInfo')) {
            $('btnAceptarInfo').addEvent('click', function (e) {
                e.stop();

                var mover = new Fx.Tween('divInfo', {
                    transition: 'sine:in:out',
                    link: 'cancel',
                    property: 'top',
                    unit: 'px'
                });

                var h = (window.getSize().y - $('divConfirm').getSize().y) / 2;
                mover.start(h, -500);
                $('divShade').removeClass('visible');
                $('divShade').setStyle('display', 'none');
            });
        }

        if ($('btnCancelarConfirm')) {
            $('btnCancelarConfirm').addEvent('click', function (e) {
                e.stop();

                var mover = new Fx.Tween('divConfirm', {
                    transition: 'sine:in:out',
                    link: 'cancel',
                    property: 'top',
                    unit: 'px'
                });

                var h = (window.getSize().y - $('divConfirm').getSize().y) / 2;
                mover.start(h, -500);
                $('divShade').removeClass('visible');
                $('divShade').setStyle('display', 'none');
            });
        }

        /*
         $('configuraciones').addEvent('mouseleave', function(){
         $('menuAsistencia').removeClass('visible');
         
         var myFx1 = new Fx.Tween($('columnaBusqueda'), {
         duration: '180',
         transition: 'linear',
         link: 'cancel',
         property: 'left',
         unit: '%',
         onComplete:function(){
         $('columnaBusqueda').setStyle('display', 'none');
         $('columnaPrincipal').removeClass('menuAbierto');
         }
         });
         
         myFx1.start(40, -10);
         });
         */
        $('iconFiltro').addEvent('click', function () {
            mostrarFiltro();
        });

        //aplicarMooltiselect();

        $('acciones').addEvent('click', function () {
            verAcciones();
        });

        $('contenedor').addEventListener('scroll', function (e) {
            if ($$('.divFija')[0]) {
                var h_contenido = $('contenedor').getSize().y.toInt();
                var y_sroll = e.target.getScroll().y;
                var top;

                $$('.divFija').each(function (dv) {
                    var h_divFija = dv.getSize().y.toInt();

                    if (y_sroll > h_divFija) {
                        top = (h_divFija - h_contenido) * -1;

                        $('divFija').setStyles(
                                {
                                    'position': 'fixed',
                                    'top': top
                                }
                        );
                    } else {
                        $('divFija').setStyles(
                                {
                                    'position': 'sticky',
                                    'top': '0'
                                }
                        );
                    }
                });
            }
        });

        if ($('overlay')) {
            $('overlay').addEvent('click', function () {

                if ($('popup') && $$('.divBorrarPopup')[0]) {
                    $('popup').getElement('.container').empty();

                    if ($$('.divResizePopup')[0]) {
                        $$('.divBorrarPopup')[0].destroy();
                        $$('.divResizePopup')[0].destroy();
                    }

                    $('popup').setStyles({'z-index': 0, 'display': 'none'});

                    if (typeof (fnProcesosActivos) != 'undefined') {
                        clearInterval(fnProcesosActivos);
                        clearInterval(fnProcesosNuevos);
                    }
                }

                $('overlay').setStyles({'z-index': 0, 'display': 'none'});
            });

            $('divShade').addEvent('click', function () {
                $('divShade').setStyles({'z-index': 0, 'display': 'none'});
                $('divConfirm').setStyle('top', null);
                $('divAlert').setStyle('top', null);
                $('divInfo').setStyle('top', null);

                if ($('divFiltro') && $('divFiltro').getStyle('right') != '-100%') {
                    $('divFiltro').setStyle('right', '-100%');
                }

            });
        }
    });

