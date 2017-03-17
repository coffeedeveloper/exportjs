const defaults = {
  mime: 'text/csv,charset=UTF-8',
  fileName: 'data.csv',
  columns: [],
  data: [],
  el: null,
  auto: true,
  utf8: true,
  warning: true,
};

const extend = (target, ...args) => {
  args.forEach((arg) => {
    for (let p in arg)
      target[p] = arg[p]
  })
  return target;
};

const escapeContent = content => {
  if (content == null || typeof content == 'undefined') content = '';
  content = String(content);
  content.replace(/"/g, '""');
  if (content.search(/("|,|\n)/g) > 0)
    content = `"${content}"`;
  return content;
};

const toCSV = options => {
  let opts = extend({}, defaults, options);

  let head = opts.utf8 ? '\ufeff' : '';
  opts.columns.map(d => {
    head += d.title + ','
  });
  head = head.substr(0, head.length - 1);

  let content = '';
  opts.data.map(info => {
    if (Array.isArray(info)) {

    } else if (typeof info == 'object'){
      let str = '';
      opts.columns.map(p => {
        str += escapeContent(info[p.key]) + ',';
        if (!(p.key in info) && opts.warning) {
          console.warn(`property ${p.key} didn't in `, info);
        }
      });
      str = str.substr(0, str.length - 1);
      content += str + '\n';
    }
  });

  let blob = new Blob([head + '\n' + content], { type: opts.mime });
  let objectUrl = URL.createObjectURL(blob);

  if (opts.el) {
    opts.el.setAttribute('href', objectUrl);
    opts.el.setAttribute('download', opts.fileName);
  }

  if (opts.auto) {
    let link = document.createElement('a');
    link.setAttribute('href', objectUrl);
    link.setAttribute('download', opts.fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    link = null;
  }

  // free memory
  setTimeout(() => {
    if ('revokeObjectURL' in URL) {
      URL.revokeObjectURL(objectUrl);
    }
    content = null;
    blob = null;
  }, 40000);

  return blob;
};

const support = () => {
  if (typeof Blob == 'undefined') return false;
  if (typeof URL == 'undefined' || !'createObjectURL' in URL) return false;
  let link = document.createElement('a');
  if (!'download' in link) return false;
  return true;
};

export default {
  toCSV,
  support,
};
