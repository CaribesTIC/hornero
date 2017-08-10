    var drag;
    var moCombo = new Class({
        Implements: [Options, Events],
        options: {
            combo: $('cmbTest'),
            name: 'cmbTest',
            options: {},
            multiple: false,
            disabled: false,
            onChange: function () {}
        },
        initialize: function (opts) {
            var options, keys, values, key, val, valKeys, valValues, valText;
            var combo, i, ol, li, ul, ulli, div, span, arrow;
            options = Object.merge(Object.clone(this.options), opts);
            combo = $(options.combo);
            keys = Object.keys(options.options);
            values = Object.values(options.options);
            if (!options.multiple) {
                div = new Element('div', {
                    'class': 'combo'
                });
                span = new Element('span', {
                    'class': 'value'
                });
                if (!options.disabled) {
                    arrow = new Element('span', {
                        'class': 'arrowUp'
                    });
                    arrow.addEvent('click', function () {
                        var optsTween = new Fx.Tween(this.getNext('ol'));
                        var divTween = new Fx.Tween(this.getParent());
                        if (this.hasClass('arrow')) {
                            optsTween.start('opacity', '1');
                            divTween.start('height', (this.getNext('ol').getStyle('height').toInt() + this.getPrevious('span').getStyle('height').toInt() + 1) + 'px');
                        } else {
                            optsTween.start('opacity', '0');
                            divTween.start('height', '20px');
                        }
                        this.toggleClass('arrow');
                        this.toggleClass('arrowUp');
                    });
                    span.addEvent('click', function () {
                        this.getNext('span').fireEvent('click');
                    });
                    if (options.onChange) {
                        div.set('data-change', options.onChange);
                    }
                } else {
                    div.addClass('disabled');
                    arrow = new Element('span', {
                        'class': 'arrow'
                    });
                }
            }
            if (keys.each) {
                ol = new Element('ol', {
                    id: options.name,
                    'class': 'select'
                });
                keys.each(function (key, i) {
                    li = new Element('li');
                    if (typeOf(values[i]) == 'object') {
                        ul = new Element('ul');
                        val = values[i];
                        valKeys = Object.keys(val);
                        valValues = Object.values(val);
                        if (valKeys.each) {
                            valKeys.each(function (valText, i) {
                                ulli = new Element('li', {
                                    text: valText,
                                    rel: valValues[i],
                                    'class': 'option'
                                });
                                if (!options.disabled) {
                                    if (!options.multiple) {
                                        this.makeOption(ulli);
                                    } else {
                                        this.makeOptionMulti(ulli);
                                    }
                                }
                                ulli.unselectable();
                                ul.adopt(ulli);
                            }, this);
                        }
                        li.addClass('group');
                        li.setProperty('text', key);
                        li.adopt(ul);
                    } else {
                        li.setProperty('text', key);
                        li.setProperty('rel', values[i]);
                        li.addClass('option');
                        if (!options.disabled) {
                            if (!options.multiple) {
                                this.makeOption(li);
                            } else {
                                this.makeOptionMulti(li);
                            }
                        }
                    }
                    li.unselectable();
                    if (options.disabled) {
                        ol.addClass('disabled');
                    }
                    ol.adopt(li);
                }, this);
            }
            if (options.multiple) {
                if (options.onChange) {
                    ol.set('data-change', options.onChange);
                }
                ol.addClass('multiple');
                ol.replaces(combo);
            } else {
                span.unselectable();
                arrow.unselectable();
                div.adopt(span);
                div.adopt(arrow);
                div.adopt(ol);
                div.replaces(combo);
                if (!options.disabled) {
                    ol.getElement('.option').fireEvent('mousedown');
                } else {
                    span.setProperty('text', ol.getElement('.option').getProperty('text'));
                }
            }
        },
        makeOption: function (el) {
            el.addEvent('mousedown', function (e) {
                if (this.getParents('ol').getElements('input')[0].length > 0) {
                    this.getParents('ol').getElements('input')[0].destroy();
                    this.getParents('ol').getElements('.selected')[0].removeClass('selected');
                }
                this.addClass('selected');
                this.adopt(new Element('input', {
                    'name': this.getParents('ol').get('id'),
                    'id': this.getParents('ol').get('id'),
                    'value': this.getProperty('rel'),
                    'type': 'hidden'
                }));
                this.getParents('.combo').getElement('.value').setProperty('text', this.getProperty('text'));
                this.getParents('.combo').getElement('.arrowUp').fireEvent('click');
                if (this.getParents('.combo')[0].getProperty('data-change') && e) {
                    var ev = this.getParents('.combo')[0].getProperty('data-change');
                    ev = ev.replace('this\.value', '\'' + this.getParents('ol').getElements('input')[0].get('value') + '\'');
                    if (ev.contains('function')) {
                        eval('var fireEv = ' + ev);
                        fireEv();
                    } else {
                        eval(ev);
                    }
                }
            });
        },
        makeOptionMulti: function (el) {
            el.addEvent('mousedown', function (e) {
                drag = true;
                if (this.hasClass('selected')) {
                    this.removeClass('selected');
                    this.getFirst('input').destroy();
                } else {
                    this.addClass('selected');
                    this.adopt(new Element('input', {
                        'name': this.getParent().get('id'),
                        'id': this.getParent().get('id'),
                        'value': this.getProperty('rel'),
                        'type': 'hidden'
                    }));
                }
                if (this.getParents('ol')[0].getProperty('data-change') && e) {
                    var ev = this.getParents('ol')[0].getProperty('data-change');
                    ev = ev.replace('this\.value', '\'' + this.getParents('ol').getElements('input')[0].get('value') + '\'');
                    if (ev.contains('function')) {
                        eval('var fireEv = ' + ev);
                        fireEv();
                    } else {
                        eval(ev);
                    }
                    drag = false;
                }
            });
            el.addEvent('mouseup', function () {
                drag = false;
            });
            el.addEvent('mouseover', function () {
                if (drag) {
                    this.fireEvent('mousedown');
                }
            });
        }
    });
    moCombo.replace = new Class({
        Extends: moCombo,
        initialize: function (el) {
            var opts, sel, change, evnts;
            if (el.each) {
                /* If more of one element is sent */
                el.each(function (sel, i) {
                    opts = this.getOptions(sel);
                    change = sel.get('onchange');
                    evnts = sel.retrieve('events');
                    if (evnts) {
                        change = evnts['change'].keys[0];
                    }
                    this.parent({
                        combo: sel,
                        name: sel.get('name'),
                        options: opts,
                        multiple: sel.multiple,
                        disabled: sel.get('disabled'),
                        onChange: change
                    });
                }, this);
            } else {
                opts = this.getOptions(el);
                this.parent({
                    combo: el,
                    name: el.get('name'),
                    options: opts,
                    multiple: el.multiple,
                    disabled: el.get('disabled'),
                    onChange: el.get('onchange')
                });
            }
        },
        getOptions: function (el) {
            var children, child, grandchildren, grandchild, opts, optsGroup;
            children = el.getChildren();
            opts = {};
            if (children.each) {
                // More than 1 Child
                children.each(function (child) {
                    if (child.get('tag') == 'optgroup') {
                        grandchildren = child.getChildren();
                        if (grandchildren.each) {
                            optsGroup = {}
                            grandchildren.each(function (grandchild) {
                                optsGroup[grandchild.get('text')] = grandchild.value;
                            });
                            opts[child.get("label")] = optsGroup;
                        } else {
                            opts[grandchildren.get('text')] = grandchildren.value;
                        }
                    } else {
                        opts[child.get('text')] = child.value;
                    }
                });
            } else {
                // Just 1 children
                if (children.get('tag') == 'optgroup') {
                    grandchildren = children.getChildren();
                    if (grandchildren.each) {
                        optsGroup = {}
                        grandchildren.each(function (grandchild) {
                            optsGroup[grandchild.get('text')] = grandchild.value;
                        });
                        opts[children.get("label")] = optsGroup;
                    } else {
                        opts[grandchildren.get('text')] = grandchildren.value;
                    }
                } else {
                    opts[children.get('text')] = b.value;
                }
            }
            return opts;
        }
    });
    Element.implement({
        unselectable: function () {
            if (typeof $(this).onselectstart != 'undefined') {
                $(this).addEvent('selectstart', function () {
                    return false;
                });
            } else if (typeof $(this).style.MozUserSelect != 'undefined') {
                $(this).setStyle('MozUserSelect', 'none');
            } else if (typeof $(this).style.WebkitUserSelect != 'undefined') {
                $(this).setStyle('WebkitUserSelect', 'none');
            } else if (typeof $(this).unselectable != 'undefined') {
                $(this).setProperty('unselectable', 'on');
            }
        }
    });