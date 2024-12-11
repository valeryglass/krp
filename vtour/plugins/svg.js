function krpanoplugin() {
    var local = this;  var krpano = null;  var plugin = null;  var device = null;  var svgNode = null;
    local.registerplugin = function(krpanointerface, pluginpath, pluginobject) {
      krpano = krpanointerface;    device = krpano.device;    plugin = pluginobject;
      plugin.registerattribute('svg_title', null);    plugin.registerattribute('svg_fill', null);    plugin.registerattribute('svg_stroke', null);    plugin.registerattribute('svg_height', null);    plugin.registerattribute('svg_preserveAspectRatio', null);    plugin.registerattribute('svg_viewBox', null);    plugin.registerattribute('svg_width', null);    plugin.registerattribute('svg_x', null);    plugin.registerattribute('svg_y', null);    plugin.registerattribute('svg_tween_time', 0.25);    plugin.registerattribute('loadSVG', loadSVG);    plugin.registerattribute('changeColor', changeColor);
      loadSVG(plugin.svg_title, plugin.svg_fill, plugin.svg_stroke);
    };
    function loadSVG(svg_title, svg_fill, svg_stroke) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {      if (xmlhttp.readyState == XMLHttpRequest.DONE) {        if (xmlhttp.status == 200) {          plugin.sprite.innerHTML = xmlhttp.responseText;          svgNode = plugin.sprite.firstElementChild;
            if (svg_fill) {            svgNode.style.fill = '#' + svg_fill;          }
            if (svg_stroke) {            svgNode.style.stroke = '#' + svg_stroke;          }          svgNode.style.transition = 'fill ' + plugin.svg_tween_time +              's linear-in-out';
            if (plugin.svg_width != null) {            svgNode.setAttribute('width', plugin.svg_width);          }          ;          if (plugin.svg_height != null) {            svgNode.setAttribute('height', plugin.svg_height);          }          ;          if (plugin.svg_viewBox != null) {            svgNode.setAttribute('viewBox', plugin.svg_viewBox);          }          ;          if (plugin.svg_x != null) {            svgNode.setAttribute('x', plugin.svg_x);          }          ;          if (plugin.svg_y != null) {            svgNode.setAttribute('y', plugin.svg_y);          }          ;
          } else if (xmlhttp.status == 400) {
            krpano.trace(3, 'There was an error 400');
          } else {
            krpano.trace(3, 'something else other than 200 was returned');
          }      }    };
      xmlhttp.open('GET', '/assets/SVG/' + svg_title + '.svg',        true);    xmlhttp.send();
    };
    function changeColor(thecolor) {    //console.log('change color #' + thecolor);    svgNode.style.fill = '#' + thecolor;  }
    local.unloadplugin = function() {    delete plugin.divid;
      plugin = null;    device = null;    krpano = null;  };
  };