/*! Select2 4.0.0 | https://github.com/select2/select2/blob/master/LICENSE.md */ ! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : jQuery)
}(function(a) {
    var b = function() {
            if (a && a.fn && a.fn.select2 && a.fn.select2.amd) var b = a.fn.select2.amd;
            var b;
            return function() {
                    if (!b || !b.requirejs) {
                        b ? c = b : b = {};
                        var a, c, d;
                        ! function(b) {
                            function e(a, b) {
                                return u.call(a, b)
                            }

                            function f(a, b) {
                                var c, d, e, f, g, h, i, j, k, l, m, n = b && b.split("/"),
                                    o = s.map,
                                    p = o && o["*"] || {};
                                if (a && "." === a.charAt(0))
                                    if (b) {
                                        for (n = n.slice(0, n.length - 1), a = a.split("/"), g = a.length - 1, s.nodeIdCompat && w.test(a[g]) && (a[g] = a[g].replace(w, "")), a = n.concat(a), k = 0; k < a.length; k += 1)
                                            if (m = a[k], "." === m) a.splice(k, 1), k -= 1;
                                            else if (".." === m) {
                                            if (1 === k && (".." === a[2] || ".." === a[0])) break;
                                            k > 0 && (a.splice(k - 1, 2), k -= 2)
                                        }
                                        a = a.join("/")
                                    } else 0 === a.indexOf("./") && (a = a.substring(2));
                                if ((n || p) && o) {
                                    for (c = a.split("/"), k = c.length; k > 0; k -= 1) {
                                        if (d = c.slice(0, k).join("/"), n)
                                            for (l = n.length; l > 0; l -= 1)
                                                if (e = o[n.slice(0, l).join("/")], e && (e = e[d])) {
                                                    f = e, h = k;
                                                    break
                                                }
                                        if (f) break;
                                        !i && p && p[d] && (i = p[d], j = k)
                                    }!f && i && (f = i, h = j), f && (c.splice(0, h, f), a = c.join("/"))
                                }
                                return a
                            }

                            function g(a, c) {
                                return function() {
                                    return n.apply(b, v.call(arguments, 0).concat([a, c]))
                                }
                            }

                            function h(a) {
                                return function(b) {
                                    return f(b, a)
                                }
                            }

                            function i(a) {
                                return function(b) {
                                    q[a] = b
                                }
                            }

                            function j(a) {
                                if (e(r, a)) {
                                    var c = r[a];
                                    delete r[a], t[a] = !0, m.apply(b, c)
                                }
                                if (!e(q, a) && !e(t, a)) throw new Error("No " + a);
                                return q[a]
                            }

                            function k(a) {
                                var b, c = a ? a.indexOf("!") : -1;
                                return c > -1 && (b = a.substring(0, c), a = a.substring(c + 1, a.length)), [b, a]
                            }

                            function l(a) {
                                return function() {
                                    return s && s.config && s.config[a] || {}
                                }
                            }
                            var m, n, o, p, q = {},
                                r = {},
                                s = {},
                                t = {},
                                u = Object.prototype.hasOwnProperty,
                                v = [].slice,
                                w = /\.js$/;
                            o = function(a, b) {
                                var c, d = k(a),
                                    e = d[0];
                                return a = d[1], e && (e = f(e, b), c = j(e)), e ? a = c && c.normalize ? c.normalize(a, h(b)) : f(a, b) : (a = f(a, b), d = k(a), e = d[0], a = d[1], e && (c = j(e))), {
                                    f: e ? e + "!" + a : a,
                                    n: a,
                                    pr: e,
                                    p: c
                                }
                            }, p = {
                                require: function(a) {
                                    return g(a)
                                },
                                exports: function(a) {
                                    var b = q[a];
                                    return "undefined" != typeof b ? b : q[a] = {}
                                },
                                module: function(a) {
                                    return {
                                        id: a,
                                        uri: "",
                                        exports: q[a],
                                        config: l(a)
                                    }
                                }
                            }, m = function(a, c, d, f) {
                                var h, k, l, m, n, s, u = [],
                                    v = typeof d;
                                if (f = f || a, "undefined" === v || "function" === v) {
                                    for (c = !c.length && d.length ? ["require", "exports", "module"] : c, n = 0; n < c.length; n += 1)
                                        if (m = o(c[n], f), k = m.f, "require" === k) u[n] = p.require(a);
                                        else if ("exports" === k) u[n] = p.exports(a), s = !0;
                                    else if ("module" === k) h = u[n] = p.module(a);
                                    else if (e(q, k) || e(r, k) || e(t, k)) u[n] = j(k);
                                    else {
                                        if (!m.p) throw new Error(a + " missing " + k);
                                        m.p.load(m.n, g(f, !0), i(k), {}), u[n] = q[k]
                                    }
                                    l = d ? d.apply(q[a], u) : void 0, a && (h && h.exports !== b && h.exports !== q[a] ? q[a] = h.exports : l === b && s || (q[a] = l))
                                } else a && (q[a] = d)
                            }, a = c = n = function(a, c, d, e, f) {
                                if ("string" == typeof a) return p[a] ? p[a](c) : j(o(a, c).f);
                                if (!a.splice) {
                                    if (s = a, s.deps && n(s.deps, s.callback), !c) return;
                                    c.splice ? (a = c, c = d, d = null) : a = b
                                }
                                return c = c || function() {}, "function" == typeof d && (d = e, e = f), e ? m(b, a, c, d) : setTimeout(function() {
                                    m(b, a, c, d)
                                }, 4), n
                            }, n.config = function(a) {
                                return n(a)
                            }, a._defined = q, d = function(a, b, c) {
                                b.splice || (c = b, b = []), e(q, a) || e(r, a) || (r[a] = [a, b, c])
                            }, d.amd = {
                                jQuery: !0
                            }
                        }(), b.requirejs = a, b.require = c, b.define = d
                    }
                }(), b.define("almond", function() {}), b.define("jquery", [], function() {
                    var b = a || $;
                    return null == b && console && console.error && console.error("Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."), b
                }), b.define("select2/utils", ["jquery"], function(a) {
                    function b(a) {
                        var b = a.prototype,
                            c = [];
                        for (var d in b) {
                            var e = b[d];
                            "function" == typeof e && "constructor" !== d && c.push(d)
                        }
                        return c
                    }
                    var c = {};
                    c.Extend = function(a, b) {
                        function c() {
                            this.constructor = a
                        }
                        var d = {}.hasOwnProperty;
                        for (var e in b) d.call(b, e) && (a[e] = b[e]);
                        return c.prototype = b.prototype, a.prototype = new c, a.__super__ = b.prototype, a
                    }, c.Decorate = function(a, c) {
                        function d() {
                            var b = Array.prototype.unshift,
                                d = c.prototype.constructor.length,
                                e = a.prototype.constructor;
                            d > 0 && (b.call(arguments, a.prototype.constructor), e = c.prototype.constructor), e.apply(this, arguments)
                        }

                        function e() {
                            this.constructor = d
                        }
                        var f = b(c),
                            g = b(a);
                        c.displayName = a.displayName, d.prototype = new e;
                        for (var h = 0; h < g.length; h++) {
                            var i = g[h];
                            d.prototype[i] = a.prototype[i]
                        }
                        for (var j = (function(a) {
                                var b = function() {};
                                a in d.prototype && (b = d.prototype[a]);
                                var e = c.prototype[a];
                                return function() {
                                    var a = Array.prototype.unshift;
                                    return a.call(arguments, b), e.apply(this, arguments)
                                }
                            }), k = 0; k < f.length; k++) {
                            var l = f[k];
                            d.prototype[l] = j(l)
                        }
                        return d
                    };
                    var d = function() {
                        this.listeners = {}
                    };
                    return d.prototype.on = function(a, b) {
                        this.listeners = this.listeners || {}, a in this.listeners ? this.listeners[a].push(b) : this.listeners[a] = [b]
                    }, d.prototype.trigger = function(a) {
                        var b = Array.prototype.slice;
                        this.listeners = this.listeners || {}, a in this.listeners && this.invoke(this.listeners[a], b.call(arguments, 1)), "*" in this.listeners && this.invoke(this.listeners["*"], arguments)
                    }, d.prototype.invoke = function(a, b) {
                        for (var c = 0, d = a.length; d > c; c++) a[c].apply(this, b)
                    }, c.Observable = d, c.generateChars = function(a) {
                        for (var b = "", c = 0; a > c; c++) {
                            var d = Math.floor(36 * Math.random());
                            b += d.toString(36)
                        }
                        return b
                    }, c.bind = function(a, b) {
                        return function() {
                            a.apply(b, arguments)
                        }
                    }, c._convertData = function(a) {
                        for (var b in a) {
                            var c = b.split("-"),
                                d = a;
                            if (1 !== c.length) {
                                for (var e = 0; e < c.length; e++) {
                                    var f = c[e];
                                    f = f.substring(0, 1).toLowerCase() + f.substring(1), f in d || (d[f] = {}), e == c.length - 1 && (d[f] = a[b]), d = d[f]
                                }
                                delete a[b]
                            }
                        }
                        return a
                    }, c.hasScroll = function(b, c) {
                        var d = a(c),
                            e = c.style.overflowX,
                            f = c.style.overflowY;
                        return e !== f || "hidden" !== f && "visible" !== f ? "scroll" === e || "scroll" === f ? !0 : d.innerHeight() < c.scrollHeight || d.innerWidth() < c.scrollWidth : !1
                    }, c.escapeMarkup = function(a) {
                        var b = {
                            "\\": "&#92;",
                            "&": "&amp;",
                            "<": "&lt;",
                            ">": "&gt;",
                            '"': "&quot;",
                            "'": "&#39;",
                            "/": "&#47;"
                        };
                        return "string" != typeof a ? a : String(a).replace(/[&<>"'\/\\]/g, function(a) {
                            return b[a]
                        })
                    }, c.appendMany = function(b, c) {
                        if ("1.7" === a.fn.jquery.substr(0, 3)) {
                            var d = a();
                            a.map(c, function(a) {
                                d = d.add(a)
                            }), c = d
                        }
                        b.append(c)
                    }, c
                }), b.define("select2/results", ["jquery", "./utils"], function(a, b) {
                    function c(a, b, d) {
                        this.$element = a, this.data = d, this.options = b, c.__super__.constructor.call(this)
                    }
                    return b.Extend(c, b.Observable), c.prototype.render = function() {
                        var b = a('<ul class="select2-results__options" role="tree"></ul>');
                        return this.options.get("multiple") && b.attr("aria-multiselectable", "true"), this.$results = b, b
                    }, c.prototype.clear = function() {
                        this.$results.empty()
                    }, c.prototype.displayMessage = function(b) {
                        var c = this.options.get("escapeMarkup");
                        this.clear(), this.hideLoading();
                        var d = a('<li role="treeitem" class="select2-results__option"></li>'),
                            e = this.options.get("translations").get(b.message);
                        d.append(c(e(b.args))), this.$results.append(d)
                    }, c.prototype.append = function(a) {
                        this.hideLoading();
                        var b = [];
                        if (null == a.results || 0 === a.results.length) return void(0 === this.$results.children().length && this.trigger("results:message", {
                            message: "noResults"
                        }));
                        a.results = this.sort(a.results);
                        for (var c = 0; c < a.results.length; c++) {
                            var d = a.results[c],
                                e = this.option(d);
                            b.push(e)
                        }
                        this.$results.append(b)
                    }, c.prototype.position = function(a, b) {
                        var c = b.find(".select2-results");
                        c.append(a)
                    }, c.prototype.sort = function(a) {
                        var b = this.options.get("sorter");
                        return b(a)
                    }, c.prototype.setClasses = function() {
                        var b = this;
                        this.data.current(function(c) {
                            var d = a.map(c, function(a) {
                                    return a.id.toString()
                                }),
                                e = b.$results.find(".select2-results__option[aria-selected]");
                            e.each(function() {
                                var b = a(this),
                                    c = a.data(this, "data"),
                                    e = "" + c.id;
                                null != c.element && c.element.selected || null == c.element && a.inArray(e, d) > -1 ? b.attr("aria-selected", "true") : b.attr("aria-selected", "false")
                            });
                            var f = e.filter("[aria-selected=true]");
                            f.length > 0 ? f.first().trigger("mouseenter") : e.first().trigger("mouseenter")
                        })
                    }, c.prototype.showLoading = function(a) {
                        this.hideLoading();
                        var b = this.options.get("translations").get("searching"),
                            c = {
                                disabled: !0,
                                loading: !0,
                                text: b(a)
                            },
                            d = this.option(c);
                        d.className += " loading-results", this.$results.prepend(d)
                    }, c.prototype.hideLoading = function() {
                        this.$results.find(".loading-results").remove()
                    }, c.prototype.option = function(b) {
                        var c = document.createElement("li");
                        c.className = "select2-results__option";
                        var d = {
                            role: "treeitem",
                            "aria-selected": "false"
                        };
                        b.disabled && (delete d["aria-selected"], d["aria-disabled"] = "true"), null == b.id && delete d["aria-selected"], null != b._resultId && (c.id = b._resultId), b.title && (c.title = b.title), b.children && (d.role = "group", d["aria-label"] = b.text, delete d["aria-selected"]);
                        for (var e in d) {
                            var f = d[e];
                            c.setAttribute(e, f)
                        }
                        if (b.children) {
                            var g = a(c),
                                h = document.createElement("strong");
                            h.className = "select2-results__group"; {
                                a(h)
                            }
                            this.template(b, h);
                            for (var i = [], j = 0; j < b.children.length; j++) {
                                var k = b.children[j],
                                    l = this.option(k);
                                i.push(l)
                            }
                            var m = a("<ul></ul>", {
                                "class": "select2-results__options select2-results__options--nested"
                            });
                            m.append(i), g.append(h), g.append(m)
                        } else this.template(b, c);
                        return a.data(c, "data", b), c
                    }, c.prototype.bind = function(b) {
                        var c = this,
                            d = b.id + "-results";
                        this.$results.attr("id", d), b.on("results:all", function(a) {
                            c.clear(), c.append(a.data), b.isOpen() && c.setClasses()
                        }), b.on("results:append", function(a) {
                            c.append(a.data), b.isOpen() && c.setClasses()
                        }), b.on("query", function(a) {
                            c.showLoading(a)
                        }), b.on("select", function() {
                            b.isOpen() && c.setClasses()
                        }), b.on("unselect", function() {
                            b.isOpen() && c.setClasses()
                        }), b.on("open", function() {
                            c.$results.attr("aria-expanded", "true"), c.$results.attr("aria-hidden", "false"), c.setClasses(), c.ensureHighlightVisible()
                        }), b.on("close", function() {
                            c.$results.attr("aria-expanded", "false"), c.$results.attr("aria-hidden", "true"), c.$results.removeAttr("aria-activedescendant")
                        }), b.on("results:toggle", function() {
                            var a = c.getHighlightedResults();
                            0 !== a.length && a.trigger("mouseup")
                        }), b.on("results:select", function() {
                            var a = c.getHighlightedResults();
                            if (0 !== a.length) {
                                var b = a.data("data");
                                "true" == a.attr("aria-selected") ? c.trigger("close") : c.trigger("select", {
                                    data: b
                                })
                            }
                        }), b.on("results:previous", function() {
                            var a = c.getHighlightedResults(),
                                b = c.$results.find("[aria-selected]"),
                                d = b.index(a);
                            if (0 !== d) {
                                var e = d - 1;
                                0 === a.length && (e = 0);
                                var f = b.eq(e);
                                f.trigger("mouseenter");
                                var g = c.$results.offset().top,
                                    h = f.offset().top,
                                    i = c.$results.scrollTop() + (h - g);
                                0 === e ? c.$results.scrollTop(0) : 0 > h - g && c.$results.scrollTop(i)
                            }
                        }), b.on("results:next", function() {
                            var a = c.getHighlightedResults(),
                                b = c.$results.find("[aria-selected]"),
                                d = b.index(a),
                                e = d + 1;
                            if (!(e >= b.length)) {
                                var f = b.eq(e);
                                f.trigger("mouseenter");
                                var g = c.$results.offset().top + c.$results.outerHeight(!1),
                                    h = f.offset().top + f.outerHeight(!1),
                                    i = c.$results.scrollTop() + h - g;
                                0 === e ? c.$results.scrollTop(0) : h > g && c.$results.scrollTop(i)
                            }
                        }), b.on("results:focus", function(a) {
                            a.element.addClass("select2-results__option--highlighted")
                        }), b.on("results:message", function(a) {
                            c.displayMessage(a)
                        }), a.fn.mousewheel && this.$results.on("mousewheel", function(a) {
                            var b = c.$results.scrollTop(),
                                d = c.$results.get(0).scrollHeight - c.$results.scrollTop() + a.deltaY,
                                e = a.deltaY > 0 && b - a.deltaY <= 0,
                                f = a.deltaY < 0 && d <= c.$results.height();
                            e ? (c.$results.scrollTop(0), a.preventDefault(), a.stopPropagation()) : f && (c.$results.scrollTop(c.$results.get(0).scrollHeight - c.$results.height()), a.preventDefault(), a.stopPropagation())
                        }), this.$results.on("mouseup", ".select2-results__option[aria-selected]", function(b) {
                            var d = a(this),
                                e = d.data("data");
                            return "true" === d.attr("aria-selected") ? void(c.options.get("multiple") ? c.trigger("unselect", {
                                originalEvent: b,
                                data: e
                            }) : c.trigger("close")) : void c.trigger("select", {
                                originalEvent: b,
                                data: e
                            })
                        }), this.$results.on("mouseenter", ".select2-results__option[aria-selected]", function() {
                            var b = a(this).data("data");
                            c.getHighlightedResults().removeClass("select2-results__option--highlighted"), c.trigger("results:focus", {
                                data: b,
                                element: a(this)
                            })
                        })
                    }, c.prototype.getHighlightedResults = function() {
                        var a = this.$results.find(".select2-results__option--highlighted");
                        return a
                    }, c.prototype.destroy = function() {
                        this.$results.remove()
                    }, c.prototype.ensureHighlightVisible = function() {
                        var a = this.getHighlightedResults();
                        if (0 !== a.length) {
                            var b = this.$results.find("[aria-selected]"),
                                c = b.index(a),
                                d = this.$results.offset().top,
                                e = a.offset().top,
                                f = this.$results.scrollTop() + (e - d),
                                g = e - d;
                            f -= 2 * a.outerHeight(!1), 2 >= c ? this.$results.scrollTop(0) : (g > this.$results.outerHeight() || 0 > g) && this.$results.scrollTop(f)
                        }
                    }, c.prototype.template = function(b, c) {
                        var d = this.options.get("templateResult"),
                            e = this.options.get("escapeMarkup"),
                            f = d(b);
                        null == f ? c.style.display = "none" : "string" == typeof f ? c.innerHTML = e(f) : a(c).append(f)
                    }, c
                }), b.define("select2/keys", [], function() {
                    var a = {
                        BACKSPACE: 8,
                        TAB: 9,
                        ENTER: 13,
                        SHIFT: 16,
                        CTRL: 17,
                        ALT: 18,
                        ESC: 27,
                        SPACE: 32,
                        PAGE_UP: 33,
                        PAGE_DOWN: 34,
                        END: 35,
                        HOME: 36,
                        LEFT: 37,
                        UP: 38,
                        RIGHT: 39,
                        DOWN: 40,
                        DELETE: 46
                    };
                    return a
                }), b.define("select2/selection/base", ["jquery", "../utils", "../keys"], function(a, b, c) {
                    function d(a, b) {
                        this.$element = a, this.options = b, d.__super__.constructor.call(this)
                    }
                    return b.Extend(d, b.Observable), d.prototype.render = function() {
                        var b = a('<span class="select2-selection" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false"></span>');
                        return this._tabindex = 0, null != this.$element.data("old-tabindex") ? this._tabindex = this.$element.data("old-tabindex") : null != this.$element.attr("tabindex") && (this._tabindex = this.$element.attr("tabindex")), b.attr("title", this.$element.attr("title")), b.attr("tabindex", this._tabindex), this.$selection = b, b
                    }, d.prototype.bind = function(a) {
                        var b = this,
                            d = (a.id + "-container", a.id + "-results");
                        this.container = a, this.$selection.on("focus", function(a) {
                            b.trigger("focus", a)
                        }), this.$selection.on("blur", function(a) {
                            b.trigger("blur", a)
                        }), this.$selection.on("keydown", function(a) {
                            b.trigger("keypress", a), a.which === c.SPACE && a.preventDefault()
                        }), a.on("results:focus", function(a) {
                            b.$selection.attr("aria-activedescendant", a.data._resultId)
                        }), a.on("selection:update", function(a) {
                            b.update(a.data)
                        }), a.on("open", function() {
                            b.$selection.attr("aria-expanded", "true"), b.$selection.attr("aria-owns", d), b._attachCloseHandler(a)
                        }), a.on("close", function() {
                            b.$selection.attr("aria-expanded", "false"), b.$selection.removeAttr("aria-activedescendant"), b.$selection.removeAttr("aria-owns"), b.$selection.focus(), b._detachCloseHandler(a)
                        }), a.on("enable", function() {
                            b.$selection.attr("tabindex", b._tabindex)
                        }), a.on("disable", function() {
                            b.$selection.attr("tabindex", "-1")
                        })
                    }, d.prototype._attachCloseHandler = function(b) {
                        a(document.body).on("mousedown.select2." + b.id, function(b) {
                            var c = a(b.target),
                                d = c.closest(".select2"),
                                e = a(".select2.select2-container--open");
                            e.each(function() {
                                var b = a(this);
                                if (this != d[0]) {
                                    var c = b.data("element");
                                    c.select2("close")
                                }
                            })
                        })
                    }, d.prototype._detachCloseHandler = function(b) {
                        a(document.body).off("mousedown.select2." + b.id)
                    }, d.prototype.position = function(a, b) {
                        var c = b.find(".selection");
                        c.append(a)
                    }, d.prototype.destroy = function() {
                        this._detachCloseHandler(this.container)
                    }, d.prototype.update = function() {
                        throw new Error("The `update` method must be defined in child classes.")
                    }, d
                }), b.define("select2/selection/single", ["jquery", "./base", "../utils", "../keys"], function(a, b, c) {
                    function d() {
                        d.__super__.constructor.apply(this, arguments)
                    }
                    return c.Extend(d, b), d.prototype.render = function() {
                        var a = d.__super__.render.call(this);
                        return a.addClass("select2-selection--single"), a.html('<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'), a
                    }, d.prototype.bind = function(a) {
                        var b = this;
                        d.__super__.bind.apply(this, arguments);
                        var c = a.id + "-container";
                        this.$selection.find(".select2-selection__rendered").attr("id", c), this.$selection.attr("aria-labelledby", c), this.$selection.on("mousedown", function(a) {
                            1 === a.which && b.trigger("toggle", {
                                originalEvent: a
                            })
                        }), this.$selection.on("focus", function() {}), this.$selection.on("blur", function() {}), a.on("selection:update", function(a) {
                            b.update(a.data)
                        })
                    }, d.prototype.clear = function() {
                        this.$selection.find(".select2-selection__rendered").empty()
                    }, d.prototype.display = function(a) {
                        var b = this.options.get("templateSelection"),
                            c = this.options.get("escapeMarkup");
                        return c(b(a))
                    }, d.prototype.selectionContainer = function() {
                        return a("<span></span>")
                    }, d.prototype.update = function(a) {
                        if (0 === a.length) return void this.clear();
                        var b = a[0],
                            c = this.display(b),
                            d = this.$selection.find(".select2-selection__rendered");
                        d.empty().append(c), d.prop("title", b.title || b.text)
                    }, d
                }), b.define("select2/selection/multiple", ["jquery", "./base", "../utils"], function(a, b, c) {
                    function d() {
                        d.__super__.constructor.apply(this, arguments)
                    }
                    return c.Extend(d, b), d.prototype.render = function() {
                        var a = d.__super__.render.call(this);
                        return a.addClass("select2-selection--multiple"), a.html('<ul class="select2-selection__rendered"></ul>'), a
                    }, d.prototype.bind = function() {
                        var b = this;
                        d.__super__.bind.apply(this, arguments), this.$selection.on("click", function(a) {
                            b.trigger("toggle", {
                                originalEvent: a
                            })
                        }), this.$selection.on("click", ".select2-selection__choice__remove", function(c) {
                            var d = a(this),
                                e = d.parent(),
                                f = e.data("data");
                            b.trigger("unselect", {
                                originalEvent: c,
                                data: f
                            })
                        })
                    }, d.prototype.clear = function() {
                        this.$selection.find(".select2-selection__rendered").empty()
                    }, d.prototype.display = function(a) {
                        var b = this.options.get("templateSelection"),
                            c = this.options.get("escapeMarkup");
                        return c(b(a))
                    }, d.prototype.selectionContainer = function() {
                        var b = a('<li class="select2-selection__choice"><span class="select2-selection__choice__remove" role="presentation">&times;</span></li>');
                        return b
                    }, d.prototype.update = function(a) {
                        if (this.clear(), 0 !== a.length) {
                            for (var b = [], d = 0; d < a.length; d++) {
                                var e = a[d],
                                    f = this.display(e),
                                    g = this.selectionContainer();
                                g.append(f), g.prop("title", e.title || e.text), g.data("data", e), b.push(g)
                            }
                            var h = this.$selection.find(".select2-selection__rendered");
                            c.appendMany(h, b)
                        }
                    }, d
                }), b.define("select2/selection/placeholder", ["../utils"], function() {
                    function a(a, b, c) {
                        this.placeholder = this.normalizePlaceholder(c.get("placeholder")), a.call(this, b, c)
                    }
                    return a.prototype.normalizePlaceholder = function(a, b) {
                        return "string" == typeof b && (b = {
                            id: "",
                            text: b
                        }), b
                    }, a.prototype.createPlaceholder = function(a, b) {
                        var c = this.selectionContainer();
                        return c.html(this.display(b)), c.addClass("select2-selection__placeholder").removeClass("select2-selection__choice"), c
                    }, a.prototype.update = function(a, b) {
                        var c = 1 == b.length && b[0].id != this.placeholder.id,
                            d = b.length > 1;
                        if (d || c) return a.call(this, b);
                        this.clear();
                        var e = this.createPlaceholder(this.placeholder);
                        this.$selection.find(".select2-selection__rendered").append(e)
                    }, a
                }), b.define("select2/selection/allowClear", ["jquery", "../keys"], function(a, b) {
                    function c() {}
                    return c.prototype.bind = function(a, b, c) {
                        var d = this;
                        a.call(this, b, c), null == this.placeholder && this.options.get("debug") && window.console && console.error && console.error("Select2: The `allowClear` option should be used in combination with the `placeholder` option."), this.$selection.on("mousedown", ".select2-selection__clear", function(a) {
                            d._handleClear(a)
                        }), b.on("keypress", function(a) {
                            d._handleKeyboardClear(a, b)
                        })
                    }, c.prototype._handleClear = function(a, b) {
                        if (!this.options.get("disabled")) {
                            var c = this.$selection.find(".select2-selection__clear");
                            if (0 !== c.length) {
                                b.stopPropagation();
                                for (var d = c.data("data"), e = 0; e < d.length; e++) {
                                    var f = {
                                        data: d[e]
                                    };
                                    if (this.trigger("unselect", f), f.prevented) return
                                }
                                this.$element.val(this.placeholder.id).trigger("change"), this.trigger("toggle")
                            }
                        }
                    }, c.prototype._handleKeyboardClear = function(a, c, d) {
                        d.isOpen() || (c.which == b.DELETE || c.which == b.BACKSPACE) && this._handleClear(c)
                    }, c.prototype.update = function(b, c) {
                        if (b.call(this, c), !(this.$selection.find(".select2-selection__placeholder").length > 0 || 0 === c.length)) {
                            var d = a('<span class="select2-selection__clear">&times;</span>');
                            d.data("data", c), this.$selection.find(".select2-selection__rendered").prepend(d)
                        }
                    }, c
                }), b.define("select2/selection/search", ["jquery", "../utils", "../keys"], function(a, b, c) {
                    function d(a, b, c) {
                        a.call(this, b, c)
                    }
                    return d.prototype.render = function(b) {
                        var c = a('<li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></li>');
                        this.$searchContainer = c, this.$search = c.find("input");
                        var d = b.call(this);
                        return d
                    }, d.prototype.bind = function(a, b, d) {
                        var e = this;
                        a.call(this, b, d), b.on("open", function() {
                            e.$search.attr("tabindex", 0), setTimeout(function(){e.$search.focus()},10)
                        }), b.on("close", function() {
                            e.$search.attr("tabindex", -1), e.$search.val(""), e.$search.focus()
                        }), b.on("enable", function() {
                            e.$search.prop("disabled", !1)
                        }), b.on("disable", function() {
                            e.$search.prop("disabled", !0)
                        }), this.$selection.on("focusin", ".select2-search--inline", function(a) {
                            e.trigger("focus", a)
                        }), this.$selection.on("focusout", ".select2-search--inline", function(a) {
                            e.trigger("blur", a)
                        }), this.$selection.on("keydown", ".select2-search--inline", function(a) {
                            a.stopPropagation(), e.trigger("keypress", a), e._keyUpPrevented = a.isDefaultPrevented();
                            var b = a.which;
                            if (b === c.BACKSPACE && "" === e.$search.val()) {
                                var d = e.$searchContainer.prev(".select2-selection__choice");
                                if (d.length > 0) {
                                    var f = d.data("data");
                                    e.searchRemoveChoice(f), a.preventDefault()
                                }
                            }
                        }), this.$selection.on("input", ".select2-search--inline", function() {
                            e.$selection.off("keyup.search")
                        }), this.$selection.on("keyup.search input", ".select2-search--inline", function(a) {
                            e.handleSearch(a)
                        })
                    }, d.prototype.createPlaceholder = function(a, b) {
                        this.$search.attr("placeholder", b.text)
                    }, d.prototype.update = function(a, b) {
                        this.$search.attr("placeholder", ""), a.call(this, b), this.$selection.find(".select2-selection__rendered").append(this.$searchContainer), this.resizeSearch()
                    }, d.prototype.handleSearch = function() {
                        if (this.resizeSearch(), !this._keyUpPrevented) {
                            var a = this.$search.val();
                            this.trigger("query", {
                                term: a
                            })
                        }
                        this._keyUpPrevented = !1
                    }, d.prototype.searchRemoveChoice = function(a, b) {
                        this.trigger("unselect", {
                            data: b
                        }), this.trigger("open"), this.$search.val(b.text + " ")
                    }, d.prototype.resizeSearch = function() {
                        this.$search.css("width", "25px");
                        var a = "";
                        if ("" !== this.$search.attr("placeholder")) a = this.$selection.find(".select2-selection__rendered").innerWidth();
                        else {
                            var b = this.$search.val().length + 1;
                            a = .75 * b + "em"
                        }
                        this.$search.css("width", a)
                    }, d
                }), b.define("select2/selection/eventRelay", ["jquery"], function(a) {
                    function b() {}
                    return b.prototype.bind = function(b, c, d) {
                        var e = this,
                            f = ["open", "opening", "close", "closing", "select", "selecting", "unselect", "unselecting"],
                            g = ["opening", "closing", "selecting", "unselecting"];
                        b.call(this, c, d), c.on("*", function(b, c) {
                            if (-1 !== a.inArray(b, f)) {
                                c = c || {};
                                var d = a.Event("select2:" + b, {
                                    params: c
                                });
                                e.$element.trigger(d), -1 !== a.inArray(b, g) && (c.prevented = d.isDefaultPrevented())
                            }
                        })
                    }, b
                }), b.define("select2/translation", ["jquery", "require"], function(a, b) {
                    function c(a) {
                        this.dict = a || {}
                    }
                    return c.prototype.all = function() {
                        return this.dict
                    }, c.prototype.get = function(a) {
                        return this.dict[a]
                    }, c.prototype.extend = function(b) {
                        this.dict = a.extend({}, b.all(), this.dict)
                    }, c._cache = {}, c.loadPath = function(a) {
                        if (!(a in c._cache)) {
                            var d = b(a);
                            c._cache[a] = d
                        }
                        return new c(c._cache[a])
                    }, c
                }), b.define("select2/diacritics", [], function() {
                    var a = {
                        "Ⓐ": "A",
                        "Ａ": "A",
                        "À": "A",
                        "Á": "A",
                        "Â": "A",
                        "Ầ": "A",
                        "Ấ": "A",
                        "Ẫ": "A",
                        "Ẩ": "A",
                        "Ã": "A",
                        "Ā": "A",
                        "Ă": "A",
                        "Ằ": "A",
                        "Ắ": "A",
                        "Ẵ": "A",
                        "Ẳ": "A",
                        "Ȧ": "A",
                        "Ǡ": "A",
                        "Ä": "A",
                        "Ǟ": "A",
                        "Ả": "A",
                        "Å": "A",
                        "Ǻ": "A",
                        "Ǎ": "A",
                        "Ȁ": "A",
                        "Ȃ": "A",
                        "Ạ": "A",
                        "Ậ": "A",
                        "Ặ": "A",
                        "Ḁ": "A",
                        "Ą": "A",
                        "Ⱥ": "A",
                        "Ɐ": "A",
                        "Ꜳ": "AA",
                        "Æ": "AE",
                        "Ǽ": "AE",
                        "Ǣ": "AE",
                        "Ꜵ": "AO",
                        "Ꜷ": "AU",
                        "Ꜹ": "AV",
                        "Ꜻ": "AV",
                        "Ꜽ": "AY",
                        "Ⓑ": "B",
                        "Ｂ": "B",
                        "Ḃ": "B",
                        "Ḅ": "B",
                        "Ḇ": "B",
                        "Ƀ": "B",
                        "Ƃ": "B",
                        "Ɓ": "B",
                        "Ⓒ": "C",
                        "Ｃ": "C",
                        "Ć": "C",
                        "Ĉ": "C",
                        "Ċ": "C",
                        "Č": "C",
                        "Ç": "C",
                        "Ḉ": "C",
                        "Ƈ": "C",
                        "Ȼ": "C",
                        "Ꜿ": "C",
                        "Ⓓ": "D",
                        "Ｄ": "D",
                        "Ḋ": "D",
                        "Ď": "D",
                        "Ḍ": "D",
                        "Ḑ": "D",
                        "Ḓ": "D",
                        "Ḏ": "D",
                        "Đ": "D",
                        "Ƌ": "D",
                        "Ɗ": "D",
                        "Ɖ": "D",
                        "Ꝺ": "D",
                        "Ǳ": "DZ",
                        "Ǆ": "DZ",
                        "ǲ": "Dz",
                        "ǅ": "Dz",
                        "Ⓔ": "E",
                        "Ｅ": "E",
                        "È": "E",
                        "É": "E",
                        "Ê": "E",
                        "Ề": "E",
                        "Ế": "E",
                        "Ễ": "E",
                        "Ể": "E",
                        "Ẽ": "E",
                        "Ē": "E",
                        "Ḕ": "E",
                        "Ḗ": "E",
                        "Ĕ": "E",
                        "Ė": "E",
                        "Ë": "E",
                        "Ẻ": "E",
                        "Ě": "E",
                        "Ȅ": "E",
                        "Ȇ": "E",
                        "Ẹ": "E",
                        "Ệ": "E",
                        "Ȩ": "E",
                        "Ḝ": "E",
                        "Ę": "E",
                        "Ḙ": "E",
                        "Ḛ": "E",
                        "Ɛ": "E",
                        "Ǝ": "E",
                        "Ⓕ": "F",
                        "Ｆ": "F",
                        "Ḟ": "F",
                        "Ƒ": "F",
                        "Ꝼ": "F",
                        "Ⓖ": "G",
                        "Ｇ": "G",
                        "Ǵ": "G",
                        "Ĝ": "G",
                        "Ḡ": "G",
                        "Ğ": "G",
                        "Ġ": "G",
                        "Ǧ": "G",
                        "Ģ": "G",
                        "Ǥ": "G",
                        "Ɠ": "G",
                        "Ꞡ": "G",
                        "Ᵹ": "G",
                        "Ꝿ": "G",
                        "Ⓗ": "H",
                        "Ｈ": "H",
                        "Ĥ": "H",
                        "Ḣ": "H",
                        "Ḧ": "H",
                        "Ȟ": "H",
                        "Ḥ": "H",
                        "Ḩ": "H",
                        "Ḫ": "H",
                        "Ħ": "H",
                        "Ⱨ": "H",
                        "Ⱶ": "H",
                        "Ɥ": "H",
                        "Ⓘ": "I",
                        "Ｉ": "I",
                        "Ì": "I",
                        "Í": "I",
                        "Î": "I",
                        "Ĩ": "I",
                        "Ī": "I",
                        "Ĭ": "I",
                        "İ": "I",
                        "Ï": "I",
                        "Ḯ": "I",
                        "Ỉ": "I",
                        "Ǐ": "I",
                        "Ȉ": "I",
                        "Ȋ": "I",
                        "Ị": "I",
                        "Į": "I",
                        "Ḭ": "I",
                        "Ɨ": "I",
                        "Ⓙ": "J",
                        "Ｊ": "J",
                        "Ĵ": "J",
                        "Ɉ": "J",
                        "Ⓚ": "K",
                        "Ｋ": "K",
                        "Ḱ": "K",
                        "Ǩ": "K",
                        "Ḳ": "K",
                        "Ķ": "K",
                        "Ḵ": "K",
                        "Ƙ": "K",
                        "Ⱪ": "K",
                        "Ꝁ": "K",
                        "Ꝃ": "K",
                        "Ꝅ": "K",
                        "Ꞣ": "K",
                        "Ⓛ": "L",
                        "Ｌ": "L",
                        "Ŀ": "L",
                        "Ĺ": "L",
                        "Ľ": "L",
                        "Ḷ": "L",
                        "Ḹ": "L",
                        "Ļ": "L",
                        "Ḽ": "L",
                        "Ḻ": "L",
                        "Ł": "L",
                        "Ƚ": "L",
                        "Ɫ": "L",
                        "Ⱡ": "L",
                        "Ꝉ": "L",
                        "Ꝇ": "L",
                        "Ꞁ": "L",
                        "Ǉ": "LJ",
                        "ǈ": "Lj",
                        "Ⓜ": "M",
                        "Ｍ": "M",
                        "Ḿ": "M",
                        "Ṁ": "M",
                        "Ṃ": "M",
                        "Ɱ": "M",
                        "Ɯ": "M",
                        "Ⓝ": "N",
                        "Ｎ": "N",
                        "Ǹ": "N",
                        "Ń": "N",
                        "Ñ": "N",
                        "Ṅ": "N",
                        "Ň": "N",
                        "Ṇ": "N",
                        "Ņ": "N",
                        "Ṋ": "N",
                        "Ṉ": "N",
                        "Ƞ": "N",
                        "Ɲ": "N",
                        "Ꞑ": "N",
                        "Ꞥ": "N",
                        "Ǌ": "NJ",
                        "ǋ": "Nj",
                        "Ⓞ": "O",
                        "Ｏ": "O",
                        "Ò": "O",
                        "Ó": "O",
                        "Ô": "O",
                        "Ồ": "O",
                        "Ố": "O",
                        "Ỗ": "O",
                        "Ổ": "O",
                        "Õ": "O",
                        "Ṍ": "O",
                        "Ȭ": "O",
                        "Ṏ": "O",
                        "Ō": "O",
                        "Ṑ": "O",
                        "Ṓ": "O",
                        "Ŏ": "O",
                        "Ȯ": "O",
                        "Ȱ": "O",
                        "Ö": "O",
                        "Ȫ": "O",
                        "Ỏ": "O",
                        "Ő": "O",
                        "Ǒ": "O",
                        "Ȍ": "O",
                        "Ȏ": "O",
                        "Ơ": "O",
                        "Ờ": "O",
                        "Ớ": "O",
                        "Ỡ": "O",
                        "Ở": "O",
                        "Ợ": "O",
                        "Ọ": "O",
                        "Ộ": "O",
                        "Ǫ": "O",
                        "Ǭ": "O",
                        "Ø": "O",
                        "Ǿ": "O",
                        "Ɔ": "O",
                        "Ɵ": "O",
                        "Ꝋ": "O",
                        "Ꝍ": "O",
                        "Ƣ": "OI",
                        "Ꝏ": "OO",
                        "Ȣ": "OU",
                        "Ⓟ": "P",
                        "Ｐ": "P",
                        "Ṕ": "P",
                        "Ṗ": "P",
                        "Ƥ": "P",
                        "Ᵽ": "P",
                        "Ꝑ": "P",
                        "Ꝓ": "P",
                        "Ꝕ": "P",
                        "Ⓠ": "Q",
                        "Ｑ": "Q",
                        "Ꝗ": "Q",
                        "Ꝙ": "Q",
                        "Ɋ": "Q",
                        "Ⓡ": "R",
                        "Ｒ": "R",
                        "Ŕ": "R",
                        "Ṙ": "R",
                        "Ř": "R",
                        "Ȑ": "R",
                        "Ȓ": "R",
                        "Ṛ": "R",
                        "Ṝ": "R",
                        "Ŗ": "R",
                        "Ṟ": "R",
                        "Ɍ": "R",
                        "Ɽ": "R",
                        "Ꝛ": "R",
                        "Ꞧ": "R",
                        "Ꞃ": "R",
                        "Ⓢ": "S",
                        "Ｓ": "S",
                        "ẞ": "S",
                        "Ś": "S",
                        "Ṥ": "S",
                        "Ŝ": "S",
                        "Ṡ": "S",
                        "Š": "S",
                        "Ṧ": "S",
                        "Ṣ": "S",
                        "Ṩ": "S",
                        "Ș": "S",
                        "Ş": "S",
                        "Ȿ": "S",
                        "Ꞩ": "S",
                        "Ꞅ": "S",
                        "Ⓣ": "T",
                        "Ｔ": "T",
                        "Ṫ": "T",
                        "Ť": "T",
                        "Ṭ": "T",
                        "Ț": "T",
                        "Ţ": "T",
                        "Ṱ": "T",
                        "Ṯ": "T",
                        "Ŧ": "T",
                        "Ƭ": "T",
                        "Ʈ": "T",
                        "Ⱦ": "T",
                        "Ꞇ": "T",
                        "Ꜩ": "TZ",
                        "Ⓤ": "U",
                        "Ｕ": "U",
                        "Ù": "U",
                        "Ú": "U",
                        "Û": "U",
                        "Ũ": "U",
                        "Ṹ": "U",
                        "Ū": "U",
                        "Ṻ": "U",
                        "Ŭ": "U",
                        "Ü": "U",
                        "Ǜ": "U",
                        "Ǘ": "U",
                        "Ǖ": "U",
                        "Ǚ": "U",
                        "Ủ": "U",
                        "Ů": "U",
                        "Ű": "U",
                        "Ǔ": "U",
                        "Ȕ": "U",
                        "Ȗ": "U",
                        "Ư": "U",
                        "Ừ": "U",
                        "Ứ": "U",
                        "Ữ": "U",
                        "Ử": "U",
                        "Ự": "U",
                        "Ụ": "U",
                        "Ṳ": "U",
                        "Ų": "U",
                        "Ṷ": "U",
                        "Ṵ": "U",
                        "Ʉ": "U",
                        "Ⓥ": "V",
                        "Ｖ": "V",
                        "Ṽ": "V",
                        "Ṿ": "V",
                        "Ʋ": "V",
                        "Ꝟ": "V",
                        "Ʌ": "V",
                        "Ꝡ": "VY",
                        "Ⓦ": "W",
                        "Ｗ": "W",
                        "Ẁ": "W",
                        "Ẃ": "W",
                        "Ŵ": "W",
                        "Ẇ": "W",
                        "Ẅ": "W",
                        "Ẉ": "W",
                        "Ⱳ": "W",
                        "Ⓧ": "X",
                        "Ｘ": "X",
                        "Ẋ": "X",
                        "Ẍ": "X",
                        "Ⓨ": "Y",
                        "Ｙ": "Y",
                        "Ỳ": "Y",
                        "Ý": "Y",
                        "Ŷ": "Y",
                        "Ỹ": "Y",
                        "Ȳ": "Y",
                        "Ẏ": "Y",
                        "Ÿ": "Y",
                        "Ỷ": "Y",
                        "Ỵ": "Y",
                        "Ƴ": "Y",
                        "Ɏ": "Y",
                        "Ỿ": "Y",
                        "Ⓩ": "Z",
                        "Ｚ": "Z",
                        "Ź": "Z",
                        "Ẑ": "Z",
                        "Ż": "Z",
                        "Ž": "Z",
                        "Ẓ": "Z",
                        "Ẕ": "Z",
                        "Ƶ": "Z",
                        "Ȥ": "Z",
                        "Ɀ": "Z",
                        "Ⱬ": "Z",
                        "Ꝣ": "Z",
                        "ⓐ": "a",
                        "ａ": "a",
                        "ẚ": "a",
                        "à": "a",
                        "á": "a",
                        "â": "a",
                        "ầ": "a",
                        "ấ": "a",
                        "ẫ": "a",
                        "ẩ": "a",
                        "ã": "a",
                        "ā": "a",
                        "ă": "a",
                        "ằ": "a",
                        "ắ": "a",
                        "ẵ": "a",
                        "ẳ": "a",
                        "ȧ": "a",
                        "ǡ": "a",
                        "ä": "a",
                        "ǟ": "a",
                        "ả": "a",
                        "å": "a",
                        "ǻ": "a",
                        "ǎ": "a",
                        "ȁ": "a",
                        "ȃ": "a",
                        "ạ": "a",
                        "ậ": "a",
                        "ặ": "a",
                        "ḁ": "a",
                        "ą": "a",
                        "ⱥ": "a",
                        "ɐ": "a",
                        "ꜳ": "aa",
                        "æ": "ae",
                        "ǽ": "ae",
                        "ǣ": "ae",
                        "ꜵ": "ao",
                        "ꜷ": "au",
                        "ꜹ": "av",
                        "ꜻ": "av",
                        "ꜽ": "ay",
                        "ⓑ": "b",
                        "ｂ": "b",
                        "ḃ": "b",
                        "ḅ": "b",
                        "ḇ": "b",
                        "ƀ": "b",
                        "ƃ": "b",
                        "ɓ": "b",
                        "ⓒ": "c",
                        "ｃ": "c",
                        "ć": "c",
                        "ĉ": "c",
                        "ċ": "c",
                        "č": "c",
                        "ç": "c",
                        "ḉ": "c",
                        "ƈ": "c",
                        "ȼ": "c",
                        "ꜿ": "c",
                        "ↄ": "c",
                        "ⓓ": "d",
                        "ｄ": "d",
                        "ḋ": "d",
                        "ď": "d",
                        "ḍ": "d",
                        "ḑ": "d",
                        "ḓ": "d",
                        "ḏ": "d",
                        "đ": "d",
                        "ƌ": "d",
                        "ɖ": "d",
                        "ɗ": "d",
                        "ꝺ": "d",
                        "ǳ": "dz",
                        "ǆ": "dz",
                        "ⓔ": "e",
                        "ｅ": "e",
                        "è": "e",
                        "é": "e",
                        "ê": "e",
                        "ề": "e",
                        "ế": "e",
                        "ễ": "e",
                        "ể": "e",
                        "ẽ": "e",
                        "ē": "e",
                        "ḕ": "e",
                        "ḗ": "e",
                        "ĕ": "e",
                        "ė": "e",
                        "ë": "e",
                        "ẻ": "e",
                        "ě": "e",
                        "ȅ": "e",
                        "ȇ": "e",
                        "ẹ": "e",
                        "ệ": "e",
                        "ȩ": "e",
                        "ḝ": "e",
                        "ę": "e",
                        "ḙ": "e",
                        "ḛ": "e",
                        "ɇ": "e",
                        "ɛ": "e",
                        "ǝ": "e",
                        "ⓕ": "f",
                        "ｆ": "f",
                        "ḟ": "f",
                        "ƒ": "f",
                        "ꝼ": "f",
                        "ⓖ": "g",
                        "ｇ": "g",
                        "ǵ": "g",
                        "ĝ": "g",
                        "ḡ": "g",
                        "ğ": "g",
                        "ġ": "g",
                        "ǧ": "g",
                        "ģ": "g",
                        "ǥ": "g",
                        "ɠ": "g",
                        "ꞡ": "g",
                        "ᵹ": "g",
                        "ꝿ": "g",
                        "ⓗ": "h",
                        "ｈ": "h",
                        "ĥ": "h",
                        "ḣ": "h",
                        "ḧ": "h",
                        "ȟ": "h",
                        "ḥ": "h",
                        "ḩ": "h",
                        "ḫ": "h",
                        "ẖ": "h",
                        "ħ": "h",
                        "ⱨ": "h",
                        "ⱶ": "h",
                        "ɥ": "h",
                        "ƕ": "hv",
                        "ⓘ": "i",
                        "ｉ": "i",
                        "ì": "i",
                        "í": "i",
                        "î": "i",
                        "ĩ": "i",
                        "ī": "i",
                        "ĭ": "i",
                        "ï": "i",
                        "ḯ": "i",
                        "ỉ": "i",
                        "ǐ": "i",
                        "ȉ": "i",
                        "ȋ": "i",
                        "ị": "i",
                        "į": "i",
                        "ḭ": "i",
                        "ɨ": "i",
                        "ı": "i",
                        "ⓙ": "j",
                        "ｊ": "j",
                        "ĵ": "j",
                        "ǰ": "j",
                        "ɉ": "j",
                        "ⓚ": "k",
                        "ｋ": "k",
                        "ḱ": "k",
                        "ǩ": "k",
                        "ḳ": "k",
                        "ķ": "k",
                        "ḵ": "k",
                        "ƙ": "k",
                        "ⱪ": "k",
                        "ꝁ": "k",
                        "ꝃ": "k",
                        "ꝅ": "k",
                        "ꞣ": "k",
                        "ⓛ": "l",
                        "ｌ": "l",
                        "ŀ": "l",
                        "ĺ": "l",
                        "ľ": "l",
                        "ḷ": "l",
                        "ḹ": "l",
                        "ļ": "l",
                        "ḽ": "l",
                        "ḻ": "l",
                        "ſ": "l",
                        "ł": "l",
                        "ƚ": "l",
                        "ɫ": "l",
                        "ⱡ": "l",
                        "ꝉ": "l",
                        "ꞁ": "l",
                        "ꝇ": "l",
                        "ǉ": "lj",
                        "ⓜ": "m",
                        "ｍ": "m",
                        "ḿ": "m",
                        "ṁ": "m",
                        "ṃ": "m",
                        "ɱ": "m",
                        "ɯ": "m",
                        "ⓝ": "n",
                        "ｎ": "n",
                        "ǹ": "n",
                        "ń": "n",
                        "ñ": "n",
                        "ṅ": "n",
                        "ň": "n",
                        "ṇ": "n",
                        "ņ": "n",
                        "ṋ": "n",
                        "ṉ": "n",
                        "ƞ": "n",
                        "ɲ": "n",
                        "ŉ": "n",
                        "ꞑ": "n",
                        "ꞥ": "n",
                        "ǌ": "nj",
                        "ⓞ": "o",
                        "ｏ": "o",
                        "ò": "o",
                        "ó": "o",
                        "ô": "o",
                        "ồ": "o",
                        "ố": "o",
                        "ỗ": "o",
                        "ổ": "o",
                        "õ": "o",
                        "ṍ": "o",
                        "ȭ": "o",
                        "ṏ": "o",
                        "ō": "o",
                        "ṑ": "o",
                        "ṓ": "o",
                        "ŏ": "o",
                        "ȯ": "o",
                        "ȱ": "o",
                        "ö": "o",
                        "ȫ": "o",
                        "ỏ": "o",
                        "ő": "o",
                        "ǒ": "o",
                        "ȍ": "o",
                        "ȏ": "o",
                        "ơ": "o",
                        "ờ": "o",
                        "ớ": "o",
                        "ỡ": "o",
                        "ở": "o",
                        "ợ": "o",
                        "ọ": "o",
                        "ộ": "o",
                        "ǫ": "o",
                        "ǭ": "o",
                        "ø": "o",
                        "ǿ": "o",
                        "ɔ": "o",
                        "ꝋ": "o",
                        "ꝍ": "o",
                        "ɵ": "o",
                        "ƣ": "oi",
                        "ȣ": "ou",
                        "ꝏ": "oo",
                        "ⓟ": "p",
                        "ｐ": "p",
                        "ṕ": "p",
                        "ṗ": "p",
                        "ƥ": "p",
                        "ᵽ": "p",
                        "ꝑ": "p",
                        "ꝓ": "p",
                        "ꝕ": "p",
                        "ⓠ": "q",
                        "ｑ": "q",
                        "ɋ": "q",
                        "ꝗ": "q",
                        "ꝙ": "q",
                        "ⓡ": "r",
                        "ｒ": "r",
                        "ŕ": "r",
                        "ṙ": "r",
                        "ř": "r",
                        "ȑ": "r",
                        "ȓ": "r",
                        "ṛ": "r",
                        "ṝ": "r",
                        "ŗ": "r",
                        "ṟ": "r",
                        "ɍ": "r",
                        "ɽ": "r",
                        "ꝛ": "r",
                        "ꞧ": "r",
                        "ꞃ": "r",
                        "ⓢ": "s",
                        "ｓ": "s",
                        "ß": "s",
                        "ś": "s",
                        "ṥ": "s",
                        "ŝ": "s",
                        "ṡ": "s",
                        "š": "s",
                        "ṧ": "s",
                        "ṣ": "s",
                        "ṩ": "s",
                        "ș": "s",
                        "ş": "s",
                        "ȿ": "s",
                        "ꞩ": "s",
                        "ꞅ": "s",
                        "ẛ": "s",
                        "ⓣ": "t",
                        "ｔ": "t",
                        "ṫ": "t",
                        "ẗ": "t",
                        "ť": "t",
                        "ṭ": "t",
                        "ț": "t",
                        "ţ": "t",
                        "ṱ": "t",
                        "ṯ": "t",
                        "ŧ": "t",
                        "ƭ": "t",
                        "ʈ": "t",
                        "ⱦ": "t",
                        "ꞇ": "t",
                        "ꜩ": "tz",
                        "ⓤ": "u",
                        "ｕ": "u",
                        "ù": "u",
                        "ú": "u",
                        "û": "u",
                        "ũ": "u",
                        "ṹ": "u",
                        "ū": "u",
                        "ṻ": "u",
                        "ŭ": "u",
                        "ü": "u",
                        "ǜ": "u",
                        "ǘ": "u",
                        "ǖ": "u",
                        "ǚ": "u",
                        "ủ": "u",
                        "ů": "u",
                        "ű": "u",
                        "ǔ": "u",
                        "ȕ": "u",
                        "ȗ": "u",
                        "ư": "u",
                        "ừ": "u",
                        "ứ": "u",
                        "ữ": "u",
                        "ử": "u",
                        "ự": "u",
                        "ụ": "u",
                        "ṳ": "u",
                        "ų": "u",
                        "ṷ": "u",
                        "ṵ": "u",
                        "ʉ": "u",
                        "ⓥ": "v",
                        "ｖ": "v",
                        "ṽ": "v",
                        "ṿ": "v",
                        "ʋ": "v",
                        "ꝟ": "v",
                        "ʌ": "v",
                        "ꝡ": "vy",
                        "ⓦ": "w",
                        "ｗ": "w",
                        "ẁ": "w",
                        "ẃ": "w",
                        "ŵ": "w",
                        "ẇ": "w",
                        "ẅ": "w",
                        "ẘ": "w",
                        "ẉ": "w",
                        "ⱳ": "w",
                        "ⓧ": "x",
                        "ｘ": "x",
                        "ẋ": "x",
                        "ẍ": "x",
                        "ⓨ": "y",
                        "ｙ": "y",
                        "ỳ": "y",
                        "ý": "y",
                        "ŷ": "y",
                        "ỹ": "y",
                        "ȳ": "y",
                        "ẏ": "y",
                        "ÿ": "y",
                        "ỷ": "y",
                        "ẙ": "y",
                        "ỵ": "y",
                        "ƴ": "y",
                        "ɏ": "y",
                        "ỿ": "y",
                        "ⓩ": "z",
                        "ｚ": "z",
                        "ź": "z",
                        "ẑ": "z",
                        "ż": "z",
                        "ž": "z",
                        "ẓ": "z",
                        "ẕ": "z",
                        "ƶ": "z",
                        "ȥ": "z",
                        "ɀ": "z",
                        "ⱬ": "z",
                        "ꝣ": "z",
                        "Ά": "Α",
                        "Έ": "Ε",
                        "Ή": "Η",
                        "Ί": "Ι",
                        "Ϊ": "Ι",
                        "Ό": "Ο",
                        "Ύ": "Υ",
                        "Ϋ": "Υ",
                        "Ώ": "Ω",
                        "ά": "α",
                        "έ": "ε",
                        "ή": "η",
                        "ί": "ι",
                        "ϊ": "ι",
                        "ΐ": "ι",
                        "ό": "ο",
                        "ύ": "υ",
                        "ϋ": "υ",
                        "ΰ": "υ",
                        "ω": "ω",
                        "ς": "σ"
                    };
                    return a
                }), b.define("select2/data/base", ["../utils"], function(a) {
                    function b() {
                        b.__super__.constructor.call(this)
                    }
                    return a.Extend(b, a.Observable), b.prototype.current = function() {
                        throw new Error("The `current` method must be defined in child classes.")
                    }, b.prototype.query = function() {
                        throw new Error("The `query` method must be defined in child classes.")
                    }, b.prototype.bind = function() {}, b.prototype.destroy = function() {}, b.prototype.generateResultId = function(b, c) {
                        var d = b.id + "-result-";
                        return d += a.generateChars(4), d += null != c.id ? "-" + c.id.toString() : "-" + a.generateChars(4)
                    }, b
                }), b.define("select2/data/select", ["./base", "../utils", "jquery"], function(a, b, c) {
                    function d(a, b) {
                        this.$element = a, this.options = b, d.__super__.constructor.call(this)
                    }
                    return b.Extend(d, a), d.prototype.current = function(a) {
                        var b = [],
                            d = this;
                        this.$element.find(":selected").each(function() {
                            var a = c(this),
                                e = d.item(a);
                            b.push(e)
                        }), a(b)
                    }, d.prototype.select = function(a) {
                        var b = this;
                        if (a.selected = !0, c(a.element).is("option")) return a.element.selected = !0, void this.$element.trigger("change");
                        if (this.$element.prop("multiple")) this.current(function(d) {
                            var e = [];
                            a = [a], a.push.apply(a, d);
                            for (var f = 0; f < a.length; f++) {
                                var g = a[f].id; - 1 === c.inArray(g, e) && e.push(g)
                            }
                            b.$element.val(e), b.$element.trigger("change")
                        });
                        else {
                            var d = a.id;
                            this.$element.val(d), this.$element.trigger("change")
                        }
                    }, d.prototype.unselect = function(a) {
                        var b = this;
                        if (this.$element.prop("multiple")) return a.selected = !1, c(a.element).is("option") ? (a.element.selected = !1, void this.$element.trigger("change")) : void this.current(function(d) {
                            for (var e = [], f = 0; f < d.length; f++) {
                                var g = d[f].id;
                                g !== a.id && -1 === c.inArray(g, e) && e.push(g)
                            }
                            b.$element.val(e), b.$element.trigger("change")
                        })
                    }, d.prototype.bind = function(a) {
                        var b = this;
                        this.container = a, a.on("select", function(a) {
                            b.select(a.data)
                        }), a.on("unselect", function(a) {
                            b.unselect(a.data)
                        })
                    }, d.prototype.destroy = function() {
                        this.$element.find("*").each(function() {
                            c.removeData(this, "data")
                        })
                    }, d.prototype.query = function(a, b) {
                        var d = [],
                            e = this,
                            f = this.$element.children();
                        f.each(function() {
                            var b = c(this);
                            if (b.is("option") || b.is("optgroup")) {
                                var f = e.item(b),
                                    g = e.matches(a, f);
                                null !== g && d.push(g)
                            }
                        }), b({
                            results: d
                        })
                    }, d.prototype.addOptions = function(a) {
                        b.appendMany(this.$element, a)
                    }, d.prototype.option = function(a) {
                        var b;
                        a.children ? (b = document.createElement("optgroup"), b.label = a.text) : (b = document.createElement("option"), void 0 !== b.textContent ? b.textContent = a.text : b.innerText = a.text), a.id && (b.value = a.id), a.disabled && (b.disabled = !0), a.selected && (b.selected = !0), a.title && (b.title = a.title);
                        var d = c(b),
                            e = this._normalizeItem(a);
                        return e.element = b, c.data(b, "data", e), d
                    }, d.prototype.item = function(a) {
                        var b = {};
                        if (b = c.data(a[0], "data"), null != b) return b;
                        if (a.is("option")) b = {
                            id: a.val(),
                            text: a.text(),
                            disabled: a.prop("disabled"),
                            selected: a.prop("selected"),
                            title: a.prop("title")
                        };
                        else if (a.is("optgroup")) {
                            b = {
                                text: a.prop("label"),
                                children: [],
                                title: a.prop("title")
                            };
                            for (var d = a.children("option"), e = [], f = 0; f < d.length; f++) {
                                var g = c(d[f]),
                                    h = this.item(g);
                                e.push(h)
                            }
                            b.children = e
                        }
                        return b = this._normalizeItem(b), b.element = a[0], c.data(a[0], "data", b), b
                    }, d.prototype._normalizeItem = function(a) {
                        c.isPlainObject(a) || (a = {
                            id: a,
                            text: a
                        }), a = c.extend({}, {
                            text: ""
                        }, a);
                        var b = {
                            selected: !1,
                            disabled: !1
                        };
                        return null != a.id && (a.id = a.id.toString()), null != a.text && (a.text = a.text.toString()), null == a._resultId && a.id && null != this.container && (a._resultId = this.generateResultId(this.container, a)), c.extend({}, b, a)
                    }, d.prototype.matches = function(a, b) {
                        var c = this.options.get("matcher");
                        return c(a, b)
                    }, d
                }), b.define("select2/data/array", ["./select", "../utils", "jquery"], function(a, b, c) {
                    function d(a, b) {
                        var c = b.get("data") || [];
                        d.__super__.constructor.call(this, a, b), this.addOptions(this.convertToOptions(c))
                    }
                    return b.Extend(d, a), d.prototype.select = function(a) {
                        var b = this.$element.find("option").filter(function(b, c) {
                            return c.value == a.id.toString()
                        });
                        0 === b.length && (b = this.option(a), this.addOptions(b)), d.__super__.select.call(this, a)
                    }, d.prototype.convertToOptions = function(a) {
                        function d(a) {
                            return function() {
                                return c(this).val() == a.id
                            }
                        }
                        for (var e = this, f = this.$element.find("option"), g = f.map(function() {
                                return e.item(c(this)).id
                            }).get(), h = [], i = 0; i < a.length; i++) {
                            var j = this._normalizeItem(a[i]);
                            if (c.inArray(j.id, g) >= 0) {
                                var k = f.filter(d(j)),
                                    l = this.item(k),
                                    m = (c.extend(!0, {}, l, j), this.option(l));
                                k.replaceWith(m)
                            } else {
                                var n = this.option(j);
                                if (j.children) {
                                    var o = this.convertToOptions(j.children);
                                    b.appendMany(n, o)
                                }
                                h.push(n)
                            }
                        }
                        return h
                    }, d
                }), b.define("select2/data/ajax", ["./array", "../utils", "jquery"], function(a, b, c) {
                    function d(b, c) {
                        this.ajaxOptions = this._applyDefaults(c.get("ajax")), null != this.ajaxOptions.processResults && (this.processResults = this.ajaxOptions.processResults), a.__super__.constructor.call(this, b, c)
                    }
                    return b.Extend(d, a), d.prototype._applyDefaults = function(a) {
                        var b = {
                            data: function(a) {
                                return {
                                    q: a.term
                                }
                            },
                            transport: function(a, b, d) {
                                var e = c.ajax(a);
                                return e.then(b), e.fail(d), e
                            }
                        };
                        return c.extend({}, b, a, !0)
                    }, d.prototype.processResults = function(a) {
                        return a
                    }, d.prototype.query = function(a, b) {
                        function d() {
                            var d = f.transport(f, function(d) {
                                var f = e.processResults(d, a);
                                e.options.get("debug") && window.console && console.error && (f && f.results && c.isArray(f.results) || console.error("Select2: The AJAX results did not return an array in the `results` key of the response.")), b(f)
                            }, function() {});
                            e._request = d
                        }
                        var e = this;
                        null != this._request && (c.isFunction(this._request.abort) && this._request.abort(), this._request = null);
                        var f = c.extend({
                            type: "GET"
                        }, this.ajaxOptions);
                        "function" == typeof f.url && (f.url = f.url(a)), "function" == typeof f.data && (f.data = f.data(a)), this.ajaxOptions.delay && "" !== a.term ? (this._queryTimeout && window.clearTimeout(this._queryTimeout), this._queryTimeout = window.setTimeout(d, this.ajaxOptions.delay)) : d()
                    }, d
                }), b.define("select2/data/tags", ["jquery"], function(a) {
                    function b(b, c, d) {
                        var e = d.get("tags"),
                            f = d.get("createTag");
                        if (void 0 !== f && (this.createTag = f), b.call(this, c, d), a.isArray(e))
                            for (var g = 0; g < e.length; g++) {
                                var h = e[g],
                                    i = this._normalizeItem(h),
                                    j = this.option(i);
                                this.$element.append(j)
                            }
                    }
                    return b.prototype.query = function(a, b, c) {
                        function d(a, f) {
                            for (var g = a.results, h = 0; h < g.length; h++) {
                                var i = g[h],
                                    j = null != i.children && !d({
                                        results: i.children
                                    }, !0),
                                    k = i.text === b.term;
                                if (k || j) return f ? !1 : (a.data = g, void c(a))
                            }
                            if (f) return !0;
                            var l = e.createTag(b);
                            if (null != l) {
                                var m = e.option(l);
                                m.attr("data-select2-tag", !0), e.addOptions([m]), e.insertTag(g, l)
                            }
                            a.results = g, c(a)
                        }
                        var e = this;
                        return this._removeOldTags(), null == b.term || null != b.page ? void a.call(this, b, c) : void a.call(this, b, d)
                    }, b.prototype.createTag = function(b, c) {
                        var d = a.trim(c.term);
                        return "" === d ? null : {
                            id: d,
                            text: d
                        }
                    }, b.prototype.insertTag = function(a, b, c) {
                        b.unshift(c)
                    }, b.prototype._removeOldTags = function() {
                        var b = (this._lastTag, this.$element.find("option[data-select2-tag]"));
                        b.each(function() {
                            this.selected || a(this).remove()
                        })
                    }, b
                }), b.define("select2/data/tokenizer", ["jquery"], function(a) {
                    function b(a, b, c) {
                        var d = c.get("tokenizer");
                        void 0 !== d && (this.tokenizer = d), a.call(this, b, c)
                    }
                    return b.prototype.bind = function(a, b, c) {
                        a.call(this, b, c), this.$search = b.dropdown.$search || b.selection.$search || c.find(".select2-search__field")
                    }, b.prototype.query = function(a, b, c) {
                        function d(a) {
                            e.select(a)
                        }
                        var e = this;
                        b.term = b.term || "";
                        var f = this.tokenizer(b, this.options, d);
                        f.term !== b.term && (this.$search.length && (this.$search.val(f.term), this.$search.focus()), b.term = f.term), a.call(this, b, c)
                    }, b.prototype.tokenizer = function(b, c, d, e) {
                        for (var f = d.get("tokenSeparators") || [], g = c.term, h = 0, i = this.createTag || function(a) {
                                return {
                                    id: a.term,
                                    text: a.term
                                }
                            }; h < g.length;) {
                            var j = g[h];
                            if (-1 !== a.inArray(j, f)) {
                                var k = g.substr(0, h),
                                    l = a.extend({}, c, {
                                        term: k
                                    }),
                                    m = i(l);
                                e(m), g = g.substr(h + 1) || "", h = 0
                            } else h++
                        }
                        return {
                            term: g
                        }
                    }, b
                }), b.define("select2/data/minimumInputLength", [], function() {
                    function a(a, b, c) {
                        this.minimumInputLength = c.get("minimumInputLength"), a.call(this, b, c)
                    }
                    return a.prototype.query = function(a, b, c) {
                        return b.term = b.term || "", b.term.length < this.minimumInputLength ? void this.trigger("results:message", {
                            message: "inputTooShort",
                            args: {
                                minimum: this.minimumInputLength,
                                input: b.term,
                                params: b
                            }
                        }) : void a.call(this, b, c)
                    }, a
                }), b.define("select2/data/maximumInputLength", [], function() {
                    function a(a, b, c) {
                        this.maximumInputLength = c.get("maximumInputLength"), a.call(this, b, c)
                    }
                    return a.prototype.query = function(a, b, c) {
                        return b.term = b.term || "", this.maximumInputLength > 0 && b.term.length > this.maximumInputLength ? void this.trigger("results:message", {
                            message: "inputTooLong",
                            args: {
                                maximum: this.maximumInputLength,
                                input: b.term,
                                params: b
                            }
                        }) : void a.call(this, b, c)
                    }, a
                }), b.define("select2/data/maximumSelectionLength", [], function() {
                    function a(a, b, c) {
                        this.maximumSelectionLength = c.get("maximumSelectionLength"), a.call(this, b, c)
                    }
                    return a.prototype.query = function(a, b, c) {
                        var d = this;
                        this.current(function(e) {
                            var f = null != e ? e.length : 0;
                            return d.maximumSelectionLength > 0 && f >= d.maximumSelectionLength ? void d.trigger("results:message", {
                                message: "maximumSelected",
                                args: {
                                    maximum: d.maximumSelectionLength
                                }
                            }) : void a.call(d, b, c)
                        })
                    }, a
                }), b.define("select2/dropdown", ["jquery", "./utils"], function(a, b) {
                    function c(a, b) {
                        this.$element = a, this.options = b, c.__super__.constructor.call(this)
                    }
                    return b.Extend(c, b.Observable), c.prototype.render = function() {
                        var b = a('<span class="select2-dropdown"><span class="select2-results"></span></span>');
                        return b.attr("dir", this.options.get("dir")), this.$dropdown = b, b
                    }, c.prototype.position = function() {}, c.prototype.destroy = function() {
                        this.$dropdown.remove()
                    }, c
                }), b.define("select2/dropdown/search", ["jquery", "../utils"], function(a) {
                    function b() {}
                    return b.prototype.render = function(b) {
                        var c = b.call(this),
                            d = a('<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" role="textbox" /></span>');
                        return this.$searchContainer = d, this.$search = d.find("input"), c.prepend(d), c
                    }, b.prototype.bind = function(b, c, d) {
                        var e = this;
                        b.call(this, c, d), this.$search.on("keydown", function(a) {
                            e.trigger("keypress", a), e._keyUpPrevented = a.isDefaultPrevented()
                        }), this.$search.on("input", function() {
                            a(this).off("keyup")
                        }), this.$search.on("keyup input", function(a) {
                            e.handleSearch(a)
                        }), c.on("open", function() {
                            e.$search.attr("tabindex", 0), setTimeout(function(){e.$search.focus()},10), window.setTimeout(function() {
                                e.$search.focus()
                            }, 0)
                        }), c.on("close", function() {
                            e.$search.attr("tabindex", -1), e.$search.val("")
                        }), c.on("results:all", function(a) {
                            if (null == a.query.term || "" === a.query.term) {
                                var b = e.showSearch(a);
                                b ? e.$searchContainer.removeClass("select2-search--hide") : e.$searchContainer.addClass("select2-search--hide")
                            }
                        })
                    }, b.prototype.handleSearch = function() {
                        if (!this._keyUpPrevented) {
                            var a = this.$search.val();
                            this.trigger("query", {
                                term: a
                            })
                        }
                        this._keyUpPrevented = !1
                    }, b.prototype.showSearch = function() {
                        return !0
                    }, b
                }), b.define("select2/dropdown/hidePlaceholder", [], function() {
                    function a(a, b, c, d) {
                        this.placeholder = this.normalizePlaceholder(c.get("placeholder")), a.call(this, b, c, d)
                    }
                    return a.prototype.append = function(a, b) {
                        b.results = this.removePlaceholder(b.results), a.call(this, b)
                    }, a.prototype.normalizePlaceholder = function(a, b) {
                        return "string" == typeof b && (b = {
                            id: "",
                            text: b
                        }), b
                    }, a.prototype.removePlaceholder = function(a, b) {
                        for (var c = b.slice(0), d = b.length - 1; d >= 0; d--) {
                            var e = b[d];
                            this.placeholder.id === e.id && c.splice(d, 1)
                        }
                        return c
                    }, a
                }), b.define("select2/dropdown/infiniteScroll", ["jquery"], function(a) {
                    function b(a, b, c, d) {
                        this.lastParams = {}, a.call(this, b, c, d), this.$loadingMore = this.createLoadingMore(), this.loading = !1
                    }
                    return b.prototype.append = function(a, b) {
                        this.$loadingMore.remove(), this.loading = !1, a.call(this, b), this.showLoadingMore(b) && this.$results.append(this.$loadingMore)
                    }, b.prototype.bind = function(b, c, d) {
                        var e = this;
                        b.call(this, c, d), c.on("query", function(a) {
                            e.lastParams = a, e.loading = !0
                        }), c.on("query:append", function(a) {
                            e.lastParams = a, e.loading = !0
                        }), this.$results.on("scroll", function() {
                            var b = a.contains(document.documentElement, e.$loadingMore[0]);
                            if (!e.loading && b) {
                                var c = e.$results.offset().top + e.$results.outerHeight(!1),
                                    d = e.$loadingMore.offset().top + e.$loadingMore.outerHeight(!1);
                                c + 50 >= d && e.loadMore()
                            }
                        })
                    }, b.prototype.loadMore = function() {
                        this.loading = !0;
                        var b = a.extend({}, {
                            page: 1
                        }, this.lastParams);
                        b.page++, this.trigger("query:append", b)
                    }, b.prototype.showLoadingMore = function(a, b) {
                        return b.pagination && b.pagination.more
                    }, b.prototype.createLoadingMore = function() {
                        var b = a('<li class="option load-more" role="treeitem"></li>'),
                            c = this.options.get("translations").get("loadingMore");
                        return b.html(c(this.lastParams)), b
                    }, b
                }), b.define("select2/dropdown/attachBody", ["jquery", "../utils"], function(a, b) {
                    function c(a, b, c) {
                        this.$dropdownParent = c.get("dropdownParent") || document.body, a.call(this, b, c)
                    }
                    return c.prototype.bind = function(a, b, c) {
                        var d = this,
                            e = !1;
                        a.call(this, b, c), b.on("open", function() {
                            d._showDropdown(), d._attachPositioningHandler(b), e || (e = !0, b.on("results:all", function() {
                                d._positionDropdown(), d._resizeDropdown()
                            }), b.on("results:append", function() {
                                d._positionDropdown(), d._resizeDropdown()
                            }))
                        }), b.on("close", function() {
                            d._hideDropdown(), d._detachPositioningHandler(b)
                        }), this.$dropdownContainer.on("mousedown", function(a) {
                            a.stopPropagation()
                        })
                    }, c.prototype.position = function(a, b, c) {
                        b.attr("class", c.attr("class")), b.removeClass("select2"), b.addClass("select2-container--open"), b.css({
                            position: "absolute",
                            top: -999999
                        }), this.$container = c
                    }, c.prototype.render = function(b) {
                        var c = a("<span></span>"),
                            d = b.call(this);
                        return c.append(d), this.$dropdownContainer = c, c
                    }, c.prototype._hideDropdown = function() {
                        this.$dropdownContainer.detach()
                    }, c.prototype._attachPositioningHandler = function(c) {
                        var d = this,
                            e = "scroll.select2." + c.id,
                            f = "resize.select2." + c.id,
                            g = "orientationchange.select2." + c.id,
                            h = this.$container.parents().filter(b.hasScroll);
                        h.each(function() {
                            a(this).data("select2-scroll-position", {
                                x: a(this).scrollLeft(),
                                y: a(this).scrollTop()
                            })
                        }), h.on(e, function() {
                            var b = a(this).data("select2-scroll-position");
                            a(this).scrollTop(b.y)
                        }), a(window).on(e + " " + f + " " + g, function() {
                            d._positionDropdown(), d._resizeDropdown()
                        })
                    }, c.prototype._detachPositioningHandler = function(c) {
                        var d = "scroll.select2." + c.id,
                            e = "resize.select2." + c.id,
                            f = "orientationchange.select2." + c.id,
                            g = this.$container.parents().filter(b.hasScroll);
                        g.off(d), a(window).off(d + " " + e + " " + f)
                    }, c.prototype._positionDropdown = function() {
                        var b = a(window),
                            c = this.$dropdown.hasClass("select2-dropdown--above"),
                            d = this.$dropdown.hasClass("select2-dropdown--below"),
                            e = null,
                            f = (this.$container.position(), this.$container.offset());
                        f.bottom = f.top + this.$container.outerHeight(!1);
                        var g = {
                            height: this.$container.outerHeight(!1)
                        };
                        g.top = f.top, g.bottom = f.top + g.height;
                        var h = {
                                height: this.$dropdown.outerHeight(!1)
                            },
                            i = {
                                top: b.scrollTop(),
                                bottom: b.scrollTop() + b.height()
                            },
                            j = i.top < f.top - h.height,
                            k = i.bottom > f.bottom + h.height,
                            l = {
                                left: f.left,
                                top: g.bottom
                            };
                        c || d || (e = "below"), k || !j || c ? !j && k && c && (e = "below") : e = "above", ("above" == e || c && "below" !== e) && (l.top = g.top - h.height), null != e && (this.$dropdown.removeClass("select2-dropdown--below select2-dropdown--above").addClass("select2-dropdown--" + e), this.$container.removeClass("select2-container--below select2-container--above").addClass("select2-container--" + e)), this.$dropdownContainer.css(l)
                    }, c.prototype._resizeDropdown = function() {
                        this.$dropdownContainer.width();
                        var a = {
                            width: this.$container.outerWidth(!1) + "px"
                        };
                        this.options.get("dropdownAutoWidth") && (a.minWidth = a.width, a.width = "auto"), this.$dropdown.css(a)
                    }, c.prototype._showDropdown = function() {
                        this.$dropdownContainer.appendTo(this.$dropdownParent), this._positionDropdown(), this._resizeDropdown()
                    }, c
                }), b.define("select2/dropdown/minimumResultsForSearch", [], function() {
                    function a(b) {
                        for (var c = 0, d = 0; d < b.length; d++) {
                            var e = b[d];
                            e.children ? c += a(e.children) : c++
                        }
                        return c
                    }

                    function b(a, b, c, d) {
                        this.minimumResultsForSearch = c.get("minimumResultsForSearch"), this.minimumResultsForSearch < 0 && (this.minimumResultsForSearch = 1 / 0), a.call(this, b, c, d)
                    }
                    return b.prototype.showSearch = function(b, c) {
                        return a(c.data.results) < this.minimumResultsForSearch ? !1 : b.call(this, c)
                    }, b
                }), b.define("select2/dropdown/selectOnClose", [], function() {
                    function a() {}
                    return a.prototype.bind = function(a, b, c) {
                        var d = this;
                        a.call(this, b, c), b.on("close", function() {
                            d._handleSelectOnClose()
                        })
                    }, a.prototype._handleSelectOnClose = function() {
                        var a = this.getHighlightedResults();
                        a.length < 1 || this.trigger("select", {
                            data: a.data("data")
                        })
                    }, a
                }), b.define("select2/dropdown/closeOnSelect", [], function() {
                    function a() {}
                    return a.prototype.bind = function(a, b, c) {
                        var d = this;
                        a.call(this, b, c), b.on("select", function(a) {
                            d._selectTriggered(a)
                        }), b.on("unselect", function(a) {
                            d._selectTriggered(a)
                        })
                    }, a.prototype._selectTriggered = function(a, b) {
                        var c = b.originalEvent;
                        c && c.ctrlKey || this.trigger("close")
                    }, a
                }), b.define("select2/i18n/en", [], function() {
                    return {
                        errorLoading: function() {
                            return "Risultato non caricato."
                        },
                        inputTooLong: function(a) {
                            var b = a.input.length - a.maximum,
                                c = "Please delete " + b + " character";
                            return 1 != b && (c += "s"), c
                        },
                        inputTooShort: function(a) {
                            var b = a.minimum - a.input.length,
                                c = "Digitare " + b + " o piu' caratteri";
                            return c
                        },
                        loadingMore: function() {
                            return "Loading more results…"
                        },
                        maximumSelected: function(a) {
                            var b = "You can only select " + a.maximum + " item";
                            return 1 != a.maximum && (b += "s"), b
                        },
                        noResults: function() {
                            return "Nessun risultato"
                        },
                        searching: function() {
                            return "Ricerca in corso..."
                        }
                    }
                }), b.define("select2/defaults", ["jquery", "require", "./results", "./selection/single", "./selection/multiple", "./selection/placeholder", "./selection/allowClear", "./selection/search", "./selection/eventRelay", "./utils", "./translation", "./diacritics", "./data/select", "./data/array", "./data/ajax", "./data/tags", "./data/tokenizer", "./data/minimumInputLength", "./data/maximumInputLength", "./data/maximumSelectionLength", "./dropdown", "./dropdown/search", "./dropdown/hidePlaceholder", "./dropdown/infiniteScroll", "./dropdown/attachBody", "./dropdown/minimumResultsForSearch", "./dropdown/selectOnClose", "./dropdown/closeOnSelect", "./i18n/en"], function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C) {
                    function D() {
                        this.reset()
                    }
                    D.prototype.apply = function(l) {
                        if (l = a.extend({}, this.defaults, l), null == l.dataAdapter) {
                            if (l.dataAdapter = null != l.ajax ? o : null != l.data ? n : m, l.minimumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, r)), l.maximumInputLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, s)), l.maximumSelectionLength > 0 && (l.dataAdapter = j.Decorate(l.dataAdapter, t)), l.tags && (l.dataAdapter = j.Decorate(l.dataAdapter, p)), (null != l.tokenSeparators || null != l.tokenizer) && (l.dataAdapter = j.Decorate(l.dataAdapter, q)), null != l.query) {
                                var C = b(l.amdBase + "compat/query");
                                l.dataAdapter = j.Decorate(l.dataAdapter, C)
                            }
                            if (null != l.initSelection) {
                                var D = b(l.amdBase + "compat/initSelection");
                                l.dataAdapter = j.Decorate(l.dataAdapter, D)
                            }
                        }
                        if (null == l.resultsAdapter && (l.resultsAdapter = c, null != l.ajax && (l.resultsAdapter = j.Decorate(l.resultsAdapter, x)), null != l.placeholder && (l.resultsAdapter = j.Decorate(l.resultsAdapter, w)), l.selectOnClose && (l.resultsAdapter = j.Decorate(l.resultsAdapter, A))), null == l.dropdownAdapter) {
                            if (l.multiple) l.dropdownAdapter = u;
                            else {
                                var E = j.Decorate(u, v);
                                l.dropdownAdapter = E
                            }
                            if (0 !== l.minimumResultsForSearch && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, z)), l.closeOnSelect && (l.dropdownAdapter = j.Decorate(l.dropdownAdapter, B)), null != l.dropdownCssClass || null != l.dropdownCss || null != l.adaptDropdownCssClass) {
                                var F = b(l.amdBase + "compat/dropdownCss");
                                l.dropdownAdapter = j.Decorate(l.dropdownAdapter, F)
                            }
                            l.dropdownAdapter = j.Decorate(l.dropdownAdapter, y)
                        }
                        if (null == l.selectionAdapter) {
                            if (l.selectionAdapter = l.multiple ? e : d, null != l.placeholder && (l.selectionAdapter = j.Decorate(l.selectionAdapter, f)), l.allowClear && (l.selectionAdapter = j.Decorate(l.selectionAdapter, g)), l.multiple && (l.selectionAdapter = j.Decorate(l.selectionAdapter, h)), null != l.containerCssClass || null != l.containerCss || null != l.adaptContainerCssClass) {
                                var G = b(l.amdBase + "compat/containerCss");
                                l.selectionAdapter = j.Decorate(l.selectionAdapter, G)
                            }
                            l.selectionAdapter = j.Decorate(l.selectionAdapter, i)
                        }
                        if ("string" == typeof l.language)
                            if (l.language.indexOf("-") > 0) {
                                var H = l.language.split("-"),
                                    I = H[0];
                                l.language = [l.language, I]
                            } else l.language = [l.language];
                        if (a.isArray(l.language)) {
                            var J = new k;
                            l.language.push("en");
                            for (var K = l.language, L = 0; L < K.length; L++) {
                                var M = K[L],
                                    N = {};
                                try {
                                    N = k.loadPath(M)
                                } catch (O) {
                                    try {
                                        M = this.defaults.amdLanguageBase + M, N = k.loadPath(M)
                                    } catch (P) {
                                        l.debug && window.console && console.warn && console.warn('Select2: The language file for "' + M + '" could not be automatically loaded. A fallback will be used instead.');
                                        continue
                                    }
                                }
                                J.extend(N)
                            }
                            l.translations = J
                        } else {
                            var Q = k.loadPath(this.defaults.amdLanguageBase + "en"),
                                R = new k(l.language);
                            R.extend(Q), l.translations = R
                        }
                        return l
                    }, D.prototype.reset = function() {
                        function b(a) {
                            function b(a) {
                                return l[a] || a
                            }
                            return a.replace(/[^\u0000-\u007E]/g, b)
                        }

                        function c(d, e) {
                            if ("" === a.trim(d.term)) return e;
                            if (e.children && e.children.length > 0) {
                                for (var f = a.extend(!0, {}, e), g = e.children.length - 1; g >= 0; g--) {
                                    var h = e.children[g],
                                        i = c(d, h);
                                    null == i && f.children.splice(g, 1)
                                }
                                return f.children.length > 0 ? f : c(d, f)
                            }
                            var j = b(e.text).toUpperCase(),
                                k = b(d.term).toUpperCase();
                            return j.indexOf(k) > -1 ? e : null
                        }
                        this.defaults = {
                            amdBase: "./",
                            amdLanguageBase: "./i18n/",
                            closeOnSelect: !0,
                            debug: !1,
                            dropdownAutoWidth: !1,
                            escapeMarkup: j.escapeMarkup,
                            language: C,
                            matcher: c,
                            minimumInputLength: 0,
                            maximumInputLength: 0,
                            maximumSelectionLength: 0,
                            minimumResultsForSearch: 0,
                            selectOnClose: !1,
                            sorter: function(a) {
                                return a
                            },
                            templateResult: function(a) {
                                return a.text
                            },
                            templateSelection: function(a) {
                                return a.text
                            },
                            theme: "default",
                            width: "resolve"
                        }
                    }, D.prototype.set = function(b, c) {
                        var d = a.camelCase(b),
                            e = {};
                        e[d] = c;
                        var f = j._convertData(e);
                        a.extend(this.defaults, f)
                    };
                    var E = new D;
                    return E
                }), b.define("select2/options", ["require", "jquery", "./defaults", "./utils"], function(a, b, c, d) {
                    function e(b, e) {
                        if (this.options = b, null != e && this.fromElement(e), this.options = c.apply(this.options), e && e.is("input")) {
                            var f = a(this.get("amdBase") + "compat/inputData");
                            this.options.dataAdapter = d.Decorate(this.options.dataAdapter, f)
                        }
                    }
                    return e.prototype.fromElement = function(a) {
                        var c = ["select2"];
                        null == this.options.multiple && (this.options.multiple = a.prop("multiple")), null == this.options.disabled && (this.options.disabled = a.prop("disabled")), null == this.options.language && (a.prop("lang") ? this.options.language = a.prop("lang").toLowerCase() : a.closest("[lang]").prop("lang") && (this.options.language = a.closest("[lang]").prop("lang"))), null == this.options.dir && (this.options.dir = a.prop("dir") ? a.prop("dir") : a.closest("[dir]").prop("dir") ? a.closest("[dir]").prop("dir") : "ltr"), a.prop("disabled", this.options.disabled), a.prop("multiple", this.options.multiple), a.data("select2Tags") && (this.options.debug && window.console && console.warn && console.warn('Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'), a.data("data", a.data("select2Tags")), a.data("tags", !0)), a.data("ajaxUrl") && (this.options.debug && window.console && console.warn && console.warn("Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."), a.attr("ajax--url", a.data("ajaxUrl")), a.data("ajax--url", a.data("ajaxUrl")));
                        var e = {};
                        e = b.fn.jquery && "1." == b.fn.jquery.substr(0, 2) && a[0].dataset ? b.extend(!0, {}, a[0].dataset, a.data()) : a.data();
                        var f = b.extend(!0, {}, e);
                        f = d._convertData(f);
                        for (var g in f) b.inArray(g, c) > -1 || (b.isPlainObject(this.options[g]) ? b.extend(this.options[g], f[g]) : this.options[g] = f[g]);
                        return this
                    }, e.prototype.get = function(a) {
                        return this.options[a]
                    }, e.prototype.set = function(a, b) {
                        this.options[a] = b
                    }, e
                }), b.define("select2/core", ["jquery", "./options", "./utils", "./keys"], function(a, b, c, d) {
                    var e = function(a, c) {
                        null != a.data("select2") && a.data("select2").destroy(), this.$element = a, this.id = this._generateId(a), c = c || {}, this.options = new b(c, a), e.__super__.constructor.call(this);
                        var d = a.attr("tabindex") || 0;
                        a.data("old-tabindex", d), a.attr("tabindex", "-1");
                        var f = this.options.get("dataAdapter");
                        this.dataAdapter = new f(a, this.options);
                        var g = this.render();
                        this._placeContainer(g);
                        var h = this.options.get("selectionAdapter");
                        this.selection = new h(a, this.options), this.$selection = this.selection.render(), this.selection.position(this.$selection, g);
                        var i = this.options.get("dropdownAdapter");
                        this.dropdown = new i(a, this.options), this.$dropdown = this.dropdown.render(), this.dropdown.position(this.$dropdown, g);
                        var j = this.options.get("resultsAdapter");
                        this.results = new j(a, this.options, this.dataAdapter), this.$results = this.results.render(), this.results.position(this.$results, this.$dropdown);
                        var k = this;
                        this._bindAdapters(), this._registerDomEvents(), this._registerDataEvents(), this._registerSelectionEvents(), this._registerDropdownEvents(), this._registerResultsEvents(), this._registerEvents(), this.dataAdapter.current(function(a) {
                            k.trigger("selection:update", {
                                data: a
                            })
                        }), a.addClass("select2-hidden-accessible"), a.attr("aria-hidden", "true"), this._syncAttributes(), a.data("select2", this)
                    };
                    return c.Extend(e, c.Observable), e.prototype._generateId = function(a) {
                        var b = "";
                        return b = null != a.attr("id") ? a.attr("id") : null != a.attr("name") ? a.attr("name") + "-" + c.generateChars(2) : c.generateChars(4), b = "select2-" + b
                    }, e.prototype._placeContainer = function(a) {
                        a.insertAfter(this.$element);
                        var b = this._resolveWidth(this.$element, this.options.get("width"));
                        null != b && a.css("width", b)
                    }, e.prototype._resolveWidth = function(a, b) {
                        var c = /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
                        if ("resolve" == b) {
                            var d = this._resolveWidth(a, "style");
                            return null != d ? d : this._resolveWidth(a, "element")
                        }
                        if ("element" == b) {
                            var e = a.outerWidth(!1);
                            return 0 >= e ? "auto" : e + "px"
                        }
                        if ("style" == b) {
                            var f = a.attr("style");
                            if ("string" != typeof f) return null;
                            for (var g = f.split(";"), h = 0, i = g.length; i > h; h += 1) {
                                var j = g[h].replace(/\s/g, ""),
                                    k = j.match(c);
                                if (null !== k && k.length >= 1) return k[1]
                            }
                            return null
                        }
                        return b
                    }, e.prototype._bindAdapters = function() {
                        this.dataAdapter.bind(this, this.$container), this.selection.bind(this, this.$container), this.dropdown.bind(this, this.$container), this.results.bind(this, this.$container)
                    }, e.prototype._registerDomEvents = function() {
                        var b = this;
                        this.$element.on("change.select2", function() {
                            b.dataAdapter.current(function(a) {
                                b.trigger("selection:update", {
                                    data: a
                                })
                            })
                        }), this._sync = c.bind(this._syncAttributes, this), this.$element[0].attachEvent && this.$element[0].attachEvent("onpropertychange", this._sync);
                        var d = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                        null != d ? (this._observer = new d(function(c) {
                            a.each(c, b._sync)
                        }), this._observer.observe(this.$element[0], {
                            attributes: !0,
                            subtree: !1
                        })) : this.$element[0].addEventListener && this.$element[0].addEventListener("DOMAttrModified", b._sync, !1)
                    }, e.prototype._registerDataEvents = function() {
                        var a = this;
                        this.dataAdapter.on("*", function(b, c) {
                            a.trigger(b, c)
                        })
                    }, e.prototype._registerSelectionEvents = function() {
                        var b = this,
                            c = ["toggle"];
                        this.selection.on("toggle", function() {
                            b.toggleDropdown()
                        }), this.selection.on("*", function(d, e) {
                            -1 === a.inArray(d, c) && b.trigger(d, e)
                        })
                    }, e.prototype._registerDropdownEvents = function() {
                        var a = this;
                        this.dropdown.on("*", function(b, c) {
                            a.trigger(b, c)
                        })
                    }, e.prototype._registerResultsEvents = function() {
                        var a = this;
                        this.results.on("*", function(b, c) {
                            a.trigger(b, c)
                        })
                    }, e.prototype._registerEvents = function() {
                        var a = this;
                        this.on("open", function() {
                            a.$container.addClass("select2-container--open")
                        }), this.on("close", function() {
                            a.$container.removeClass("select2-container--open")
                        }), this.on("enable", function() {
                            a.$container.removeClass("select2-container--disabled")
                        }), this.on("disable", function() {
                            a.$container.addClass("select2-container--disabled")
                        }), this.on("focus", function() {
                            a.$container.addClass("select2-container--focus")
                        }), this.on("blur", function() {
                            a.$container.removeClass("select2-container--focus")
                        }), this.on("query", function(b) {
                            a.isOpen() || a.trigger("open"), this.dataAdapter.query(b, function(c) {
                                a.trigger("results:all", {
                                    data: c,
                                    query: b
                                })
                            })
                        }), this.on("query:append", function(b) {
                            this.dataAdapter.query(b, function(c) {
                                a.trigger("results:append", {
                                    data: c,
                                    query: b
                                })
                            })
                        }), this.on("keypress", function(b) {
                            var c = b.which;
                            a.isOpen() ? c === d.ENTER ? (a.trigger("results:select"), b.preventDefault()) : c === d.SPACE && b.ctrlKey ? (a.trigger("results:toggle"), b.preventDefault()) : c === d.UP ? (a.trigger("results:previous"), b.preventDefault()) : c === d.DOWN ? (a.trigger("results:next"), b.preventDefault()) : (c === d.ESC || c === d.TAB) && (a.close(), b.preventDefault()) : (c === d.ENTER || c === d.SPACE || (c === d.DOWN || c === d.UP) && b.altKey) && (a.open(), b.preventDefault())
                        })
                    }, e.prototype._syncAttributes = function() {
                        this.options.set("disabled", this.$element.prop("disabled")), this.options.get("disabled") ? (this.isOpen() && this.close(), this.trigger("disable")) : this.trigger("enable")
                    }, e.prototype.trigger = function(a, b) {
                        var c = e.__super__.trigger,
                            d = {
                                open: "opening",
                                close: "closing",
                                select: "selecting",
                                unselect: "unselecting"
                            };
                        if (a in d) {
                            var f = d[a],
                                g = {
                                    prevented: !1,
                                    name: a,
                                    args: b
                                };
                            if (c.call(this, f, g), g.prevented) return void(b.prevented = !0)
                        }
                        c.call(this, a, b)
                    }, e.prototype.toggleDropdown = function() {
                        this.options.get("disabled") || (this.isOpen() ? this.close() : this.open())
                    }, e.prototype.open = function() {
                        this.isOpen() || (this.trigger("query", {}), this.trigger("open"))
                    }, e.prototype.close = function() {
                        this.isOpen() && this.trigger("close")
                    }, e.prototype.isOpen = function() {
                        return this.$container.hasClass("select2-container--open")
                    }, e.prototype.enable = function(a) {
                        this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'), (null == a || 0 === a.length) && (a = [!0]);
                        var b = !a[0];
                        this.$element.prop("disabled", b)
                    }, e.prototype.data = function() {
                        this.options.get("debug") && arguments.length > 0 && window.console && console.warn && console.warn('Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.');
                        var a = [];
                        return this.dataAdapter.current(function(b) {
                            a = b
                        }), a
                    }, e.prototype.val = function(b) {
                        if (this.options.get("debug") && window.console && console.warn && console.warn('Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'), null == b || 0 === b.length) return this.$element.val();
                        var c = b[0];
                        a.isArray(c) && (c = a.map(c, function(a) {
                            return a.toString()
                        })), this.$element.val(c).trigger("change")
                    }, e.prototype.destroy = function() {
                        this.$container.remove(), this.$element[0].detachEvent && this.$element[0].detachEvent("onpropertychange", this._sync), null != this._observer ? (this._observer.disconnect(), this._observer = null) : this.$element[0].removeEventListener && this.$element[0].removeEventListener("DOMAttrModified", this._sync, !1), this._sync = null, this.$element.off(".select2"), this.$element.attr("tabindex", this.$element.data("old-tabindex")), this.$element.removeClass("select2-hidden-accessible"), this.$element.attr("aria-hidden", "false"), this.$element.removeData("select2"), this.dataAdapter.destroy(), this.selection.destroy(), this.dropdown.destroy(), this.results.destroy(), this.dataAdapter = null, this.selection = null, this.dropdown = null, this.results = null
                    }, e.prototype.render = function() {
                        var b = a('<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>');
                        return b.attr("dir", this.options.get("dir")), this.$container = b, this.$container.addClass("select2-container--" + this.options.get("theme")), b.data("element", this.$element), b
                    }, e
                }), b.define("select2/compat/utils", ["jquery"], function(a) {
                    function b(b, c, d) {
                        var e, f, g = [];
                        e = a.trim(b.attr("class")), e && (e = "" + e, a(e.split(/\s+/)).each(function() {
                            0 === this.indexOf("select2-") && g.push(this)
                        })), e = a.trim(c.attr("class")), e && (e = "" + e, a(e.split(/\s+/)).each(function() {
                            0 !== this.indexOf("select2-") && (f = d(this), null != f && g.push(f))
                        })), b.attr("class", g.join(" "))
                    }
                    return {
                        syncCssClasses: b
                    }
                }), b.define("select2/compat/containerCss", ["jquery", "./utils"], function(a, b) {
                    function c() {
                        return null
                    }

                    function d() {}
                    return d.prototype.render = function(d) {
                        var e = d.call(this),
                            f = this.options.get("containerCssClass") || "";
                        a.isFunction(f) && (f = f(this.$element));
                        var g = this.options.get("adaptContainerCssClass");
                        if (g = g || c, -1 !== f.indexOf(":all:")) {
                            f = f.replace(":all", "");
                            var h = g;
                            g = function(a) {
                                var b = h(a);
                                return null != b ? b + " " + a : a
                            }
                        }
                        var i = this.options.get("containerCss") || {};
                        return a.isFunction(i) && (i = i(this.$element)), b.syncCssClasses(e, this.$element, g), e.css(i), e.addClass(f), e
                    }, d
                }), b.define("select2/compat/dropdownCss", ["jquery", "./utils"], function(a, b) {
                    function c() {
                        return null
                    }

                    function d() {}
                    return d.prototype.render = function(d) {
                        var e = d.call(this),
                            f = this.options.get("dropdownCssClass") || "";
                        a.isFunction(f) && (f = f(this.$element));
                        var g = this.options.get("adaptDropdownCssClass");
                        if (g = g || c, -1 !== f.indexOf(":all:")) {
                            f = f.replace(":all", "");
                            var h = g;
                            g = function(a) {
                                var b = h(a);
                                return null != b ? b + " " + a : a
                            }
                        }
                        var i = this.options.get("dropdownCss") || {};
                        return a.isFunction(i) && (i = i(this.$element)), b.syncCssClasses(e, this.$element, g), e.css(i), e.addClass(f), e
                    }, d
                }), b.define("select2/compat/initSelection", ["jquery"], function(a) {
                    function b(a, b, c) {
                        c.get("debug") && window.console && console.warn && console.warn("Select2: The `initSelection` option has been deprecated in favor of a custom data adapter that overrides the `current` method. This method is now called multiple times instead of a single time when the instance is initialized. Support will be removed for the `initSelection` option in future versions of Select2"), this.initSelection = c.get("initSelection"), this._isInitialized = !1, a.call(this, b, c)
                    }
                    return b.prototype.current = function(b, c) {
                        var d = this;
                        return this._isInitialized ? void b.call(this, c) : void this.initSelection.call(null, this.$element, function(b) {
                            d._isInitialized = !0, a.isArray(b) || (b = [b]), c(b)
                        })
                    }, b
                }), b.define("select2/compat/inputData", ["jquery"], function(a) {
                    function b(a, b, c) {
                        this._currentData = [], this._valueSeparator = c.get("valueSeparator") || ",", "hidden" === b.prop("type") && c.get("debug") && console && console.warn && console.warn("Select2: Using a hidden input with Select2 is no longer supported and may stop working in the future. It is recommended to use a `<select>` element instead."), a.call(this, b, c)
                    }
                    return b.prototype.current = function(b, c) {
                        function d(b, c) {
                            var e = [];
                            return b.selected || -1 !== a.inArray(b.id, c) ? (b.selected = !0, e.push(b)) : b.selected = !1, b.children && e.push.apply(e, d(b.children, c)), e
                        }
                        for (var e = [], f = 0; f < this._currentData.length; f++) {
                            var g = this._currentData[f];
                            e.push.apply(e, d(g, this.$element.val().split(this._valueSeparator)))
                        }
                        c(e)
                    }, b.prototype.select = function(b, c) {
                        if (this.options.get("multiple")) {
                            var d = this.$element.val();
                            d += this._valueSeparator + c.id, this.$element.val(d), this.$element.trigger("change")
                        } else this.current(function(b) {
                            a.map(b, function(a) {
                                a.selected = !1
                            })
                        }), this.$element.val(c.id), this.$element.trigger("change")
                    }, b.prototype.unselect = function(a, b) {
                        var c = this;
                        b.selected = !1, this.current(function(a) {
                            for (var d = [], e = 0; e < a.length; e++) {
                                var f = a[e];
                                b.id != f.id && d.push(f.id)
                            }
                            c.$element.val(d.join(c._valueSeparator)), c.$element.trigger("change")
                        })
                    }, b.prototype.query = function(a, b, c) {
                        for (var d = [], e = 0; e < this._currentData.length; e++) {
                            var f = this._currentData[e],
                                g = this.matches(b, f);
                            null !== g && d.push(g)
                        }
                        c({
                            results: d
                        })
                    }, b.prototype.addOptions = function(b, c) {
                        var d = a.map(c, function(b) {
                            return a.data(b[0], "data")
                        });
                        this._currentData.push.apply(this._currentData, d)
                    }, b
                }), b.define("select2/compat/matcher", ["jquery"], function(a) {
                    function b(b) {
                        function c(c, d) {
                            var e = a.extend(!0, {}, d);
                            if (null == c.term || "" === a.trim(c.term)) return e;
                            if (d.children) {
                                for (var f = d.children.length - 1; f >= 0; f--) {
                                    var g = d.children[f],
                                        h = b(c.term, g.text, g);
                                    h || e.children.splice(f, 1)
                                }
                                if (e.children.length > 0) return e
                            }
                            return b(c.term, d.text, d) ? e : null
                        }
                        return c
                    }
                    return b
                }), b.define("select2/compat/query", [], function() {
                    function a(a, b, c) {
                        c.get("debug") && window.console && console.warn && console.warn("Select2: The `query` option has been deprecated in favor of a custom data adapter that overrides the `query` method. Support will be removed for the `query` option in future versions of Select2."), a.call(this, b, c)
                    }
                    return a.prototype.query = function(a, b, c) {
                        b.callback = c;
                        var d = this.options.get("query");
                        d.call(null, b)
                    }, a
                }), b.define("select2/dropdown/attachContainer", [], function() {
                    function a(a, b, c) {
                        a.call(this, b, c)
                    }
                    return a.prototype.position = function(a, b, c) {
                        var d = c.find(".dropdown-wrapper");
                        d.append(b), b.addClass("select2-dropdown--below"), c.addClass("select2-container--below")
                    }, a
                }), b.define("select2/dropdown/stopPropagation", [], function() {
                    function a() {}
                    return a.prototype.bind = function(a, b, c) {
                        a.call(this, b, c);
                        var d = ["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"];
                        this.$dropdown.on(d.join(" "), function(a) {
                            a.stopPropagation()
                        })
                    }, a
                }), b.define("select2/selection/stopPropagation", [], function() {
                    function a() {}
                    return a.prototype.bind = function(a, b, c) {
                        a.call(this, b, c);
                        var d = ["blur", "change", "click", "dblclick", "focus", "focusin", "focusout", "input", "keydown", "keyup", "keypress", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup", "search", "touchend", "touchstart"];
                        this.$selection.on(d.join(" "), function(a) {
                            a.stopPropagation()
                        })
                    }, a
                }), b.define("jquery.select2", ["jquery", "require", "./select2/core", "./select2/defaults"], function(a, b, c, d) {
                    if (b("jquery.mousewheel"), null == a.fn.select2) {
                        var e = ["open", "close", "destroy"];
                        a.fn.select2 = function(b) {
                            if (b = b || {}, "object" == typeof b) return this.each(function() {
                                {
                                    var d = a.extend({}, b, !0);
                                    new c(a(this), d)
                                }
                            }), this;
                            if ("string" == typeof b) {
                                var d = this.data("select2");
                                null == d && window.console && console.error && console.error("The select2('" + b + "') method was called on an element that is not using Select2.");
                                var f = Array.prototype.slice.call(arguments, 1),
                                    g = d[b](f);
                                return a.inArray(b, e) > -1 ? this : g
                            }
                            throw new Error("Invalid arguments for Select2: " + b)
                        }
                    }
                    return null == a.fn.select2.defaults && (a.fn.select2.defaults = d), c
                }),
                function(c) {
                    "function" == typeof b.define && b.define.amd ? b.define("jquery.mousewheel", ["jquery"], c) : "object" == typeof exports ? module.exports = c : c(a)
                }(function(a) {
                    function b(b) {
                        var g = b || window.event,
                            h = i.call(arguments, 1),
                            j = 0,
                            l = 0,
                            m = 0,
                            n = 0,
                            o = 0,
                            p = 0;
                        if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
                            if (1 === g.deltaMode) {
                                var q = a.data(this, "mousewheel-line-height");
                                j *= q, m *= q, l *= q
                            } else if (2 === g.deltaMode) {
                                var r = a.data(this, "mousewheel-page-height");
                                j *= r, m *= r, l *= r
                            }
                            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                                var s = this.getBoundingClientRect();
                                o = b.clientX - s.left, p = b.clientY - s.top
                            }
                            return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
                        }
                    }

                    function c() {
                        f = null
                    }

                    function d(a, b) {
                        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
                    }
                    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
                        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                        i = Array.prototype.slice;
                    if (a.event.fixHooks)
                        for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
                    var k = a.event.special.mousewheel = {
                        version: "3.1.12",
                        setup: function() {
                            if (this.addEventListener)
                                for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
                            else this.onmousewheel = b;
                            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
                        },
                        teardown: function() {
                            if (this.removeEventListener)
                                for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
                            else this.onmousewheel = null;
                            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
                        },
                        getLineHeight: function(b) {
                            var c = a(b),
                                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
                            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
                        },
                        getPageHeight: function(b) {
                            return a(b).height()
                        },
                        settings: {
                            adjustOldDeltas: !0,
                            normalizeOffset: !0
                        }
                    };
                    a.fn.extend({
                        mousewheel: function(a) {
                            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
                        },
                        unmousewheel: function(a) {
                            return this.unbind("mousewheel", a)
                        }
                    })
                }), {
                    define: b.define,
                    require: b.require
                }
        }(),
        c = b.require("jquery.select2");
    return a.fn.select2.amd = b, c
});