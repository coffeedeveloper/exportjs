(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ExportJS = factory());
}(this, (function () { 'use strict';

var defaults = {
  mime: 'text/csv,charset=UTF-8',
  fileName: 'data.csv',
  columns: [],
  data: [],
  el: null,
  auto: true,
  utf8: true,
  warning: true,
};

var extend = function (target) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  args.forEach(function (arg) {
    for (var p in arg)
      { target[p] = arg[p]; }
  });
  return target;
};

var escapeContent = function (content) {
  if (content == null || typeof content == 'undefined') { content = ''; }
  content = String(content);
  content.replace(/"/g, '""');
  if (content.search(/("|,|\n)/g) > 0)
    { content = "\"" + content + "\""; }
  return content;
};

var toCSV = function (options) {
  var opts = extend({}, defaults, options);

  var head = opts.utf8 ? '\ufeff' : '';
  opts.columns.map(function (d) {
    head += d.title + ',';
  });
  head = head.substr(0, head.length - 1);

  var content = '';
  opts.data.map(function (info) {
    if (Array.isArray(info)) {

    } else if (typeof info == 'object'){
      var str = '';
      opts.columns.map(function (p) {
        str += escapeContent(info[p.key]) + ',';
        if (!(p.key in info) && opts.warning) {
          console.warn(("property " + (p.key) + " didn't in "), info);
        }
      });
      str = str.substr(0, str.length - 1);
      content += str + '\n';
    }
  });

  var blob = new Blob([head + '\n' + content], { type: opts.mime });
  var objectUrl = URL.createObjectURL(blob);

  if (opts.el) {
    opts.el.setAttribute('href', objectUrl);
    opts.el.setAttribute('download', opts.fileName);
  }

  if (opts.auto) {
    var link = document.createElement('a');
    link.setAttribute('href', objectUrl);
    link.setAttribute('download', opts.fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link = null;
  }

  // free memory
  setTimeout(function () {
    if ('revokeObjectURL' in URL) {
      URL.revokeObjectURL(objectUrl);
    }
    content = null;
    blob = null;
  }, 40000);

  return blob;
};

var support = function () {
  if (typeof Blob == 'undefined') { return false; }
  if (typeof URL == 'undefined' || !'createObjectURL' in URL) { return false; }
  var link = document.createElement('a');
  if (!'download' in link) { return false; }
  return true;
};

var index = {
  toCSV: toCSV,
  support: support,
};

return index;

})));
