    var mensajesErrorCerrarDiasMasivo = '';
    var diasTotalCerrados = 0;
    var diasCerrados = 0;
    var timerDiasCerrados;
    var cargandoLista;
    var fnLoadCalendar;
    var jphNotificacionCantidad = 0;

    function formatoFecha(f) {
        var dia = f.getDate() < 10 ? '0' + f.getDate() : f.getDate()
        var mes = (f.getMonth() + 1) < 10 ? '0' + (f.getMonth() + 1) : f.getMonth() + 1;
        return dia + '/' + mes + '/' + f.getFullYear();
    }

    function aplicarEventoClickRowsConfig() {
        var id;

        if ($('dgDatos')) {
            $('dgDatos').getElements('tr').each(function (tr) {
                tr.addEvent('click', function () {
                    id = this.getProperty('data-id');

                    $('btnNuevo').fireEvent('click');
                    this.addClass('blue');

                    var HorTurn = null;

                    if ($('botonActivo').getProperty('value').toLowerCase() == "horarios") {
                        HorTurn = "1"
                    }

                    new Request.JSON({
                        url: './abm/configuraciones.php',
                        method: 'post',
                        data: {
                            'nombre': $('botonActivo').getProperty('value').toLowerCase(),
                            'id': id,
                            'HorTurn': HorTurn,
                            'accion': 'C'
                        },
                        onSuccess: function (json) {
                            var dato, date, d, m, a;


                            if ($('botonActivo').getProperty('value').toLowerCase() == "horarios") {

                                cargarDatosHorarioConfig(json, 1);

                                new Request.JSON({
                                    url: './abm/configuraciones.php',
                                    method: 'post',
                                    data: {
                                        'nombre': $('botonActivo').getProperty('value').toLowerCase(),
                                        'id': id,
                                        'HorTurn': 2,
                                        'accion': 'C'
                                    },
                                    onSuccess: function (json) {
                                        cargarDatosHorarioConfig(json, 2);
                                    }
                                }).send();
                            } else {
                                $('formulario').getElements('.valor').each(function (input, i) {

                                    if (typeof json[input.getProperty('id')] !== 'undefined') {
                                        id = input.getProperty('id').trim();
                                        dato = json[id];

                                        if (id == "HorDomi" || id == "HorLune" || id == "HorMart" || id == "HorMier" ||
                                                id == "HorJuev" || id == "HorVier" || id == "HorSaba" || id == "HorFeri") {

                                            if (dato.toInt() == 1) {
                                                input.getNext().checked = true;
                                            } else {
                                                input.getNext().checked = false;
                                            }
                                        }

                                        if (input.hasClass('primary')) {
                                            input.setProperty('disabled', 'disabled');
                                        }

                                        if (input.type == 'checkbox') {
                                            if (dato != '' && dato.toInt() == 1) {
                                                input.checked = true;
                                            } else {
                                                input.checked = false;
                                            }
                                        } else {
                                            input.setProperty('value', dato.toString().trim());
                                        }
                                    }
                                });
                            }
                        }
                    }).send();
                });
            });
        }
    }

    function cargarDatosHorarioConfig(json, HorTurn) {

        if (HorTurn == 1) {
            $('HorCodi').value = json.HorCodi;
            $('HorDesc').value = json.HorDesc;
            $('HorID').value = json.HorID;
            $('HorDescTurn').value = json.HorDescTurn;
        }

        var divTurno = 'turno' + HorTurn;

        if (HorTurn == 2) {
            $('cb4').fireEvent('click');
        } else {
            $('cb4').checked = true;
            $('cb4').fireEvent('click');
        }

        $(divTurno).getElements('.valor').each(function (input, i) {
            var campo = input.getProperty('id').trim();

            input.removeClass('red');

            if (HorTurn == 2) {
                campo = campo.replace('_2', '');
            }

            if (typeof json[campo] !== 'undefined') {
                id = campo;
                dato = json[id];

                if (id == "HorDomi" || id == "HorLune" || id == "HorMart" || id == "HorMier" ||
                        id == "HorJuev" || id == "HorVier" || id == "HorSaba" || id == "HorFeri") {

                    if (dato.toInt() == 1) {
                        input.getNext().checked = true;
                    } else {
                        input.getNext().checked = false;
                    }
                }

                if (input.hasClass('primary')) {
                    input.setProperty('disabled', 'disabled');
                }

                if (input.type == 'checkbox') {
                    if (dato != '' && dato.toInt() == 1) {
                        input.checked = true;
                    } else {
                        input.checked = false;
                    }
                } else {
                    input.setProperty('value', dato.toString().trim());
                }
            }
        });
    }

    function confirmar(mensaje, accionAceptar, titulo, txtBot1, txtBot2, accionCancelar) {
        $('divShade').setStyle('display', 'block');
        $('divShade').addClass('visible');
        $('divConfirm').getElement('h4 span').setProperty('html', titulo || 'Confirmación');
        $('divConfirm').getElement('p').setProperty('html', mensaje);
        $('btnCancelarConfirm').setProperty('text', txtBot1 || 'Cancelar');
        $('btnAceptarConfirm').setProperty('text', txtBot2 || 'Aceptar');

        var mover = new Fx.Tween('divConfirm', {
            transition: 'sine:in:out',
            link: 'cancel',
            property: 'top',
            unit: 'px'
        });

        var h = (window.getSize().y - $('divConfirm').getSize().y) / 2;
        mover.start(-500, h);

        $('btnAceptarConfirm').removeEvents('click');
        $('btnAceptarConfirm').addEvent('click', accionAceptar);
        $('btnCancelarConfirm').removeEvents('click');

        if (accionCancelar) {
            $('btnCancelarConfirm').addEvent('click', accionCancelar);
        }

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

        $('btnAceptarConfirm').addEvent('click', function (e) {
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

    function informar(mensaje, titulo) {
        notificar(titulo, mensaje);
    }

    function alertar(mensaje, titulo) {
        notificar(titulo, mensaje, 'fa-exclamation-circle', 'orange');
    }

    function mostrarError(mensaje, titulo) {
        notificar(titulo, mensaje, 'fa-exclamation-circle', 'white');
    }


    function orderTable(a, b) {
        var $tbody = a.getParent();
        var order, sort, ret, $a, $b, $valA, $valB;
        order = $tbody.getProperty('data-order') * 1 + 1;
        sort = $tbody.getProperty('data-sort');
        $a = a.getElement(':nth-child(' + order + ')');
        $b = b.getElement(':nth-child(' + order + ')');
        ret = 0;

        if ($a.getProperty('text') != $b.getProperty('text')) {

            if (isNaN($a.getProperty('text')) || isNaN($b.getProperty('text'))) {
                $valA = $a.getProperty('text');
                $valB = $b.getProperty('text');
            } else {
                $valA = $a.getProperty('text').toInt();
                $valB = $b.getProperty('text').toInt();
            }

            if (sort == 'asc') {
                ret = $valA > $valB ? 1 : -1;
            } else {
                ret = $valA > $valB ? -1 : 1;
            }

        }
        return ret;
    }

    function abrirPagina(pag, datos) {

        datos.ruta = $('complemento').value + ' - ' + $('botonActivo').getProperty('data-ruta');

        new Request.HTML({
            url: pag,
            method: 'post',
            data: datos,
            evalScripts: false,
            onRequest: function () {
                $('columnaPrincipal').setProperty('html', '<div class="jph-loading"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>');
            },
            onSuccess: function (a, b, html, js) {
                $('columnaPrincipal').setProperty('html', html);

                eval(js);

                if (pag == "configuraciones.php" && $('botonActivo').value != 'rotaciones') {
                    aplicarEventoClickRowsConfig();
                }

                if (datos) {
                    var clase = datos.idRegistro;
                }

                if (clase && clase.toInt() != 0) {
                    clase = '._' + clase;

                    if (datos.grilla) {

                        if (datos.idRegistro2) {
                            $(datos.grilla).getElement(clase).setProperties({
                                'data-idHijo': datos.idRegistro2,
                                'data-grilla': datos.grilla2
                            });
                        }

                        $(datos.grilla).getElement(clase).fireEvent('click');
                    } else {

                        if (datos.idRegistro2) {
                            $(datos.grilla).getElement(clase).setProperties({
                                'data-idHijo': datos.idRegistro2,
                                'data-grilla': datos.grilla2
                            });
                        }

                        $('dgDatos').getElement(clase).fireEvent('click');
                    }
                }
            }
        }).send();
    }

    function reemplazarCaracteres(str) {
        str = str.replace(/[^a-zA-Z0-9]/g, '_');
        return str;
    }

    function limpiarCamposPersonal() {

        $('id').setProperty('value', 0);

        $('formulario').getElements('.valor').each(function (input) {
            if (input.type != 'checkbox') {
                input.setProperty('value', input.getProperty('data-def') ? input.getProperty('data-def') : '');
            } else {
                input.checked = false;
            }
			if(input.getProperty('id') != 'LegVencRegistro'){
				input.setProperty('disabled', '');
			}
        });
        $$('#dgDatos .blue').removeClass('blue');
    }

    function camposObligatoriosCompletos(div) {
        var inputs;
        var datosOk = true;

        if (!div) {
            inputs = $$('.required .valor');
        } else {
            inputs = div.getElements('.required .valor');
        }

        for (i = 0; i < inputs.length; i++) {
            if (inputs[i].getProperty('value') == '') {
                datosOk = false;
                i = inputs.length;
            }
        }

        return datosOk;
    }

    function mostrarFiltro() {
        $('divFiltro').setStyle('display', 'block');
        $('divShade').setStyle('display', 'block');
        $('divShade').addClass('visible');
        var cargarFiltro = new Request.HTML({
            url: 'filtro.php',
            onRequest: function () {
                $('divFiltro').setProperty('html', '');
            },
            onSuccess: function (a, b, html, js) {
                $('divFiltro').setProperty('html', html);
                var myFx1 = new Fx.Tween($('divFiltro'), {
                    duration: '700',
                    transition: 'linear',
                    link: 'cancel',
                    property: 'right',
                    unit: '%',
                });
                eval(js);
                myFx1.start(-100, 50);
            }
        });
        cargarFiltro.send();
    }

    function ocultarFiltro() {
        var myFx1 = new Fx.Tween($('divFiltro'), {
            duration: '700',
            transition: 'linear',
            link: 'cancel',
            property: 'right',
            unit: '%',
            onComplete: function () {
                $('divShade').removeClass('visible');
                $('divShade').setStyle('display', 'none');
                $('divFiltro').setStyle('display', 'none');
            }
        });

        myFx1.start(50, -100);
    }

    function aplicarMooltiselect() {
        var combos = $$('.mooltiselect');
        var combo, img, lista;

        combos.each(function (cmb, i) {
            lista = $(cmb).getElement('.lista');
            img = $(cmb).getElement('.cmbToogler');

            new mooltiselect({
                'options': 'option',
                'list': $(lista).getProperty('id'),
                'name': cmb.getProperty('id') + '[]',
                'selectedClass': 'selected',
                'btnAll': true,
                'btnNon': true,
                'btnInv': true
            });

            var seleccionados = $(img).getNext().getElements('.selected') ? $(img).getNext().getElements('.selected').length : 0;
            if (seleccionados > 0) {
                $(img).getPrevious().setProperty('text', seleccionados + ' Seleccionados');
            } else {
                $(img).getPrevious().setProperty('text', 'Todos');
            }

            $(img).addEvent('click', function () {
                combo = this.getParent();

                cerrarCombosMooltiselect(combo.getProperty('id'));

                lista = $(combo).getElement('.lista');
                mostrar = new Fx.Tween(combo, {duration: 300});
                aparecer = new Fx.Tween(lista, {duration: 300});
                estadoToogler = $(combo).getProperty('rel');

                if (estadoToogler == 0) {
                    combo.setProperty('rel', '1');
                    mostrar.start('height', '220');
                    aparecer.start('opacity', '1');
                    this.setProperty('src', './img/dropup.png');
                    this.getParent().setStyle('z-index', 200);
                } else {
                    combo.setProperty('rel', '0');
                    mostrar.start('height', '21');
                    aparecer.start('opacity', '0');
                    this.setProperty('src', './img/desplegar.png');
                    this.getParent().setStyle('z-index', 100);

                    var seleccionados = this.getNext().getElements('.selected') ? this.getNext().getElements('.selected').length : 0;

                    if (seleccionados > 0) {
                        this.getPrevious().setProperty('text', seleccionados + ' Seleccionados');
                    } else {
                        this.getPrevious().setProperty('text', 'Todos');
                    }
                }
            });

            img.getPrevious().addEvent('click', function () {
                $(this).getNext().fireEvent('click');
            });

        });
    }

    function cerrarCombosMooltiselect(selectedCombo) {
        var tooglers = $$('.cmbToogler');
        tooglers.each(function (img, i) {
            var combo = img.getParent();
            if (selectedCombo != $(combo).getProperty('id')) {
                var lista = $(combo).getElement('.lista');
                var mostrar = new Fx.Tween(combo, {duration: 300});
                var aparecer = new Fx.Tween(lista, {duration: 300});
                combo.setProperty('rel', '0');
                mostrar.start('height', '21');
                aparecer.start('opacity', '0');
                img.setProperty('src', './img/desplegar.png');
                var seleccionados = img.getNext().getElements('.selected') ? img.getNext().getElements('.selected').length : 0;
                if (seleccionados > 0) {
                    img.getPrevious().setProperty('text', seleccionados + ' Seleccionados');
                } else {
                    img.getPrevious().setProperty('text', 'Todos');
                }
            }
        });
    }

    function limpiarCampos() {
        $('formulario').getElements('.valor').each(function (input) {
            if (input.type != 'checkbox') {
                if (input.getProperty('data-def')) {
                    input.setProperty('value', input.getProperty('data-def'));
                } else {
                    input.setProperty('value', '');
                }
            } else {
                input.checked = false;
            }

            if ($('botonActivo').getProperty('value').toLowerCase() == "horarios") {
                if (!input.getParent('.turno2')) {
                    input.setProperty('disabled', '');
                }
            } else {
                input.setProperty('disabled', '');
            }
        });
        $$('#dgDatos .blue').removeClass('blue');
    }

    function grabarConfiguracion(modulo, clase) {
        var accion = 'A';
        var hayDatos = false;
        var arr = [];
        var datos = {};
        var clave, valor;
        var id = 0;
        var idRegistro = '_0';
        var href;

        if (typeof modulo === 'undefined' || typeof clase === 'undefined') {
            href = './abm/configuraciones.php'
        } else {
            href = './abm/' + modulo + '/' + clase + '.php';
        }

        if ($('dgDatos').getElement('.blue')) {
            accion = 'M';
            id = $('dgDatos').getElement('.blue').getProperty('data-id');
        }

        if ($$('.valor')[0]) {
            hayDatos = true;

            datos.nombre = $('botonActivo').getProperty('value').toLowerCase();
            datos.accion = accion;
            datos.id = id;

            $('myForm').getElements('.valor').each(function (v) {
                clave = v.getProperty('id');

                if (v.type == 'checkbox') {

                    if (v.checked == true) {
                        valor = 1;
                    } else {
                        valor = 0;
                    }

                } else {
                    if (!v.hasClass('ink-datepicker')) {
                        valor = v.getProperty('value');
                        if (valor == '') {
                            campoVacios = true;
                        }
                    } else {
                        if (v.getProperty('value') == '') {
                            valor = 'NULL';
                        } else {
                            arr = v.getProperty('value').split('/');
                            valor = v.getProperty('value');//arr[2] + arr[1] + arr[0];
                        }
                    }
                }

                datos[clave] = valor.toString().trim();

                if (datos.campoid == clave) {
                    idRegistro = reemplazarCaracteres(v.getProperty('value'));
                }
            });
        }

        if (hayDatos == true && camposObligatoriosCompletos() == true) {
            new Request.HTML({
                url: href,
                method: 'post',
                data: datos,
                onSuccess: function (a, b, html, js) {
                    idRegistro = reemplazarCaracteres(html.split(',')[0].trim());
                    var error = html.split(',')[1];

                    if (error.toInt() > 0) {
                        if (error.toInt() == 1) {
                            alertar('El codigo ingresado ya existe');
                        } else {
                            alertar('Se produjo un error en la grabacion');
                        }

                    } else {
                        var pag = $('botonActivo').getProperty('data-pag');
                        var nombre = $('botonActivo').getProperty('value').toLowerCase();

                        datos = {};
                        datos.nombre = nombre;
                        datos.idRegistro = idRegistro;

                        abrirPagina(pag, datos);

                        informar('Datos grabados con exito');
                    }
                    eval(js);
                }
            }).send();
        } else {
            alertar('Complete los campos obligatorios.');
        }
    }

    function borrarConfiguracion(modulo, clase) {
        var href;

        if (typeof modulo === 'undefined' || typeof clase === 'undefined') {
            href = './abm/configuraciones.php'
        } else {
            href = './abm/' + modulo + '/' + clase + '.php';
        }

        if ($('dgDatos').getElement('.blue')) {
            var accion = function () {
                new Request.HTML({
                    url: href,
                    method: 'post',
                    data: {
                        'nombre': $('botonActivo').getProperty('value').toLowerCase(),
                        'accion': 'B',
                        'id': $('dgDatos').getElement('.blue').getProperty('data-id')
                    },
                    onSuccess: function () {
                        informar('Datos borrados con exito');

                        $('dgDatos').getElement('.blue').destroy();
                        $('btnNuevo').fireEvent('click');
                    }
                }).send();
            }
            confirmar('Esta seguro de borrarlo', accion);
        }
    }

    function grabarDatosPersonal() {
        var accion = 'A';
        var arr = [];
        var datos = {};
        var clave, valor;
        var id = 0;
        var idRegistro = '_0';
        var pag = './abm/legajos.php';
        var pag2 = './legajos.php';

        if ($('dgDatos').getElement('.blue')) {
            accion = 'M';
            idRegistro = $('dgDatos').getElement('.blue').getProperty('data-id');
            id = idRegistro;
        }

        $('accion').setProperty('value', accion);

        if (camposObligatoriosCompletos() == true) {
            new Request.JSON({
                url: pag,
                method: 'post',
                data: $('formulario'),
                onSuccess: function (json) {
                    var id = json.id;
                    var numError = json.numError;

                    if (numError.toInt() > 0) {
                        alertar('Se produjo un error en la grabacion');
                    } else {
                        datos = {};
                        datos.idRegistro = id;
                        abrirPagina(pag2, datos);

                        informar('Datos grabados con exito');
                    }
                }
            }).send();
        } else {
            alertar('Complete los campos obligatorios');
        }
    }

    function borrarPersonal() {
        if ($('dgDatos').getElement('.blue')) {
            var accion = function () {
                new Request.HTML({
                    url: './abm/legajos.php',
                    method: 'post',
                    data: {
                        'accion': 'B',
                        'id': $('dgDatos').getElement('.blue').getProperty('data-id')
                    },
                    onSuccess: function () {
                        informar('Datos borrados con exito');

                        $('dgDatos').getElement('.blue').destroy();
                        $('btnNuevo').fireEvent('click');
                    }
                }).send();
            }
            confirmar('Esta seguro de borrarlo', accion);
        }
    }

    function filtroBuscar() {
        new Request.HTML({
            url: 'filtro/buscar.php',
            method: 'post',
            data: $('form-filtro'),
            onSuccess: function (a, b, html, js) {
                $('resultado').setProperty('html', html);
                $('btnAceptarFiltro').removeEvents('click');
                $('btnAceptarFiltro').addEvent('click', function (e) {
                    e.stop();
                    filtroGuardar();
                });
            }
        }).send();

    }

    function filtroGuardar() {
        new Request.JSON({
            url: 'filtro/guardar.php',
            method: 'post',
            data: $('form-filtro'),
            onSuccess: function (a, b) {
                usuario.sesion = a.sesion;

                new Request.HTML({
                    url: 'filtro/cargar.php',
                    onSuccess: function (a, b, html, d) {
                        var pag = $('botonActivo').getProperty('data-pag');
                        var datos = {};
                        if (pag && pag != null && pag != '') {
                            abrirPagina(pag, datos);
                        }
                    }
                }).send();

                ocultarFiltro();
            }
        }).send();
    }


    function aplicarEventoClickRowsPersonal() {
        var id;

        if ($('dgDatos')) {
            $('dgDatos').getElements('tr').each(function (tr) {
                tr.addEvent('click', function () {
                    id = this.getProperty('data-id');

                    $('btnNuevo').fireEvent('click');
                    this.addClass('blue');

                    $('id').setProperty('value', id);

                    new Request.JSON({
                        url: './abm/legajos.php',
                        method: 'post',
                        data: {
                            'id': id,
                            'accion': 'C'
                        },
                        onSuccess: function (json) {
                            $('LegNume').setProperty('value', (json.legajo != null ? json.legajo.toString().trim() : ''));
                            $('LegApNo').setProperty('value', (json.LegApNo != null ? json.LegApNo.toString().trim() : ''));
                            $('LegEmpr').setProperty('value', (json.LegEmpr != null ? json.LegEmpr.toString().trim() : ''));
                            $('LegTDoc').setProperty('value', (json.LegTDoc != null ? json.LegTDoc.toString().trim() : ''));
                            $('LegDocu').setProperty('value', (json.LegDocu != null ? json.LegDocu.toString().trim() : ''));
                            $('LegCUIT').setProperty('value', (json.LegCUIT != null ? json.LegCUIT.toString().trim() : ''));
                            $('LegDomi').setProperty('value', (json.LegDomi != null ? json.LegDomi.toString().trim() : ''));
                            $('LegDoOb').setProperty('value', (json.LegDoOb != null ? json.LegDoOb.toString().trim() : ''));
                            $('LegDoNu').setProperty('value', (json.LegDoNu != null ? json.LegDoNu.toString().trim() : ''));
                            $('LegDoPi').setProperty('value', (json.LegDoPi != null ? json.LegDoPi.toString().trim() : ''));
                            $('LegDoDP').setProperty('value', (json.LegDoDP != null ? json.LegDoDP.toString().trim() : ''));
                            $('LegCOPO').setProperty('value', (json.LegCOPO != null ? json.LegCOPO.toString().trim() : ''));
                            $('LegTel1').setProperty('value', (json.LegTel1 != null ? json.LegTel1.toString().trim() : ''));
                            //$('LegTeO1').setProperty('value', (json.LegTeO1 != null ? json.LegTeO1.toString().trim() : ''));
                            $('LegTel2').setProperty('value', (json.LegTel2 != null ? json.LegTel2.toString().trim() : ''));
                            //$('LegTeO2').setProperty('value', (json.LegTeO2 != null ? json.LegTeO2.toString().trim() : ''));
                            $('LegProv').setProperty('value', (json.LegProv != null ? json.LegProv.toString().trim() : ''));
                            $('LegLoca').setProperty('value', (json.LegLoca != null ? json.LegLoca.toString().trim() : ''));
                            $('LegNaci').setProperty('value', (json.LegNaci != null ? json.LegNaci.toString().trim() : ''));
                            $('LegEsCi').setProperty('value', (json.LegEsCi != null ? json.LegEsCi.toString().trim() : ''));
                            $('LegSexo').setProperty('value', (json.LegSexo != null ? json.LegSexo.toString().trim() : ''));
                            $('LegFeNa').setProperty('value', (json.LegFeNa != null ?  (json.LegFeNa != '01/01/1753' ? json.LegFeNa.toString().trim() : '')  : ''));
                            $('LegTipo').setProperty('value', (json.LegTipo != null ? json.LegTipo.toString().trim() : ''));
                            $('LegConv').setProperty('value', (json.LegConv != null ? json.LegConv.toString().trim() : ''));
                            $('LegSect').setProperty('value', (json.LegSect != null ? json.LegSect.toString().trim() : ''));
                            $('LegPlan').setProperty('value', (json.LegPlan != null ? json.LegPlan.toString().trim() : ''));
                            $('LegSec2').setProperty('value', (json.LegSec2 != null ? json.LegSec2.toString().trim() : ''));
                            $('LegGrup').setProperty('value', (json.LegGrup != null ? json.LegGrup.toString().trim() : ''));
                            $('LegPues').setProperty('value', (json.LegPues != null ? json.LegPues.toString().trim() : ''));
                            $('LegCate').setProperty('value', (json.LegCate != null ? json.LegCate.toString().trim() : ''));
                            $('LegCdeC').setProperty('value', (json.LegCdeC != null ? json.LegCdeC.toString().trim() : ''));
                            $('LegDpto').setProperty('value', (json.LegDpto != null ? json.LegDpto.toString().trim() : ''));
                            $('LegFeIn').setProperty('value', (json.LegFeIn != null ?  (json.LegFeIn != '01/01/1753' ? json.LegFeIn.toString().trim() : '')  : ''));
                            $('LegFeEg').setProperty('value', (json.LegFeEg != null ?  (json.LegFeEg != '01/01/1753' ? json.LegFeEg.toString().trim() : '')  : ''));
                            $('LegTarj').setProperty('value', (json.LegTarj != null ? json.LegTarj.toString().trim() : ''));
                            $('LegToTa').setProperty('value', (json.LegToTa != null ? json.LegToTa.toString().trim() : ''));
                            $('LegReTa').setProperty('value', (json.LegReTa != null ? json.LegReTa.toString().trim() : ''));
                            $('LegToIn').setProperty('value', (json.LegToIn != null ? json.LegToIn.toString().trim() : ''));
                            $('LegReIn').setProperty('value', (json.LegReIn != null ? json.LegReIn.toString().trim() : ''));
                            $('LegToSa').setProperty('value', (json.LegToSa != null ? json.LegToSa.toString().trim() : ''));
                            $('LegReSa').setProperty('value', (json.LegReSa != null ? json.LegReSa.toString().trim() : ''));
                            $('LegRenoRegistro').setProperty('value', (json.LegRenoRegistro != null ? (json.LegRenoRegistro != '01/01/1753' ? json.LegRenoRegistro.toString().trim() : '') : ''));
                            $('LegVencRegistro').setProperty('value', (json.LegVencRegistro != null ? (json.LegVencRegistro != '01/01/1753' ? json.LegVencRegistro.toString().trim() : '') : ''));
							$('LegRegObs').setProperty('value', (json.LegRegObs != null ? json.LegRegObs.toString().trim() : ''));

                            if (json.LegFlex != null && json.LegFlex.toInt() == 1) {
                                $('LegFlex').checked = true;
								$('LegFlex').getParent().addClass('check');
								$('LegFlex').getParent().setProperty('data-chk', 'true');
                            } else {
                                $('LegFlex').checked = false;
								$('LegFlex').getParent().removeClass('check');
								$('LegFlex').getParent().setProperty('data-chk', 'false');
                            }

                            if (json.LegTTMo != null && json.LegTTMo.toInt() == 1) {
                                $('LegTTMo').checked = true;
								$('LegTTMo').getParent().addClass('check');
								$('LegTTMo').getParent().setProperty('data-chk', 'true');
                            } else {
                                $('LegTTMo').checked = false;
								$('LegTTMo').getParent().removeClass('check');
								$('LegTTMo').getParent().setProperty('data-chk', 'false');
                            }

                            if (json.LegTIMo != null && json.LegTIMo.toInt() == 1) {
                                $('LegTIMo').checked = true;
								$('LegTIMo').getParent().addClass('checked');
								$('LegTIMo').getParent().setProperty('data-chk', 'true');
                            } else {
                                $('LegTIMo').checked = false;
								$('LegTIMo').getParent().removeClass('checked');
								$('LegTIMo').getParent().setProperty('data-chk', 'false');
                            }

                            if (json.LegTSMo != null && json.LegTSMo.toInt() == 1) {
                                $('LegTSMo').checked = true;
								$('LegTSMo').getParent().addClass('checked');
								$('LegTSMo').getParent().setProperty('data-chk', 'true');
                            } else {
                                $('LegTSMo').checked = false;
								$('LegTSMo').getParent().removeClass('checked');
								$('LegTSMo').getParent().setProperty('data-chk', 'false');
                            }

                            if (json.LegRegE1 != null && json.LegRegE1.toInt() == 1) {
                                $('LegRegE1').checked = true;
								$('LegRegE1').getParent().addClass('checked');
								$('LegRegE1').getParent().setProperty('data-chk', 'true');
                            } else {
                                $('LegRegE1').checked = false;
								$('LegRegE1').getParent().removeClass('checked');
								$('LegRegE1').getParent().setProperty('data-chk', 'false');
                            }
							
							if($('LegRegE2')){
								if (json.LegRegE2 != null && json.LegRegE2.toInt() == 1) {
									$('LegRegE2').checked = true;
									$('LegRegE2').getParent().addClass('checked');
									$('LegRegE2').getParent().setProperty('data-chk', 'true');
								} else {
									$('LegRegE2').checked = false;
									$('LegRegE2').getParent().removeClass('checked');
									$('LegRegE2').getParent().setProperty('data-chk', 'false');
								}
							}
							
							if($('LegRegE3')){
								if (json.LegRegE3 != null && json.LegRegE3.toInt() == 1) {
									$('LegRegE3').checked = true;
									$('LegRegE3').getParent().addClass('checked');
									$('LegRegE3').getParent().setProperty('data-chk', 'true');
								} else {
									$('LegRegE3').checked = false;
									$('LegRegE3').getParent().removeClass('checked');
									$('LegRegE3').getParent().setProperty('data-chk', 'false');
								}
							}

                            $('LegTaIn').setProperty('value', (json.LegTaIn != null ? json.LegTaIn.toString().trim() : ''));
                            $('LegEsta').setProperty('value', (json.LegEsta != null ? json.LegEsta.toString().trim() : ''));
                            $('legajo').setProperty('value', (json.legajo != null ? json.legajo.toString().trim() : ''));
                        }
                    }).send();
                });
            });
        }
    }

    function grabarDatosIngresoNovedades() {
        if (camposObligatoriosCompletos()) {
            new Request.HTML({
                url: './abm/novedades.php',
                method: 'post',
                data: $('myForm'),
                onSuccess: function (a, b, html, js) {
                    if (html) {
                        if (html.contains('</td>') || html.trim() == '') {
                            $('dgResultados').setProperty('html', html);
                            informar('El proceso finalizo exitosamente');
                        } else {
                            alertar(html);
                        }
                    }
                }
            }).send();
        } else {
            alertar('Complete los campos obligatorios');
        }
    }

    function ingresarFichadas() {
        $('modo').setProperty('value', 'ingresar');

        new Request.JSON({
            url: './abm/fichadas.php',
            method: 'post',
            data: $('myForm'),
            onRequest: function () {
                $('divErrores').addClass('oculto');
                $('errores').setProperty('html', '');
            },
            onSuccess: function (json) {
                var error = json.numError;
                var legSinTarj = json.legSinTarj;
                var legAsig = json.legAsig;
                var legDiaCerrado = json.diaCerrado;
                var legSinHorario = json.sinHorario;

                $('divErrores').removeClass('oculto');

                if (!isNaN(error)) {
                    if (error.toInt() != 0) {
                        alertar(erroresMSQL[error.toInt()]);
                    } else {
                        informar('Fichadas procesadas con exito');
                    }
                } else {
                    alertar(error);
                }

                var errores = "";
                errores += "<span class='titulo all-100 push-left'>Legajos con dia cerrado</br></span>";
                errores += legDiaCerrado + "</br>";
                errores += "<span class='titulo all-100 push-left'>Legajos con tarjeta cero </br></span>";
                errores += legSinTarj + "</br>";
                errores += "<span class='titulo all-100 push-left'>Fichadas existentes </br></span>";
                errores += legAsig + "</br>";
                errores += "<span class='titulo all-100 push-left'>Sin horario</br></span>";
                errores += legSinHorario + "</br>";

                $('errores').addClass('grillalarge');
                $('errores').addClass('jph-scroll');
                $('errores').setProperty('html', errores);

                recargarScroll($('errores'));
            }
        }).send();
    }

    function reasignarFichadas() {
        $('modo').setProperty('value', 'reasignar');

        new Request.JSON({
            url: './abm/fichadas.php',
            method: 'post',
            data: $('myForm'),
            onRequest: function () {
                $('errores').setProperty('html', '');
            },
            onSuccess: function (json) {
                var error = json.numError;

                if (!isNaN(error)) {
                    if (error.toInt() != 0) {
                        alertar(erroresMSQL[error.toInt()]);
                    } else {
                        informar('Fichadas reasignadas con exito');
                    }
                } else {
                    alertar(error);
                }
            }
        }).send();
    }

    function recuperarFichadas() {
        $('modo').setProperty('value', 'recuperar');

        new Request.JSON({
            url: './abm/fichadas.php',
            method: 'post',
            data: $('myForm'),
            onRequest: function () {
                $('errores').setProperty('html', '');
            },
            onSuccess: function (json) {
                var error = json.numError;

                if (!isNaN(error)) {
                    if (error.toInt() != 0) {
                        alertar(erroresMSQL[error.toInt()]);
                    } else {
                        informar('Fichadas recuperadas con exito');
                    }
                } else {
                    alertar(error);
                }
            }
        }).send();
    }

    function buscarHorasAutorizar() {

        var arrFecha = [];
        var tipoHora = $('tipoHora').getProperty('value');
        var desde = $('desde').getProperty('value');
        var hasta = $('hasta').getProperty('value');
        var minimoHechas = '';
        var maximoHechas = '';
        var minimoAuto = '';
        var maximoAuto = '';
        var fechasCompletas = true;

        if (desde == "" || hasta == "") {
            fechasCompletas = false;
        }

        var legajos = [];
        $$('.checked .marcar').each(function (input) {
            legajos.push(input.value);
        });

        if ($('chkMinHoras').checked == true) {
            minimoHechas = $('minimoHechas').getProperty('value');
        }

        if ($('chkMaxHoras').checked == true) {
            maximoHechas = $('maximoHechas').getProperty('value');
        }

        if ($('chkMinHorasAuto').checked == true) {
            minimoAuto = $('minimoAuto').getProperty('value');
        }

        if ($('chkMaxHorasAuto').checked == true) {
            maximoAuto = $('maximoAuto').getProperty('value');
        }

        if (desde != '') {
            arrFecha = desde.split('/');
            desde = arrFecha[2] + arrFecha[1] + arrFecha[0];
        }

        if (hasta != '') {
            arrFecha = hasta.split('/');
            hasta = arrFecha[2] + arrFecha[1] + arrFecha[0];
        }

        if (fechasCompletas) {
            new Request.HTML({
                url: './buscar/horas.php',
                method: 'post',
                data: {
                    'tipoHora': tipoHora,
                    'desde': desde,
                    'hasta': hasta,
                    'minimoHechas': minimoHechas,
                    'maximoHechas': maximoHechas,
                    'minimoAuto': minimoAuto,
                    'maximoAuto': maximoAuto,
                    legajos: legajos
                },
                onRequest: function () {
                    $('dgDatos').setProperty('html', '');
                },
                onSuccess: function (a, b, html, js) {
                    $('dgDatos').setProperty('html', html);

                    $('dgDatos').getElements('.checks').addEvent('click', function () {
                        if (this.checked == true) {
                            this.addClass('checked');
                        } else {
                            this.removeClass('checked');
                        }
                    });

                    recargarScroll($('dgDatos'));
                }
            }).send();
        } else {
            alertar("Complete las fechas");
        }
    }

    function autorizarHoras() {

        if ($('dgDatos').getElement('.checked')) {
            new Request.HTML({
                url: './abm/horas.php',
                method: 'post',
                data: $('formDer'),
                onSuccess: function (a, b, html, js) {
                    informar("Legajos autorizados con exito");
                    buscarHorasAutorizar();
                }
            }).send();
        } else {
            alertar("Seleccione al menos un item en la grilla para autorizar");
        }
    }


    function mostrarDobleTurno(chk) {
        if (chk.checked) {
            $('divBotonesTurnos').removeClass('oculto');
        } else {
            $('divBotonesTurnos').addClass('oculto');
        }
    }

    function buscarAsignacionDeHorarios() {
        new Request.HTML({
            url: "./buscar/horarios.php",
            data: $('formHorarios'),
            evalScripts: false,
            onRequest: function () {
                $('divFormAsignacion').setProperty('html', '');
            },
            onComplete: function (a, b, c, d) {
                $('divDetalle').setProperty('html', c);

                recargarScroll($('divDetalle').getElement('table'));
                eval(d);
            }
        }).send();
    }

    function asignarHorario() {
        new Request.HTML({
            url: './abm/horarios.php',
            data: $('formHorarios'),
            onSuccess: function (a, b, c, d) {
                $('divFormAsignacion').setProperty('html', c);
                eval(d);
                buscarAsignacionDeHorarios();
            }
        }).send();
    }

    function mostrarGrillaAsignacionHorarios($grilla) {
        var $activa = $$('#grillaAsignaciones table.activo')[0];
        var $activaContent = $activa.getParent('.legajos') ? $activa.getParent('.legajos') : ($activa.getParent('.sectores') ? $activa.getParent('.sectores') : $activa.getParent('.grupos'));
        var $grillaContent = $grilla.getParent('.legajos') ? $grilla.getParent('.legajos') : ($grilla.getParent('.sectores') ? $grilla.getParent('.sectores') : $grilla.getParent('.grupos'));

        var ocultar = new Fx.Tween($activa, {
            "unit": "%",
            "property": "left",
            onStart: function () {
                var $todos = $activa.getElement('input[name^=chkTodos]');
                if ($todos.checked) {
                    $todos.setProperty('checked', false);
                    $todos.fireEvent('click');
                }
            },
            onComplete: function () {
                $activa.removeClass('activo');
                $activa.addClass('inactivo');

                $activaContent.addClass('oculto');
            }
        });

        var mostar = new Fx.Tween($grilla, {
            "unit": "%",
            "property": "left",
            onStart: function () {
                var $todos = $grilla.getElement('input[name^=chkTodos]');
                if (!$todos.checked) {
                    $todos.setProperty('checked', true);
                    $todos.fireEvent('click');
                }

                $grillaContent.removeClass('oculto');
            },
            onComplete: function () {
                $grilla.removeClass('inactivo');
                $grilla.addClass('activo');
            }
        });

        ocultar.start('0', '100');
        mostar.start('100', '0');
    }

    function borrarTipoHoraReglas() {
        if ($('dgDatos').getElement('.blue')) {
            var accion = function () {
                new Request.HTML({
                    url: './abm/reglas.php',
                    method: 'post',
                    data: {
                        'accion': 'B',
                        'id': $('dgDatos').getElement('.blue').getProperty('data-id')
                    },
                    onSuccess: function () {
                        informar('Datos borrados con exito');

                        $('dgDatos').getElement('.blue').destroy();
                        $('btnNuevo').fireEvent('click');
                    }
                }).send();
            }
            confirmar('Esta seguro de borrarlo', accion);
        }
    }

    function cargarFormularioAsignacionHorarios() {
        new Request.HTML({
            url: './abm/horarios.php',
            data: $('formHorarios'),
            evalScripts: false,
            onSuccess: function (a, b, c, d) {
                $('divFormAsignacion').setProperty('html', c);
                eval(d);
            }
        }).send();
    }

    function grabarTipoHoraReglas() {
        var idRegistro = 0;
        var accion = "A";

        if ($('dgDatos').getElement('.blue')) {
            accion = 'M';
            idRegistro = $('dgDatos').getElement('.blue').getProperty('data-id');
        }

        $('id').setProperty('value', idRegistro);
        $('accion').setProperty('value', accion);

        if (camposObligatoriosCompletos() == true) {
            new Request.JSON({
                url: './abm/reglas.php',
                method: 'post',
                data: $('myForm'),
                onSuccess: function (json) {
                    var id = json.id;
                    var error = json.numError;

                    if (error.toInt() > 0) {
                        if (error.toInt() == 1) {
                            alertar('El codigo ingresado ya existe');
                        } else {
                            alertar('Se produjo un error en la grabacion');
                        }
                    } else {
                        datos = {};
                        datos.idRegistro = id;

                        abrirPagina('./reglas.php', datos);

                        informar('Datos grabados con exito');
                    }
                }
            }).send();
        } else {
            alertar('Complete los campos obligatorios');
        }
    }

    function borrarRegla(tr, THoCont) {
        var accion = function () {
            new Request.HTML({
                url: './abm/reglas.php',
                method: 'post',
                data: {
                    'accion': 'B_REGLAS',
                    'THoCont': THoCont
                },
                onSuccess: function () {
                    tr.destroy();
                }
            }).send();
        }
        confirmar('Esta seguro de borrarlo', accion);
    }

    function cargarComboRegla(tipo) {
        new Request.HTML({
            url: './abm/reglas.php',
            method: 'post',
            data: {
                'accion': 'COMBO_REGLAS',
                'tipo': tipo
            },
            onSuccess: function (a, b, html, js) {
                $('THoRegl').empty();
                $('THoRegl').setProperty('html', html);
            }
        }).send();
    }

    function guardarRegla() {
        var tipoHora = $('dgDatos').getElement('.blue').getProperty('data-id');
        var tipo = $('THoTiRe').getProperty('value');
        var regla = $('THoRegl').getProperty('value');
        var descRegla = $('THoRegl').options[$('THoRegl').selectedIndex].innerHTML;

        new Request.HTML({
            url: './abm/reglas.php',
            method: 'post',
            data: {
                'accion': 'A_REGLAS',
                'tipo': tipo,
                'regla': regla,
                'tipoHora': tipoHora,
                'descRegla': descRegla,
                'ruta': $('ruta').getProperty('value')
            },
            onSuccess: function (a, b, html, js) {
                if (html != 0) {
                    $('dgReglas').appendHTML(html);
                    var tr = $('dgReglas').getLast('tr');
                    aplicarEventoClickRowsReglas(tr);
                } else {
                    alertar("Ya existe una regla igual");
                }
            }
        }).send();
    }

    function aplicarEventoClickRowsTiposHora() {
        var id;

        if ($('dgDatos')) {
            $('dgDatos').getElements('tr').each(function (tr) {
                tr.addEvent('click', function () {
                    id = this.getProperty('data-id');

                    $('accion').setProperty('value', 'C');
                    $('id').setProperty('value', id);

                    $('btnNuevo').fireEvent('click');
                    this.addClass('blue');

                    $('grilla').removeClass('oculto');

                    new Request.JSON({
                        url: './abm/reglas.php',
                        method: 'post',
                        data: $('myForm'),
                        onSuccess: function (json) {
                            var dato, date, d, m, a;

                            $('formulario').getElements('.valor').each(function (input, i) {
                                if (json[input.getProperty('id')]) {
                                    id = input.getProperty('id');
                                    dato = json[id];

                                    if (input.hasClass('primary')) {
                                        input.setProperty('disabled', 'disabled');
                                    }

                                    if (input.type == 'checkbox') {
                                        if (dato != '' && dato.toInt() == 1) {
                                            input.checked = true;
                                        }
                                    } else {
                                        input.setProperty('value', dato);
                                    }
                                }
                            });
                        }
                    }).send();

                    new Request.HTML({
                        url: './abm/reglas.php',
                        method: 'post',
                        data: {
                            'id': id,
                            'ruta': $('ruta').getProperty('value'),
                            'accion': 'C_REGLAS'
                        },
                        onSuccess: function (a, b, html, js) {
                            $('dgReglas').empty();
                            $('dgReglas').setProperty('html', html);

                            aplicarEventoClickRowsReglas();

                            recargarScroll($('dgReglas'));
                        }
                    }).send();

                });
            });
        }
    }


    function habilApartirReglas(combo) {
        var selected = $(combo).value;
        var apartir = $$('.apartir');
        apartir.each(function (input, i) {
            if (selected == 2) {
                $(input).setProperty('disabled', 'disabled');
            } else {
                $(input).removeProperty('disabled');
            }
        });
    }

    function aplicarEventoClickRowsReglas(tr) {
        if (!tr) {
            $('dgReglas').getElements('tr').each(function (tr) {
                tr.addEvent('click', function () {
                    if ($('dgReglas').getElement('.blue')) {
                        $('dgReglas').getElement('.blue').removeClass('blue');
                    }
                    tr.addClass('blue');

                    var THoCont = this.getElement('.borrar').getProperty('data-id');

                    new Request.HTML({
                        url: './abm/reglas.php',
                        method: 'post',
                        data: {
                            'THoCont': THoCont,
                            'accion': 'LEER_REGLA'
                        },
                        onSuccess: function (a, b, html, js) {
                            $('reglasConfig').empty();
                            $('reglasConfig').setProperty('html', html);
                            aplicarClickCheckboxsReglas();

                            Ink.Autoload.run();

                        }
                    }).send();
                });

                if (tr.getElement('.icon_borrar')) {
                    tr.getElement('.icon_borrar').addEvent('click', function () {
                        if ($('dgReglas').getElement('.blue')) {
                            var THoCont = this.getProperty('data-id');
                            borrarRegla(this.getParent('tr'), THoCont);
                        }
                    });
                }
            });
        } else {
            tr.addEvent('click', function () {
                if ($('dgReglas').getElement('.blue')) {
                    $('dgReglas').getElement('.blue').removeClass('blue');
                }
                tr.addClass('blue');

                var THoCont = this.getElement('.borrar').getProperty('data-id');

                new Request.HTML({
                    url: './abm/reglas.php',
                    method: 'post',
                    data: {
                        'THoCont': THoCont,
                        'accion': 'LEER_REGLA'
                    },
                    onSuccess: function (a, b, html, js) {
                        //$$('.tabs-nav .active').removeClass('active');
                        $('reglasConfig').empty();
                        $('reglasConfig').setProperty('html', html);
                        aplicarClickCheckboxsReglas();
                    }
                }).send();
            });

            if (tr.getElement('.icon_borrar')) {
                tr.getElement('.icon_borrar').addEvent('click', function () {
                    if ($('dgReglas').getElement('.blue')) {
                        var THoCont = this.getProperty('data-id');
                        borrarRegla(this.getParent('tr'), THoCont);
                    }
                });
            }

            tr.fireEvent('click');
        }
    }

    function actualizarRegla() {
        var horasInvalidas = false;

        if ($$('.valor.red')[0]) {
            horasInvalidas = true;
        }

        if (horasInvalidas == false) {
            new Request.HTML({
                url: './abm/reglas.php',
                method: 'post',
                data: $("reglasConfig"),
                onSuccess: function (a, b, html, js) {
                    informar("Datos actualizados");
                }
            }).send();
        } else {
            alertar("Algun horario tiene formato invalido.")
        }

    }

    function aplicarClickCheckboxsReglas() {
        $('reglasConfig').getElements('.checkbox').each(function (chk) {
            chk.addEvent('click', function () {

                if (this.checked) {
                    this.getPrevious('.valor_check').setProperty('value', '1');
                } else {
                    this.getPrevious('.valor_check').setProperty('value', '0');
                }
            });
        });
    }

    function cargarDetalleRotacion() {
        var RotCodi = $('rotacion').getProperty('value');
        var desde = $('desde').getProperty('value');

        new Request.HTML({
            'url': './rotacion.php',
            'data': {
                'RotCodi': RotCodi,
                'desde': desde
            },
            'evalScripts': false,
            onSuccess: function (a, b, c, d) {
                $('divDetalleRotacion').setProperty('html', c);
                eval(d);
            }
        }).send();
    }

    function rearmarGrillaRotacion(indice) {
        var seguir = true;
        var i = 1;
        var desde = $('desde').getProperty('value').split('/');
        var dia = desde[0];
        var mes = desde[1];
        var anio = desde[2];

        var fecha = new Date(anio, mes - 1, dia, 0, 0, 0);
        var inicio = new Date();
        inicio.setTime(fecha.getTime() - (indice - 1) * 1000 * 60 * 60 * 24);

        while (seguir) {
            if ($('fecha_input_' + i)) {
                $('fecha_input_' + i).setProperty('text', formatoFecha(inicio));
                inicio.setTime(inicio.getTime() + 1000 * 60 * 60 * 24);
                //$('fecha_input_' + indice).setProperty('text', dia + '/' + mes + '/' + anio);
            } else {
                seguir = false;
            }
            i++;
        }
    }


    function obtenerListadoJerarquias() {
        var nivel = $('cboNivel').getProperty('value');
        var usuario = $('cboUsuario').getProperty('value');

        new Request.HTML({
            url: './buscar/jerarquias.php',
            method: 'post',
            data: {
                'nivel': nivel,
                'usuario': usuario,
                'accion': 'BUSCAR'
            },
            onSuccess: function (a, b, html, d) {
                $('datosListado').setProperty('html', html);

                $('datosListado').getElement('.checkbox').addEvent('click', function () {
                    if (this.checked) {
                        this.getPrevious().setProperty('value', '1');
                    } else {
                        this.getPrevious().setProperty('value', '0');
                    }
                });

                aplicarMooltiselectListado();
				Ink.Autoload.run();
            }
        }).send();
    }

    function aplicarMooltiselectListado() {
        var lista = $$('.mooltiselect')[0];
        var name = lista.getProperty('data-name');

        new mooltiselect({
            'options': 'option',
            'list': $(lista).getProperty('id'),
            'name': name + '[]',
            'selectedClass': 'selected',
            'btnAll': true,
            'btnNon': true
        });
    }

    function guardarDatosJerarquias() {

        $('accion').setProperty('value', 'ACEPTAR');

        new Request.HTML({
            url: './abm/jerarquias.php',
            method: 'post',
            data: $('formJerarquias'),
            onSuccess: function (a, b, html, d) {
                informar("Datos grabados con exito");
            }
        }).send();
    }

    function cargarDetalleControl(fecha, legajo) {
        new Request.HTML({
            url: './detalle/diario.php',
            data: $('formDiario'),
            evalScripts: false,
            onRequest: function () {
                $('divDetalleLiquidacionDiaria').setProperty('html', '');
            },
            onSuccess: function (a, b, c, d) {
                $('divDetalleLiquidacionDiaria').setProperty('html', c);

                if ($('totalFichadas')) {
                    $$('#grillaLiquidacionDiariaTbody .blue')[0].getElement('.fichadas').setProperty('text', $('totalFichadas').value);
                    $$('#grillaLiquidacionDiariaTbody .blue')[0].getElement('.horas').setProperty('text', $('totalHoras').value);
                    $$('#grillaLiquidacionDiariaTbody .blue')[0].getElement('.novedades').setProperty('text', $('totalNovedades').value);
                }
                eval(d);
            }
        }).send();

    }

    function buscarLiquidacionDiaria() {
        new Request.HTML({
            url: './buscar/diario.php',
            data: $('formDiario'),
            evalScripts: false,
            onRequest: function () {
                $('grillaLiquidacionDiaria').setProperty('html', '<tr><td colspan="12"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></td></tr>');
                $('divDetalleLiquidacionDiaria').empty();
            },
            onSuccess: function (a, b, c, d) {
                if ($('filtroLiquidacion').getSize().y != 0) {
                    new Fx.Tween('filtroLiquidacion', {
                        onStart: function () {
                            $('filtroLiquidacion').setStyle('overflow', 'hidden');
                        }
                    }).start('height', 0);
                }

                $('grillaLiquidacionDiaria').setProperty('html', c);
                eval(d);
                $('fotoLiquidacionDiaria').setStyle('display', 'block');
            }
        }).send();
    }

    function aplicarEventoClickDiaCalendario() {
        $('calendario').getElements('.diaDatos').each(function (d) {
            d.removeEvent(['click']);
            d.addEvent('click', function (e) {
                if (!e || (e && !e.control)) {
                    $$('.dias.selected').removeClass('selected');
                    this.addClass('selected');
                    var $this = this;

                    $('divSel').setProperty('value', $this.getProperty('id'));

                    new Request.HTML({
                        url: './detalle/mensualDiario.php',
                        data: {
                            'dia': $this.getProperty('dia'),
                            'mes': $this.getProperty('mes'),
                            'ano': $this.getProperty('ano'),
                            'legajo': $('dgDatosFiltro').getElement('.blue').getProperty('data-id')
                        },
                        onSuccess: function (a, b, html, d) {
                            $('detalleDiario').setProperty('html', html);
                            cargarDetalleTotalesCalendario();
                            eval(d);
                        }
                    }).send();
                } else {
                    if (this.hasClass('selected')) {
                        this.removeClass('selected');
                    } else {
                        this.addClass('selected');
                    }
                }
            });
        });
    }

    function aplicarEventoClickCerrarDia() {
        $('calendario').getElements('.cerrarDia').each(function (icon) {
            icon.removeEvents(['click']);
            icon.addEvent('click', function () {
                cerrarDiaCalendario(this.getParent('.dias'));
            });
        });
    }

    function cerrarDiaCalendario(div, masivo, cont) {
        console.log('click')
        var icono = div.getElement('.cerrarDia');
        var estado = icono.getProperty('rel').toInt();
        var nuevoEstado;
        var legajo = $('dgDatosFiltro').getElement('.blue').getProperty('data-id');
        var fecha = div.getProperty('dia') + '/' + div.getProperty('mes') + '/' + div.getProperty('ano');

        if (estado == 0) {
            nuevoEstado = 1;
        } else {
            nuevoEstado = 0;
        }

        new Request.HTML({
            url: './abm/diacerrado.php',
            data: {
                'DiaFech': fecha,
                'DiaLeg': legajo,
                'DiaEstado': 1 - estado
            },
            onRequest: function () {
                if (masivo) {
                    grabandoCerrarDia = true;
                }
            },
            onSuccess: function (a, b, html, d) {
                if (html && html.trim() != '') {
                    if (!masivo) {
                        alertar(html);
                    } else {
                        grabandoCerrarDia = false;
                        mensajesErrorCerrarDiasMasivo += div.getProperty('dia') + '/' + div.getProperty('mes') + '/' + div.getProperty('ano') + ' - ';

                        diasCerrados++;
                    }
                } else {
                    if (estado == 0) {
                        icono.setProperty('rel', 1);
                        icono.removeClass('fa-unlock');
                        icono.addClass('fa-lock');
                    } else {
                        icono.setProperty('rel', 0);
                        icono.removeClass('fa-lock');
                        icono.addClass('fa-unlock');
                    }
                }
            }
        }).send();
    }

    function aplicarEventoCerrarTodosCalendario() {
        if ($('cerrarTodos')) {
            $('cerrarTodos').addEvent('click', function () {

                mensajesErrorCerrarDiasMasivo = '';
                diasTotalCerrados = 0;
                diasCerrados = 0;
                grabandoCerrarDia = false;

                if ($$('.calendario .selected').length == 1) {
                    var accion = function () {

                        $$('.diaDatos').each(function (div) {
                            if (!div.hasClass('nov') && !div.hasClass('hornov') && div.getElement('.cerrarDia').getProperty('rel').toInt() == 0) {
                                diasTotalCerrados += 1;
                            }
                        });

                        $$('.diaDatos').each(function (div) {
                            if (!div.hasClass('nov') && !div.hasClass('hornov') && div.getElement('.cerrarDia').getProperty('rel').toInt() == 0) {
                                cerrarDiaCalendario(div, 'masivo');
                            }
                        });

                        if (diasTotalCerrados > 0) {
                            timerDiasCerrados = verificarDiasCerrados.periodical(300);
                        }
                    }
                    confirmar('Esta seguro de cerrar todos los dias?', accion);
                } else {
                    var accion = function () {

                        $$('.calendario .selected').each(function (div) {
                            if (!div.hasClass('nov') && !div.hasClass('hornov') && div.getElement('.cerrarDia').getProperty('rel').toInt() == 0) {
                                diasTotalCerrados += 1;
                            }
                        });

                        $$('.calendario .selected').each(function (div) {
                            if (!div.hasClass('nov') && !div.hasClass('hornov') && div.getElement('.cerrarDia').getProperty('rel').toInt() == 0) {
                                cerrarDiaCalendario(div, 'masivo');
                            }
                        });

                        if (diasTotalCerrados > 0) {
                            timerDiasCerrados = verificarDiasCerrados.periodical(300);
                        }
                    }
                    confirmar('Esta seguro de cerrar los dias seleccionados?', accion);
                }
            });
        }
    }

    function eventosMoverCalendarioMensual() {

        $('mesMenos').addEvent('click', function () {
            var dia = $('txtDia').getProperty('value');
            var prevMonth = parseInt($('txtMes').getProperty('rel')) - 1;
            var prevYear = parseInt($('txtMes').getProperty('year'));

            if (prevMonth <= 0) {
                prevMonth = 11;
                prevYear = prevYear - 1
            }

            $('txtMes').setProperties(
                    {
                        'rel': prevMonth,
                        'year': prevYear,
                        'text': obtenerNombreMes(prevMonth) + ' ' + prevYear
                    }
            );

            if (fnLoadCalendar) {
                clearTimeout(fnLoadCalendar);
            }

            fnLoadCalendar = setTimeout(function () {
                new Request.HTML({
                    url: 'detalle/mensual.php',
                    data: {
                        'dia': dia,
                        'mes': prevMonth,
                        'ano': prevYear,
                        'legajo': $('dgDatosFiltro').getElement('.blue').getProperty('data-id')
                    },
                    onRequest: function () {
                        $('calendario').empty();
                    },
                    onSuccess: function (a, b, c, d) {
                        $('calendario').setProperty('html', c);

                        if (fnLoadCalendar) {
                            clearTimeout(fnLoadCalendar);
                        }
                        eval(d);
                    }
                }).send();
            }, 1000);
        });

        $('mesMas').addEvent('click', function () {
            var dia = $('txtDia').getProperty('value');
            var nextMonth = parseInt($('txtMes').getProperty('rel')) + 1;
            var nextYear = parseInt($('txtMes').getProperty('year'));

            if (nextMonth >= 12) {
                nextMonth = 0;
                nextYear = nextYear + 1;
            }

            $('txtMes').setProperties(
                    {
                        'rel': nextMonth,
                        'year': nextYear,
                        'text': obtenerNombreMes(nextMonth) + ' ' + nextYear
                    }
            );

            if (fnLoadCalendar) {
                clearTimeout(fnLoadCalendar);
            }

            fnLoadCalendar = setTimeout(function () {
                new Request.HTML({
                    url: 'detalle/mensual.php',
                    data: {
                        'dia': dia,
                        'mes': nextMonth,
                        'ano': nextYear,
                        'legajo': $('dgDatosFiltro').getElement('.blue').getProperty('data-id')
                    },
                    onRequest: function () {
                        $('calendario').empty();
                    },
                    onSuccess: function (a, b, c, d) {
                        $('calendario').setProperty('html', c);

                        if (fnLoadCalendar) {
                            clearTimeout(fnLoadCalendar);
                        }
                        eval(d);
                    }
                }).send();
            }, 500);
        });

        $('txtDia').addEvent('click', function () {
            this.select();
        });

        $('txtDia').addEvent('blur', function () {
            var mes = parseInt($('txtMes').getProperty('rel'));
            var ano = parseInt($('txtMes').getProperty('year'));
            var dia = this.value.toInt();

            var fecha = new Date(ano, mes - 1, 1, 0, 0, 0);
            var ultimo = new Date(ano, mes, 0, 0, 0, 0);

            if (dia < fecha.getDate()) {
                dia = 1;
            }

            if (dia > ultimo.getDate()) {
                dia = ultimo.getDate();
            }

            if (fnLoadCalendar) {
                clearTimeout(fnLoadCalendar);
            }

            fnLoadCalendar = setTimeout(function () {
                new Request.HTML({
                    url: 'detalle/mensual.php',
                    data: {
                        'dia': dia,
                        'mes': mes,
                        'ano': ano,
                        'legajo': $('dgDatosFiltro').getElement('.blue').getProperty('data-id')
                    },
                    onRequest: function () {
                        $('calendario').empty();
                    },
                    onSuccess: function (a, b, c, d) {
                        $('calendario').setProperty('html', c);

                        if (fnLoadCalendar) {
                            clearTimeout(fnLoadCalendar);
                        }
                        eval(d);
                    }
                }).send();
            }, 500);
        });

        $('txtDia').addEvent('keydown', function (event) {
            event.stop;
            var key = event.key;

            if (key == 'enter') {
                var mes = parseInt($('txtMes').getProperty('rel'));
                var ano = parseInt($('txtMes').getProperty('year'));
                var dia = this.value;

                if (fnLoadCalendar) {
                    clearTimeout(fnLoadCalendar);
                }

                fnLoadCalendar = setTimeout(function () {
                    new Request.HTML({
                        url: 'detalle/mensual.php',
                        data: {
                            'dia': dia,
                            'mes': mes,
                            'ano': ano,
                            'legajo': $('dgDatosFiltro').getElement('.blue').getProperty('data-id')
                        },
                        onRequest: function () {
                            $('calendario').empty();
                        },
                        onSuccess: function (a, b, c, d) {
                            $('calendario').setProperty('html', c);

                            if (fnLoadCalendar) {
                                clearTimeout(fnLoadCalendar);
                            }
                            eval(d);
                        }
                    }).send();
                }, 500);
            }
        });

        $('diaMas').addEvent('click', function () {
            var nextDay = parseInt($('txtDiaEmpieza').getProperty('value')) + 1;
            var day = $('txtDiaEmpieza').getProperty('value');
            var month = parseInt($('txtMes').getProperty('rel')) - 1;
            var year = parseInt($('txtMes').getProperty('year'));
            var today = new Date().set('year', year).set('month', month).set('date', day);
            var endDay = today.get('lastdayofmonth');

            if (nextDay > endDay) {
                nextDay = 1;
                month++;

                if (month > 11) {
                    month = 0;
                    year++;
                }
            }
            month++;

            $('txtMes').setProperties(
                    {
                        'rel': month,
                        'year': year,
                        'text': obtenerNombreMes(month) + ' ' + year
                    }
            );

            $('txtDia').setProperty('value', nextDay);
            $('txtDiaEmpieza').setProperty('value', nextDay);

            if (fnLoadCalendar) {
                clearTimeout(fnLoadCalendar);
            }

            fnLoadCalendar = setTimeout(function () {
                new Request.HTML({
                    url: 'detalle/mensual.php',
                    method: 'post',
                    data: {
                        'dia': nextDay,
                        'mes': month,
                        'ano': year,
                        'legajo': $('dgDatosFiltro').getElement('.blue').getProperty('data-id')
                    },
                    onRequest: function () {
                        $('calendario').empty();
                    },
                    onSuccess: function (a, b, c, d) {
                        $('calendario').setProperty('html', c);

                        if (fnLoadCalendar) {
                            clearTimeout(fnLoadCalendar);
                        }
                        eval(d);
                    }
                }).send();
            }, 500);
        });

        $('diaMenos').addEvent('click', function () {
            var prevDay = parseInt($('txtDiaEmpieza').getProperty('value')) - 1;
            var day = $('txtDiaEmpieza').getProperty('value');
            var month = parseInt($('txtMes').getProperty('rel')) - 1;
            var year = parseInt($('txtMes').getProperty('year'));

            if (prevDay < 1) {
                month--;
                if (month <= 0) {
                    month = 11;
                    year--;
                }
                var today = new Date().set('year', year).set('month', month).set('date', day);
                var endDay = today.get('lastdayofmonth');
                prevDay = endDay;
            }

            month++;

            $('txtMes').setProperties(
                    {
                        'rel': month,
                        'year': year,
                        'text': obtenerNombreMes(month) + ' ' + year
                    }
            );

            $('txtDia').setProperty('value', prevDay);
            $('txtDiaEmpieza').setProperty('value', prevDay);

            if (fnLoadCalendar) {
                clearTimeout(fnLoadCalendar);
            }

            fnLoadCalendar = setTimeout(function () {
                new Request.HTML({
                    url: 'detalle/mensual.php',
                    data: {
                        'dia': prevDay,
                        'mes': month,
                        'ano': year,
                        'legajo': $('dgDatosFiltro').getElement('.blue').getProperty('data-id')
                    },
                    onRequest: function () {
                        $('calendario').empty();
                    },
                    onSuccess: function (a, b, c, d) {
                        $('calendario').setProperty('html', c);

                        if (fnLoadCalendar) {
                            clearTimeout(fnLoadCalendar);
                        }
                        eval(d);
                    }
                }).send();
            }, 500);
        });
    }

    function obtenerNombreMes(mes) {
        var nombreMes = '';

        switch (mes.toInt()) {
            case 1:
                nombreMes = "Enero";
                break;
            case 2:
                nombreMes = "Febrero";
                break;
            case 3:
                nombreMes = "Marzo";
                break;
            case 4:
                nombreMes = "Abril";
                break;
            case 5:
                nombreMes = "Mayo";
                break;
            case 6:
                nombreMes = "Junio";
                break;
            case 7:
                nombreMes = "Julio";
                break;
            case 8:
                nombreMes = "Agosto";
                break;
            case 9:
                nombreMes = "Septiembre";
                break;
            case 10:
                nombreMes = "Octubre";
                break;
            case 11:
                nombreMes = "Noviembre";
                break;
            case 12:
                nombreMes = "Diciembre";
                break;
        }

        return nombreMes;
    }

    function cargarDetalleTotalesCalendario() {
        new Request.HTML({
            url: 'detalle/mensualTotales.php',
            data: {
                'dia': $('txtDia').getProperty('value'),
                'mes': $('txtMes').getProperty('rel'),
                'ano': $('txtMes').getProperty('year'),
                'legajo': $('dgDatosFiltro').getElement('.blue').getProperty('data-id')
            },
            onSuccess: function (a, b, html, d) {
                $('detalleTotales').setProperty('html', html);
            }
        }).send();
    }

    function aplicarEventoDrag() {
        $$('.drag').each(function (item) {

            item.addEvent('mousedown', function (e) {
                var $this = this;

                var clone = this.clone()
                        .addClass('drag')
                        .setStyles(this.getCoordinates())
                        .setStyles({'opacity': 0.7, 'position': 'absolute', 'width': '60px'})
                        .addEvent('emptydrop', function () {
                            this.remove();
                        }).inject(document.body);

                var drag = clone.makeDraggable({
                    droppables: $$('.diaDatos'),
                    onDrop: function (element, droppable, event) {
                        var divSel = $('divSel').getProperty('value');

                        if (droppable && droppable != $(divSel) && (droppable.hasClass('diaDatos') || droppable.getParent().hasClass('diaDatos'))) {

                            if (droppable.getElement('.cerrarDia').getProperty('rel').toInt() == 0) {

                                var accionCopiar = function () {
                                    var dia = droppable.getProperty('dia');
                                    var mes = droppable.getProperty('mes');
                                    var ano = droppable.getProperty('ano');

                                    $('txtRegAccion').value = 'A';
                                    $('txtRegFeRe').value = dia + '/' + mes + '/' + ano;
                                    $('txtRegFeAs').value = dia + '/' + mes + '/' + ano;
                                    $('txtRegFech').value = dia + '/' + mes + '/' + ano;
                                    $('txtRegHora').setProperty('value', element.getData("reghora"));
                                    $('txtRegHoRe').setProperty('value', element.getData("reghore"));

                                    new Request.HTML({
                                        url: './abm/registro.php',
                                        data: $('formFichada'),
                                        onRequest: function () {
                                            if ($('loading')) {
                                                $('overlay').setStyles({'opacity': '0.70', 'z-index': '999'});
                                                $('overlay').show();
                                                $('loading').show();
                                            }
                                        },
                                        onSuccess: function (a, b, html, js) {
                                            if ($('loading')) {
                                                $('overlay').setStyles({'opacity': '0', 'z-index': '0'});
                                                $('overlay').hide();
                                                $('loading').hide();
                                            }

                                            informar(html);

                                            var divSel = 'dia' + dia;
                                            $(divSel).fireEvent('click');

                                            actualizarDiaCalendario($(divSel));
                                        }
                                    }).send();

                                    element.destroy();
                                }

                                var accionMover = function () {
                                    var valor = element.getProperty('text');
                                    var dia = droppable.getProperty('dia');
                                    var mes = droppable.getProperty('mes');
                                    var ano = droppable.getProperty('ano');

                                    $('txtRegAccion').value = 'B';
                                    $('txtRegFeRe').value = element.getData("regfere");
                                    $('txtRegFeAs').value = element.getData("regfeas");
                                    $('txtRegFech').value = element.getData("regfech");
                                    $('txtRegHora').value = element.getData("reghora");
                                    $('txtRegHoRe').value = element.getData("reghore");

                                    new Request.HTML({
                                        url: './abm/registro.php',
                                        data: $('formFichada'),
                                        onSuccess: function (a, b, html, js) {
                                            actualizarDiaCalendario($(divSel));
                                        }
                                    }).send();

                                    $('txtRegAccion').value = 'A';
                                    $('txtRegFeRe').value = dia + '/' + mes + '/' + ano;
                                    $('txtRegFeAs').value = dia + '/' + mes + '/' + ano;
                                    $('txtRegFech').value = dia + '/' + mes + '/' + ano;
                                    $('txtRegHora').value = element.getData("reghora");
                                    $('txtRegHoRe').value = element.getData("reghore");

                                    new Request.HTML({
                                        url: './abm/registro.php',
                                        data: $('formFichada'),
                                        onRequest: function () {
                                            if ($('loading')) {
                                                $('overlay').setStyles({'opacity': '0.70', 'z-index': '999'});
                                                $('overlay').show();
                                                $('loading').show();
                                            }
                                        },
                                        onSuccess: function (a, b, html, js) {
                                            if ($('loading')) {
                                                $('overlay').setStyles({'opacity': '0', 'z-index': '0'});
                                                $('overlay').hide();
                                                $('loading').hide();
                                            }

                                            informar(html);

                                            var divSel = 'dia' + dia;
                                            $(divSel).fireEvent('click');

                                            actualizarDiaCalendario($(divSel));
                                        }
                                    }).send();

                                    element.destroy();
                                }

                                confirmar("Que accion desea realizar", accionMover, "Accion", "Copiar", "Mover", accionCopiar);
                            } else {
                                element.destroy();
                                alertar('El dia esta cerrado.');
                            }
                        } else {
                            element.destroy();
                        }
                    },
                    onCancel: function (element, droppable, event) {
                        element.destroy();
                        $this.fireEvent('click');
                    }
                });

                drag.start(e);
            });
        });
    }

    function actualizarDiaCalendario(divDia) {
        new Request.HTML({
            url: './detalle/mensualDia.php',
            data: {
                'dia': divDia.getProperty('dia'),
                'mes': divDia.getProperty('mes'),
                'ano': divDia.getProperty('ano'),
                'legajo': $('dgDatosFiltro').getElement('.blue').getProperty('data-id')
            },
            onSuccess: function (a, b, html, d) {
                divDia.setProperty('html', html);

                divDia.removeClass('hornov');
                divDia.removeClass('nov');
                divDia.removeClass('hor');
                divDia.removeClass('nor');

                divDia.addClass(divDia.getElement('.claseDia').getProperty('data-clase'));

                eval(d);
            }
        }).send();
    }

    function verificarDiasCerrados() {
        if (diasCerrados == diasTotalCerrados) {
            mensajesErrorCerrarDiasMasivo = mensajesErrorCerrarDiasMasivo.substring(0, mensajesErrorCerrarDiasMasivo.lastIndexOf(('-')));
            alertar("Dias que no se pudieron cerrar porque falta procesar: <br>" + mensajesErrorCerrarDiasMasivo);

            clearInterval(timerDiasCerrados);
        }
    }

    function aplicarEventosCitacion() {
        if ($('teorico')) {

            $('teorico').addEvent('dblclick', function () {
                $('teorico').getElement('.horario').addClass('oculto');
                $('filaCitacion').removeClass('oculto');

                $('citDesde').setProperty('value', $('teorico').getElement('.horario').getProperty('data-entrada'));
                $('citHasta').setProperty('value', $('teorico').getElement('.horario').getProperty('data-salida'));
                $('citLaboral').setProperty('value', 1);
            });

            $('grabarCitacion').addEvent('click', function () {
                var divSel = $('divSel').getProperty('value');
                var entrada = $('citDesde').getProperty('value');
                var salida = $('citHasta').getProperty('value');
                var laboral = $('citLaboral').getProperty('value');
                var longOk = true;

                if (entrada.length < 5 || salida.length < 5) {
                    longOk = false;
                }

                if (entrada != '' && salida != '' && !$('citDesde').hasClass('red') && !$('citHasta').hasClass('red') && longOk == true) {
                    new Request.HTML({
                        url: './abm/mensualDiario.php',
                        data: {
                            'dia': $(divSel).getProperty('dia'),
                            'mes': $(divSel).getProperty('mes'),
                            'ano': $(divSel).getProperty('ano'),
                            'legajo': $('dgDatosFiltro').getElement('.blue').getProperty('data-id'),
                            'entrada': entrada,
                            'salida': salida,
                            'laboral': laboral,
                            'accion': 'grabarCitacion'
                        },
                        onSuccess: function (a, b, html, d) {
                            $('teorico').getElement('.horario').removeClass('oculto');
                            $('filaCitacion').addClass('oculto');
                            $('teorico').getElement('.horario').setProperty('text', entrada + ' a ' + salida);
                            $('teorico').getElement('.horario').setProperty('data-entrada', entrada);
                            $('teorico').getElement('.horario').setProperty('data-salida', salida);
                            actualizarDiaCalendario($(divSel));
                            eval(d);
                        }
                    }).send();
                }
            });

        }
    }

    function ejecutarAccion() {

        new Request.HTML({
            url: 'ejecutarAccion.php',
            method: 'post',
            data: $('myForm'),
            onSuccess: function (a, b, html, d) {
                informar("Proceso ejecutado");
            }
        }).send();
    }

    function agregarNovedadDiario() {
        $$('.tabs-content').addClass('hide-all');
        $$('#operacionesDiario li').removeClass('active');
        $$('#divNovedad').removeClass('hide-all');
        $$('#tabNovedad').addClass('active');

        $('FicNov').setProperty('value', -1);
        $('FicHoNo').setProperty('value', '00:00');
        $('FicJus').checked = false;
        $('FicAvis').checked = false;
        $('FicObs').setProperty('value', '');
    }

    function editarNovedadDiario(novedad, horas, just, avis, obse) {
        $('FicNov').setProperty('value', novedad);
        $('FicHoNo').setProperty('value', horas);
        $('FicJus').checked = just;
        $('FicAvis').checked = avis;
        $('FicObs').setProperty('value', obse);

        $$('.tabs-content').addClass('hide-all');
        $$('#operacionesDiario li').removeClass('active');
        $$('#divNovedad').removeClass('hide-all');
        $$('#tabNovedad').addClass('active');
    }

    function grabarNovedadDiario() {

    }

    function generarListaPredictiva() {
        $$('.autocomplete').removeEvents('blur', 'keyup', 'keydown');

        $$('.autocomplete').addEvent('blur', function (e) {

            if (e && this.getProperty('data-id').trim() != this.getProperty('value').trim()) {
                $(this).setProperty('value', '');
                $(this).setProperty('data-id', '');
            }

            if ($$('ul.autocomplete')) {
                var destroy = function () {
                    $$('ul.autocomplete').destroy();
                }
                setTimeout(destroy, 500);

                if ($(this).getProperty('value') == '') {
                    $(this).setProperty('data-id', '');
                }
            } else {
                $(this).setProperty('value', '');
                $(this).setProperty('data-id', '');
            }
        });

        $$('.autocomplete').addEvent('keydown', function (e) {
            if (e.key == 'enter') {
                e.stop();
                var ti = $(this).getProperty('tabindex') * 1 + (e.shift ? -1 : 1);

                $li = $(this).getNext('ul') ? $(this).getNext('ul').getFirst('li.marcado') : null;

                if ($li) {
                    $(this).setProperty('value', $li.getProperty('text'));
                    $(this).setProperty('data-id', $li.getProperty('data-id'));
                } else {
                    $(this).setProperty('value', '');
                    $(this).setProperty('data-id', '');
                }

                if ($$('input[tabindex=' + ti + ']')[0]) {
                    $$('input[tabindex=' + ti + ']')[0].focus();
                }
            }

            if (e.key == 'down') {
                e.stop();
                if ($(this).getNext('ul')) {
                    var $li = $(this).getNext('ul').getFirst('li.marcado') || $(this).getNext('ul').getFirst('li');
                    if ($li.getNext()) {
                        $li.removeClass('marcado');
                        $li.getNext().addClass('marcado');
                        $(this).setProperty('value', $li.getNext().getProperty('text'));
                        $(this).setProperty('data-id', $li.getNext().getProperty('data-id'));
                    }

                }
            }

            if (e.key == 'up') {
                e.stop();
                if ($(this).getNext('ul')) {
                    var $li = $(this).getNext('ul').getFirst('li.marcado') || $(this).getNext('ul').getFirst('li');
                    if ($li.getPrevious()) {
                        $li.removeClass('marcado');
                        $li.getPrevious().addClass('marcado');
                        $(this).setProperty('value', $li.getPrevious().getProperty('text'));
                        $(this).setProperty('data-id', $li.getPrevious().getProperty('data-id'));
                    }

                }
            }
        });

        $$('.autocomplete').addEvent('keyup', function (e) {
            if (e.key == 'enter') {
                e.stop();
                return false;
            }
            if (e.key != 'up' && e.key != 'down' && e.key != 'enter' && e.key != 'tab') {
                if (cargandoLista) {
                    cargandoLista.cancel();
                }
                var $el = $(this);

                cargandoLista = new Request.JSON({
                    url: './buscar/cargarLista.php',
                    data: {
                        dato: $(this).getProperty('value'),
                        tabla: $(this).getProperty('data-tabla'),
                        codigo: $(this).getProperty('data-codigo'),
                        nombre: $(this).getProperty('data-nombre')
                    },
                    onRequest: function () {
                        if ($$('ul.autocomplete')) {
                            $$('ul.autocomplete').destroy();
                        }
                    },
                    onSuccess: function (a) {

                        if (a.datos) {
                            var $ul = new Element('ul', {"class": "unstyled autocomplete"});

                            for (i = 0; i < a.datos.length; i++) {

                                var $li = new Element('li',
                                        {
                                            "data-id": a.datos[i].id,
                                            "text": a.datos[i].descripcion
                                        }
                                );

                                $li.addEvent('click', function () {
                                    if ($el.getProperty('data-campoNombre')) {
                                        campoNombre = $el.getProperty('data-campoNombre');
                                        $(campoNombre).setProperty('value', $(this).getProperty('text').split('|')[1].trim());
                                    }
                                    $el.setProperty('value', $(this).getProperty('text').split('|')[0].trim());
                                    $el.setProperty('data-id', $(this).getProperty('data-id'));

                                    $$('ul.autocomplete').destroy();
                                });

                                $li.addEvent('mouseenter', function () {
                                    $(this).addClass('marcado');
                                });

                                $li.addEvent('mouseleave', function () {
                                    $(this).removeClass('marcado');
                                });

                                $li.inject($ul);

                                if (i == 0) {
                                    $el.setProperty('data-id', a.datos[i].id);
                                    $li.addClass('marcado');
                                }
                            }
                            $ul.inject($el, 'after');
                        }
                    }
                });
                cargandoLista.send();
            }
        });
    }

    function aplicarEventoClickRowsIncidencias() {
        var id;

        if ($('dgDatos')) {
            $('dgDatos').getElements('tr').each(function (tr) {
                tr.addEvent('click', function () {
                    id = this.getProperty('data-id');

                    $$('#dgDatos .blue').removeClass('blue');
                    this.addClass('blue');

                    $('id').setProperty('value', id);

                    new Request.HTML({
                        url: './abm/incidencias.php',
                        method: 'post',
                        data: {
                            'nombre': $('botonActivo').getProperty('value').toLowerCase(),
                            'id': id,
                            'accion': 'C'
                        },
                        onSuccess: function (a, b, html, js) {
                            $('detalleIncidencias').setProperty('html', html);
                            generarListaPredictiva();
                            Ink.Autoload.run();
                            eval(js);
                        }
                    }).send();
                });
            });
        }
    }

    function aplicarEventoClickRowsGruposAlcoholemia() {
        var id;

        if ($('dgDatos')) {
            $('dgDatos').getElements('tr').each(function (tr) {
                tr.addEvent('click', function () {
                    id = this.getProperty('data-id');

                    $('btnNuevo').fireEvent('click');
                    this.addClass('blue');

                    $('id').setProperty('value', id);
                    $('idGrupo').setProperty('value', id);

                    new Request.HTML({
                        url: './abm/grupos.php',
                        method: 'post',
                        data: {
                            'id': id,
                            'accion': 'C'
                        },
                        onSuccess: function (a, b, html, js) {
                            $('detalleGrupo').setProperty('html', html);

                            if ($('idNivel')) {
                                $('idNivel').addEvent('change', function () {
                                    var id = this.getProperty('value');

                                    new Request.HTML({
                                        url: './abm/grupos.php',
                                        method: 'post',
                                        data: {
                                            'accion': 'NIVEL',
                                            'idNivel': id
                                        },
                                        onSuccess: function (a, b, html, js) {
                                            $('idSector').setProperty('html', html);
                                        }
                                    }).send();
                                });

                                //$('idNivel').fireEvent('change');
                            }

                            new Request.HTML({
                                url: './abm/incidenciasPorGrupo.php',
                                method: 'post',
                                data: {
                                    'idGrupo': id,
                                    'accion': 'C_GRUPO'
                                },
                                onSuccess: function (a, b, html, js) {
                                    $('dgDatos1').setProperty('html', html);

                                    aplicarEventoClickNivelIncidenciaPorGrupo();
                                    Ink.Autoload.run();
                                    eval(js);
                                }
                            }).send();
                        }
                    }).send();
                });
            });
        }
    }

    function aplicarEventoClickNivelIncidenciaPorGrupo() {
        var id;

        if ($('dgDatos1')) {
            $('dgDatos1').getElements('tr').each(function (tr) {
                tr.addEvent('click', function () {
                    id = this.getProperty('data-id');

                    $('btnNuevo1').fireEvent('click');
                    this.addClass('blue');

                    $('id1').setProperty('value', id);

                    new Request.HTML({
                        url: './abm/incidenciasPorGrupo.php',
                        method: 'post',
                        data: {
                            'id': id,
                            'accion': 'C'
                        },
                        onSuccess: function (a, b, html, js) {
                            $('detalleIncidenciaPorGrupo').setProperty('html', html);
                        }
                    }).send();
                });
            });
        }
    }

    function aplicarEventoClickRowsComedorMenues() {
        if ($('dgDatos')) {
            $('dgDatos').getElements('tr').each(function (tr) {
                tr.addEvent('click', function () {
                    var id = this.getProperty('data-id');

                    $$('#dgDatos .blue').removeClass('blue');
                    this.addClass('blue');

                    new Request.HTML({
                        url: './detalle/menues.php',
                        method: 'post',
                        data: {
                            'id': id,
                        },
                        onSuccess: function (a, b, html, js) {
                            $('detalleMenu').setProperty('html', html);
                            eval(js);
                        }
                    }).send();
                });
            });
        }
    }

    function aplicarEventoClickRowsComedorAsignacionMenues() {
        if ($('dgDatosFiltro')) {
            $('dgDatosFiltro').getElements('tr').each(function (tr) {
                tr.addEvent('click', function () {
                    var id = this.getProperty('data-id');

                    $$('#dgDatosFiltro .blue').removeClass('blue');
                    this.addClass('blue');

                    new Request.HTML({
                        url: './buscar/asignaciones.php',
                        method: 'post',
                        data: {
                            'MenLega': id
                        },
                        onRequest: function () {
                            $('divListaMenus').setProperty('html', '<b>Cargando Menues Asignados</b>');
                        },
                        onSuccess: function (a, b, html, js) {
                            $('divListaMenus').setProperty('html', html);
                        }
                    }).send();
                });
            });
        }
    }

    function agregarDivs_Close_y_Resize(resizable) {
        if ($('popup')) {
            var divBorrarPopup = new Element('div', {'class': 'divBorrarPopup'});
            var divResize = new Element('div', {'class': 'divResizePopup'});
            var imgBorrar = new Element('i', {'class': 'fa fa-window-close-o'});

            divBorrarPopup.adopt(imgBorrar);

            imgBorrar.addEvent('click', function () {
                newPopup.ocultar();
            });

            $('popup').adopt($(divBorrarPopup));

            if (resizable) {
                $('popup').adopt($(divResize));
            }
        }
    }

    function aplicarResize(divContenedor) {
        var divResize = $$('.divResizePopup')[0];
        var divBorrar = $$('.divBorrarPopup')[0];
        var altoMin = 400 + 'px';
        var altoMinGrilla = (altoMin.toInt() - 50) + 'px';
        var altoMax = (window.getScrollSize().y - 50) + 'px';

        $(divContenedor).makeResizable({
            style: true,
            precalculate: true,
            snap: 1,
            grid: false,
            handle: $(divResize),
            limit: {y: [400, window.getScrollSize().y - 50]},
            limit: {x: [600, window.getScrollSize().x - 50]},

            onStart: function (el) {
                el.addClass('active');
            },

            onDrag: function (e, a, b) {
                var l, t, ew, eh, el, et;
                eh = isNaN($(e).getStyle('height').toInt()) ? 0 : $(e).getStyle('height').toInt();
                et = isNaN($(e).getStyle('top').toInt()) ? 0 : $(e).getStyle('top').toInt();
                t = (eh + et);

                if (t.toInt() >= altoMin.toInt() && t.toInt() <= altoMax.toInt()) {
                    t = (t - 50) + 'px';
                    $(e).getElement('.dgAcciones').setStyle('height', t);
                } else {
                    if (t.toInt() < altoMin.toInt()) {
                        $(e).setStyle('height', altoMin);
                        $(e).getElement('.dgAcciones').setStyle('height', altoMinGrilla);
                    } else {
                        $(e).setStyle('height', altoMax);
                    }
                }
            },
            onComplete: function (el) {
                el.removeClass('active');
            }
        });
    }

    function cancelarAccion(idAccion, row) {
        var etiqCancelado = "Cancelado";

        var accion = function () {
            new Request.HTML({
                url: './abm/cancelarAccion.php',
                method: 'post',
                data: {'idAccion': idAccion
                },
                onSuccess: function (a, b, html, d) {
                    if (html) {
                        if (html != '') {
                            if ($(row)) {
                                var msjCancelado = html.split('\n')[0];
                                var fechaFin = html.split('\n')[1];

                                $(row).getElement('.estado').removeClass('procesando');
                                $(row).getElement('.estado').removeClass('espera');

                                $(row).getElement('.estado').setProperty('text', etiqCancelado);
                                $(row).getElement('.fechaFin').setProperty('text', fechaFin);
                                $(row).getElement('.mensaje').setProperty('text', msjCancelado);
                                $(row).getElement('.estado').addClass('cancelado');
                                $(row).getElement('.avance .barra').addClass('ribbed-orange');
                                $(row).getElement('.cancel img').destroy();
                            }
                        }
                    }
                }
            }).send();
        }
        confirmar('Esta seguro de borrarlo', accion);
    }

    function verAcciones() {
        newPopup.abrir("./buscar/verAcciones.php", '1024', '600', 'aplicarResize');
    }

    function cambiarClave() {
        newPopup.abrir("cambiarClave.php", '300', '200');
    }

    function aplicarEventoClickVisPersonas() {
        var id;

        $('dgDatosPersonas').getElements('tr').each(function (tr) {
            tr.addEvent('click', function (e) {
                id = this.getProperty('data-id');

                $('btnNuevo').fireEvent('click');

                $('accionPersona').setProperty('value', 'C');
                $('idPersona').setProperty('value', id);
                $('idRegPersona').setProperty('value', id);

                $$('#dgDatosPersonas .blue').removeClass('blue');

                this.addClass('blue');

                new Request.HTML({
                    url: './buscar/visitas.php',
                    method: 'post',
                    data: {
                        'id': id,
                        'accion': 'C_P'
                    },
                    onSuccess: function (a, b, html, js) {
                        $('datosPersona').setProperty('html', html);

                        mostrarVisitasPersona(e);
                    }
                }).send();
            });
        });
    }

    function grabarVisPersona() {
        var idRegistro = 0;
        var accion = "A_P";
        var camposCompletos = true;

        if ($('dgDatosPersonas').getElement('.blue')) {
            accion = 'M_P';
            idRegistro = $('dgDatosPersonas').getElement('.blue').getProperty('data-id');
        }

        $('idPersona').setProperty('value', idRegistro);
        $('accionPersona').setProperty('value', accion);

        new Request.JSON({
            url: './abm/visitas.php',
            method: 'post',
            data: $('formPersonas'),
            onSuccess: function (json) {
                var id = json.id;
                var numError = json.numError;

                if (numError.toInt() > 0) {
                    alertar('Se produjo un error en la grabacion');
                } else {
                    datos = {};
                    datos.idRegistro = id;
                    datos.grilla = 'dgDatosPersonas';

                    abrirPagina('./visitas.php', datos);

                    informar('Datos grabados con exito');
                }
            }
        }).send();
    }

    function borrarVisPersona() {
        if ($('dgDatosPersonas').getElement('.blue')) {
            var accion = function () {
                new Request.HTML({
                    url: './abm/visitas.php',
                    method: 'post',
                    data: {
                        'accion': 'B_P',
                        'id': $('dgDatosPersonas').getElement('.blue').getProperty('data-id')
                    },
                    onSuccess: function () {
                        $('dgDatosPersonas').getElement('.blue').destroy();
                        $('btnNuevo').fireEvent('click');
                    }
                }).send();
            }
            confirmar('Esta seguro de borrarlo', accion);
        }
    }

    function aplicarEventoClickVisVisitas(e) {
        var id;

        $('dgDatosVisitas').getElements('tr').each(function (tr) {
            tr.addEvent('click', function () {
                id = this.getProperty('data-id');

                $('btnNuevoVis').fireEvent('click');

                $('accionVisita').setProperty('value', 'C');
                $('idVisita').setProperty('value', id);

                $$('#dgDatosVisitas .blue').removeClass('blue');
                this.addClass('blue');

                new Request.HTML({
                    url: './buscar/visitas.php',
                    method: 'post',
                    data: {
                        'idVisita': id,
                        'accion': 'C_V'
                    },
                    onSuccess: function (a, b, html, js) {
                        $('datosVisita').setProperty('html', html);
                    }
                }).send();
            });
        });

        if (!e) {
            if ($('idRegVisitaSel').getProperty('value') != 0) {
                var clase = '._' + $('idRegVisitaSel').getProperty('value');

                $('dgDatosVisitas').getElement(clase).fireEvent('click');
            }
        }

    }

    function grabarVisVisita() {
        var idRegistro = 0;
        var accion = "A_V";

        if ($('dgDatosVisitas').getElement('.blue')) {
            accion = 'M_V';
            idRegistro = $('dgDatosVisitas').getElement('.blue').getProperty('data-id');
        }

        $('idVisita').setProperty('value', idRegistro);
        $('accionVisita').setProperty('value', accion);

        if (camposObligatoriosCompletos($('formVisitas')) == true) {
            var fechaD = $('fechaDesde').getProperty('value');
            var horaD = $('horaDesde').getProperty('value');
            var fechaH = $('fechaHasta').getProperty('value');
            var horaH = $('horaHasta').getProperty('value');
            var y, m, d, h, mi, fechaD, fechaH;

            y = fechaD.split('/')[2];
            m = fechaD.split('/')[1];
            d = fechaD.split('/')[0];
            h = horaD.split(':')[0];
            mi = horaD.split(':')[1];
            fechaD = y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + '00';

            y = fechaH.split('/')[2];
            m = fechaH.split('/')[1];
            d = fechaH.split('/')[0];
            h = horaH.split(':')[0];
            mi = horaH.split(':')[1];
            fechaH = y + '-' + m + '-' + d + ' ' + h + ':' + mi + ':' + '00';

            $('fechaHoraDesde').setProperty('value', fechaD);
            $('fechaHoraHasta').setProperty('value', fechaH);

            new Request.JSON({
                url: './abm/visitas.php',
                method: 'post',
                data: $('formVisitas'),
                onSuccess: function (json) {
                    var id = json.id;
                    var numError = json.numError;

                    if (numError.toInt() > 0) {
                        alertar('Se produjo un error en la grabacion');
                    } else {
                        datos = {};
                        datos.idRegistro = $('dgDatosPersonas').getElement('.blue').getProperty('data-id');
                        datos.idRegistro2 = id;
                        datos.grilla = 'dgDatosPersonas';

                        abrirPagina('./visitas.php', datos);

                        informar('Datos grabados con exito');
                    }
                }
            }).send();
        } else {
            alertar('Complete los campos obligatorios');
        }
    }

    function borrarVisVisita() {
        if ($('dgDatosVisitas').getElement('.blue')) {
            var accion = function () {
                new Request.HTML({
                    url: './abm/visitas.php',
                    method: 'post',
                    data: {
                        'accion': 'B_V',
                        'id': $('dgDatosVisitas').getElement('.blue').getProperty('data-id')
                    },
                    onSuccess: function () {
                        $('dgDatosVisitas').getElement('.blue').destroy();
                        $('btnNuevoVis').fireEvent('click');
                    }
                }).send();
            }
            confirmar('Esta seguro de borrarlo', accion);
        }
    }

    function limpiarCamposVisitas(form) {
        form.getElements('.valor').setProperty('value', '');

        if (form.getProperty('id') == 'formPersonas') {
            $('divVisitas').addClass('oculto');

            $$('#dgDatosPersonas .blue').removeClass('blue');
            $$('#dgDatosVisitas .blue').removeClass('blue');
            $('idPersona').setProperty('value', 0);
            $('idVisita').setProperty('value', 0);
        } else {
            $$('#dgDatosVisitas .blue').removeClass('blue');
            $('idVisita').setProperty('value', 0);
        }
    }

    function mostrarVisitasPersona(e) {
        new Request.HTML({
            url: './buscar/visitas.php',
            method: 'post',
            data: {
                'id': $('dgDatosPersonas').getElement('.blue').getProperty('data-id'),
                'accion': 'C_PV'
            },
            onSuccess: function (a, b, html, js) {
                $('dgDatosVisitas').setProperty('html', html);
                $('divVisitas').removeClass('oculto');

                aplicarEventoClickVisVisitas(e);
            }
        }).send();
    }

    function filtrarPersonas() {
        $('btnNuevo').fireEvent('click');

        new Request.HTML({
            url: './buscar/visitas.php',
            method: 'post',
            data: {
                'pasaporte': $('valorPasaporte').getProperty('value'),
                'accion': 'filtroPersonas'
            },
            onSuccess: function (a, b, html, js) {
                $('dgDatosPersonas').setProperty('html', html);
                aplicarEventoClickVisPersonas();
            }
        }).send();
    }

    function sacarFoto() {
        if ($('dgDatosPersonas').getElement('.blue')) {
            newPopup.abrir("./tomarFoto.php", '800', '380');
        } else {
            alertar("Seleccione una persona.");
        }
    }

    function buscarOcurrenciasVisPersona() {

        if (camposObligatoriosCompletos($('formPersonas')) == true) {
            var apellido = $('apellido').getProperty('value');
            var nombre = $('nombre').getProperty('value');
            var accion = "ocurrenciasPersona";
            var idRegistro = 0;

            if ($('dgDatosPersonas').getElement('.blue')) {
                idRegistro = $('dgDatosPersonas').getElement('.blue').getProperty('data-id');
            }

            newPopup.abrir("./buscar/visitas.php?idRegistro=" + idRegistro + "&apellido=" + apellido + "&nombre=" + nombre + "&accion=" + accion, "640", "480");
        } else {
            alertar("Complete los campos obligatorios.");
        }
    }

    function abrir_cerrar_dia(fecha, legajo, estado, icono) {

        if (estado < 0) {
            estado = 0;
        }

        new Request.HTML({
            url: './abm/diacerrado.php',
            data: {
                'DiaFech': fecha,
                'DiaLeg': legajo,
                'DiaEstado': 1 - estado
            },
            onSuccess: function (a, b, html, d) {
                if (html && html.trim() != '') {
                    alertar(html);
                } else {
                    if (estado == 0) {
                        icono.setProperty('rel', 1);
                        icono.removeClass('fa-unlock-alt');
                        icono.addClass('fa-lock');
                        informar('Dia cerrado');
                    } else {
                        icono.setProperty('rel', 0);
                        icono.removeClass('fa-lock');
                        icono.addClass('fa-unlock-alt');
                        informar('Dia abierto');
                    }
                    icono.getParent('tr').setProperty('data-estado', 1 - estado);
                }
            }
        }).send();
    }

    function recorrerElementos(elemento, funcion) {
        if (Array.isArray(elemento)) {
            Array.each(elemento, function (valor, index) {
                funcion(valor, index);
            });
        } else {
            for (var propiedad in (elemento)) {
                funcion(elemento[propiedad], propiedad);
            }
        }
    }


    function eliminarElemento(arr, item) {
        var i = arr.indexOf(item);
        i !== -1 && arr.splice(i, 1);
    }

    function aplicarEventoClickRowsRevisiones(funcionAlClickear) {
        if ($('dgDatos')) {
            $('dgDatos').getElements('tr').each(function (tr) {
                tr.addEvent('click', function () {
                    var id;
                    id = tr.getProperty('data-id');
                    revisionSeleccionada = id;

                    $$('#dgDatos .blue').removeClass('blue');
                    tr.addClass('blue');

                    new Request.JSON({
                        url: './abm/revision.php',
                        method: 'post',
                        data: {
                            'titulo': $('botonActivo').getProperty('value').toLowerCase(),
                            'id': id,
                            'accion': 'C'
                        },
                        onSuccess: function (data) {
                            $('detalleIncidencias').getElement('.id').value = id;
                            $('detalleIncidencias').getElement('.titulo').value = data['titulo'];
                            $('detalleIncidencias').getElement('.acepta_no_aplicable').setProperty('checked', (data['acepta_no_aplicable']) ? 'checked' : false);
                            $('detalleIncidencias').getElement('.porcentaje_aprobacion').value = data['porcentaje_aprobacion'];

                            $('detalleIncidencias').getElement('.titulo').setProperty('disabled', false);
                            $('detalleIncidencias').getElement('.acepta_no_aplicable').setProperty('disabled', false);
                            $('detalleIncidencias').getElement('.porcentaje_aprobacion').setProperty('disabled', false);
                        }
                    }).send();

                    if (funcionAlClickear != undefined)
                        funcionAlClickear(id);
                });
            });
        }
    }



    function initClickeable(controlNumero, funcionAlClickear) {

        if ($$('.lista-clickeable')) {
            $$('.lista-clickeable .datos tr').addEvent('mouseup', function () {
                var control, elegido;
                control = this.getParent("table.lista-clickeable").getProperty("data-control");
                elegido = this.getProperty("data-id");

                $$(".lista-clickeable[data-control=" + control + "] tr").setStyle("background", "transparent");
                $$(".lista-clickeable[data-control=" + control + "] tr").setStyle("color", "black");

                this.setStyle("background", "#7f82e8");
                this.setStyle("color", "#fbf9f9");
                if (control == controlNumero) {
                    funcionAlClickear(this, elegido, control);
                }
            });
            $$('.lista-clickeable .datos tr').addEvent('mousemove', function () {
                $$(".lista-clickeable .datos tr *").setStyle("cursor", "pointer");
                $$(".lista-clickeable .datos tr *").setStyle("-webkit-user-select", "none");
                $$(".lista-clickeable .datos tr *").setStyle("-moz-user-select", "none");
                $$(".lista-clickeable .datos tr *").setStyle("-khtml-user-select", "none");
                $$(".lista-clickeable .datos tr *").setStyle("-ms-user-select", "none");
            });

        }
    }

    function rellenarSelect(objetoSelect, datos, indices) {
        objetoSelect.setProperty('html', "");
        recorrerElementos(datos, function (item, key) {
            var nuevoOption;
            nuevoOption = new Element('option', {
                value: item[indices[0]],
                html: item[indices[1]]
            });
            nuevoOption.inject(objetoSelect);
        });
    }

    function liquidacionDiariaProcesar() {
        if ($('grillaLiquidacionDiariaTbody')) {
            if ($('grillaLiquidacionDiariaTbody').getElement('tr.activa')) {
                new Request.HTML({
                    url: 'ejecutarProcesar.php',
                    method: 'post',
                    data: $('formProcesar'),
                    onRequest: function(){
                    	informar("Procesando Jornada");
                    },
                    onSuccess: function (a, b, c, d) {
                        informar(c);
                        $$('#grillaLiquidacionDiariaTbody tr.activa').fireEvent('jph-nav-click');
                    }
                }).send();
            } else {
                alertar('Seleccione una jornada');
            }
        } else {
            alertar('Realice una busqueda');
        }
    }


    function liquidacionDiariaGuardarFichada(refLiqMensual) {
        if ($('txtRegHoRe').value != '' && $('txtRegFeRe').value != '' && $('txtRegFeAs').value != '') {

            new Request.HTML({
                url: './abm/registro.php',
                data: $('formFichada'),
                onSuccess: function (a, b, html, js) {
                    informar(html);

                    if (!refLiqMensual) {
                        $$('#grillaLiquidacionDiariaTbody tr.activa').fireEvent('jph-nav-click');
                    } else {
                        var divSel = $('divSel').getProperty('value');
                        $(divSel).fireEvent('click');

                        actualizarDiaCalendario($(divSel));
                    }
                }
            }).send();
        }
    }

    function liquidacionDiariaGuardarFranco(refLiqMensual) {
        if ($('fechaTrabajada').value != '' && $('fechaGozada').value != '') {

            new Request.HTML({
                url: './abm/francos.php',
                data: $('formFrancos'),
                onSuccess: function (a, b, html, js) {
                    informar(html);

                    if (!refLiqMensual) {
                        $$('#grillaLiquidacionDiariaTbody tr.activa').fireEvent('jph-nav-click');
                    } else {
                        var divSel = $('divSel').getProperty('value');
                        $(divSel).fireEvent('click');

                        actualizarDiaCalendario($(divSel));
                    }
                }
            }).send();
        }
    }

    function liquidacionDiariaBorrarFichada(refLiqMensual) {
        var accion = function () {
            new Request.HTML({
                url: './abm/registro.php',
                data: $('formFichada'),
                onSuccess: function (a, b, html, js) {
                    informar("Fichada borrada");

                    if (!refLiqMensual) {
                        $$('#grillaLiquidacionDiariaTbody tr.activa').fireEvent('jph-nav-click');
                    } else {
                        var divSel = $('divSel').getProperty('value');
                        $(divSel).fireEvent('click');

                        actualizarDiaCalendario($(divSel));
                    }
                }
            }).send();

        }
        confirmar('Esta seguro de borrar la fichada', accion);
    }

    function liquidacionDiariaGuardarHora(refLiqMensual) {
        new Request.HTML({
            url: './abm/fichas1.php',
            data: $('formFichas1'),
            onSuccess: function (a, b, html, js) {
                informar('Datos grabados con exito');

                if (!refLiqMensual) {
                    $$('#grillaLiquidacionDiariaTbody tr.activa').fireEvent('jph-nav-click');
                } else {
                    var divSel = $('divSel').getProperty('value');
                    $(divSel).fireEvent('click');

                    actualizarDiaCalendario($(divSel));
                }
            }
        }).send();
    }

    function liquidacionDiariaBorrarHora(refLiqMensual) {
        var accion = function () {

            new Request.HTML({
                url: './abm/fichas1.php',
                data: $('formFichas1'),
                onSuccess: function (a, b, html, js) {
                    informar('Borrado con exito');

                    if (!refLiqMensual) {
                        $$('#grillaLiquidacionDiariaTbody tr.activa').fireEvent('jph-nav-click');
                    } else {
                        var divSel = $('divSel').getProperty('value');
                        $(divSel).fireEvent('click');

                        actualizarDiaCalendario($(divSel));
                    }
                }
            }).send();

        }
        confirmar('Esta seguro de borrar el tipo de hora', accion);
    }

    function liquidacionDiariaGuardarNovedad(refLiqMensual) {
        new Request.HTML({
            url: './abm/fichas.php',
            data: $('formNovedad'),
            onSuccess: function (a, b, html, js) {
                informar('Datos grabados con exito');

                if (!refLiqMensual) {
                    $$('#grillaLiquidacionDiariaTbody tr.activa').fireEvent('jph-nav-click');
                } else {
                    var divSel = $('divSel').getProperty('value');
                    $(divSel).fireEvent('click');

                    actualizarDiaCalendario($(divSel));
                }
            }
        }).send();
    }

    function liquidacionDiariaBorrarNovedad(refLiqMensual) {
        var accion = function () {
            new Request.HTML({
                url: './abm/fichas.php',
                data: $('formNovedad'),
                onSuccess: function (a, b, html, js) {
                    informar('Novedad borrada');

                    if (!refLiqMensual) {
                        $$('#grillaLiquidacionDiariaTbody tr.activa').fireEvent('jph-nav-click');
                    } else {
                        var divSel = $('divSel').getProperty('value');
                        $(divSel).fireEvent('click');

                        actualizarDiaCalendario($(divSel));
                    }
                }
            }).send();

        }
        confirmar('Esta seguro de borrar la novedad', accion);
    }

    function liquidacionDiariaGuardarCitacion(refLiqMensual) {
        if ($('txtCitEntra').value != '' && $('txtCitSale').value != '' && $('txtCitDesc').value != '') {

            new Request.HTML({
                url: './abm/citacion.php',
                data: {
                    'CitLega': $('txtCitLega').getProperty('value'),
                    'CitTurn': 1,
                    'CitFech': $('txtCitFech').getProperty('value'),
                    'CitEntra': $('txtCitEntra').getProperty('value'),
                    'CitSale': $('txtCitSale').getProperty('value'),
                    'CitDesc': $('txtCitDesc').getProperty('value'),
                    'CitLaboral': $('chkCitLaboral').checked ? 'on' : 'off'
                },
                onSuccess: function (a, b, html, js) {
                    if (html && html.trim() != '') {
                        alertar(html);
                    } else {

                        informar("Datos actualizados");

                        if (!refLiqMensual) {
                            $$('#grillaLiquidacionDiariaTbody tr.activa').fireEvent('jph-nav-click');
                        } else {
                            var divSel = $('divSel').getProperty('value');
                            $(divSel).fireEvent('click');

                            actualizarDiaCalendario($(divSel));
                        }
                    }
                }
            }).send();
        }
    }
	
    function liquidacionDiariaBorrarCitacion(refLiqMensual) {
        var accion = function () {
			new Request.HTML({
				url: './abm/citacion.php',
				data: {
					'CitLega': $('txtCitLega').getProperty('value'),
					'CitTurn': 1,
					'CitFech': $('txtCitFech').getProperty('value'),
					'CitAccion': 'B'	
				},
				onSuccess: function (a, b, html, js) {
					if (html && html.trim() != '') {
						alertar(html);
					} else {

						informar("Datos actualizados");

						if (!refLiqMensual) {
							$$('#grillaLiquidacionDiariaTbody tr.activa').fireEvent('jph-nav-click');
						} else {
							var divSel = $('divSel').getProperty('value');
							$(divSel).fireEvent('click');

							actualizarDiaCalendario($(divSel));
						}
					}
				}
			}).send();
        }
        confirmar('Esta seguro de borrar la citación', accion);
    }	

    function liquidacionDiariaGuardarHorario(refLiqMensual) {
        if ($('txtHorFeDe').value != '') {
            if (($('horChkHasta').checked == false) || $('horChkHasta').checked == true && $('txtHorFeHa').value != '') {
                new Request.HTML({
                    url: './abm/horarios.php',
                    data: {
                        'legajo[]': $('txtHorLegajo').getProperty('value'),
                        'codigo': $('cmbHorCodi').getProperty('value'),
                        'desde': $('txtHorFeDe').getProperty('value'),
                        'desdeHasta': $('horChkHasta').checked ? 'on' : 'off',
                        'hasta': $('txtHorFeHa').getProperty('value'),
                        'accion': 'G',
                        'tipo': 'dias',
                        'modo': 'legajo'
                    },
                    onSuccess: function (a, b, html, js) {
                        if (html && html.trim() != '') {
                            alertar(html);
                        } else {
                            informar("Datos actualizados");

                            if (!refLiqMensual) {
                                $$('#grillaLiquidacionDiariaTbody tr.activa').fireEvent('jph-nav-click');
                            } else {
                                var divSel = $('divSel').getProperty('value');
                                $(divSel).fireEvent('click');

                                actualizarDiaCalendario($(divSel));
                            }
                        }
                    }
                }).send();
            }
        }
    }

    function recargarScroll(div) {
        new jph_scroll(div);
    }


    function buscarHistoricoNovedades() {
        new Request.HTML({
            url: './buscar/manejoNovedades.php',
            method: 'post',
            data: $('formulario'),
            onRequest: function () {
                $('dgResultados').setProperty('html', '');
            },
            onSuccess: function (a, b, html, js) {
                $('dgResultados').setProperty('html', html);
                Ink.Autoload.run();
            }
        }).send();
    }

    function deshacerHistoricoNovedades() {
        if ($$('input[name^=datos]:checked').length > 0) {
            new Request.JSON({
                url: './abm/manejoNovedades.php',
                method: 'post',
                data: $('formManejo'),
                onRequest: function () {

                },
                onSuccess: function (a, b) {
                    alertar(a.mensaje);
                }
            }).send();
        } else {
            alertar('Seleccion al menos un legjao para revertir');
        }
    }

    function formatosHoraValidos() {
        if ($$('.valor.red')[0]) {
            alertar("Verifique los formato hora");
            return false;
        } else {
            return true;
        }
    }

    function buscarLegajosParaEntregas() {
        $('dgDatosLegajos').setProperty('html', '');
        $('dgResultados').setProperty('html', '');
        if ($('buscarlegajo')) {
            new Request.HTML({
                url: './buscar/entregas.php',
                method: 'post',
                data: $('formBusquedaLegajos'),
                onRequest: function () {

                },
                onSuccess: function (a, b, html, js) {
                    $('dgDatosLegajos').setProperty('html', html);
                    eval(js);
                }
            }).send();
        } else {
            alertar('Ingresar legajo a buscar');
        }
    }

    function aplicarEventoClickRowsVacPorConvenio() {
        var id;

        if ($('dgDatos')) {
            $('dgDatos').getElements('tr').each(function (tr) {
                tr.addEvent('click', function () {
                    var convAnt = this.getProperty('data-conv');
                    var aniosAnt = this.getProperty('data-anios');
                    var mesesAnt = this.getProperty('data-meses');

                    $$('#dgDatos .blue').removeClass('blue');
                    this.addClass('blue');

                    new Request.JSON({
                        url: './abm/vacacionesPorConvenio.php',
                        method: 'post',
                        data: {
                            convAnt: convAnt,
                            aniosAnt: aniosAnt,
                            mesesAnt: mesesAnt,
                            'accion': 'C'
                        },
                        onSuccess: function (json) {
                            $('CVAnios').value = json.CVAnios;
                            $('CVMeses').value = json.CVMeses;
                            $('CVDias').value = json.CVDias;
                        }
                    }).send();
                });
            });
        }
    }

    function seleccionarLegajoParaEntregas(elementoSeleccionado) {
        $('dgResultados').setProperty('html', '');
        $$('.itemlegajo').removeClass("selected");
        elementoSeleccionado.addClass("selected");
        new Request.HTML({
            url: './abm/entregas.php',
            method: 'post',
            data: {
                'puesto': elementoSeleccionado.getProperty('data-puesto'),
                'legajo': elementoSeleccionado.getProperty('data-legajo'),
                'accion': 'buscarOrganigrama'
            },
            onRequest: function () {
            },
            onSuccess: function (a, b, html, js) {
                $('dgResultados').setProperty('html', html);
                eval(js);
            }
        }).send();
    }

    function actualizarGrillaEntregas() {
        seleccionarLegajoParaEntregas($$('.itemlegajo.selected')[0]);
    }

    function prepararFilaParaEntrega(fila) {
        var me = fila, idElemento, cantidad_entregar_ahora, selFila, selCantidad, selFecha;
        idElemento = me.getProperty('data-id-elemento');
        selFila = '.entregas[data-id-elemento=' + idElemento + ']';
        selCantidad = selFila + ' input[name=cantidad_entregar_ahora]';
        selFecha = selFila + ' input[name=fecha_entrega]';

        cantidad_entregar_ahora = $$(selCantidad)[0].getProperty('value');
        if (cantidad_entregar_ahora == '') {
            $$(selCantidad)[0].setProperty('value', 0);
            cantidad_entregar_ahora = parseInt($$(selCantidad)[0].getProperty('value'));
        } else {
            cantidad_entregar_ahora = parseInt($$(selCantidad)[0].getProperty('value'));
        }
        if (cantidad_entregar_ahora < 1) {
            alertar("La cantidad a entregar no es correcta.");
            return false;
        }

        var legnume, cantidad, fechaEntrega;
        legnume = me.getProperty('data-legajo');
        cantidad = $$(selCantidad)[0].getProperty('value');
        fechaEntrega = $$(selFecha)[0].getProperty('value');

        guardarEntrega(idElemento, legnume, cantidad, fechaEntrega);
    }

    function guardarEntrega(idElemento, LegNume, cantidad, fechaEntrega) {
        new Request.JSON({
            url: './abm/entregas.php',
            method: 'post',
            data: {
                'idElemento': idElemento,
                'LegNume': LegNume,
                'cantidad': cantidad,
                'fechaEntrega': fechaEntrega,
                'accion': 'guardar'
            },
            onRequest: function () {
            },
            onSuccess: function (json) {
                if (json.status == 1) {
                    informar(json.msg);
                    actualizarGrillaEntregas();
                } else {
                    alertar(json.msg);
                }
            }
        }).send();

    }

    function diferenciaDias(date1, date2) {
        var d1, m1, y1, d2, m2, y2;

        d1 = date1.split('/')[0];
        m1 = date1.split('/')[1] - 1;
        y1 = date1.split('/')[2];

        d2 = date2.split('/')[0];
        m2 = date2.split('/')[1] - 1;
        y2 = date2.split('/')[2];

        dt1 = new Date(y1, m1, d1, 0, 0, 0);
        dt2 = new Date(y2, m2, d2, 0, 0, 0);

        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    }

    function notificar(titulo, texto, icono, color) {
        var backColor;
        titulo = (typeof titulo === 'undefined') ? '' : titulo;
        texto = (typeof texto === 'undefined') ? '' : texto;
        icono = (typeof icono === 'undefined') ? 'fa-thumbs-o-up' : icono;
        color = (typeof color === 'undefined') ? 'darkCobalt' : color;

        switch (color) {
            case 'darkCobalt':
                backColor = 'bg-lighterBlue bd-blue';
                break;
            case 'orange':
                backColor = 'bg-lightOrange bd-orange';
                break;
            case 'white':
                backColor = 'bg-lightRed bd-red';
                break;
        }

        jphNotificacionCantidad++;

        var $not = new Element('div', {"class": "jph-notificacion column-group", "id": "jph-notificacion-" + jphNotificacionCantidad, "data-orden": jphNotificacionCantidad});
        var $contenido = new Element('div', {"class": "all-100 align-center " + backColor + " " + color + " padding-10 alerta column-group"});
        var $cerrar = new Element('div', {"class": "jph-notificacion-cerrar column-group"});
        var $icono = new Element('div', {"class": "all-20 iconoalerta align-center"});
        var $mensaje = new Element('div', {"class": "all-80 align-left"});

        $cerrar.adopt(new Element('i', {"class": "fa fa-times"}));
        $icono.adopt(new Element('i', {"class": "fa " + icono}));

        $mensaje.adopt(new Element('h5', {"text": titulo, "class": color}));
        $mensaje.adopt(new Element('span', {"text": texto}));

        $contenido.adopt($cerrar);
        $contenido.adopt($icono);
        $contenido.adopt($mensaje);

        $not.adopt($contenido);
        $not.setStyle('opacity', '0');

        $$('body').adopt($not);

        $cerrar.addEvent('click', function () {
            var $not = $(this).getParent().getParent();
            new Fx.Tween($not, {
                onComplete: function () {
                    $not.destroy();
                }
            }).start('opacity', 0);

            var h = 115;
            var $nots = $$('.jph-notificacion')

            $nots.sort(function ($a, $b) {
                return  $b.getData('orden') - $a.getData('orden');
            });

            $nots.each(function ($n) {
                if ($n != $not) {
                    new Fx.Tween($n).start('top', h);
                    h += $n.getStyle('height').toInt() + 10;
                }
            });
        });

        var h = $not.getDimensions().y + 10;

        var $nots = $$('.jph-notificacion')

        $nots.sort(function ($a, $b) {
            return  $b.getData('orden') - $a.getData('orden');
        });

        $nots.each(function ($n, i) {
            if (i < 3) {
                if ($n != $not) {
                    new Fx.Tween($n).start('top', $n.getStyle('top').toInt() + h);
                }
            } else {
                new Fx.Tween($n, {
                    onComplete: function () {
                        $n.destroy();
                    }
                }).start('opacity', 0);
            }
        });

        var ocultar = function () {
            new Fx.Tween($not, {
                onComplete: function () {
                    $not.destroy();
                }
            }).start('opacity', 0);
        }

        new Fx.Tween($not).start('opacity', 1);
        window.setTimeout(ocultar, 2500);
    }



    function aplicarEventoClickLegajoDesdeEvaluaciones() {
        $('grillaLgajos').getElements("tr").each(function (tr) {
            tr.addEvent('click', function () {
                var documento;
                documento = $(this).getProperty("data-id");
                new Request.HTML({
                    url: './buscar/revisiones.php',
                    method: 'post',
                    data: {
                        'accion': 'cargarEvaluaciones',
                        'documento': documento
                    },
                    onRequest: function () {
                    },
                    onSuccess: function (a, b, html, js) {
                        $('dgDatos').setProperty('html', html);
                        initClickeable(1, eventoAlClickearEvaluacionfunction);
                        eval(js)
                    }
                }).send();
            })
        });
    }

    function eventoAlClickearEvaluacionfunction(tr, elegido, control) {
        $$('#dgDatos tr').removeClass("seleccionado");
        tr.addClass("seleccionado");

        $$(".lista-clickeable[data-control=2] .datos")[0].setProperty('html', "");
        new Request.HTML({
            url: './revisiones_evaluaciones_cargar_respuestas.php',
            method: 'post',
            data: {
                "id": elegido,
            },
            onSuccess: function (a, b, html, js) {
                $$(".lista-clickeable[data-control=2] .datos").setProperty('html', html);


                new Request.JSON({
                    url: 'abm/revision.php',
                    method: 'post',
                    data: {
                        "accion": "CE",
                        "id": elegido
                    },
                    onSuccess: function (json) {
                        $('id').value = json.datos.id;
                        // $('estado').value = json.datos.estado;
                        if (json.datos.estado == '0') {
                            $('panelEstado').setStyle("display", "block");
                        } else {
                            $('panelEstado').setStyle("display", "none");
                            $('estado').setProperty("checked", false);
                        }
                        $('observaciones').value = json.datos.observaciones;
                    }
                }).send();


                // clickeamos la segunda grilla
                initClickeable(2, function (tr, elegido, control) {
                    new Request.HTML({
                        url: 'abm/revision.php',
                        method: 'post',
                        data: {
                            "accion": "CR",
                            "id_respuesta": elegido
                        },
                        onSuccess: function (a, b, html, js) {
                            $$(".detalles .datos").setProperty('html', html);
                        }
                    }).send();



                });
            }
        }).send();
    }

function excluirLegajo(){
    new Request.HTML({
        url: './abm/excluir.php',
        method: 'post',
        data: $('formExcluidos'),
        onSuccess: function (a, b, html, d) {
            informar("Legajos excluídos para la exportación");
            var pag = $('botonActivo').getProperty('data-pag');
            var datos = {};
            if (pag && pag != null && pag != '') {
                abrirPagina(pag, datos);
            }
        }
    }).send();
}

    function mostarResultado(r){
        var e = r.exportacion;
        var fechas;
        $('procesados').empty();
        for(var titulo in e){
            var $tit = new Element('div',{'class':'titulo','text': titulo});
            var $cab = new Element('div',{'class':'cabecera'});
            $cab.adopt(new Element('span',{'text':'Legajo'}));
            $cab.adopt(new Element('span',{'text':' Exportado'}));
            $('procesados').adopt($tit);
            $('procesados').adopt($cab);
            var legajos = e[titulo];
            for(var l in legajos){
                var $leg = new Element('div',{'class':'fila'});
                var leg = legajos[l];
                if(l != 'exportados' && l != 'procesados'){
                    $leg.adopt(new Element('span',{'text':l}));
                    fechas = "";
                    if(leg.inicio){
                        fechas = leg.inicio + " - "+ leg.fin; 
                    }
                    if(leg.hora){
                        fechas = leg.hora + '(' + leg.cantidad + ')';
                    }
                    
                    if(leg.resultado == '1'){
                        $leg.adopt(new Element('span',{'text':'Si ' + fechas + ' ' + leg.resultado}));
                    }else{
                        $leg.adopt(new Element('span',{'text':'No ' + fechas}));
                    }

                }else{
                    $leg.adopt(new Element('span',{'class':'total','text':l}));
                    $leg.adopt(new Element('span',{'class':'total','text':leg}));                   
                }
                $('procesados').adopt($leg);
            }
        }
    }

    function exportarMeta4() {
        var exp = new Request.JSON({
            url: 'abm/exportar.php'
            ,data: {
                "FechaDesde": $('txtFechaDesde').getProperty('value'),
                "FechaHasta": $('txtFechaHasta').getProperty('value')
            },
            onRequest: function(){
                 $('procesados').setProperty('html', '<div class="jph-loading"><i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>');
            },
            onSuccess: function(a){
                mostarResultado(a);
            }
        });
        exp.send();
    }



function aplicarEventoClickArticuloBase() {
                if ($('dgDatos')) {
                    $('dgDatos').getElements('tr').each(function (tr) {
                        tr.addEvent('click', function () {
                            id = this.getProperty('data-id');

                            $('btnNuevo').fireEvent('click');
                            this.addClass('blue');

                            new Request.JSON({
                                url: './abm/articulo_base.php',
                                method: 'post',
                                data: {
                                    'id': id,
                                    'accion': 'C'
                                },
                                onSuccess: function (json) {
                                    $('idElemento').setProperty('value', json.idElemento);
                                    $('idTipoElemento').setProperty('value', json.idTipoElemento);
                                    $('codigo').setProperty('value', json.codigo);
                                    $('codigo').setProperty('data-codigoleido', json.codigo);
                                    $('codigo').setProperty('data-correcto', '1');
                                    $('certificado').setProperty('value', json.certificado);
                                    $('usoObligatorio').setProperty('value', json.usoObligatorio);
                                    $('habilitado').setProperty('value', json.habilitado);
                                    $('especificacion').setProperty('value', json.especificacion);
                                    $('plazoEntrega').setProperty('value', json.plazoEntrega);
                                    $('descripcionElemento').setProperty('value', json.descripcionElemento);
                                    $('descripcionAdicional').setProperty('value', json.descripcionAdicional);

                                    $('btnGrabar').setStyle('display','none');
                                }
                            }).send();
                        });
                    });
                }
                Ink.Autoload.run();
            }


function aplicarEventoClickPersonalEntregaPlanificada() {
    $('dgDatosLegajo').getElements('tr').each(function (tr) {
        tr.addEvent('click', function() {
            $$('#dgDatosLegajo tr').removeClass('blue');
            tr.addClass('blue');
        });
    });
}
