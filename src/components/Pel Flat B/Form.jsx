import React from "react";
import '../../assets/form.css'

const Form = () => {

    if (typeof xLogError != 'function') {
        var xLogError = function (error) {
            var req = new XMLHttpRequest();
            var payload = JSON.stringify({ url: document.location.href, line: error.line, stack: error.stack });
            var params = 'message=' + encodeURIComponent(error.name) + '&payload=' + encodeURIComponent(payload) + '&type=embed&level=error';
            req.open('POST', 'https://api.orderonline.id/log', true);
            req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            req.send(params);
        };
    }
    try {
        if (typeof xEmbedScript != 'function') {
            var xEmbedScript = function () {
                !function (w, d, e, v, id, t, s) {
                    if (d.getElementById(id)) return;
                    t = d.createElement(e); t.async = !0; t.src = v; t.id = id;
                    s = d.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s);
                }(window, document, 'script', 'https://cdn.orderonline.id/js/embed-v2-slim.min.js?v=8.0.4', 'oo-embed-js');
            };
        }
        if (typeof xEmbedInit != 'function') {
            var xEmbedInit = function (w, n) {
                if (w.ooe) return;
                n = w.ooe = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) };
                if (!w._ooe) w._ooe = n;
                n.push = n; n.loaded = !0; n.version = '8.0.4'; n.queue = [];
            };
        }
        xEmbedInit(window);
        ooe('setup', 'redirect', 'https://thruvshop.orderonline.id');
        ooe('init', '666cb298b1eb0751550d4892', '6741a95aee95d9a1bc06c7fb', '6741a95aee95d9a1bc06c7fc', 'oo-embed-form-pel-tarik-2-6341', { "mode": "page", "action": "Klik untuk pemesanan", "title": "Form Pemesanan", "triggerPixel": false, "triggerGtm": false });
        if (!window.jQuery) {
            !function (w, d, e, v, id, t, s) {
                if (d.getElementById(id)) return;
                t = d.createElement(e); t.async = !0; t.src = v; t.id = id;
                t.addEventListener('load', xEmbedScript);
                s = d.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            }(window, document, 'script', 'https://cdn.orderonline.id/js/vendor/jquery.min.js', 'oo-embed-jquery');
        } else {
            xEmbedScript();
        }
    } catch (e) {
        xLogError(e);
        throw e;
    }

    return (
        <div id="form">
            <div class="ooef">
                <form class="orderonline-embed-form" data-username="thruvshop" data-product-slug="pel-tarik-2" data-product-id="6741a95aee95d9a1bc06c7fb" id="oo-embed-form-pel-tarik-2-6341" data-origin="orderonline">
                    <div class="ooef-loader">
                        <div aria-live="polite" role="status">
                            <div>Loading...</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}








export default Form
