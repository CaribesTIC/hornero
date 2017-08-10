    ﻿var caPopup = new Class({

        initialize: function () {
            this.popup = new Element('div', {'id': 'popup', 'class': 'divFlotante', 'style': 'position:absolute'});
            this.container = new Element('div', {'class': 'container ribbed-grayLighter'});        
            this.container.inject(this.popup);
            this.popup.inject(document.body);
            this.ancho = '0';
            this.alto = '0';
            this.noMostrarDiv = 'no';
            this.mostrarLoading = false;
        },
        abrir: function (pag, ancho, alto, resizable, mostrarLoading) {
            this.ancho = ancho + 'px';
            this.alto = alto + 'px';
            this.container.setStyles({'width': this.ancho, 'height': this.alto});
            var u = new URI(pag);
            var d = u.get('data');
            u.clearData();
            new Request.HTML({
                url: u.toString(),
                data: d,
                method: 'post',
                evalScripts: false,
                onRequest: function () {
                    if (this.mostrarLoading == true) {
                        $('overlay').setStyles({'opacity': '0.70', 'z-index': '999'});
                        $('overlay').show();
                        $('loading').show();
                    }
                }.bind(this),
                onSuccess: function (a, b, c, d) {
                    if (this.mostrarLoading == true) {
                        $('overlay').setStyles({'opacity': '0', 'z-index': '9'});
                        $('overlay').hide();
                        $('loading').hide();
                    }
                    this.container.setProperty('html', c);
                    
                    agregarDivs_Close_y_Resize(resizable);
                    
                    if (resizable) {
                        aplicarResize(this.container);
                    }

                    this.mostrarLoading = false;
                    this.mostrar();

                    eval(d);
                }.bind(this)
            }).send();
        },
        mostrar: function () {
            if (this.noMostrarDiv != 'si') {
                if ($('overlay')) {
                    $('overlay').setStyles({'z-index': 1000, 'display': 'block'});
                }

                this.popup.setStyles({'z-index': 1001, 'display': 'block'});

                if ($('overlay')) {
                    new Fx.Tween('overlay', {duration: 700}).start('opacity', '0.70');
                }

                new Fx.Tween(this.popup, {duration: 700}).start('opacity', '1');
            }

            if ($$('.divResizePopup')[0]) {
                this.popup.setStyles({'left': '5%', 'margin-left': 'auto'});
            } else {
                if (this.ancho.toInt() <= 800) {
                    this.popup.setStyles({'left': '50%', 'margin-left': '-' + (this.ancho.toInt() / 2) + 'px'});
                } else {
                    this.popup.setStyle('left', '20px');
                }
            }

        },
        ocultar: function () {
            var divPopup = this.popup;

            if ($('overlay')) {
                new Fx.Tween('overlay', {onComplete: function () {
                        $('overlay').setStyles({'z-index': 9, 'display': 'none'});
                    }, duration: 700}).start('opacity', 0);
            }

            new Fx.Tween(this.popup, {onComplete: function () {
                    divPopup.setStyles({'z-index': 9, 'display': 'none'});
                }, duration: 700}).start('opacity', 0);

            if (divPopup.getProperty('id') == 'popup') {
                $('popup').getElement('.container').empty();
            }

            if ($$('.divResizePopup')[0]) {
                $$('.divBorrarPopup')[0].destroy();
                $$('.divResizePopup')[0].destroy();
            }

            if (typeof (fnProcesosActivos) != 'undefined') {
                clearInterval(fnProcesosActivos);
                clearInterval(fnProcesosNuevos);
            }
        },
        ocultarDiv: function (valor) {
            this.noMostrarDiv = valor;
        },
        ocultarNoEffect: function () {
            if ($('overlay')) {
                $('overlay').setStyles({'z-index': 9, 'display': 'none'});
            }

            $('popup').setStyles({'z-index': 9, 'display': 'none'});
            $('popup').getElement('.container').empty();

            if ($$('.divResizePopup')[0]) {
                $$('.divBorrarPopup')[0].destroy();
                $$('.divResizePopup')[0].destroy();
            }

            if (typeof (fnProcesosActivos) != 'undefined') {
                clearInterval(fnProcesosActivos);
                clearInterval(fnProcesosNuevos);
            }
        }
    });

    var newPopup;
    window.addEvent('domready', function () {
        newPopup = new caPopup();
    });