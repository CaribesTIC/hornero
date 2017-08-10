    ﻿    ﻿/** 
     * @module Ink.Autoload
     * @version 1
     * Create Ink UI components easily
     */
            Ink.createModule('Ink.Autoload', 1, ['Ink.Dom.Selector_1', 'Ink.Util.Array_1', 'Ink.Dom.Loaded_1', 'Ink.UI.SmoothScroller_1', 'Ink.UI.Close_1', 'Ink.UI.Drawer_1'], function (Selector, InkArray, Loaded, Scroller, Close, Drawer) {
                'use strict';

                /**
                 * @namespace Ink.Autoload
                 * @static
                 */

                var el = document.createElement('div');
                // See if a selector is valid.
                function validSelector(sel) {
                    try {
                        Selector.select(sel, el);
                    } catch (e) {
                        Ink.error(e);
                        return false;
                    }
                    return true;
                }

                var Autoload = {
                    /**
                     * Matches module names to default selectors.
                     * 
                     * @property selectors {Object}
                     * @public
                     **/
                    selectors: {
                        /* Match module names to element classes (or more complex selectors)
                         * which get the UI modules instantiated automatically. */
                        'Animate_1': '.ink-animate',
                        'Carousel_1': '.ink-carousel',
                        'DatePicker_1': '.ink-datepicker',
                        'DragDrop_1': '.ink-dragdrop',
                        'Draggable_1': '.ink-draggable',
                        'Dropdown_1': '.ink-dropdown',
                        'Droppable_1.add': '.ink-droppable',
                        'FormValidator_2': '.ink-formvalidator',
                        'Gallery_1': 'ul.ink-gallery-source',
                        'LazyLoad_1': '.ink-lazyload',
                        'Modal_1': '.ink-modal',
                        'ProgressBar_1': '.ink-progress-bar',
                        'SortableList_1': '.ink-sortable-list',
                        'Spy_1': '[data-spy="true"]',
                        'Stacker_1': '.ink-stacker',
                        'Sticky_1': '.ink-sticky, .sticky',
                        'Table_1': '.ink-table',
                        'Tabs_1': '.ink-tabs',
                        'Toggle_1': '.ink-toggle, .toggle',
                        'Tooltip_1': '.ink-tooltip, .tooltip',
                        'TreeView_1': '.ink-tree-view'
                    },
                    defaultOptions: {},

                    /**
                     * Run Autoload on a specific element.
                     *
                     * Useful when you load something from AJAX and want it to have automatically loaded Ink modules.
                     * @method run
                     * @param {Element} parentEl Root element. The children of this element will be processed by Autoload.
                     * @param {Object}  [options] Options object, containing:
                     * @param {Boolean} [options.forceAutoload] Autoload things on elements even if they have `data-autoload="false"`
                     * @param {Boolean} [options.createClose] Whether to create the Ink.UI.Close component. Defaults to `true`.
                     * @param {Boolean} [options.createSmoothScroller] Whether to create the Scroller component. Defaults to `true`.
                     * @param {Object} [options.selectors=Ink.Autoload.selectors] A hash mapping module names to selectors that match elements to load these modules. For example, `{ 'Modal_1': '.my-specific-modal' }`.
                     * @param {Boolean} [options.waitForDOMLoaded=false] Do nothing until the DOM is loaded. Uses Ink.Dom.Loaded.run();
                     * @return {void}
                     * @public
                     * @sample Autoload_1.html
                     **/
                    run: function (parentEl, options) {
                        options = Ink.extendObj({
                            // The below lines are not required because undefined is falsy anyway..
                            // forceAutoload: false,
                            // waitForDOMLoaded: false,
                            // createClose: false,
                            // createSmoothScroller: false,
                            selectors: Autoload.selectors
                        }, options || {});

                        for (var mod in options.selectors)
                            if (options.selectors.hasOwnProperty(mod)) {
                                // `elements` need to be in a closure because requireModules is async.
                                findElements(mod);
                            }
                        if (options.createClose !== false) {
                            new Close();
                        }
                        if (options.createSmoothScroller !== false) {
                            Scroller.init();
                        }
                        if (options.createDrawer !== false) {
                            if (Selector.matchesSelector(document.body, '.ink-drawer') &&
                                    !(Drawer.getInstance && Drawer.getInstance(document.body))) {
                                new Drawer(document.body);
                            }
                        }

                        function findElements(mod) {
                            var fname;
                            if (/\./.test(mod)) {  // Droppable.add(elm, options)
                                mod = mod.split('.');
                                fname = mod[1];
                                mod = mod[0];
                            }
                            var modName = 'Ink.UI.' + mod;
                            var elements = Selector.select(options.selectors[mod], parentEl);

                            elements = InkArray.filter(elements, autoloadElement);

                            if (elements.length) {
                                Ink.requireModules([modName], function (Component) {
                                    InkArray.forEach(elements, function (el) {
                                        if (typeof Component.getInstance === 'function' &&
                                                Component.getInstance(el) != null) {
                                            return; // Avoid multiple instantiation.
                                        }


                                        if (!fname) {
                                            new Component(el, Autoload.defaultOptions[mod]);
                                        } else {
                                            Component[fname](el, Autoload.defaultOptions[mod]);
                                        }
                                    });
                                });
                            }
                        }

                        function autoloadElement(element) {
                            if (options.forceAutoload === true) {
                                return true;
                            }
                            if (typeof element.getAttribute === 'function' || typeof element.getAttribute === 'object') {
                                return element.getAttribute('data-autoload') !== 'false';
                            }
                        }


                        $$('.decimal').addEvent('keydown', function (e) {
                            var valid = ['backspace', 'delete', 'left', 'right', 'tab', ',', '.'];
                            if (isNaN(e.key)) {
                                if (!valid.contains(e.key)) {
                                    return false;
                                } else {
                                    if (e.key == ',' || e.key == '.') {
                                        if ($(this).getProperty('value').contains(',') || $(this).getProperty('value').contains('.')) {
                                            return false;
                                        }
                                    }
                                }
                            }
                        });

                        $$('.decimal').addEvent('blur', function (e) {
                            var dec = $(this).getProperty('value');
                            dec = dec.replace(',', '.');
                            if (!dec.contains('.')) {
                                dec += ".00";
                            }
                            dec = dec.match(/\d{0,9}[,\.]\d{2}/g) + '';
                            $(this).setProperty('value', dec);
                        });

                        $$('input.length').addEvent('blur', function (e) {
                            var min, max, len;
                            min = $(this).getProperty('data-min');
                            max = $(this).getProperty('data-max');
                            len = $(this).getProperty('value').length;

                            if (len < min || len > max) {
                                if (min != max) {
                                    alertar('El campo debe tener entre ' + min + ' y ' + max + ' caracteres de largo');
                                } else {
                                    alertar('El campo debe tener ' + min + ' caracteres de largo');
                                }
                            }
                        });

                        $$('.numeros').addEvent('keydown', function (e) {
                            var valid = ['backspace', 'delete', 'left', 'right', 'tab'];

                            if (isNaN(e.key)) {
                                if (!valid.contains(e.key) && !(e.control)) {
                                    return false;
                                }
                            }
                        });

                        $$('.numeros').addEvent('input', function (e) {
                            if (isNaN(this.value)) {
                                this.value = '';
                                alertar('Ingrese solo datos numéricos');
                            }
                        });

                        $$('.horas').addEvent('keydown', function (e) {
                            var valid = ['backspace', 'delete', 'left', 'right', 'tab'];

                            if ($(this).hasClass('red') && !valid.contains(e.key)) {
                                return false;
                            }

                            if (isNaN(e.key)) {
                                if (!valid.contains(e.key) && !(e.control)) {
                                    return false;
                                }
                            }
                        });

                        $$('.horas').setProperty('maxlength', '5');

                        $$('.horas').addEvent('keyup', function (e) {
                            var horas, minutos;
                            var hormin = $(this).getProperty('value');

                            switch (hormin.length) {
                                case 0:
                                    $(this).removeClass('red');
                                    break;
                                case 2:
                                    if (hormin.toInt() >= 0 && hormin.toInt() <= 23) {
                                        $(this).removeClass('red');
                                        if (e.key != 'backspace' && e.key != 'delete') {
                                            $(this).setProperty('value', hormin + ':')
                                        }
                                    } else {
                                        $(this).addClass('red');
                                    }
                                    break;
                                case 5:
                                    horas = hormin.split(':')[0];
                                    minutos = hormin.split(':')[1];

                                    if (horas.toInt() < 0 || horas.toInt() > 23 || minutos.toInt() < 0 || minutos.toInt() > 59) {
                                        $(this).addClass('red');
                                    } else {
                                        $(this).removeClass('red');
                                    }
                                    break;
                                case 1:
                                    if (hormin > 2 || hormin < 0) {
                                        $(this).addClass('red');
                                    } else {
                                        $(this).removeClass('red');
                                    }
                                    break;
                                case 4:
                                case 3:
                                    horas = hormin.split(':')[0];
                                    minutos = hormin.split(':')[1];

                                    if (hormin > 23 || hormin < 0 || minutos.toInt() < 0 || minutos.toInt() > 5) {
                                        $(this).addClass('red');
                                    } else {
                                        $(this).removeClass('red');
                                    }
                                    break;
                            }


                        });

                        $$('.horas').addEvent('blur', function (e) {
                            if (this.getProperty('value') != '' && this.getProperty('value').length < 5) {
                                this.addClass('red');
                            } else {
                                this.removeClass('red');
                            }
                        });

                        $$('.ink-datepicker').addEvent('keyup', function (e) {
                            var fecha = $(this).getProperty('value');
                            if ((fecha.length == 2 || fecha.length == 5) && !(e.key == 'delete' || e.key == 'backspace')) {
                                $(this).setProperty('value', fecha + "/");
                            }

                            if (fecha.length == 8) {
                                fecha = fecha.split('/');
                                var año = fecha[2] * 1;
                                if (año != 20 && año != 19) {
                                    año += 2000;
                                }
                                fecha[2] = año;
                                $(this).setProperty('value', fecha.join('/'));
                            }
                        });

                        //new moCombo.replace($$('select'));

                        $$('table.jph-nav').each(function ($table, i) {
                            var id = $table.getProperty('id') || 'jph-nav-table-' + i;
                            $table.setProperty("id", id);

                            var $input = new Element('input', {"id": "txt-" + $table.getProperty('id'), "data-for": $table.getProperty('id'), "value": 0, "class": 'jph-invisible'});
                            var max = 0;

                            $table.getElements('tbody tr').each(function ($tr, i) {
                                var id = 'tr-' + $table.getProperty('id') + '-' + i;
                                $tr.setProperties({'id': id, "data-indice": i});

                                if ($tr.hasEvent('click')) {
                                    var fn = $tr.getEvent('click');
                                    $tr.addEvent('jph-nav-click', fn);
                                    $tr.removeEvent('click', fn); 
                                }

                                $tr.addEvent('click', function (e) {
                                    var color = $table.getData("color") || "blue";
                                    $input.setProperty("value", $(this).getProperty("data-indice"));
                                    $table.getElements('tr.' + color).removeClass(color);
                                    $table.getElements('tr.activa').removeClass('activa');
                                    $(this).addClass(color);
                                    $(this).addClass('activa');
                                    $input.focus();
                                    $(this).fireEvent('jph-nav-click', e);
                                });

                                max = i;
                            });

                            $table.setProperty("data-max", max);

                            $input.addEvent('keyup', function (e) {
                                var validos, min, max, ind, id, color, $el;
                                color = $table.getProperty("data-color") || "blue";
                                validos = ['up', 'down', 'left', 'right', 'pagedown', 'pageup'];
                                min = 0;
                                max = $table.getProperty("data-max");
                                ind = $(this).getProperty('value') * 1;

                                if (validos.contains(e.key)) {
                                    switch (e.key) {
                                        case 'up':
                                        case 'left':
                                            ind--;
                                            break;
                                        case 'pageup':
                                            ind = ind - 8;
                                            break;
                                        case 'down':
                                        case 'right':
                                            ind++;
                                            break;
                                        case 'pagedown':
                                            ind = ind + 8;
                                            break;
                                    }

                                    ind = ind < min ? min : ind;
                                    ind = ind > max ? max : ind;

                                    $(this).setProperty('value', ind);
                                    id = 'tr-' + $table.getProperty('id') + '-' + ind;
                                    $table.getElements('tr.' + color).removeClass(color);
                                    $table.getElements('tr.activa').removeClass('activa');
                                    $(id).addClass(color);
                                    $(id).addClass('activa');
                                    $(id).fireEvent('jph-nav-click');

                                    if ($table.hasClass('jph-scroll')) {
                                        $el = $($table.getProperty('data-content') || $table);
                                        var top = $(id).getDimensions().height * ind; //$(id).getPosition().y - $el.getPosition().y;
                                        $el.fireEvent('jph-scroll-scrollTo', top);
                                    }
                                } else {
                                    e.stop();
                                }
                            });

                            $input.inject($table, 'before');
                            $table.removeClass('jph-nav');
                        });

                        $$('table.ordenar thead tr th').each(function ($th, i) {
                            if (!$th.getElements('i.fa-sort')) {
                                var $i = new Element('i', {class: "fa fa-sort pull-right sortable", 'data-order': i});
                                $th.adopt($i);
                                $i.addEvent('click', function (e) {
                                    var $i = $(this), sort, order;
                                    var $tbody = $i.getParent('thead').getNext('tbody');

                                    order = $i.getProperty('data-order');

                                    if ($i.hasClass('fa-sort')) {
                                        sort = 'asc';
                                    }

                                    if ($i.hasClass('fa-sort-desc')) {
                                        sort = 'asc';
                                    }

                                    if ($i.hasClass('fa-sort-asc')) {
                                        sort = 'desc';
                                    }

                                    $$('.sortable').removeClass('fa-sort');
                                    $$('.sortable').addClass('fa-sort');
                                    $$('.sortable').removeClass('fa-sort-asc');
                                    $$('.sortable').removeClass('fa-sort-desc');
                                    $i.removeClass('fa-sort');
                                    $i.addClass('fa-sort-' + sort);

                                    $tbody.setProperty('data-order', order);
                                    $tbody.setProperty('data-sort', sort);

                                    var $rows = $tbody.getElements('tr');

                                    $rows.sort(orderTable);

                                    $tbody.empty();
                                    $rows.each(function ($row) {
                                        $tbody.adopt($row);
                                    });

                                });

                                var $input = new Element('input', {type: "text", class: ""});

                                $th.adopt($i);
                            }
                        });


                        $$('.jph-scroll').each(function (div) {
                            new jph_scroll(div);
                        });

                        $$('.jph-filtro').each(function (element) {
                            new jph_filtro(element);
                        });

                        $$('.fechaParticular').each(function (input) {
                            new Ink.UI.DatePicker(input, {
                                onSetDate: function (e, d) {
                                    e._element.value = formatoFecha(d.date);
                                    e._element.fireEvent('change');
                                }
                            });

                            input.addEvent('keyup', function (e) {
                                var fecha = $(this).getProperty('value');
                                if ((fecha.length == 2 || fecha.length == 5) && !(e.key == 'delete' || e.key == 'backspace')) {
                                    $(this).setProperty('value', fecha + "/");
                                }

                                if (fecha.length == 8) {
                                    fecha = fecha.split('/');
                                    var año = fecha[2] * 1;
                                    if (año != 20) {
                                        año += 2000;
                                    }
                                    fecha[2] = año;
                                    $(this).setProperty('value', fecha.join('/'));
                                }
                            });
                        });

                        $$('input[type=checkbox][name^=chkTodos]').addEvent('click', function () {
                            var name = $(this).getProperty('name').replace('chkTodos', '').toLowerCase();
                            var check = $(this).checked;

                            if (check) {
                                $$('div[data-name^=' + name + ']').addClass('checked');
                            } else {
                                $$('div[data-name^=' + name + ']').removeClass('checked');
                            }

                            $$('div[data-name^=' + name + ']').setProperty('data-chk', check);

                            $$('input[name^=' + name + ']').each(function ($c) {
                                $c.checked = check
                            });

                        });

                        $$('input.jph-checkbox').each(function ($i) {
                            var $div = new Element('div', {"class": $i.getProperty('class'), "data-name": $i.getProperty('name')});
                            var $fa = new Element('i', {"class": 'fa fa-check'});
                            $div.inject($i, 'before');
                            $div.grab($i);
                            $div.grab($fa);
                            $i.setStyle('display', 'none');

                            $div.addEvent('click', function (e) {
                                var $chk = $(this).getElement('input');
                                $chk.click();
                                $(this).setProperty('data-chk', $chk.checked);
                                if ($chk.checked) {
                                    $(this).addClass('checked');
                                } else {
                                    $(this).removeClass('checked');
                                }
                            });
                            $i.removeClass('jph-checkbox');

                            if ($i.checked) {
                                $div.addClass('checked');
                            }

                            $div.setProperty('data-chk', $i.checked);
                        });

                        $$('input.jph-radio').each(function ($i) {
                            var name = $i.getProperty('name');
                            var $div = new Element('div', {"class": $i.getProperty('class') + ' name_' + name, "data-name": name});
                            var $fa = new Element('i', {"class": 'fa fa-circle'});

                            $div.inject($i, 'before');
                            $div.grab($i);
                            $div.grab($fa);
                            $i.setStyle('display', 'none');
                            $div.addEvent('click', function (e) {
                                var $chk = $(this).getElement('input');
                                var name = '.name_' + $(this).getProperty('data-name');
                                $chk.click();

                                $$(name).removeClass('checked');
                                $$(name).setProperty('data-chk', 'false');

                                $(this).setProperty('data-chk', 'true');
                                $(this).addClass('checked');
                            });
                            $i.removeClass('jph-radio');
                        });
                    },
                    /**
                     * Add a new entry to be autoloaded.
                     * @method add
                     * @param {String} moduleName The module name (Example: 'Modal_1', or 'Dropdown_1')
                     * @param {String} selector   A selector which finds elements where this module should be autoloaded (Example: '.my-modal' or '.my-dropdown')
                     * @return {void}
                     * @public
                     */
                    add: function (moduleName, selector) {
                        if (!validSelector(selector)) {
                            return false;
                        }

                        if (Autoload.selectors[moduleName]) {
                            Autoload.selectors[moduleName] += ', ' + selector;
                        } else {
                            Autoload.selectors[moduleName] = selector;
                        }
                    },
                    /**
                     * Removes a module from autoload, making it not be automatically loaded.
                     * @method remove
                     * @param {String} moduleName The module's name and version ('Name_ver')
                     * @return {void}
                     * @public
                     **/
                    remove: function (moduleName) {
                        delete Autoload.selectors[moduleName];
                    }
                };

                for (var k in Autoload.selectors)
                    if (Autoload.selectors.hasOwnProperty(k)) {
                        Autoload.defaultOptions[k] = {};
                    }

                if (!window.INK_NO_AUTO_LOAD) {
                    Loaded.run(function () {
                        Autoload.run(document, {
                            createSmoothScroller: true,
                            createClose: true
                        });
                        Autoload.firstRunDone = true;
                    });
                }

                return Autoload;
            });

