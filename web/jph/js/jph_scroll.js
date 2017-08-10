    ﻿var jph_scroll = new Class({

        initialize: function (element, options) {
            var parent = element.getParent();
            this.scrollBar = new Element('div', {'class': 'scrollBar'});
            this.scroll = new Element('div', {'class': 'scroll'});
            this.content = $(element.getProperty('data-content') || element);

            if(!element.getData('jphScrollNoReload') || element.getData('jphScrollNoReload') != "1"){
                if (element.getNext('.scrollBar')) {
                    element.getNext('.scrollBar').destroy();
                    this.contentScroll = element.getParent('.contentScroll');
                } else {
                    this.contentScroll = new Element('div', {'class': 'contentScroll all-100'});
                    this.contentScroll.inject(element, 'before');
                }

                this.scrollBar.adopt(this.scroll);
                this.contentScroll.adopt(element);
                this.contentScroll.adopt(this.scrollBar);
                this.altoTotal = this.content.getScrollSize().y + 100;

                if (element.tagName.toLowerCase() == "table") {
                    var alto_thead = element.getElement('thead').getComputedSize().totalHeight + 'px';
                    this.scrollBar.setStyle('top', alto_thead);

                    this.tbody = element.getElement('tbody');
                    if (this.tbody.getFirst('tr')) {
                        this.stepspx = this.tbody.getFirst('tr').getDimensions().height + 1;
                    } else {
                        this.stepspx = 1;
                    }
                } else {
                    this.stepspx = this.altoTotal / 100;
                }

                this.steps = (this.altoTotal / this.stepspx).round(0);

                var randId = Math.random();
                randId = randId.toFixed(4).replace('.', '');

                this.scrollBar.setProperty('id', randId);
                this.content.setProperty('data-scrollBar', randId);
                this.altoVisible = this.content.getSize().y;
                this.step = 0;

                if (this.altoTotal > this.altoVisible) {
                    this.scroll.setStyle('height', (this.altoVisible * this.altoVisible) / (this.altoTotal) + 'px');
                    this.scrollBar.setStyle('height', this.altoVisible + 'px');
                }

                this.slider = new Slider(this.scrollBar, this.scroll, {
                    wheel: true,
                    steps: this.steps,
                    mode: 'vertical',
                    onChange: function (step) {
                        this.step = step * this.stepspx;
                        this.scrollear(this.content, this.step, this.slider, 'scrollBar');
                    }.bind(this)
                });

                this.content.addEvent('mouseenter', function () {
                    this.content.addClass('contenidoScrolleable');
                    this.scrollBar.removeClass('scrollBarFocus');
                    this.scroll.addClass('scrollVisible');
                }.bind(this));

                this.content.addEvent('mouseleave', function () {
                    this.content.removeClass('contenidoScrolleable');
                    this.scroll.removeClass('scrollVisible');
                }.bind(this));

                this.scrollBar.addEvent('mouseenter', function () {
                    this.scrollBar.addClass('scrollBarFocus');
                    this.scroll.addClass('scrollVisible');
                }.bind(this));

                this.scrollBar.addEvent('mouseleave', function () {
                    this.scrollBar.removeClass('scrollBarFocus');
                    this.scroll.removeClass('scrollVisible');
                }.bind(this));

                this.content.addEvent('mousewheel', function (e) {

                    if ((this.content == e.target) || (this.content == e.target.getParent('.contenidoScrolleable'))) {
                        var altoVisibleBody = this.content.getSize().y;

                        var stepsVisibles = Math.round(altoVisibleBody / this.stepspx);
                        this.step = this.slider.step;

                        if (e.wheel < 0) {
                            this.step += stepsVisibles / 3;
                            this.step = this.step > this.steps ? this.steps : this.step;
                        } else {
                            this.step -= stepsVisibles / 3;
                            this.step = this.step < 0 ? 0 : this.step;
                        }

                        this.scrollear(this.content, this.step, this.slider, 'scrollBody');
                    }
                }.bind(this));

                if (this.content.getScrollSize().y > this.content.getSize().y) {
                    this.scrollBar.removeClass('oculto');
                } else {
                    this.scrollBar.addClass('oculto');
                }

                this.content.addEvent('jph-scroll-scrollTo', function (y) {
                    var step = Math.round(y / this.stepspx);

                    step = step < 0 ? 0 : step;
                    step = step > this.steps ? this.steps : step;

                    this.scrollear(this.content, y, this.slider, 'scrollBar');
                }.bind(this));

                if(element.hasClass('jph-scroll-no-reload')){
                    element.setData('jphScrollNoReload', "1");    
                }                
            }
        },
        scrollear: function (tbody, step, slider, desde) {
            if (desde == 'scrollBar') {
                tbody.scrollTo(0, step);
            } else {
                slider.set(step);
            }
        }
    });
