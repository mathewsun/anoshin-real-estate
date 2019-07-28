function callibridomain() {
    var a, b, c = "";
    return a = document.domain.split("."), a.length > 2 ? (b = a.length > 3 ? 2 : 1, !0 === _callibri.allow_subdomains && (b -= 1), c = (_callibri.allow_subdomains ? "" : ".") + a.slice(b, a.length).toString().replace(/,/g, ".")) : c = (_callibri.allow_subdomains ? "" : ".") + document.domain, c
}

function callibriSetCookieDomain(a, b, c, d, e) {
    "session" !== c ? (void 0 === e ? c.setMinutes(c.getMinutes() + 10) : c.setDate(c.getDate() + 100), c = ";expires=" + c.toUTCString() + ";") : c = "", document.cookie = a + "=" + escape(b) + "; path=/; " + d + " " + c
}

function callibriSetCookie(a, b, c, d, e) {
    var f = callibridomain();
    "session" !== e && (e = e ? new Date((new Date).getTime() + 24 * e * 60 * 60 * 1e3) : new Date);
    var g = _callibri.allow_subdomains ? "" : "domain=" + f + ";";
    d || callibriSetCookieDomain(a, b, e, g, c), (-1 === document.cookie.indexOf(a) || d) && (g = "", callibriSetCookieDomain(a, b, e, g, c))
}

function callibriGetCookie(a) {
    var b, c, d, e = document.cookie.split(";");
    for (b = 0; b < e.length; b++)
        if (c = e[b].substr(0, e[b].indexOf("=")), d = e[b].substr(e[b].indexOf("=") + 1), (c = c.replace(/^\s+|\s+$/g, "")) == a) return unescape(d);
    return !1
}

function callibriXhrRequest() {
    for (var a, b = [function() {
            return a = callibriCheckIE8_9() ? new XDomainRequest : new XMLHttpRequest
        }, function() {
            return new ActiveXObject("Msxml2.XMLHTTP")
        }, function() {
            return new ActiveXObject("Msxml3.XMLHTTP")
        }, function() {
            return new ActiveXObject("Microsoft.XMLHTTP")
        }], c = 0; c < b.length; c++) {
        try {
            a = b[c]()
        } catch (a) {
            continue
        }
        break
    }
    return a
}

function callibriMakeRequest(a, b, c, d, e, f) {
    try {
        var g, h, i, j, k;
        b = b || {};
        try {
            f = f || 3e4
        } catch (a) {
            f = 3e4
        }
        if (!(i = callibriXhrRequest())) return;
        if (b.version = _callibri.version, a.match(/contactus$/)) {
            b.ymclid = callibriGetMetrikaClientID(!0), b.gaclid = callibriGetGaClientID(!0), b.clbvid = _callibri.clbvid || null;
            var l = callibriSetPostDataFeedback(b);
            i.feedback_data = l
        }
        if (e || (e = _callibri.server_host), h = document.location.protocol + "//" + e + a, i.open("POST", h, !0), k = callibriCheckIE8_9(), g = setTimeout(function() {
                i.abort()
            }, f), k) i.onload = function() {
            i.feedback_data && callibriRemoveElementItemLocalStorage("callibri_feedbacks", i.feedback_data), c && "function" == typeof c && c(i.responseText, 200)
        };
        else {
            try {
                d = d || "application/json"
            } catch (a) {
                d = "application/json"
            }
            i.setRequestHeader("Content-Type", d), j = document.characterSet ? document.characterSet : document.charset, "utf-8" !== j.toString().toLowerCase() ? i.setRequestHeader("Accept", d + "; charset=" + j) : i.setRequestHeader("Accept", d), i.onreadystatechange = function() {
                3 != i.readyState && 4 != i.readyState || !i.feedback_data || 204 != i.status && 422 != i.status || callibriRemoveElementItemLocalStorage("callibri_feedbacks", i.feedback_data), 4 == i.readyState && (clearTimeout(g), c && "function" == typeof c && c(i.responseText, i.status)), 4 == i.readyState && (0 === i.status || 500 == i.status || i.status >= 400) && _callibri.server_host !== e && callibriMakeRequest(a, b, c, d, null, f)
            }
        }
        var m = JSON.stringify(b);
        _callibri.btr || i.send(m)
    } catch (a) {}
}

function supports_callibri_storage() {
    if (_callibri.localStorage_off) return !1;
    try {
        return localStorage.setItem("test_localstorage", "1"), localStorage.removeItem("test_localstorage"), !0
    } catch (a) {
        return _callibri.localStorage_off = !0, !1
    }
}

function callibriGetItemLocalStorage(a) {
    if (supports_callibri_storage()) {
        var b = localStorage.getItem(a);
        return null === b && (b = callibriGetCookie(a)), b
    }
    return callibriGetCookie(a)
}

function callibriSetItemStorage(a, b) {
    var c = !0;
    try {
        localStorage.setItem(a, b)
    } catch (a) {
        _callibri.localStorage_off = !0, c = !1
    }
    return c
}

function callibriSetItemLocalStorage(a, b) {
    var c = !0;
    if (supports_callibri_storage())
        if (b) {
            var d = callibriSetItemStorage(a, b);
            d && (c = !1)
        } else localStorage.removeItem(a), c = !1 !== callibriGetCookie(a, b);
    c && callibriSetCookie(a, b)
}

function callibriFlushTempStorage() {
    if (supports_callibri_storage()) {
        var a = localStorage.getItem(_callibri.cookie_prefix + "timestamp_callibri");
        a = a ? new Date(a) : null;
        var b = new Date;
        if (a && (b - a) / 6e4 > 10)
            for (var c in localStorage) 0 == c.indexOf(_callibri.cookie_prefix) && c.match("callibri") && localStorage.removeItem(c);
        callibriSetItemStorage(_callibri.cookie_prefix + "timestamp_callibri", b.toString())
    }
}

function callibriRemoveElementItemLocalStorage(a, b) {
    var c, d = callibriGetItemLocalStorage(a),
        e = [];
    d = d ? JSON.parse(d) : [];
    for (var f = 0; f < d.length; f++) c = d[f], b !== c && e.push(c);
    e = e.length > 0 ? JSON.stringify(e) : "", callibriSetItemLocalStorage(a, JSON.stringify(e))
}

function callibriSetPostDataFeedback(a) {
    var b = "";
    for (var c in a.feedback) c && "number" !== c && "session_id" !== c && (b += c + "-:-" + a.feedback[c].toString() + "-;-");
    var d = callibriGetItemLocalStorage("callibri_feedbacks");
    return d = d ? JSON.parse(d) : [], "object" != typeof d && (d = []), -1 === d.indexOf(b) && (d.push(b), callibriSetItemLocalStorage("callibri_feedbacks", JSON.stringify(d))), b
}

function callibriSetLocalHooksUrl(a) {
    if (a.data.module_settings && a.data.module_settings.hooks_urls) try {
        _callibri.exists_url = !0, callibriSetItemLocalStorage("callibri_hooks_urls", JSON.stringify(a.data.module_settings.hooks_urls)), callibriSetItemLocalStorage("callibri_hooks_urls_timestamp", (new Date).toString()), delete a.data.module_settings.hooks_urls
    } catch (a) {}
    return a
}

function callibriReplacePhones() {
    for (var a = _callibri.objects.callibri.format, b = _callibri.objects.callibri.block_class.split(","), c = 0; c < b.length; c++) {
        callibriSetValueToBlocksByClass("." + b[c].replace(/\s/g, ""), _callibri.number, a)
    }
    if (_callibri.module_settings && _callibri.module_settings.elements) {
        var d, e = _callibri.module_settings.elements,
            f = e.length;
        for (c = 0; c < f; c++) d = e[c], callibriSetValueToBlocksByClass(d.element, _callibri.number, d.format)
    }
}

function callibriReplaceCopiesPhones() {
    if (_callibri.copies_phones) {
        var a, b, c, d, e, f = _callibri.copies_phones.length;
        for (a = 0; a < f; a++)
            for (b = _callibri.copies_phones[a], c = b.elements.length, d = 0; d < c; d++) e = b.elements[d], callibriSetValueToBlocksByClass(e.element, b.phone, e.format)
    }
}

function callibriPingCallback(a) {
    4 == a.readyState && 201 !== a.status && (callibri_ping_interval && (clearInterval(callibri_ping_interval), callibri_ping_interval = void 0), _callibri.ping_attempt ? _callibri.ping_attempt += 1 : _callibri.ping_attempt = 1, callibri_error_timeout = setTimeout(callibriPingNumber, Math.floor(Math.random() * Math.pow(2, _callibri.ping_attempt) * 1e3))), 4 == a.readyState && 201 === a.status && "undefined" == typeof callibri_ping_interval && (callibri_ping_interval = setInterval(callibriPingNumber, 1e4), _callibri.ping_attempt = null)
}

function callibriDocumentHidden() {
    var a;
    return void 0 !== document.hidden ? a = "hidden" : void 0 !== document.msHidden ? a = "msHidden" : void 0 !== document.mozHidden ? a = "mozHidden" : void 0 !== document.webkitHidden && (a = "webkitHidden"), document[a]
}

function callibriPingNumber(a) {
    try {
        if (!callibriDocumentHidden() || a) {
            var b = _callibri.number;
            if (_callibri.copies_phones) {
                var c, d = _callibri.copies_phones.length;
                for (c = 0; c < d; c++) b += "_" + _callibri.copies_phones[c].phone
            }
            var e = "/visit?s=" + _callibri.session_id + "&p=" + b;
            _callibri.ya_client_id && (e = e + "&y=" + _callibri.ya_client_id), _callibri.ga_client_id && (e = e + "&g=" + _callibri.ga_client_id), callibriGetRequest("//" + _callibri.ws_server_host + e, callibriPingCallback)
        }
    } catch (a) {
        callibriSendError(a, "callibriPingNumber")
    }
}

function callibriSetLocalCookieValue(a, b) {
    var c = callibriGetResponse();
    if (c) {
        var d = JSON.parse(c);
        d.data[a] = b, d = JSON.stringify(d), callibriSaveResponse(d)
    }
}

function callibriGetResponse() {
    var a = null;
    return supports_callibri_storage() && (a = localStorage.getItem("callibri")), null == a && (a = callibriGetCookie(_callibri.cookie_prefix + "data")), a
}

function callibriFlushResponse() {
    if (callibriSetCookie(_callibri.cookie_prefix + "data", "", void 0, !0), supports_callibri_storage()) try {
        localStorage.removeItem("callibri"), localStorage.removeItem("callibri_module_settings")
    } catch (a) {
        _callibri.localStorage_off = !0
    }
}

function callibriSaveResponse(a) {
    var b, c, d = !1;
    if (supports_callibri_storage() && (d = callibriSetItemStorage("callibri", a)), !d) {
        b = JSON.parse(a);
        var c = b.data.module_settings;
        b.data.module_settings = "", b = JSON.stringify(b), c && supports_callibri_storage() && (c.timestamp = (new Date).valueOf(), callibriSetItemStorage("callibri_module_settings", JSON.stringify(c))), callibriSetCookie(_callibri.cookie_prefix + "data", b, void 0, !0)
    }
}

function callibriHandleResponse(a, b) {
    function c(a) {
        var b = !("v2" != _callibri.mv_version || !_callibri.chat_operator) && _callibri.chat_operator;
        callibriInit(), b && (_callibri.chat_operator = b), "function" == typeof callibriWidgetPageNavigate && callibriWidgetPageNavigate(a)
    }

    function d() {
        c()
    }
    try {
        var e, f, g;
        if (200 != b) return;
        if (callibriSetItemLocalStorage("callibri_request_send", ""), a = callibriCheckIE8_9() ? a.replace(/\\'/g, "'") : a, f = JSON.parse(a), void 0 === f.data || "object" != typeof f.data || "object" == typeof f.errors) {
            callibriSetItemLocalStorage("callibri_nct", "1"), "string" == typeof f.errors && (f.errors = [
                [f.errors]
            ]);
            for (var h in f.errors) {
                var i = "callibri error: " + f.errors[h].join(", ");
                void 0 !== console ? console.log(i) : window.console.log(i)
            }
            return
        }
        if ("object" == typeof f.data && f.data.number && !f.data.only_widget && "object" != typeof f.errors) {
            callibri_extend(_callibri, f.data);
            try {
                _callibri.init || callibriGetGuid()
            } catch (a) {
                callibriSendError(a, "callibriGetGuid")
            }
            e = f.data.number, f.data.session_id && callibriSetCookie(_callibri.cookie_prefix + "sessions_callibri", f.data.session_id, 1);
            var j = callibriGetResponse();
            j || (f.expire_date = (new Date).toString(), f = callibriSetLocalHooksUrl(f), a = JSON.stringify(f), callibriSaveResponse(a)), f.data.dynamic && (callibriSetItemLocalStorage("callibri_phone", _callibri.number), f.data.copies_phones && callibriSetItemLocalStorage("callibri_copies_phones", JSON.stringify(f.data.copies_phones)), _callibri.init || (supports_callibri_storage() && (window.addEventListener("storage", function(a) {
                "callibri_phone" == a.key && a.newValue && a.oldValue !== a.newValue && (_callibri.number = a.newValue, callibriSetLocalCookieValue("number", a.newValue), callibriReplacePhones())
            }), f.data.copies_phones && window.addEventListener("storage", function(a) {
                "callibri_copies_phones" == a.key && a.newValue && a.oldValue !== a.newValue && (_callibri.copies_phones = JSON.parse(a.newValue), callibriSetLocalCookieValue("copies_phones", _callibri.copies_phones), callibriReplaceCopiesPhones())
            })), f.data.ping && (j && callibriPingNumber(!0), callibri_ping_interval = setInterval(callibriPingNumber, 1e4))));
            for (var k = _callibri.objects.callibri, l = k.block_class.split(","), g = 0; g < l.length; g++) {
                callibriSetValueToBlocksByClass("." + l[g].replace(/\s/g, ""), e, k.format)
            }
            if (!_callibri.init && f.data.webcalls && callibriWidgetStart(), f.data.module_settings) {
                if ("string" == typeof f.data.module_settings.elements && (f.data.module_settings.elements = JSON.parse(f.data.module_settings.elements)), f.data.module_settings.elements) {
                    var m, n = f.data.module_settings.elements;
                    for (g = 0; g < n.length; g++) m = n[g], callibriSetValueToBlocksByClass(m.element, e, m.format)
                }
                if (f.data.module_settings.pseudo_links) {
                    var o = f.data.module_settings.pseudo_links;
                    for (g = 0; g < o.length; g++) callibriSetPseudoLink(o[g])
                }
            }
            var p = f.data.copies_phones;
            if (void 0 !== p && null !== p)
                for (var q = 0; q < p.length; q++)
                    if (copy = p[q], copy.element_class) callibriSetValueToBlocksByClass("." + copy.element_class, copy.phone, k.format);
                    else {
                        var r, s, t = copy.elements ? copy.elements.length : 0;
                        for (r = 0; r < t; r++) s = copy.elements[r], callibriSetValueToBlocksByClass(s.element, copy.phone, s.format)
                    } callibriUseFeedback(), callibriChangeEmails()
        } else if (f.data.module_settings) {
            callibri_extend(_callibri, f.data);
            try {
                _callibri.init || callibriGetGuid()
            } catch (a) {
                callibriSendError(a, "callibriGetGuid")
            }
            f.data.session_id && (callibriSetCookie(_callibri.cookie_prefix + "sessions_callibri", f.data.session_id, 1), callibriUseFeedback(), callibriChangeEmails()), f.expire_date = (new Date).toString(), a = JSON.stringify(f), callibriSaveResponse(a), _callibri.init || void 0 === f.data.module_settings.tabs || null === f.data.module_settings.tabs || (f = callibriSetLocalHooksUrl(f), callibriWidgetStart())
        } else callibriSetItemLocalStorage("callibri_nct", "1");
        _callibri.module_settings && _callibri.module_settings.changeable_tags && "function" == typeof MutationObserver && document.querySelectorAll(_callibri.module_settings.changeable_tags).forEach(function(a) {
            var b = !1,
                c = new MutationObserver(function(a) {
                    a.forEach(function(a) {
                        b || (b = !0, c.disconnect(), callibriInit(), "function" == typeof callibriSetOutsideActions && _callibri.module_settings.tabs && callibriSetOutsideActions())
                    })
                }),
                d = {
                    attributes: !0,
                    childList: !0,
                    characterData: !0
                };
            c.observe(a, d)
        })
    } catch (a) {
        void 0 !== console ? console.log(a.stack) : window.console.log(a), callibriSendError(a, "callibriHandleResponse")
    }
    _callibri.init || (! function(a) {
        var b = a.pushState;
        a.pushState = function(d) {
            return "function" == typeof a.onpushstate && a.onpushstate({
                state: d
            }), c(arguments[2]), b.apply(a, arguments)
        }
    }(window.history), window.addEventListener("popstate", d)), _callibri.init = !0, callibriAfterResponse(), _callibri.get_request = !1, callibriSetCookie("callibri_get_request", "", void 0, !0, -1), f && f.data && (f.data.clbvid && callibriSetCookie("clbvid", f.data.clbvid, void 0, !1, 4e3), f.data.required_file && !document.querySelector("script[name=CallibriRequiredFile]") && callibriGetLibrary(f.data.required_file, function() {}, "CallibriRequiredFile"))
}

function callibriWidgetStart() {
    var a = _callibri.widget_path;
    if (!a) {
        document.querySelector('script[src*="callibri-a.akamaihd.net"]') && (_callibri.cdn_host = "callibri-a.akamaihd.net");
        var b = "v2" === _callibri.mv_version ? "/widget_v2.min.js" : "/widget.min.js";
        a = "//" + _callibri.cdn_host + b
    }
    callibriGetLibrary(a, function() {
        callibriInitWidget()
    }, "callibriWidget")
}

function callibriUseFeedback() {
    _callibri.use_feedback && (_callibri.form_parser ? _callibri.form_parser.init() : _callibri.form_parser = new CallibriFormParser)
}

function callibriCollectionHas(a, b) {
    for (var c = 0; c < a.length; c++)
        if (a[c] == b) return !0;
    return !1
}

function callibriFindParentSelector(a, b) {
    for (var c = document.querySelectorAll(b), d = a.parentNode; d && !callibriCollectionHas(c, d);) d = d.parentNode;
    return d
}

function callibriRemoveClass(a, b) {
    for (var c = 0; c < a.length; c++) a[c].className.toString().match(b) && (a[c].className = a[c].className.replace(b, ""))
}

function callibriSetPseudoLink(a) {
    for (var b, c = document.querySelectorAll(a.element), d = c.length, e = 0; e < d; e++) b = c[e], b.dataset.callibri_pseudo_link || (b.dataset.callibri_pseudo_link = !0, b.addEventListener("click", function(b) {
        if (callibriChangeElement(b.target, a.format, a.element, _callibri.number), callibriReplacePhones(), "function" == typeof MutationObserver && !b.target.dataset.callibri_obs) {
            b.target.dataset.callibri_obs = !0;
            var c = new MutationObserver(function(c) {
                    c.forEach(function(c) {
                        "href" !== c.attributeName && (callibriChangeElement(b.target, a.format, a.element, _callibri.number), callibriReplacePhones())
                    })
                }),
                d = {
                    attributes: !0
                };
            c.observe(b.target, d)
        }
    }, !1))
}

function callibriChangeElement(a, b, c, d, e) {
    e || (e = callibriFormatOriginalNumber(d, b)), c.match(/\[href\*=tel\]/) || (a.innerHTML = e), "A" === a.tagName && (a.href.match(/^tel\:/i) ? a.href = "tel:+" + d : a.href.match(/^callto\:/i) && (a.href = "callto:+" + d))
}

function callibriFormatOriginalNumber(a, b) {
    a = a.substr(1);
    try {
        a = callibriFormatPhone(a, b)
    } catch (b) {
        a = callibriFormatPhone(a, "+7 (#{XXX}) #{XXX}-#{XX}-#{XX}")
    }
    return a
}

function callibriSetValueToBlocksByClass(a, b, c) {
    try {
        if (void 0 !== b && "" !== b) {
            b.match(/^(7800)|(7804)/) && (c = c.replace("+7", "8"));
            var d = b;
            b = callibriFormatOriginalNumber(b, c);
            for (var e = document.querySelectorAll(a), f = 0; f < e.length; f++) "IMG" === e[f].tagName ? callibriChangeImage(e[f], b, !1) : callibriChangeElement(e[f], c, a, d, b)
        }
    } catch (a) {}
}

function callibriChangeImage(a, b, c) {
    var d = new Image,
        e = _callibri.site_id.toString() + "_" + _callibri.number + "_" + (c ? "default" : a.id) + ".png",
        f = document.location.protocol + "//" + _callibri.server_host + "/customs_sites_imgs/" + e;
    d.onerror = d.onabort = function() {
        c ? a.innerHTML = b : callibriChangeImage(a, b, !0)
    }, d.onload = function() {
        a.src = f, a.alt = b
    }, d.src = f
}

function callibriFormatPhone(a, b) {
    if ("undefined" != typeof callibri_numbers_format)
        for (var c in callibri_numbers_format)
            if (0 == a.indexOf(c)) {
                b = callibri_numbers_format[c];
                break
            } for (var d = "", e = b.match(/#{(X)+}/gi), f = b, g = 0; g < e.length; g++) f = f.replace(/#{(X)+}/i, "$$" + (g + 1)), d += "(" + e[g].slice(2, -1).replace(/(X)/gi, "\\d") + ")";
    return d = new RegExp(d), a.replace(d, f)
}

function callibriBindReady(a) {
    function b() {
        try {
            document.documentElement.doScroll("left"), a()
        } catch (a) {
            setTimeout(b, 10)
        }
    }
    if ("loading" !== document.readyState) return void a();
    if (document.addEventListener) document.addEventListener("DOMContentLoaded", a, !1);
    else if (document.attachEvent) {
        var c;
        try {
            c = null !== window.frameElement
        } catch (a) {}
        document.documentElement.doScroll && !c && b(), document.attachEvent("onreadystatechange", function() {
            "interactive" === document.readyState && a()
        })
    } else if (window.addEventListener) window.addEventListener("load", a, !1);
    else if (window.attachEvent) window.attachEvent("onload", a);
    else {
        var d = window.onload;
        window.onload = function() {
            d && d(), a()
        }
    }
}

function callibri_extend(a, b) {
    for (var c in b) a[c] = b[c];
    return a
}

function callibriCheckIE8_9() {
    return !!navigator.userAgent.match(/(MSIE 9\.0)|(MSIE 8\.0)/)
}

function callibriCheckIE8_9_10_11() {
    return !!(navigator.userAgent.match(/(MSIE 10\.0)|(MSIE 9\.0)|(MSIE 8\.0)/) || navigator.userAgent.indexOf("Trident/7.0") > -1)
}

function callibriCheckIE8_9_10() {
    return !!navigator.userAgent.match(/(MSIE 10\.0)|(MSIE 9\.0)|(MSIE 8\.0)/)
}

function callibriCheckIE8() {
    return !!navigator.userAgent.match(/(MSIE 8\.0)/)
}

function callibriCheckOperaMini() {
    return !!/opera mini/i.test(navigator.userAgent)
}

function callibriCheckIE10_11_Edge() {
    return !!(navigator.userAgent.match(/(MSIE 10\.0)/) || navigator.userAgent.indexOf("Edge") > -1 || navigator.userAgent.indexOf("Trident/7.0") > -1)
}

function callibriSendError(a, b, c, d) {
    if (_callibri.debug && window.console.log(a), _callibri.debug || _callibri.module_settings && _callibri.module_settings.debug) {
        callibriMakeRequest("/module/error", {
            error: a.stack,
            session_id: _callibri.session_id,
            type: b
        })
    }
}

function callibriReachGoal(a, b) {
    for (var c, d = a.length, e = 0; e < d; e++) c = a[e], b.reachGoal(c.name)
}

function callibriTimeoutGetMetrika(a) {
    var b = callibriGetYaCounter();
    if (b)
        if ("function" == typeof b.getClientID) _callibri.ya_client_id = b.getClientID(), callibriPingNumber(!0);
        else if (a < 300 && setTimeout(function() {
            callibriTimeoutGetMetrika(a + 1)
        }, 1e3), 60 === a) {
        var c = [],
            d = [];
        for (var e in window) e.match("yaCounter") && (c.push(e), d.push(Object.keys(window[e])));
        var f = {
            error: "ymcounter is true, but getClientID not funtion " + c.join(",") + "hiiden " + JSON.stringify(callibriDocumentHidden()),
            type: JSON.stringify(d),
            session_id: _callibri.session_id
        };
        callibriMakeRequest("/module/error", f)
    }
}

function callibriGetMetrikaClientID(a) {
    return _callibri.ya_client_id ? _callibri.ya_client_id : (_callibri.use_guid && !callibriGetCookie("callibri_ym_wait") && callibriSetCookie("callibri_ym_wait", "true", void 0, !0, 10), null)
}

function callibriGetGaClientID(a) {
    return _callibri.ga_client_id ? _callibri.ga_client_id : (_callibri.use_guid && !callibriGetCookie("callibri_ga_wait") && callibriSetCookie("callibri_ga_wait", "true", void 0, !0, 10), null)
}

function callibriGetYaCounter() {
    if (!_callibri.metrika) return null;
    var a = null,
        b = null;
    if (_callibri.metrika && _callibri.metrika.counter_id && (a = "yaCounter" + _callibri.metrika.counter_id, b = window[a]), !a)
        for (var c in window)
            if (c.match(/^yaCounter\d+/) && "object" == typeof(b = window[c]) && 0 !== Object.keys(b).length) {
                a = c;
                break
            } return b = a ? window[a] : null, b && b.params ? b : null
}

function callibri_wait(a, b, c, d, e, f, g) {
    var h = "callibri_await_";
    if (!a[h + b + "_completed"]) {
        var i = function() {
            a[h + b + "_completed"] || (a[h + b + "_completed"] = !0, a[h + b] && a[h + b].timer && (clearInterval(a[h + b].timer), a[h + b] = null), f(a[b]))
        };
        a[b] && g ? c(a[b]) ? i() : (g(i), setTimeout(function() {
            callibri_wait(a, b, c, d, e, f)
        }, 0)) : c(a[b]) ? i() : a[h + b] || (a[h + b] = {
            timer: setInterval(function() {
                (c(a[b]) || e < ++a[h + b].attempt) && i()
            }, d),
            attempt: 0
        })
    }
}

function callibriSendYa(a) {
    try {
        a && a.getClientID || !callibriGetCookie("_ym_uid") ? _callibri.ya_client_id = a.getClientID() : _callibri.ya_client_id = callibriGetCookie("_ym_uid"), _callibri.dynamic && callibriPingNumber(!0), callibriGetCookie("callibri_ym_wait") && (callibriMakeRequest("/module/session_attributes", {
            session_id: _callibri.key,
            session_key: _callibri.session_id,
            metrika_client_id: _callibri.ya_client_id
        }), callibriSetCookie("callibri_ym_wait", "", void 0, !0, -1)), a || (a = callibriGetYaCounter()), a.params("callibri_session", _callibri.guid_key.toString()), _callibri.clbvid && a.params("clbvid", _callibri.clbvid)
    } catch (a) {
        callibriSendError(a, "callibriSendYa")
    }
}

function callibriGetGuid() {
    if (_callibri.metrika) {
        var a = function(a) {
                return !!(a && a.getClientID || callibriGetCookie("_ym_uid"))
            },
            b = function(a) {
                document.addEventListener("yacounter" + _callibri.metrika.counter_id + "inited", a)
            };
        callibri_wait(window, "yaCounter" + _callibri.metrika.counter_id, a, 50, 250, callibriSendYa, b)
    }
    if (_callibri.use_guid) {
        _callibri.ga = "ga_ckpr" == window.GoogleAnalyticsObject ? "ga" : window.GoogleAnalyticsObject;
        var c = function(a) {
                return !!(a && a.getAll || callibriGetCookie("_ga"))
            },
            d = function(a) {
                try {
                    if (a && a.getAll || !callibriGetCookie("_ga") ? _callibri.ga_client_id = a.getAll()[0].get("clientId") : _callibri.ga_client_id = callibriGetCookie("_ga").replace(/GA\d+\.\d+\./, ""), callibriGetCookie("callibri_ga_wait") && (callibriMakeRequest("/module/session_attributes", {
                            session_id: _callibri.key,
                            session_key: _callibri.session_id,
                            google_user_id: _callibri.ga_client_id
                        }), callibriSetCookie("callibri_ga_wait", "", void 0, !0, -1)), _callibri.dynamic && callibriPingNumber(!0), _callibri.ga_goals && _callibri.ga_goals.dimension) {
                        var b = "dimension" + _callibri.ga_goals.dimension.toString(),
                            c = "dimension" + (_callibri.ga_goals.dimension + 1).toString();
                        a("set", b, _callibri.guid_key), a("set", c, _callibri.ga_client_id), a("set", "&uid", _callibri.ga_client_id)
                    }
                } catch (a) {
                    callibriSendError(a, "callibriSendGa")
                }
            },
            e = function(a) {
                window[_callibri.ga](function() {
                    a(window[_callibri.ga])
                })
            };
        callibri_wait(window, _callibri.ga, c, 200, 250, d, e)
    }
}

function callibriChangeEmails() {
    var a = _callibri.module_settings && _callibri.module_settings.email_elements ? "string" == typeof _callibri.module_settings.email_elements ? JSON.parse(_callibri.module_settings.email_elements) : _callibri.module_settings.email_elements : [];
    if (a.length > 0 && _callibri.session_id) {
        var b;
        if (_callibri.email ? b = _callibri.email : "archive" != _callibri.module_settings.email_type && "nolimit" != _callibri.module_settings.email_type || (b = _callibri.site_id.toString() + "-" + Number(_callibri.session_id).toString(36) + "@dr-mail.com"), !b) return;
        var c, d, e, f, g, h, i = a.length;
        for (g = 0; g < i; g++)
            for (f = a[g], c = document.querySelectorAll(f), e = c.length, h = 0; h < e; h++)
                if (d = c[h], d.innerText ? d.innerText = d.innerText.replace(/\S+@\S+/gi, b) : d.innerHTML = d.innerHTML.replace(/\S+@\S+/gi, b), "A" === d.tagName && d.href.indexOf("mailto") > -1 && (d.href = "mailto:" + b), _callibri.email && _callibri.dynamic && !d.dataset.callibri_email) {
                    d.dataset.callibri_email = _callibri.email;
                    var j = _callibri.mobile.isMobile ? "touchstart" : "mouseup";
                    d.addEventListener(j, function(a) {
                        callibriMakeRequest("/module/click", {
                            session_id: _callibri.session_id,
                            client_id: _callibri.site_id,
                            key: a.target.dataset.callibri_email,
                            event_type: "email",
                            clbvid: _callibri.clbvid
                        }), a.target.removeEventListener(a.type, arguments.callee, !0)
                    })
                }
    }
}

function callibriGetLibrary(a, b, c, d) {
    if ("CallibriLidCatcher" === c || "callibri_rating" === c) return void callibriLoadLibraryFromScript(a, b, c, d);
    var e = "function" == typeof requirejs && "function" == typeof define;
    _callibri.module_settings && _callibri.module_settings.requirejs || "function" != typeof requirejs || ! function(a, b) {
        for (var c, d, e = a.split("."), f = b.split("."), g = Math.max(e.length, f.length), h = 0, i = 0; i < g && !h; i++) c = parseInt(e[i], 10) || 0, d = parseInt(f[i], 10) || 0, c < d && (h = 1), c > d && (h = -1);
        return -1 != h
    }("2.1.13", requirejs.version) || (e = !1);
    var f = callibriGetCookie("callibri_requirejs");
    if (e) requirejs([a], function(a) {
        window[c] = a, b()
    }), callibriSetCookie("callibri_requirejs", "true");
    else {
        if (f) return void setTimeout(function() {
            callibriGetLibrary(a, b, c)
        }, 1e3);
        callibriLoadLibraryFromScript(a, b, c, d)
    }
}

function callibriLoadLibraryFromScript(a, b, c, d) {
    var e = document.getElementsByTagName("head")[0],
        f = document.createElement("script");
    f.setAttribute("charset", "utf-8"), f.setAttribute("type", "text/javascript"), f.setAttribute("src", a), f.setAttribute("name", c), window["done_script_" + c] = !1, f.onload = f.onreadystatechange = function() {
        var a = "done_script_" + this.getAttribute("name");
        window[a] || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (window[a] = !0, b())
    }, "function" == typeof d && (f.onerror = d), e.appendChild(f)
}

function callibriGetRequest(a, b) {
    var c = callibriXhrRequest();
    c && (c.open("GET", a, !0), b && (c.onreadystatechange = function() {
        b(c)
    }), c.send())
}

function callibriLoadContentCallback(a, b) {
    if (a) {
        callibriCheckIE8_9_10_11() || !Object.assign || !Array.from || callibriCheckOperaMini() ? callibriGetLibrary("//cdn.callibri.ru/ie_polyfills.min.js", function() {
            callibriHandleResponse(a, b)
        }) : callibriHandleResponse(a, b);
        callibriBindReady(function() {
            !_callibri.only_widget && _callibri.number && (callibriReplacePhones(), callibriReplaceCopiesPhones()), callibriUseFeedback(), callibriChangeEmails()
        })
    }
}

function callibriAfterResponse() {
    if (!_callibri.feedback_send) {
        _callibri.feedback_send = !0;
        var a = callibriGetItemLocalStorage("callibri_feedbacks");
        if (callibriSetItemLocalStorage("callibri_feedbacks", ""), a && _callibri.init) {
            a = JSON.parse(a);
            for (var b, c, d, e, f = 0; f < a.length; f++) {
                c = a[f].split("-;-"), b = {
                    feedback: {
                        session_id: _callibri.session_id,
                        number: _callibri.number
                    }
                };
                for (var g = 0; g < c.length; g++) feed = c[g].split("-:-"), feed.length > 0 && (d = feed[0], e = feed[1], b.feedback[d] = e);
                callibriMakeRequest("/module/contactus", b)
            }
            callibriSetItemLocalStorage("callibri_feedbacks", "")
        }
    }
}

function callibriSetCookiePrefix() {
    "string" == typeof callibri_cookie_prefix ? (_callibri.cookie_prefix = callibri_cookie_prefix + "_", _callibri.allow_subdomains = !1) : _callibri.cookie_prefix = "v1_"
}

function callibriGetSessionCookie() {
    var a = callibriGetCookie(_callibri.cookie_prefix + "sessions_callibri") || null;
    return a || "v1_" == _callibri.cookie_prefix || (a = callibriGetCookie("v1_sessions_callibri") || null), a
}

function callibriInit(a) {
    try {
        var b = callibriGetCookie("callibri_get_request"),
            c = (new Date).valueOf();
        if (_callibri.get_request || b && (c - Number(b)) / 1e3 < 30) return void(_callibri.get_request || (_callibri.get_request = !0, supports_callibri_storage() && window.addEventListener("storage", function(a) {
            "callibri" != a.key && "callibri_module_settings" != a.key || !a.newValue || a.oldValue === a.newValue || (clearTimeout(window.callibri_get_request_timeout), callibriInit())
        }), callibri_get_request_timeout = setTimeout(function() {
            _callibri.get_request = !1, callibriInit(a)
        }, 3e3)));
        _callibri.get_request = !0, callibriSetCookie("callibri_get_request", c, void 0, !0), _callibri.mobile = {}, _callibri.mobile.isMobile = !1, /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Mobi/i.test(navigator.userAgent) && (_callibri.mobile.isMobile = !0, _callibri.mobile.iPhone = !!/iPhone/i.test(navigator.userAgent)), callibriSetCookiePrefix(), _callibri.version = "1534328280", _callibri.server_host || (_callibri.server_host = "in.callibri.ru"), _callibri.cdn_host || (_callibri.cdn_host = "cdn.callibri.ru"), _callibri.module_host || (_callibri.module_host = "module.callibri.ru"), _callibri.ws_server_host || (_callibri.ws_server_host = "ws.callibri.ru");
        var d, e, f = 0;
        d = _callibri.objects.callibri, d.oid = "callibri", d.format || (d.format = "+7 (#{XXX}) #{XXX}-#{XX}-#{XX}"), d.block_class || (d.block_class = "callibri_phone");
        var g = callibriGetSessionCookie();
        callibriFlushTempStorage();
        var h, i = callibriGetResponse(),
            j = new RegExp("^https?://" + document.domain),
            k = callibriGetCookie(_callibri.cookie_prefix + "referrer_callibri"),
            l = document.referrer,
            m = callibriGetItemLocalStorage(_callibri.cookie_prefix + "landing_callibri"),
            n = document.location.search && document.location.search.match(/utm_referrer=(.+)(&|$)/);
        if (n) try {
            l = decodeURIComponent(n[1])
        } catch (a) {
            l = document.referrer
        }
        var o = !1 === k;
        !1 === k && (k = l, callibriSetCookie(_callibri.cookie_prefix + "referrer_callibri", k), callibriSetItemLocalStorage(_callibri.cookie_prefix + "search_callibri", h)), h = document.location.search || "", document.location.hash && document.location.hash.match("=") && (h += document.location.hash.replace(/^#/, h ? "&" : "?"));
        var p = a ? callibriLoadContentCallback : callibriHandleResponse;
        if (l && l.match(j)) {
            if (!g && !1 === o) {
                if (callibriGetItemLocalStorage("callibri_nct")) return;
                if (e = callibriGetItemLocalStorage("callibri_request_send")) return e = JSON.parse(e), void callibriMakeRequest("/module/number", e, p, "application/json", _callibri.module_host, 6e4);
                var q = l.split("?")[1];
                q && (h = "?" + q)
            }
        } else {
            m != window.location.href && callibriSetItemLocalStorage(_callibri.cookie_prefix + "landing_callibri", window.location.href);
            var q = callibriGetItemLocalStorage(_callibri.cookie_prefix + "search_callibri");
            (k == l && h && h != q && h.match(/(\?utm_)|(&utm_)|(yclid=)|(gclid=)|(_openstat=)/) || k != l || (m || "").replace(/\?.+/, "") != window.location.href.replace(/\?.+/, "")) && (i = "", k = l, m = window.location.href, callibriFlushResponse(), callibriSetCookie(_callibri.cookie_prefix + "referrer_callibri", k), callibriSetItemLocalStorage(_callibri.cookie_prefix + "search_callibri", h))
        }
        if (navigator.userAgent.toLowerCase().match("(StackRambler)|(googlebot)|(AdsBot-Google)|(APIs-Google)|(Mediapartners-Google)|(Google Page Speed)|(YandexBot)|(\\+https?:\\/\\/yandex.com\\/bots)|(\\+https?:\\/\\/www.google.com\\/bot.html)|(AdsBot-Google)|(AhrefsBot)|(aport)|(Slurp)|(msnbot)|(\\+https?:\\/\\/go.mail.ru\\/help\\/robots)|(yaDirectBot)|(yetibot)|(\\+https?:\\/\\/www\\.picsearch\\.com\\/bot\\.html)|(sape.bot)|(sape_context)|(gigabot)|(snapbot)|(qwartabot)|(aboutusbot)|(oozbot)|(bingbot)|(\\+https?:\\/\\/www\\.bing\\.com\\/bingbot\\.htm)|(SimplePie)|(SiteLockSpider)|(okhttp)|(ips-agent)|(BLEXBot)|(yanga.co.uk)|(scoutjet)|(similarpages)|(shrinktheweb.com)|(followsite.com)|(dataparksearch)|(feedfetcher-google)|(liveinternet.ru)|(xml-sitemaps.com)|(agama)|(metadatalabs.com)|(h1.hrn.ru)|(googlealert.com)|(seo-rus.com)|(Copyscape.com)|(domaintools.com)|(Nigma.ru)|(dotnetdotcom)|(alexa.com)|(megadownload.net)|(askpeter.info)|(igde.ru)|(ask.com)|(Questok.Ru bot)|(DnyzBot)|(SMTBot)|(PR-CY.RU)|(Baiduspider)|(Sogou web spider)|(Google-Adwords-DisplayAds-WebRender)|(Pulsepoint XT3 web scraper)".toLowerCase()) || h && h.match(/(\{STYPE\})|(\{SRC\})|(\{PTYPE\})|(\{POS\})|(\{PARAM127\})|(\{PHRASE\})/)) return;
        if (_callibri.exists_url = !!callibriGetItemLocalStorage("callibri_hooks_urls") || null, _callibri.exists_url) try {
            var r = callibriGetItemLocalStorage("callibri_hooks_urls_timestamp"),
                s = new Date,
                t = new Date(r),
                f = t.getTime ? (s - t) / 1e3 / 60 : 60;
            _callibri.exists_url = f < 60 || null
        } catch (a) {
            _callibri.exists_url = null
        }
        e = {
            uid: document.domain,
            session_id: g,
            search: h,
            referrer: k,
            landing: document.location.href,
            exists_url: _callibri.exists_url,
            exists_cookie_lid_catcher: !!callibriGetCookie("callibri_catcher_was_shown") || null,
            clbvid: callibriGetCookie("clbvid") || null
        }, page_segment = callibriGetCookie("callibri_page_segment"), page_segment && (e.page_segment = page_segment);
        try {
            if (i) {
                json = JSON.parse(i);
                var s = new Date,
                    t = new Date(json.expire_date);
                f = t.getTime ? (s - t) / 1e3 / 60 : 10, _callibri.load_chat_history = callibriGetCookie(_callibri.cookie_prefix + "callibri_chat_history")
            } else _callibri.load_chat_history = null !== e.session_id;
            if (i && f < 10)
                if (json.data.module_settings) p(i, 200);
                else {
                    var u;
                    if (supports_callibri_storage() && (u = localStorage.getItem("callibri_module_settings")), u) json.data.module_settings = JSON.parse(u), i = JSON.stringify(json), p(i, 200);
                    else {
                        var v = function(a) {
                            var b = callibriGetResponse();
                            if (a && b) {
                                json = JSON.parse(b), json.data.module_settings = JSON.parse(a), json.data.module_settings.timestamp = (new Date).valueOf();
                                try {
                                    localStorage.setItem("callibri_module_settings", JSON.stringify(json.data.module_settings))
                                } catch (a) {}
                                b = JSON.stringify(json)
                            }
                            if (b) {
                                ("complete" !== document.readyState ? callibriLoadContentCallback : callibriHandleResponse)(b, 200)
                            }
                        };
                        callibriMakeRequest("/module/site_settings", {
                            site_id: json.data.site_id,
                            session_id: json.data.key
                        }, v)
                    }
                }
            else callibriFlushResponse(), callibriSetItemStorage("callibri_request_send", JSON.stringify(e)), callibriMakeRequest("/module/number", e, p, "application/json", _callibri.module_host, 6e4)
        } catch (a) {
            callibriMakeRequest("/module/number", e, p, "application/json", _callibri.module_host, 6e4)
        }
    } catch (a) {
        void 0 !== console ? console.log(a.stack) : window.console.log(a), console, callibriSendError(a, "callibriInit")
    }
}

function CallibriSendForm(a, b, c, d, e) {
    var f = {};
    f.feedback = {
        name: "",
        phone: "",
        email: "",
        message: "",
        client_id: _callibri.site_id,
        number: _callibri.number,
        session_id: _callibri.session_id,
        page: document.location.protocol + "//" + document.location.host + document.location.pathname
    };
    var g = f.feedback;
    return a && (g.phone = a), b && (g.email = b), c && (g.name = c), d && (g.message = d), e && (g.form_name = e),
        !(!CallibriFormParser.prototype.validate_phone_email(f) || !_callibri.session_id) && (callibriMakeRequest("/module/contactus", f), !0)
}
if (!_callibri) var _callibri = {
    objects: {
        callibri: {
            block_class: "callibri_phone",
            format: "+7 (#{XXX}) #{XXX}-#{XX}-#{XX}"
        }
    }
};
_callibri.objects || (_callibri.objects = {
    callibri: {
        block_class: "callibri_phone",
        format: "+7 (#{XXX}) #{XXX}-#{XX}-#{XX}"
    }
}), CallibriFormParser = function() {
    this.init()
}, CallibriFormParser.prototype = {
    init: function() {
        _callibri.use_feedback && (this.custom_forms = _callibri.feedback_settings.feedback_settings && void 0 === _callibri.feedback_settings.feedback_settings.length, this.setup_form(), this.setup_modal_forms(), this.iframe_message(), this.init_parser = !0)
    },
    search_form: function() {
        var a = {};
        if (this.custom_forms)
            for (form_key in _callibri.feedback_settings.feedback_settings) a[form_key] = document.querySelectorAll(form_key);
        else a = {
            0: document.querySelectorAll('form:not([data_form^="callibri"]):not([id^="callibri"]),.modal,#forma')
        };
        return a
    },
    search_inputs: function(a, b) {
        var c, d = [];
        for (var e in b)
            if ("button" !== e) {
                c = b[e];
                try {
                    element = a.querySelector(c)
                } catch (a) {
                    element = null
                }
                element && d.push(element)
            } return d
    },
    valid_form: function(a) {
        if ("FORM" === a.tagName || 0 === a.querySelectorAll("form").length || "forma" === a.id) {
            var b = a.querySelectorAll("input[type='password']");
            if (a.getAttribute("action") && a.getAttribute("action").split("?")[0].indexOf("search") > -1) return !1;
            if (0 === b.length) return !0
        }
        return !1
    },
    init_submit_form: function(a, b) {
        (a = this.is_form(a)) && (a.dataset.callibri_parse_form = 0 == b || b, a.addEventListener("submit", CallibriFormParser.prototype.send_form, !0))
    },
    setup_form: function() {
        var a, b, c, d, e, f, g, h, i, j = this.search_form();
        for (form_key in j)
            for (a = j[form_key], h = 0 == form_key ? null : _callibri.feedback_settings.feedback_settings[form_key], b = a.length, f = 0; f < b; f++)
                if (e = a[f], !e.dataset.callibri_parse_form && (0 != form_key || this.valid_form(e))) {
                    if (i = this.get_buttons(e, h), submit_buttons_length = i.length, submit_buttons_length > 0)
                        for (g = 0; g < submit_buttons_length; g++) submit_button = i[g], this.init_button(submit_button, h, form_key);
                    if (this.init_submit_form(e, form_key), this.custom_forms && (e.dataset.callibri_parse_form = 0 == form_key || form_key, c = this.search_inputs(e, h), 0 === e.querySelectorAll("*[data-callibri_parse_form]").length))
                        for (inputs_length = c.length, g = 0; g < inputs_length; g++) d = c[g], d.addEventListener("blur", CallibriFormParser.prototype.send_form, !0), d.dataset.callibri_parse_input = form_key
                }
    },
    get_buttons: function(a, b) {
        var c;
        return this.custom_forms && (button_selector = b.button, button_selector && (c = a.querySelectorAll(button_selector))), c || (c = a.querySelectorAll("input[type='submit']")[0] || a.querySelectorAll("button[type='submit']")[0] || a.querySelectorAll("button[id*=submit]")[0] || a.querySelectorAll("button")[0] || a.querySelectorAll(".button")[0] || a.querySelectorAll("input[name='submit']")[0] || void 0, this.custom_forms || (void 0 !== c && c.style.cssText.match("display: none") && (c = void 0), void 0 === c && "forma" === a.id && (c = a.querySelectorAll(".submit input[type='button']")[0]), void 0 === c && (c = a.querySelector('a[class*="submit"],a[id*="submit"],input[class*="submit"],input[id*="submit"]') || void 0)), c = c ? [c] : []), c
    },
    is_form: function(a) {
        return "FORM" !== a.tagName && (a = a.querySelector("form")), a || null
    },
    init_button: function(a, b, c) {
        a && !a.dataset.callibri_parse_form && (0 == c || b.phone || b.email) && (a.dataset.callibri_parse_form = 0 == c || c, a.addEventListener("keydown", CallibriFormParser.prototype.send_form, !0), _callibri.mobile.isMobile && (a.addEventListener("click", CallibriFormParser.prototype.send_form, !0), a.addEventListener("touchstart", CallibriFormParser.prototype.send_form, !0)), a.addEventListener("mousedown", CallibriFormParser.prototype.send_form, !0))
    },
    get_module_feedback_data: function(a, b) {
        var c, d, e = {
                feedback: {
                    name: "",
                    phone: "",
                    email: "",
                    message: "",
                    company: "",
                    client_id: _callibri.site_id,
                    number: _callibri.number,
                    session_id: _callibri.session_id,
                    page: document.location.protocol + "//" + document.location.host + document.location.pathname,
                    custom_fields: {}
                }
            },
            f = [],
            g = [],
            h = ["div", "label", "span", "p", "a"];
        if (b) {
            for (var i in b)
                if ("button" !== i) {
                    c = b[i];
                    try {
                        element = a.querySelector(c)
                    } catch (a) {
                        element = null
                    }
                    element && (h.indexOf(element.nodeName.toLowerCase()) > -1 ? d = element.innerText : (d = element.value, element.value || (f.push(i), (element.dataset.required && "false" !== element.dataset.required || element.required) && g.push(i))), void 0 !== e.feedback[i] ? e.feedback[i] = d : e.feedback.custom_fields[i] = d)
                }
        } else
            for (var c, j = ["phone", "tel", "telephone", "zayavki[tel]", "zvonki[tel]", "telefon"], k = ["msg", "text", "message"], l = ["name", "fio", "zayavki[name]"], m = "", n = a.querySelectorAll("input:not([type='hidden']):not([type='checkbox']),textarea"), o = 0; o < n.length; o++) {
                m = n[o].name.toLowerCase();
                var c = n[o].value;
                !e.feedback.email && c && c.indexOf("@") > 0 && n[o].value.length < 255 ? e.feedback.email = c : !e.feedback.phone && (j.filter(function(a) {
                    return m.indexOf(a) > -1
                }).length > 0 || c && c.replace(/\D/g, "").length > 9 && c.replace(/\D/g, "").length < 13 || m.match("[\\(" + j.toString().replace(/,/gi, "\\)|\\(") + "\\)]")) ? e.feedback.phone = c.replace(/\D/g, "") : !e.feedback.name && (l.indexOf(m) > -1 || m.match("(" + l.toString().replace(/,/gi, ")|(") + ")")) ? e.feedback.name = c : !e.feedback.message && (k.indexOf(m) > -1 || n[o].tagName.toLowerCase().match("textarea")) && (e.feedback.message = c)
            }
        return [e, 0 == f.length, 0 == g.length]
    },
    validate_phone_email: function(a) {
        var b = a.feedback.email.length > 0 && /.{1,}@.{1,}\..{1,}/.test(a.feedback.email),
            c = !1;
        if (a.feedback.phone.length > 0) {
            var d = a.feedback.phone.replace(/\D/g, "");
            c = d.length > 9 && d.length < 13
        }
        return b || c
    },
    save_local_storage: function(a) {
        try {
            var b = a.target,
                c = b.querySelector("*[data-callibri_parse_form]").dataset.callibri_parse_form,
                d = "true" == c ? null : _callibri.feedback_settings.feedback_settings[c],
                e = callibri_get_module_feedback_data(b, d);
            this.validate_phone_email(e) && (callibriSetPostDataFeedback(e), a.target.removeEventListener("submit", arguments.callee, !0))
        } catch (a) {}
    },
    send_feedback_form: function(a, b) {
        var c = null,
            d = a.dataset.callibri_parse_form;
        "true" !== d && (c = _callibri.feedback_settings.feedback_settings[d]);
        try {
            var e = this.get_module_feedback_data(a, c),
                f = e[0],
                g = e[1],
                h = e[2];
            if (0 == g && "blur" == b || 0 == h) return !1;
            if (this.validate_phone_email(f)) return f.feedback.form_name = this.feedback_form_name(a), callibriMakeRequest("/module/contactus", f), !0
        } catch (a) {
            return console.log(a), !1
        }
        return !1
    },
    get_form_target: function(a, b) {
        var c, d = "blur" == b ? a.dataset.callibri_parse_input : a.dataset.callibri_parse_form;
        return "submit" == b && (c = a), c = "true" == d ? c || a.form || document.querySelectorAll(".modal.in")[0] || (a.parentNode.className.indexOf("submit") < 0 ? a.parentNode : a.parentNode.parentNode) : c || callibriFindParentSelector(a, d)
    },
    send_form: function(a) {
        if (13 == a.keyCode || "keydown" != a.type) try {
            var b = CallibriFormParser.prototype.get_form_target(a.currentTarget, a.type);
            if (_callibri.form_parser.send_feedback_form(b, a.type)) {
                var c, d = b.querySelectorAll("*[data-callibri_parse_form]"),
                    e = b.querySelectorAll("*[data-callibri_parse_input]"),
                    f = e.length;
                b = _callibri.form_parser.is_form(b), b && b.removeEventListener("submit", arguments.callee, !0);
                var g = d.length;
                if (g > 0)
                    for (i = 0; i < g; i++) c = d[i], c.removeEventListener("keydown", arguments.callee, !0), _callibri.mobile.isMobile && (c.removeEventListener("click", arguments.callee, !0), c.removeEventListener("touchstart", arguments.callee, !0)), c.removeEventListener("mousedown", arguments.callee, !0);
                for (i = 0; i < f; i++) e[i].removeEventListener("blur", arguments.callee, !0)
            }
        } catch (a) {
            console.log(a)
        }
    },
    setup_modal_forms: function() {
        if (!this.init_parser && _callibri.feedback_settings && _callibri.feedback_settings.parser_init) try {
            "function" == typeof jQuery && _callibri.feedback_settings.parser_init.jquery ? jQuery("body").on("click", _callibri.feedback_settings.parser_init.button, function() {
                setTimeout(function() {
                    CallibriFormParser.prototype.form_parser_search(0)
                }, 2e3)
            }) : this.search_form_button()
        } catch (a) {}
    },
    iframe_message: function() {
        try {
            if (_callibri.feedback_settings && _callibri.feedback_settings.iframe_selector) {
                var a = document.querySelector(_callibri.module_settings.iframe_selector);
                a.contentWindow.postMessage(callibriGetResponse(), a.src)
            }
        } catch (a) {}
    },
    search_form_button: function() {
        for (var a, b = document.querySelectorAll(_callibri.feedback_settings.parser_init.button), c = 0; c < b.length; c++) a = b[c], "true" != a.dataset.callibri_search_form && (a.addEventListener("click", function(a) {
            setTimeout(function() {
                CallibriFormParser.prototype.form_parser_search(0)
            }, 2e3), a.target.removeEventListener("click", arguments.callee, !0), a.target.dataset.callibri_search_form = !1
        }, !0), a.dataset.callibri_search_form = !0)
    },
    form_parser_search: function(a) {
        for (var b = !0, c = document.querySelectorAll(_callibri.feedback_settings.parser_init.selector_forms), d = 0; d < c.length; d++)
            if (null === c[d].querySelector("[data-callibri_parse_form]")) {
                _callibri.form_parser && _callibri.form_parser.init(), b = !1;
                break
            } b && a < 15 ? (a += 1, setTimeout(function() {
            CallibriFormParser.prototype.form_parser_search(a)
        }, 2e3)) : CallibriFormParser.prototype.search_form_button()
    },
    feedback_form_name: function(a) {
        var b = a.dataset.callibri_form_name;
        if (!b) {
            var c = a.querySelector("*[data-callibri_form_name]");
            b = c ? c.dataset.callibri_form_name : a.getAttribute("id") || ""
        }
        return b
    }
}, callibriInit(!0);