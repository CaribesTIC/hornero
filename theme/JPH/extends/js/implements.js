Date.implement({
    toAnsi: function () {
        var  d, m, y;

        d = ("00" + this.getDate()).slice(-2);
        m = ("00" + (this.getMonth() + 1)).slice(-2);;
        y = this.getFullYear();

        return y + m + d;
    },
    toString: function () {
        var  d, m, y;

        d = ("00" + this.getDate()).slice(-2);
        m = ("00" + (this.getMonth() + 1)).slice(-2);;
        y = this.getFullYear();

        return d + "/" + m + "/" + y;
    },
    fromString: function (f) {
        var d = f.split('/')[0] * 1;
        var m = (f.split('/')[1] * 1) - 1;
        var y = f.split('/')[2] * 1;

        this.setDate(d);
        this.setMonth(m);
        this.setFullYear(y);
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);

        return this;
    }
});

Array.implement({
	getSecondToLast: function(match){
		return this.getNthToLast(2);
	},
	
	getThirdToLast: function(match){
		return this.getNthToLast(3);
	},	
	
	getForthToLast: function(match){
		return this.getNthToLast(4);
	},	
	
	getFifthToLast: function(match){
		return this.getNthToLast(5);
	},
	
	getNthToLast:function(n){
		return (this.length > (n - 1)) ? this[this.length - n] : null;
	}	
});

Element.implement({
    removeElement: function (tag) {
        $(this).getElement(tag).destroy();
    },

    removeElements: function (tag) {
        $(this).getElements(tag).destroy();
    },

    removeElementById: function (id) {
        $(this).getElementById(id).destroy();
    },

    removeFirst: function (match) {
        if (match) {
            $(this).getFirst(match).destroy();
        } else {
            $(this).getFirst().destroy();
        }
    },

    removeLast: function (match) {
        if (match) {
            $(this).getLast(match).destroy();
        } else {
            $(this).getLast().destroy();
        }
    },

    removeChildren: function (match) {
        if (match) {
            $(this).getChildren(match).destroy();
        } else {
            $(this).getChildren().destroy();
        }
    },

    removeTextNodes: function () {
        var $c = $(this).clone().getChildren();
        $(this).empty();
        $c.inject($(this));
    },

    getText: function () {
        var $c = $(this).clone();
        $c.removeChildren();
        return $c.get('text');
    },

    getSecond: function (match) {
        return $(this).getChildren(match)[1] || null;
    },

    getThird: function (match) {
        return $(this).getChildren(match)[2] || null;
    },

    getForth: function (match) {
        return $(this).getChildren(match)[3] || null;
    },

    getFifth: function (match) {
        return $(this).getChildren(match)[4] || null;
    },

    getNth: function (match, n) {
        return $(this).getChildren(match)[n - 1] || null;
    },

    getSecondToLast: function (match) {
        return $(this).getChildren(match).getSecondToLast();
    },

    getThirdToLast: function (match) {
        return $(this).getChildren(match).getThirdToLast();
    },

    getForthToLast: function (match) {
        return $(this).getChildren(match).getForthToLast();
    },

    getFifthToLast: function (match) {
        return $(this).getChildren(match).getFifthToLast();
    },

    getNthToLast: function (match, n) {
        return $(this).getChildren(match).getNthToLast(n);
    },

    hasClasses: function (cs) {
        var has = false;
        cs.each(function (c) {
            if ($(this).hasClass(c)) {
                has = true;
            }
        } .bind(this));
        return has;
    },

    hasChildren: function (match) {
        return $(this).getChildren(match).length > 0;
    },

    hasElements: function (match) {
        return $(this).getElements(match).length > 0;
    },

    unselectable: function () {
        if (typeof $(this).onselectstart != 'undefined') {
            $(this).addEvent('selectstart', function () { return false; });
        } else if (typeof $(this).style.MozUserSelect != 'undefined') {
            $(this).setStyle('MozUserSelect', 'none');
        } else if (typeof $(this).style.WebkitUserSelect != 'undefined') {
            $(this).setStyle('WebkitUserSelect', 'none');
        } else if (typeof $(this).unselectable != 'undefined') {
            $(this).setProperty('unselectable', 'on');
        }
    },
    selectable: function () {
        if (typeof $(this).onselectstart != 'undefined') {
            $(this).addEvent('selectstart', function () { return true; });
        } else if (typeof $(this).style.MozUserSelect != 'undefined') {
            $(this).setStyle('MozUserSelect', 'element');
        } else if (typeof $(this).style.WebkitUserSelect != 'undefined') {
            $(this).setStyle('WebkitUserSelect', 'element');
        } else if (typeof $(this).unselectable != 'undefined') {
            $(this).setProperty('unselectable', 'off');
        }
    },
    post: function (url, o) {
        var u = new URI(url);
        var d = u.get('data');
        u.clearData();
        o.url = u.toString();
        o.data = d;
        o.onSuccess = function (a, b, c, d) {
            this.setProperty('html', c);
            eval(d);
        } .bind(this);
        var r = new Request.HTML(o).send();
    },
    isVisible: function () {
            $t = $(this);
            if($t.getParent()){
                    var $p, maxT, minT, tp, pp, t;

                    $p = $t.getParent();
                    pp = $p.getPosition(); 
                    pd = $p.getDimensions();
                    tp = $t.getPosition();

                    t = tp.y - pp.y;
                    maxT = pd.height;
                    minT = 0 - $t.getHeight();

                    return (t > minT && t < maxT );
            }else{
                    return true;
            }

    },
    hasEvent: function(eventType,fn) {
        //get the element's events
        var myEvents = this.retrieve('events');
        //can we shoot this down?
        return myEvents && myEvents[eventType] && (fn == undefined || myEvents[eventType].keys.contains(fn));
    },
    getEvent: function(eventType){
        var evs = this.retrieve('events');
        return evs['click'].keys[0] || undefined;
    },
    getData: function(key){
    	var ds = $(this).dataset;
    	return ds[key] || ds[key.camelCase()] || $(this).getProperty('data-' + key.hyphenate()) || $(this).getProperty(key.hyphenate()) || null;
    },
    setData: function(key, value){
        key = 'data-' + key.hyphenate();
        $(this).setProperty(key, value);
    }
});