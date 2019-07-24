/* eslint-disable */

(function (d, w, script) {

  var CDN = 'https://cdn.domclick.ru';
  var ready;

  if (!w.domclick) {
    w.domclick = {};
  }

  w.domclick.mortgage = {
    ready: function (cb) {
      ready = cb;
      if (w.domclick.mortgage && typeof w.domclick.mortgage.widget === 'function') {
        ready(w.domclick.mortgage.widget(CDN));
      }
    }
  };

  script = d.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.onload = function () {
    if (typeof ready === 'function') {
      ready(w.domclick.mortgage.widget(CDN));
    }
  };
  script.src = CDN + "/widget/mortgage/widget.js?" + (new Date().getTime());
  d.getElementsByTagName('head')[0].appendChild(script);

  link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = CDN + "/widget/mortgage/style.css?" + (new Date().getTime());
  d.getElementsByTagName('head')[0].appendChild(link);

}(document, window));
