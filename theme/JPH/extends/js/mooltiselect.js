    var dragging;
    var mooltiselect = new Class({
        Implements: [Options, Events],
        list: new Element('div'),
        listOptions: new Element('div'),
        options: {
            list: 'list',
            options: 'option',
            selectedClass: 'selected',
            name: 'listBox',
            sort: false,
            drag: true,
            maximum: 0,
            errorMessage: 'You already selected the maximum of %MAX% items'
        },
        initialize: function (properties) {

            if (MooTools.version >= '1.3') {
                options = Object.merge(this.options, properties);
            } else {
                options = $merge(this.options, properties);
            }

            options.options = '.' + options.options;
            options.errorMessage = options.errorMessage.replace("%MAX%", options.maximum);

            if (options.sort) {
                var sortList = new Element('div', {
                    id: 'sortList'
                });
                $(options.list).setProperty('max', options.maximum);
                $(options.list).setProperty('message', options.errorMessage);
                $(options.list).getElements(options.options).each(function (el, i) {
                    $(el).setProperty('name', options.name);
                    $(el).setProperty('sel', options.selectedClass);
                    $(el).setProperty('max', options.maximum);
                    $(el).addEvent('dblclick', function () {
                        if ($(el).hasClass($(el).getProperty('sel'))) {
                            $(el).removeClass($(el).getProperty('sel'));
                            $(el).getFirst('input').destroy();
                        } else {
                            var selItems = $(this).getParent().getChildren('.' + $(el).getProperty('sel')).length;
                            if (selItems < $(el).getProperty('max') || $(el).getProperty('max') == 0) {
                                $(el).addClass($(el).getProperty('sel'));
                                $(el).adopt(new Element('input', {
                                    'name': $(el).getProperty('name'),
                                    'id': $(el).getProperty('name'),
                                    'value': $(el).getProperty('rel'),
                                    'type': 'hidden'
                                }));
                            } else {
                                alert($(this).getParent().getParent().getProperty('message'));
                            }
                        }
                    });
                    sortList.grab($(el));
                });
                $(options.list).grab(sortList);
                order = new Sortables(sortList, {
                    revert: true,
                    clone: true
                });
            } else {
                $(options.list).setProperty('max', options.maximum);
                $(options.list).setProperty('message', options.errorMessage);
                $(options.list).getElements(options.options).each(function (el, i) {
                    $(el).setProperty('name', options.name);
                    $(el).setProperty('sel', options.selectedClass);
                    $(el).setProperty('max', options.maximum);
                    $(el).setProperty('drag', options.drag);
                    $(el).addEvent('mousedown', function () {
                        dragging = true;
                        if ($(el).hasClass($(el).getProperty('sel'))) {
                            $(el).removeClass($(el).getProperty('sel'));
                            $(el).getFirst('input').destroy();
                        } else {
                            var selItems = $(this).getParent().getChildren('.' + $(el).getProperty('sel')).length;
                            if (selItems < $(el).getProperty('max') || $(el).getProperty('max') == 0) {
                                $(el).addClass($(el).getProperty('sel'));
                                $(el).adopt(new Element('input', {
                                    'name': $(el).getProperty('name'),
                                    'id': $(el).getProperty('name'),
                                    'value': $(el).getProperty('rel'),
                                    'type': 'hidden'
                                }));
                            } else {
                                alert($(this).getParent().getProperty('message'));
                            }
                        }
                    });

                    $(el).addEvent('mouseup', function () {
                        dragging = false;
                    });

                    $(el).addEvent('mouseout', function () {
                        if (dragging && $(el).getProperty('drag')) {
                            dragging = true;
                        }
                    });

                    $(el).addEvent('mouseover', function () {
                        if (dragging && $(el).getProperty('drag')) {
                            dragging = true;
                            if ($(el).hasClass($(el).getProperty('sel'))) {
                                $(el).removeClass($(el).getProperty('sel'));
                                $(el).getFirst('input').destroy();
                            } else {
                                var selItems = $(this).getParent().getChildren('.' + $(el).getProperty('sel')).length;
                                if (selItems < $(el).getProperty('max') || $(el).getProperty('max') == 0) {
                                    $(el).addClass($(el).getProperty('sel'));
                                    $(el).adopt(new Element('input', {
                                        'name': $(el).getProperty('name'),
                                        'id': $(el).getProperty('name'),
                                        'value': $(el).getProperty('rel'),
                                        'type': 'hidden'
                                    }));
                                } else {
                                    alert(options.errorMessage);
                                }
                            }
                        }
                    });

                    if (typeof $(el).onselectstart != 'undefined') {
                        $(el).addEvent('selectstart', function () {
                            return false;
                        });
                    } else if (typeof $(el).style.MozUserSelect != 'undefined') {
                        $(el).setStyle('MozUserSelect', 'none');
                    } else if (typeof $(el).style.WebkitUserSelect != 'undefined') {
                        $(el).setStyle('WebkitUserSelect', 'none');
                    } else if (typeof $(el).unselectable != 'undefined') {
                        $(el).setProperty('unselectable', 'on');
                    }
                });
            }


            if (options.btnAll || options.btnNon || options.btnInv) {

                var buttons = new Element('div', {
                    'class': options.btnCssClass
                });

                $(options.list).getParent().grab(buttons, 'top');

                if (options.btnAll) {
                    var btnAll = new Element('input', {
                        type: 'button',
                        'value': options.btnAllText,
                        'class': options.btnAllClass
                    });
                    $(buttons).grab(btnAll);
                    btnAll.addEvent('click', function () {
                        this.all();
                    }.bind(this));
                }

                if (options.btnNon) {
                    var btnNon = new Element('input', {
                        type: 'button',
                        'value': options.btnNonText,
                        'class': options.btnNonClass
                    });
                    $(buttons).grab(btnNon);
                    btnNon.addEvent('click', function () {
                        this.none();
                    }.bind(this));
                }

                if (options.btnInv) {
                    var btnInv = new Element('input', {
                        type: 'button',
                        'value': options.btnInvText,
                        'class': options.btnInvClass
                    });
                    $(buttons).grab(btnInv);
                    btnInv.addEvent('click', function () {
                        this.invert();
                    }.bind(this));
                }
            }

            this.list = $(options.list);
            this.listOptions = $(options.list).getElements(options.options);
            this.options = options;
        }
    });

    mooltiselect.implement({
        pro: true,
        options: {
            btnAll: false,
            btnNon: false,
            btnInv: false,
            btnAllText: 'Todos',
            btnNonText: 'Ninguno',
            btnInvText: 'Invertir',
            btnCssClass: 'msBotonera',
            btnAllClass: 'btnTodos',
            btnNonClass: 'btnNada',
            btnInvClass: 'btnInv'
        },
        all: function () {
            this.listOptions.each(function ($el, i) {
                if (!$el.hasClass($el.getProperty('sel'))) {
                    $el.fireEvent('mousedown');
                    $el.fireEvent('mouseup');
                }
            });
        },
        none: function () {
            this.listOptions.each(function ($el, i) {
                if ($el.hasClass($el.getProperty('sel'))) {
                    $el.fireEvent('mousedown');
                    $el.fireEvent('mouseup');
                }
            });
        },
        invert: function () {
            this.listOptions.each(function ($el, i) {
                $el.fireEvent('mousedown');
                $el.fireEvent('mouseup');
            });
        }
    });

    mooltiselect.implement({
        onClick: function (fn) {
            this.listOptions.each(function (el, i) {
                $(el).addEvent('mousedown', function (e) {
                    fn(this, e);
                });
            });
        }
    });

    Element.implement({
        hasClasses: function (cs) {
            var has = false;
            cs.each(function (c) {
                if ($(this).hasClass(c)) {
                    has = true;
                }
            }.bind(this));
            return has;
        }
    });