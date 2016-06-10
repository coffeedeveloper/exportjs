(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define('ExportJS', ['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.ExportJS = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  var defaults = {
    mime: 'data:text/csv;charset=utf-8;',
    fileName: 'data.csv',
    columns: [],
    data: [],
    el: null,
    auto: true
  };

  var extend = function extend(target) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var arg = _step.value;

        for (var p in arg) {
          target[p] = arg[p];
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return target;
  };

  var escapeContent = function escapeContent(content) {
    content = String(content);
    content.replace(/"/g, '""');
    if (content.search(/("|,|\n)/g) > 0) content = '"' + content + '"';
    return content;
  };

  var toCSV = function toCSV(options) {
    var opts = extend({}, defaults, options);

    var head = '';
    opts.columns.map(function (d) {
      head += d.title + ',';
    });
    head = head.substr(0, head.length - 1);

    var content = '';
    opts.data.map(function (info) {
      if (Array.isArray(info)) {} else if ((typeof info === 'undefined' ? 'undefined' : _typeof(info)) == 'object') {
        var str = '';
        opts.columns.map(function (p) {
          if (p.key in info) {
            str += escapeContent(info[p.key]) + ',';
          } else {
            console.warn('property ' + p.key + ' didn\'t in ', info);
          }
        });
        str = str.substr(0, str.length - 1);
        content += str + '\n';
      }
    });

    var blob = new Blob([head + '\n' + content], { type: opts.mime });

    if (opts.el) {
      opts.el.setAttribute('href', URL.createObjectURL(blob));
      opts.el.setAttribute('download', opts.fileName);
    }

    if (opts.auto) {
      var link = document.createElement('a');
      link.setAttribute('href', URL.createObjectURL(blob));
      link.setAttribute('download', opts.fileName);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    return blob;
  };

  var support = function support() {
    if (typeof Blob == 'undefined') return false;
    if (typeof URL == 'undefined' || !'createObjectURL' in URL) return false;
    var link = document.createElement('a');
    if (!'download' in link) return false;
    return true;
  };

  exports.default = {
    toCSV: toCSV,
    support: support
  };
  module.exports = exports['default'];
});