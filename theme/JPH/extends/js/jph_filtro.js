    ﻿var jph_filtro = new Class({

        initialize: function (element, options) {
            this.tbody = element.getElement('tbody');
            this.campos = element.getProperty('data-campos');
            this.tabla = element.getProperty('data-tabla');
            this.campoid = element.getProperty('data-campoid');
            this.camposOrden = element.getProperty('data-camposOrden');
            this.iconoFiltro = element.getPrevious('.head-filtro') ? element.getPrevious('.head-filtro').getElement('.icono-filtro') : element.getParent().getPrevious('.head-filtro').getElement('.icono-filtro');
            this.arrInputs = element.getElements('.campoFiltro');
            this.arrLabels = element.getElements('.label');
            this.funciones = [];
            this.properties = element.getProperty('data-properties');
            this.limit = element.getProperty('data-limit');

            if (element.getProperty('data-funciones')) {
                if (element.getProperty('data-funciones').contains(',')) {
                    this.funciones = element.getProperty('data-funciones').split(',');
                } else {
                    this.funciones = [];
                    this.funciones.push(element.getProperty('data-funciones'));
                }
            }

            this.iconoFiltro.addEvent('click', function () {
                if (this.iconoFiltro.hasClass('abierto')) {
                    this.iconoFiltro.removeClass('abierto');
                    this.iconoFiltro.addClass('cerrado');

                    this.arrInputs.value = '';
                    this.arrInputs.addClass('oculto');
                    this.arrLabels.removeClass('oculto');
                } else {
                    this.iconoFiltro.removeClass('cerrado');
                    this.iconoFiltro.addClass('abierto');

                    this.arrInputs.value = '';
                    this.arrInputs.removeClass('oculto');
                    this.arrLabels.addClass('oculto');
                }
            }.bind(this));

            this.arrInputs.addEvent('change', function () {
                this.filtrarCampos();
            }.bind(this));
        },
        filtrarCampos: function () {
            var valoresWhere = [];
            var tipos = [];
            var input;

            for (i = 0; i <= this.arrInputs.length - 1; i++) {
                input = this.arrInputs[i];
                valoresWhere.push(input.value);
                tipos.push(input.getProperty('data-tipo'));
            }

            new Request.HTML({
                url: './buscar/filtracionDatos.php',
                method: 'post',
                data: {
                    campos: this.campos,
                    tabla: this.tabla,
                    campoid: this.campoid,
                    camposOrden: this.camposOrden,
                    valoresWhere: valoresWhere,
                    tipos: tipos,
                    limit: limit,
                    properties: this.properties
                },
                onSuccess: function (a, b, html, js) {
                    this.tbody.setProperty('html', html);
                    
                    var fn;
                    for(i=0;i<=this.funciones.length - 1;i++){
                        fn = this.funciones[i] + '()';
                        eval(fn);
                    }
                }.bind(this)
            }).send();
        }
    });
